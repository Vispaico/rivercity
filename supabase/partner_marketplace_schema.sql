-- Partner marketplace schema (owners can list vehicles; admin approves & sets price; manual payouts).
-- Run this AFTER booking_schema.sql in the Supabase SQL editor.

create extension if not exists pgcrypto;

-- Extend booking_status enum (adds 'completed' if missing)
-- Note: booking_schema.sql must have already created public.booking_status.
alter type public.booking_status add value if not exists 'completed';

-- Vehicles: add ownership + listing status
alter table public.vehicles
  add column if not exists owner_user_id uuid references auth.users(id) on delete set null;

alter table public.vehicles
  add column if not exists listing_status text;

alter table public.vehicles
  add column if not exists price_per_week numeric,
  add column if not exists price_per_month numeric;

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public' and table_name = 'vehicles' and column_name = 'listing_status'
  ) then
    -- handled by add column above
    null;
  end if;

  -- Backfill existing rows to approved.
  update public.vehicles
    set listing_status = 'approved'
  where listing_status is null;

  -- Set default for new rows (owners create as draft).
  alter table public.vehicles alter column listing_status set default 'draft';
  alter table public.vehicles alter column listing_status set not null;

  -- Enforce allowed statuses.
  if not exists (
    select 1
    from pg_constraint
    where conname = 'vehicles_listing_status_check'
  ) then
    alter table public.vehicles
      add constraint vehicles_listing_status_check
      check (listing_status in ('draft','submitted','approved','rejected'));
  end if;
end $$;

alter table public.vehicles
  add column if not exists submitted_at timestamptz,
  add column if not exists approved_at timestamptz,
  add column if not exists rejected_at timestamptz,
  add column if not exists rejection_reason text;

-- Partner vehicles are one physical vehicle per row.
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'vehicles_partner_inventory_check'
  ) then
    alter table public.vehicles
      add constraint vehicles_partner_inventory_check
      check (owner_user_id is null or inventory_count = 1);
  end if;
end $$;

create index if not exists vehicles_owner_user_id_idx on public.vehicles(owner_user_id);
create index if not exists vehicles_listing_status_idx on public.vehicles(listing_status);

-- Replace (category, name) uniqueness: allow duplicates for partner-owned vehicles.
do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'vehicles_category_name_key'
      and conrelid = 'public.vehicles'::regclass
  ) then
    alter table public.vehicles drop constraint vehicles_category_name_key;
  end if;
end $$;

create unique index if not exists vehicles_category_name_rivercity_key
  on public.vehicles(category, name)
  where owner_user_id is null;

-- Owner profiles (manual payouts)
create table if not exists public.owner_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  bank_account_name text,
  bank_name text,
  bank_account_number text,
  bank_branch text,
  payout_notes text,
  insurance_ack_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Owner-controlled unavailability blocks
create table if not exists public.vehicle_unavailability (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  reason text,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  constraint vehicle_unavailability_dates_check check (end_date > start_date)
);

create index if not exists vehicle_unavailability_vehicle_id_idx on public.vehicle_unavailability(vehicle_id);
create index if not exists vehicle_unavailability_dates_idx on public.vehicle_unavailability(start_date, end_date);

-- Bookings: completion tracking
alter table public.bookings
  add column if not exists completed_at timestamptz;

-- Booking items: snapshot price + owner at booking time
alter table public.booking_items
  add column if not exists unit_price_per_day numeric,
  add column if not exists vehicle_owner_user_id uuid;

create index if not exists booking_items_owner_idx on public.booking_items(vehicle_owner_user_id);

-- Payout ledger (manual payouts)
create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  owner_user_id uuid not null references public.owner_profiles(user_id) on delete cascade,
  gross_amount numeric not null,
  platform_fee_amount numeric not null,
  net_amount numeric not null,
  eligible_at timestamptz not null,
  status text not null default 'pending',
  paid_at timestamptz,
  payment_reference text,
  created_at timestamptz not null default now(),
  constraint payouts_status_check check (status in ('pending','eligible','paid'))
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'payouts_booking_owner_key'
      and conrelid = 'public.payouts'::regclass
  ) then
    alter table public.payouts
      add constraint payouts_booking_owner_key unique (booking_id, owner_user_id);
  end if;
end $$;

create index if not exists payouts_owner_idx on public.payouts(owner_user_id);
create index if not exists payouts_status_idx on public.payouts(status);
create index if not exists payouts_eligible_at_idx on public.payouts(eligible_at);

-- Update availability RPC to respect unavailability + listing_status.
create or replace function public.get_vehicle_availability(
  p_start_date date,
  p_end_date date
)
returns table(
  vehicle_id uuid,
  available_count integer
)
language sql
stable
security definer
set search_path = public
as $$
  select
    v.id as vehicle_id,
    case
      when v.active is not true then 0
      when v.listing_status <> 'approved' then 0
      when exists (
        select 1
        from public.vehicle_unavailability u
        where u.vehicle_id = v.id
          and u.start_date < p_end_date
          and u.end_date > p_start_date
      ) then 0
      else greatest(
        v.inventory_count - coalesce(sum(bi.quantity) filter (where b.id is not null), 0),
        0
      )::integer
    end as available_count
  from public.vehicles v
  left join public.booking_items bi
    on bi.vehicle_id = v.id
  left join public.bookings b
    on b.id = bi.booking_id
   and b.status in ('pending', 'confirmed')
   and b.start_date < p_end_date
   and b.end_date > p_start_date
  group by v.id, v.inventory_count, v.active, v.listing_status;
$$;

-- Update create_booking RPC: reject unapproved/unavailable vehicles + snapshot owner/price.
create or replace function public.create_booking(
  p_start_date date,
  p_end_date date,
  p_items jsonb,
  p_intake jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_booking_id uuid;
  v_item jsonb;
  v_vehicle_id uuid;
  v_qty integer;
  v_inventory integer;
  v_used integer;
  v_price numeric;
  v_price_week numeric;
  v_price_month numeric;
  v_days integer;
  v_base_total numeric;
  v_best_total numeric;
  v_effective_daily numeric;
  v_owner uuid;
begin
  if p_start_date is null or p_end_date is null then
    raise exception 'start_date and end_date are required';
  end if;

  if p_end_date <= p_start_date then
    raise exception 'end_date must be after start_date';
  end if;

  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'At least one vehicle item is required';
  end if;

  insert into public.bookings (user_id, start_date, end_date, status, intake)
  values (auth.uid(), p_start_date, p_end_date, 'pending', coalesce(p_intake, '{}'::jsonb))
  returning id into v_booking_id;

  v_days := (p_end_date - p_start_date);

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_vehicle_id := nullif(v_item->>'vehicle_id', '')::uuid;
    v_qty := nullif(v_item->>'quantity', '')::integer;

    if v_vehicle_id is null then
      raise exception 'vehicle_id is required for each item';
    end if;

    if v_qty is null or v_qty <= 0 then
      raise exception 'quantity must be > 0 for each item';
    end if;

    -- Serialize booking creation per vehicle model to avoid overbooking races.
    perform pg_advisory_xact_lock(hashtext(v_vehicle_id::text), 0);

    select v.inventory_count, v.price_per_day, v.price_per_week, v.price_per_month, v.owner_user_id
      into v_inventory, v_price, v_price_week, v_price_month, v_owner
      from public.vehicles v
     where v.id = v_vehicle_id
       and v.active = true
       and v.listing_status = 'approved';

    if not found then
      raise exception 'Vehicle % is not available for booking', v_vehicle_id;
    end if;

    if exists (
      select 1
      from public.vehicle_unavailability u
      where u.vehicle_id = v_vehicle_id
        and u.start_date < p_end_date
        and u.end_date > p_start_date
    ) then
      raise exception 'Vehicle is unavailable for requested dates';
    end if;

    select coalesce(sum(bi.quantity), 0)
      into v_used
      from public.booking_items bi
      join public.bookings b on b.id = bi.booking_id
     where bi.vehicle_id = v_vehicle_id
       and b.status in ('pending', 'confirmed')
       and b.start_date < p_end_date
       and b.end_date > p_start_date;

    if v_used + v_qty > v_inventory then
      raise exception 'Not enough availability for requested dates';
    end if;

    -- Best rate (daily vs weekly vs monthly) for the chosen duration.
    v_base_total := case when v_price is null then null else v_price * v_days end;
    v_best_total := v_base_total;

    if v_price_week is not null then
      if v_best_total is null or v_price_week < v_best_total then
        v_best_total := v_price_week;
      end if;
    end if;

    if v_price_month is not null then
      if v_best_total is null or v_price_month < v_best_total then
        v_best_total := v_price_month;
      end if;
    end if;

    if v_best_total is null then
      raise exception 'Vehicle pricing is not configured';
    end if;

    v_effective_daily := v_best_total / v_days;

    insert into public.booking_items (booking_id, vehicle_id, quantity, unit_price_per_day, vehicle_owner_user_id)
    values (v_booking_id, v_vehicle_id, v_qty, v_effective_daily, v_owner);
  end loop;

  return v_booking_id;
end;
$$;

grant execute on function public.get_vehicle_availability(date, date) to anon, authenticated;
grant execute on function public.create_booking(date, date, jsonb, jsonb) to anon, authenticated;

-- Admin RPCs
create or replace function public.submit_vehicle_for_approval(p_vehicle_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.vehicles
     set listing_status = 'submitted',
         submitted_at = now(),
         rejected_at = null,
         rejection_reason = null
   where id = p_vehicle_id
     and owner_user_id = auth.uid()
     and listing_status in ('draft','rejected');

  if not found then
    raise exception 'Vehicle not found or cannot be submitted';
  end if;
end;
$$;

create or replace function public.approve_vehicle_listing(
  p_vehicle_id uuid,
  p_price_per_day numeric,
  p_price_per_week numeric default null,
  p_price_per_month numeric default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_admin() is not true then
    raise exception 'admin only';
  end if;

  if p_price_per_day is null or p_price_per_day <= 0 then
    raise exception 'price_per_day must be > 0';
  end if;

  if p_price_per_week is not null and p_price_per_week <= 0 then
    raise exception 'price_per_week must be null or > 0';
  end if;

  if p_price_per_month is not null and p_price_per_month <= 0 then
    raise exception 'price_per_month must be null or > 0';
  end if;

  update public.vehicles
     set price_per_day = p_price_per_day,
         price_per_week = p_price_per_week,
         price_per_month = p_price_per_month,
         inventory_count = 1,
         active = true,
         listing_status = 'approved',
         approved_at = now(),
         rejected_at = null,
         rejection_reason = null
   where id = p_vehicle_id
     and owner_user_id is not null;

  if not found then
    raise exception 'Vehicle not found or not a partner listing';
  end if;
end;
$$;

create or replace function public.reject_vehicle_listing(
  p_vehicle_id uuid,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_admin() is not true then
    raise exception 'admin only';
  end if;

  update public.vehicles
     set active = false,
         price_per_day = null,
         price_per_week = null,
         price_per_month = null,
         listing_status = 'rejected',
         rejected_at = now(),
         rejection_reason = p_reason
   where id = p_vehicle_id
     and owner_user_id is not null;

  if not found then
    raise exception 'Vehicle not found or not a partner listing';
  end if;
end;
$$;

create or replace function public.set_booking_status(
  p_booking_id uuid,
  p_status public.booking_status
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_admin() is not true then
    raise exception 'admin only';
  end if;

  update public.bookings
     set status = p_status,
         completed_at = case when p_status = 'completed' then coalesce(completed_at, now()) else completed_at end
   where id = p_booking_id;

  if not found then
    raise exception 'Booking not found';
  end if;
end;
$$;

create or replace function public.complete_booking_and_create_payouts(p_booking_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_start date;
  v_end date;
  v_days integer;
  v_completed_at timestamptz;
begin
  if public.is_admin() is not true then
    raise exception 'admin only';
  end if;

  select b.start_date, b.end_date
    into v_start, v_end
    from public.bookings b
   where b.id = p_booking_id;

  if not found then
    raise exception 'Booking not found';
  end if;

  v_days := (v_end - v_start);
  if v_days <= 0 then
    raise exception 'Invalid booking dates';
  end if;

  update public.bookings
     set status = 'completed',
         completed_at = coalesce(completed_at, now())
   where id = p_booking_id
   returning completed_at into v_completed_at;

  -- One payout per owner per booking.
  insert into public.payouts (
    booking_id,
    owner_user_id,
    gross_amount,
    platform_fee_amount,
    net_amount,
    eligible_at,
    status
  )
  select
    p_booking_id as booking_id,
    bi.vehicle_owner_user_id as owner_user_id,
    sum((bi.unit_price_per_day * v_days) * bi.quantity) as gross_amount,
    sum((bi.unit_price_per_day * v_days) * bi.quantity) * 0.30 as platform_fee_amount,
    sum((bi.unit_price_per_day * v_days) * bi.quantity) * 0.70 as net_amount,
    (v_completed_at + interval '7 days') as eligible_at,
    'pending' as status
  from public.booking_items bi
  where bi.booking_id = p_booking_id
    and bi.vehicle_owner_user_id is not null
  group by bi.vehicle_owner_user_id
  on conflict do nothing;
end;
$$;

create or replace function public.mark_payout_paid(
  p_payout_id uuid,
  p_payment_reference text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_admin() is not true then
    raise exception 'admin only';
  end if;

  update public.payouts
     set status = 'paid',
         paid_at = now(),
         payment_reference = p_payment_reference
   where id = p_payout_id;

  if not found then
    raise exception 'Payout not found';
  end if;
end;
$$;

grant execute on function public.submit_vehicle_for_approval(uuid) to authenticated;
grant execute on function public.approve_vehicle_listing(uuid, numeric) to authenticated;
grant execute on function public.reject_vehicle_listing(uuid, text) to authenticated;
grant execute on function public.set_booking_status(uuid, public.booking_status) to authenticated;
grant execute on function public.complete_booking_and_create_payouts(uuid) to authenticated;
grant execute on function public.mark_payout_paid(uuid, text) to authenticated;

-- RLS
alter table public.owner_profiles enable row level security;
alter table public.vehicle_unavailability enable row level security;
alter table public.payouts enable row level security;

-- Vehicles policies (replace public read + add owner access)
drop policy if exists "vehicles_public_read" on public.vehicles;
create policy "vehicles_public_read"
on public.vehicles
for select
to anon, authenticated
using (active = true and listing_status = 'approved');

drop policy if exists "vehicles_owner_read" on public.vehicles;
create policy "vehicles_owner_read"
on public.vehicles
for select
to authenticated
using (owner_user_id = auth.uid());

drop policy if exists "vehicles_owner_insert" on public.vehicles;
create policy "vehicles_owner_insert"
on public.vehicles
for insert
to authenticated
with check (
  owner_user_id = auth.uid()
  and listing_status = 'draft'
  and inventory_count = 1
  and active is false
  and price_per_day is null
);

drop policy if exists "vehicles_owner_update" on public.vehicles;
create policy "vehicles_owner_update"
on public.vehicles
for update
to authenticated
using (
  owner_user_id = auth.uid()
  and listing_status in ('draft','rejected')
)
with check (
  owner_user_id = auth.uid()
  and listing_status in ('draft','rejected')
  and inventory_count = 1
  and active is false
  and price_per_day is null
);

-- Owner profiles
drop policy if exists "owner_profiles_owner_manage" on public.owner_profiles;
create policy "owner_profiles_owner_manage"
on public.owner_profiles
for all
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

-- Unavailability
drop policy if exists "vehicle_unavailability_owner_manage" on public.vehicle_unavailability;
create policy "vehicle_unavailability_owner_manage"
on public.vehicle_unavailability
for all
to authenticated
using (
  exists (
    select 1
    from public.vehicles v
    where v.id = vehicle_unavailability.vehicle_id
      and v.owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.vehicles v
    where v.id = vehicle_unavailability.vehicle_id
      and v.owner_user_id = auth.uid()
  )
);

drop policy if exists "vehicle_unavailability_admin_manage" on public.vehicle_unavailability;
create policy "vehicle_unavailability_admin_manage"
on public.vehicle_unavailability
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Payouts
drop policy if exists "payouts_owner_read" on public.payouts;
create policy "payouts_owner_read"
on public.payouts
for select
to authenticated
using (owner_user_id = auth.uid() or public.is_admin());

drop policy if exists "payouts_admin_manage" on public.payouts;
create policy "payouts_admin_manage"
on public.payouts
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Bookings: allow admin to update status via client if needed (RPC already exists).
drop policy if exists "bookings_admin_manage" on public.bookings;
create policy "bookings_admin_manage"
on public.bookings
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "booking_items_admin_manage" on public.booking_items;
create policy "booking_items_admin_manage"
on public.booking_items
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
