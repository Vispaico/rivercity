import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const safeNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const isEligible = (eligibleAt) => {
  if (!eligibleAt) return false;
  const d = new Date(eligibleAt);
  return Number.isFinite(d.getTime()) && d.getTime() <= Date.now();
};

const DashboardMarketplacePage = () => {
  const { toast } = useToast();
  const [schemaMissing, setSchemaMissing] = useState(false);

  const [loadingListings, setLoadingListings] = useState(true);
  const [listings, setListings] = useState([]);
  const [priceDayById, setPriceDayById] = useState({});
  const [priceWeekById, setPriceWeekById] = useState({});
  const [priceMonthById, setPriceMonthById] = useState({});
  const [approvingId, setApprovingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReasonById, setRejectReasonById] = useState({});

  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [updatingBookingId, setUpdatingBookingId] = useState(null);

  const [loadingPayouts, setLoadingPayouts] = useState(true);
  const [payouts, setPayouts] = useState([]);
  const [markingPaidId, setMarkingPaidId] = useState(null);
  const [paymentRefById, setPaymentRefById] = useState({});

  const submittedListings = useMemo(() => listings.filter((x) => x.listing_status === 'submitted'), [listings]);

  const fetchListings = async () => {
    if (!supabase) {
      setLoadingListings(false);
      return;
    }
    setLoadingListings(true);
    const { data, error } = await supabase
      .from('vehicles')
      .select('id, category, name, description, image_url, owner_user_id, listing_status, submitted_at, approved_at, rejected_at, rejection_reason, price_per_day, price_per_week, price_per_month, active, created_at')
      .not('owner_user_id', 'is', null)
      .order('submitted_at', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      if (/column .* does not exist|relation .* does not exist/i.test(error.message)) {
        setSchemaMissing(true);
      }
      toast({ title: 'Could not load partner listings', description: error.message, variant: 'destructive' });
      setListings([]);
    } else {
      setSchemaMissing(false);
      setListings(data || []);
      setPriceDayById((prev) => {
        const next = { ...prev };
        for (const v of data || []) {
          if (next[v.id] === undefined) next[v.id] = v.price_per_day ?? '';
        }
        return next;
      });
      setPriceWeekById((prev) => {
        const next = { ...prev };
        for (const v of data || []) {
          if (next[v.id] === undefined) next[v.id] = v.price_per_week ?? '';
        }
        return next;
      });
      setPriceMonthById((prev) => {
        const next = { ...prev };
        for (const v of data || []) {
          if (next[v.id] === undefined) next[v.id] = v.price_per_month ?? '';
        }
        return next;
      });
    }

    setLoadingListings(false);
  };

  const fetchBookings = async () => {
    if (!supabase) {
      setLoadingBookings(false);
      return;
    }
    setLoadingBookings(true);
    const { data, error } = await supabase
      .from('bookings')
      .select(
        'id, start_date, end_date, status, created_at, completed_at, intake, booking_items(id, quantity, unit_price_per_day, vehicle_owner_user_id, vehicles(id, name, category, owner_user_id))'
      )
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      if (/column .* does not exist|relation .* does not exist/i.test(error.message)) {
        setSchemaMissing(true);
      }
      toast({ title: 'Could not load bookings', description: error.message, variant: 'destructive' });
      setBookings([]);
    } else {
      setSchemaMissing(false);
      setBookings(data || []);
    }
    setLoadingBookings(false);
  };

  const fetchPayouts = async () => {
    if (!supabase) {
      setLoadingPayouts(false);
      return;
    }
    setLoadingPayouts(true);
    const { data, error } = await supabase
      .from('payouts')
      .select(
        'id, booking_id, owner_user_id, gross_amount, platform_fee_amount, net_amount, eligible_at, status, paid_at, payment_reference, created_at, owner_profiles(full_name, phone, bank_account_name, bank_name, bank_account_number, bank_branch, payout_notes)'
      )
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      if (/relation .* does not exist/i.test(error.message)) {
        setSchemaMissing(true);
      }
      toast({ title: 'Could not load payouts', description: error.message, variant: 'destructive' });
      setPayouts([]);
    } else {
      setSchemaMissing(false);
      setPayouts(data || []);
      setPaymentRefById((prev) => {
        const next = { ...prev };
        for (const p of data || []) {
          if (next[p.id] === undefined) next[p.id] = p.payment_reference ?? '';
        }
        return next;
      });
    }
    setLoadingPayouts(false);
  };

  useEffect(() => {
    fetchListings();
    fetchBookings();
    fetchPayouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approve = async (vehicleId) => {
    if (!supabase) return;
    const dayRaw = priceDayById[vehicleId];
    const weekRaw = priceWeekById[vehicleId];
    const monthRaw = priceMonthById[vehicleId];

    const priceDay = safeNumber(dayRaw);
    const priceWeek = safeNumber(weekRaw);
    const priceMonth = safeNumber(monthRaw);

    if (!priceDay || priceDay <= 0) {
      toast({ title: 'Price required', description: 'Enter a valid price/day.', variant: 'destructive' });
      return;
    }

    if (priceWeek !== null && priceWeek <= 0) {
      toast({ title: 'Weekly price invalid', description: 'Weekly price must be blank or greater than 0.', variant: 'destructive' });
      return;
    }

    if (priceMonth !== null && priceMonth <= 0) {
      toast({ title: 'Monthly price invalid', description: 'Monthly price must be blank or greater than 0.', variant: 'destructive' });
      return;
    }
    setApprovingId(vehicleId);
    const { error } = await supabase.rpc('approve_vehicle_listing', {
      p_vehicle_id: vehicleId,
      p_price_per_day: priceDay,
      p_price_per_week: priceWeek,
      p_price_per_month: priceMonth,
    });
    if (error) {
      toast({ title: 'Approve failed', description: error.message, variant: 'destructive' });
      setApprovingId(null);
      return;
    }
    toast({ title: 'Approved', description: 'Listing is now public & bookable.', className: 'bg-blue-500 text-white' });
    await fetchListings();
    setApprovingId(null);
  };

  const reject = async (vehicleId) => {
    if (!supabase) return;
    setRejectingId(vehicleId);
    const reason = (rejectReasonById[vehicleId] || '').trim() || null;
    const { error } = await supabase.rpc('reject_vehicle_listing', { p_vehicle_id: vehicleId, p_reason: reason });
    if (error) {
      toast({ title: 'Reject failed', description: error.message, variant: 'destructive' });
      setRejectingId(null);
      return;
    }
    toast({ title: 'Rejected', description: 'Owner can edit and resubmit.', className: 'bg-blue-500 text-white' });
    await fetchListings();
    setRejectingId(null);
  };

  const setBookingStatus = async (bookingId, status) => {
    if (!supabase) return;
    setUpdatingBookingId(bookingId);
    const { error } = await supabase.rpc('set_booking_status', { p_booking_id: bookingId, p_status: status });
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Updated', description: `Booking marked ${status}.`, className: 'bg-blue-500 text-white' });
      await fetchBookings();
    }
    setUpdatingBookingId(null);
  };

  const completeAndCreatePayouts = async (bookingId) => {
    if (!supabase) return;
    setUpdatingBookingId(bookingId);
    const { error } = await supabase.rpc('complete_booking_and_create_payouts', { p_booking_id: bookingId });
    if (error) {
      toast({ title: 'Complete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Completed', description: 'Payouts created (eligible in 7 days).', className: 'bg-blue-500 text-white' });
      await Promise.all([fetchBookings(), fetchPayouts()]);
    }
    setUpdatingBookingId(null);
  };

  const markPaid = async (payoutId) => {
    if (!supabase) return;
    setMarkingPaidId(payoutId);
    const ref = (paymentRefById[payoutId] || '').trim() || null;
    const { error } = await supabase.rpc('mark_payout_paid', { p_payout_id: payoutId, p_payment_reference: ref });
    if (error) {
      toast({ title: 'Mark paid failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Paid', description: 'Payout marked as paid.', className: 'bg-blue-500 text-white' });
      await fetchPayouts();
    }
    setMarkingPaidId(null);
  };

  return (
    <div className="bg-gray-50">
      <PageHeader
        title="Marketplace Admin"
        subtitle="Approve partner listings, manage bookings, and track manual payouts."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Dashboard', link: '/dashboard' }, { name: 'Marketplace' }]}
      />

      <main className="container mx-auto px-4 py-12 space-y-6">
        {!supabase && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Supabase not configured</CardTitle>
              <CardDescription>Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable marketplace admin tools.</CardDescription>
            </CardHeader>
          </Card>
        )}

        {supabase && schemaMissing && (
          <Card className="shadow-lg border border-yellow-200">
            <CardHeader>
              <CardTitle>Marketplace schema not installed</CardTitle>
              <CardDescription>
                Run <code>supabase/partner_marketplace_schema.sql</code> in the Supabase SQL editor, then refresh.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {supabase && !schemaMissing && (
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-white shadow-sm">
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="mt-6 space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Submitted listings</CardTitle>
                  <CardDescription>{loadingListings ? 'Loading…' : `${submittedListings.length} submitted`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {submittedListings.length === 0 ? <p className="text-gray-700">No pending submissions.</p> : null}

                  {submittedListings.map((v) => (
                    <div key={v.id} className="p-4 bg-white border rounded-lg space-y-3">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div className="flex gap-4">
                          {v.image_url ? (
                            <img src={v.image_url} alt={v.name} className="h-16 w-24 object-cover rounded-md border" loading="lazy" />
                          ) : (
                            <div className="h-16 w-24 rounded-md border bg-gray-100" />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{v.name}</p>
                            <p className="text-sm text-gray-600 capitalize">{v.category}</p>
                            <p className="text-xs text-gray-500">Owner: <code className="break-all">{v.owner_user_id}</code></p>
                            {v.description ? <p className="text-sm text-gray-700 mt-1">{v.description}</p> : null}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                          <div>
                            <Label htmlFor={`price_${v.id}`}>Price/day (USD)</Label>
                            <Input
                              id={`price_${v.id}`}
                              type="number"
                              min={0}
                              value={priceDayById[v.id] ?? ''}
                              onChange={(e) => setPriceDayById((p) => ({ ...p, [v.id]: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`price_week_${v.id}`}>Price/week (USD)</Label>
                            <Input
                              id={`price_week_${v.id}`}
                              type="number"
                              min={0}
                              value={priceWeekById[v.id] ?? ''}
                              onChange={(e) => setPriceWeekById((p) => ({ ...p, [v.id]: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`price_month_${v.id}`}>Price/month (USD)</Label>
                            <Input
                              id={`price_month_${v.id}`}
                              type="number"
                              min={0}
                              value={priceMonthById[v.id] ?? ''}
                              onChange={(e) => setPriceMonthById((p) => ({ ...p, [v.id]: e.target.value }))}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button type="button" onClick={() => approve(v.id)} disabled={approvingId === v.id} className="bg-blue-600 hover:bg-blue-700 w-full">
                              {approvingId === v.id ? 'Approving…' : 'Approve'}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <Label htmlFor={`reject_${v.id}`}>Reject reason (optional)</Label>
                          <Textarea
                            id={`reject_${v.id}`}
                            value={rejectReasonById[v.id] ?? ''}
                            onChange={(e) => setRejectReasonById((p) => ({ ...p, [v.id]: e.target.value }))}
                            placeholder="What needs to be fixed before approval?"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button type="button" variant="outline" onClick={() => reject(v.id)} disabled={rejectingId === v.id}>
                            {rejectingId === v.id ? 'Rejecting…' : 'Reject'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={fetchListings} disabled={loadingListings}>
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>All partner listings</CardTitle>
                  <CardDescription>{loadingListings ? 'Loading…' : `${listings.length} total`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {listings.map((v) => (
                    <div key={v.id} className="p-4 bg-white border rounded-lg flex flex-col sm:flex-row sm:justify-between gap-2">
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900">{v.name}</p>
                        <p className="text-gray-600 capitalize">{v.category} · <span className="font-semibold">{v.listing_status}</span></p>
                        {v.rejection_reason ? <p className="text-red-600">Reason: {v.rejection_reason}</p> : null}
                      </div>
                      <div className="text-sm text-gray-800">
                        <p>Price/day: <span className="font-semibold">{v.price_per_day ? `$${safeNumber(v.price_per_day)}` : '—'}</span></p>
                        <p>Price/week: <span className="font-semibold">{v.price_per_week ? `$${safeNumber(v.price_per_week)}` : '—'}</span></p>
                        <p>Price/month: <span className="font-semibold">{v.price_per_month ? `$${safeNumber(v.price_per_month)}` : '—'}</span></p>
                        <p className={v.active ? 'text-green-700 font-semibold' : 'text-gray-600 font-semibold'}>{v.active ? 'Active' : 'Inactive'}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="mt-6 space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Recent bookings</CardTitle>
                  <CardDescription>{loadingBookings ? 'Loading…' : `${bookings.length} shown`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bookings.map((b) => (
                    <div key={b.id} className="p-4 bg-white border rounded-lg space-y-3">
                      <div className="flex flex-col md:flex-row md:justify-between gap-3">
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">Booking <code className="break-all">{b.id}</code></p>
                          <p className="text-gray-700">{b.start_date} → {b.end_date}</p>
                          <p className="text-gray-700">Status: <span className="font-semibold">{b.status}</span></p>
                          {b.completed_at ? <p className="text-green-700 font-semibold">Completed at: {b.completed_at}</p> : null}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button type="button" variant="outline" onClick={() => setBookingStatus(b.id, 'confirmed')} disabled={updatingBookingId === b.id}>
                            Confirm
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setBookingStatus(b.id, 'cancelled')} disabled={updatingBookingId === b.id}>
                            Cancel
                          </Button>
                          <Button type="button" onClick={() => completeAndCreatePayouts(b.id)} disabled={updatingBookingId === b.id} className="bg-blue-600 hover:bg-blue-700">
                            {updatingBookingId === b.id ? 'Working…' : 'Complete + create payouts'}
                          </Button>
                        </div>
                      </div>

                      <div className="text-sm text-gray-800">
                        <p className="font-semibold">Items</p>
                        <ul className="mt-2 space-y-1">
                          {(b.booking_items || []).map((it) => {
                            const v = it.vehicles;
                            const isPartner = Boolean(v?.owner_user_id);
                            return (
                              <li key={it.id} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                <span>
                                  {v?.name || it.vehicle_id} × {it.quantity} {isPartner ? '(Partner)' : '(Rivercity)'}
                                </span>
                                {it.unit_price_per_day ? <span>${safeNumber(it.unit_price_per_day)}/day</span> : <span className="text-gray-500">price snapshot missing</span>}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={fetchBookings} disabled={loadingBookings}>
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payouts" className="mt-6 space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Manual payouts</CardTitle>
                  <CardDescription>{loadingPayouts ? 'Loading…' : `${payouts.length} shown`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {payouts.length === 0 ? <p className="text-gray-700">No payouts yet.</p> : null}

                  {payouts.map((p) => (
                    <div key={p.id} className="p-4 bg-white border rounded-lg space-y-3">
                      <div className="flex flex-col md:flex-row md:justify-between gap-3">
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">Payout <code className="break-all">{p.id}</code></p>
                          <p className="text-gray-700">Booking: <code className="break-all">{p.booking_id}</code></p>
                          <p className="text-gray-700">Status: <span className="font-semibold">{p.status}</span></p>
                          <p className={isEligible(p.eligible_at) ? 'text-green-700 font-semibold' : 'text-gray-700'}>
                            Eligible at: {p.eligible_at}
                          </p>
                          {p.paid_at ? <p className="text-green-700 font-semibold">Paid at: {p.paid_at}</p> : null}
                        </div>
                        <div className="text-sm text-gray-800">
                          <p>Gross: <span className="font-semibold">${safeNumber(p.gross_amount)}</span></p>
                          <p>Fee (30%): <span className="font-semibold">${safeNumber(p.platform_fee_amount)}</span></p>
                          <p>Net (70%): <span className="font-semibold">${safeNumber(p.net_amount)}</span></p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-sm text-gray-800">
                          <p className="font-semibold">Owner payout details</p>
                          <p>Name: {p.owner_profiles?.full_name || '—'}</p>
                          <p>Phone: {p.owner_profiles?.phone || '—'}</p>
                          <p>Bank: {p.owner_profiles?.bank_name || '—'}</p>
                          <p>Account name: {p.owner_profiles?.bank_account_name || '—'}</p>
                          <p>Account number: {p.owner_profiles?.bank_account_number || '—'}</p>
                          {p.owner_profiles?.bank_branch ? <p>Branch: {p.owner_profiles.bank_branch}</p> : null}
                          {p.owner_profiles?.payout_notes ? <p className="text-gray-600">Notes: {p.owner_profiles.payout_notes}</p> : null}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`payref_${p.id}`}>Payment reference (optional)</Label>
                          <Input
                            id={`payref_${p.id}`}
                            value={paymentRefById[p.id] ?? ''}
                            onChange={(e) => setPaymentRefById((prev) => ({ ...prev, [p.id]: e.target.value }))}
                            placeholder="Bank transfer reference"
                          />
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              onClick={() => markPaid(p.id)}
                              disabled={markingPaidId === p.id || p.status === 'paid'}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              {markingPaidId === p.id ? 'Saving…' : 'Mark paid'}
                            </Button>
                            <Button type="button" variant="outline" onClick={fetchPayouts} disabled={loadingPayouts}>
                              Refresh
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default DashboardMarketplacePage;
