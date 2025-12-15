import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addDays, differenceInCalendarDays } from 'date-fns';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const toLocalDateInputValue = (date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
};

const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(`${dateStr}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
};

const groupByCategory = (vehicles) => {
  return vehicles.reduce(
    (acc, v) => {
      const key = v.category || 'other';
      acc[key] = acc[key] || [];
      acc[key].push(v);
      return acc;
    },
    /** @type {Record<string, any[]>} */ ({})
  );
};

const BookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillVehicleName = (searchParams.get('vehicle') || '').trim();

  const { toast } = useToast();

  const [startDate, setStartDate] = useState(() => toLocalDateInputValue(new Date()));
  const [endDate, setEndDate] = useState(() => toLocalDateInputValue(addDays(new Date(), 1)));

  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);

  const [availability, setAvailability] = useState({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const [quantities, setQuantities] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [prefillApplied, setPrefillApplied] = useState(false);

  const [intake, setIntake] = useState({
    full_name: '',
    phone: '',
    email: '',
    address: '',
    passport_number: '',
    contact_channels: {
      whatsapp: false,
      zalo: false,
      wechat: false,
      fb_messenger: false,
      none: true,
    },
    notes: '',
  });

  const start = useMemo(() => parseLocalDate(startDate), [startDate]);
  const end = useMemo(() => parseLocalDate(endDate), [endDate]);
  const dayCount = useMemo(() => {
    if (!start || !end) return 0;
    return differenceInCalendarDays(end, start);
  }, [start, end]);

  const selectedItems = useMemo(() => {
    return Object.entries(quantities)
      .map(([vehicleId, qty]) => ({ vehicleId, qty: Number(qty) || 0 }))
      .filter((x) => x.qty > 0);
  }, [quantities]);

  const totalSelectedQty = useMemo(
    () => selectedItems.reduce((sum, x) => sum + x.qty, 0),
    [selectedItems]
  );

  const vehiclesById = useMemo(() => {
    const map = {};
    for (const v of vehicles) map[v.id] = v;
    return map;
  }, [vehicles]);

  const groupedVehicles = useMemo(() => groupByCategory(vehicles), [vehicles]);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!supabase) {
        setLoadingVehicles(false);
        return;
      }

      setLoadingVehicles(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('id, category, name, description, image_url, price_per_day, inventory_count, active, sort_order')
        .eq('active', true)
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });

      if (error) {
        toast({
          title: 'Could not load vehicles',
          description: error.message,
          variant: 'destructive',
        });
        setVehicles([]);
      } else {
        setVehicles(data || []);
      }

      setLoadingVehicles(false);
    };

    fetchVehicles();
  }, [toast]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!supabase) return;
      if (!startDate || !endDate) return;
      if (!start || !end || dayCount <= 0) {
        setAvailability({});
        return;
      }

      setLoadingAvailability(true);
      const { data, error } = await supabase.rpc('get_vehicle_availability', {
        p_start_date: startDate,
        p_end_date: endDate,
      });

      if (error) {
        toast({
          title: 'Could not check availability',
          description: error.message,
          variant: 'destructive',
        });
        setAvailability({});
      } else {
        const map = {};
        for (const row of data || []) {
          map[row.vehicle_id] = row.available_count;
        }
        setAvailability(map);

        setQuantities((prev) => {
          const next = { ...prev };
          for (const [vehicleId, avail] of Object.entries(map)) {
            const current = Number(next[vehicleId] || 0);
            const clamped = Math.max(0, Math.min(current, Number(avail) || 0));
            if (clamped !== current) next[vehicleId] = clamped;
          }
          return next;
        });
      }

      setLoadingAvailability(false);
    };

    fetchAvailability();
  }, [dayCount, end, endDate, start, startDate, toast]);

  useEffect(() => {
    if (prefillApplied) return;
    if (!prefillVehicleName) return;
    if (!vehicles.length) return;

    const match = vehicles.find((v) => v.name?.toLowerCase().includes(prefillVehicleName.toLowerCase()));
    if (!match) {
      setPrefillApplied(true);
      return;
    }

    setQuantities((prev) => {
      if (Object.values(prev).some((x) => Number(x) > 0)) return prev;
      return { ...prev, [match.id]: 1 };
    });

    setPrefillApplied(true);
  }, [prefillApplied, prefillVehicleName, vehicles]);

  const setQty = (vehicleId, nextQty) => {
    const avail = Number(availability[vehicleId] ?? 0);
    const parsed = Number(nextQty);
    const safe = Number.isFinite(parsed) ? parsed : 0;
    const clamped = Math.max(0, Math.min(safe, avail));
    setQuantities((prev) => ({ ...prev, [vehicleId]: clamped }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supabase) {
      toast({
        title: 'Booking is not configured',
        description: 'Supabase credentials are missing.',
        variant: 'destructive',
      });
      return;
    }

    if (!start || !end || dayCount <= 0) {
      toast({
        title: 'Invalid dates',
        description: 'Please select a start date and an end date (end must be after start).',
        variant: 'destructive',
      });
      return;
    }

    if (!intake.full_name.trim() || !intake.phone.trim()) {
      toast({
        title: 'Missing contact details',
        description: 'Please enter your name and phone number.',
        variant: 'destructive',
      });
      return;
    }

    if (!intake.address.trim()) {
      toast({
        title: 'Missing address',
        description: 'Please enter your resident or hotel address.',
        variant: 'destructive',
      });
      return;
    }

    if (!intake.passport_number.trim()) {
      toast({
        title: 'Missing passport number',
        description: 'Please enter your passport number.',
        variant: 'destructive',
      });
      return;
    }

    if (selectedItems.length === 0) {
      toast({
        title: 'No vehicles selected',
        description: 'Please select at least 1 vehicle.',
        variant: 'destructive',
      });
      return;
    }

    const items = selectedItems.map((x) => ({ vehicle_id: x.vehicleId, quantity: x.qty }));

    const selectedChannels = Object.entries(intake.contact_channels)
      .filter(([k, v]) => k !== 'none' && Boolean(v))
      .map(([k]) => k);

    const intakePayload = {
      full_name: intake.full_name,
      phone: intake.phone,
      email: intake.email,
      address: intake.address,
      passport_number: intake.passport_number,
      contact_channels: selectedChannels,
      contact_channels_none: intake.contact_channels.none || selectedChannels.length === 0,
      notes: intake.notes,
    };

    setSubmitting(true);
    const { data, error } = await supabase.rpc('create_booking', {
      p_start_date: startDate,
      p_end_date: endDate,
      p_items: items,
      p_intake: intakePayload,
    });

    if (error) {
      toast({
        title: 'Booking failed',
        description: error.message,
        variant: 'destructive',
      });
      setSubmitting(false);
      return;
    }

    toast({
      title: 'Booking received',
      description: 'We have received your request and will confirm shortly.',
      className: 'bg-blue-500 text-white',
    });

    const bookingId = data;
    navigate(`/book/success/${bookingId}`);
  };

  return (
    <div className="bg-gray-50">
      <PageHeader
        title="Book a Motorbike or Car"
        subtitle="Select dates, choose your vehicles, and send your booking request."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Book' }]}
      />

      <main className="container mx-auto px-4 py-12">
        {!supabase && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Booking is not available</CardTitle>
              <CardDescription>
                Supabase is not configured. Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {supabase && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>1) Choose your dates</CardTitle>
                  <CardDescription>Dates are treated as: pickup on start date, return on end date.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_date">Start date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_date">End date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 text-sm text-gray-700">
                    {dayCount > 0 ? (
                      <span>
                        Rental duration: <span className="font-semibold">{dayCount}</span> day{dayCount === 1 ? '' : 's'}
                      </span>
                    ) : (
                      <span className="text-red-600">Please select a valid date range (end date must be after start date).</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>2) Select vehicles</CardTitle>
                  <CardDescription>
                    {loadingVehicles
                      ? 'Loading vehicles…'
                      : loadingAvailability
                        ? 'Checking availability…'
                        : 'Choose quantities (limited by availability).'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {!loadingVehicles && vehicles.length === 0 && (
                    <p className="text-gray-700">No vehicles found. Add records to the <code>vehicles</code> table.</p>
                  )}

                  {Object.entries(groupedVehicles).map(([category, list]) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {list.map((v) => {
                          const avail = Number(availability[v.id] ?? 0);
                          const qty = Number(quantities[v.id] ?? 0);
                          const disableQty = !start || !end || dayCount <= 0 || loadingAvailability;

                          return (
                            <Card key={v.id} className="border border-gray-200">
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-start gap-4">
                                  {v.image_url ? (
                                    <img
                                      src={v.image_url}
                                      alt={v.name}
                                      className="h-16 w-24 object-cover rounded-md border"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div className="h-16 w-24 rounded-md border bg-gray-100" />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="font-semibold text-gray-900">{v.name}</p>
                                      {typeof v.price_per_day === 'number' || v.price_per_day ? (
                                        <p className="text-sm text-gray-700">${Number(v.price_per_day)}/day</p>
                                      ) : null}
                                    </div>
                                    {v.description ? (
                                      <p className="text-sm text-gray-600 mt-1">{v.description}</p>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                  <div className="text-sm">
                                    <span className="text-gray-600">Available: </span>
                                    <span className={avail > 0 ? 'font-semibold text-green-700' : 'font-semibold text-gray-700'}>
                                      {loadingAvailability || !start || !end || dayCount <= 0 ? '—' : avail}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Label htmlFor={`qty_${v.id}`} className="text-sm text-gray-700">Qty</Label>
                                    <Input
                                      id={`qty_${v.id}`}
                                      type="number"
                                      min={0}
                                      max={avail}
                                      value={qty}
                                      disabled={disableQty}
                                      onChange={(e) => setQty(v.id, e.target.value)}
                                      className="w-24"
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>3) Your details</CardTitle>
                  <CardDescription>We’ll contact you to confirm. Payment is cash on arrival.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full name</Label>
                    <Input
                      id="full_name"
                      value={intake.full_name}
                      onChange={(e) => setIntake((p) => ({ ...p, full_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      value={intake.phone}
                      onChange={(e) => setIntake((p) => ({ ...p, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={intake.email}
                      onChange={(e) => setIntake((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passport_number">Passport number</Label>
                    <Input
                      id="passport_number"
                      value={intake.passport_number}
                      onChange={(e) => setIntake((p) => ({ ...p, passport_number: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Resident or hotel address</Label>
                    <Textarea
                      id="address"
                      value={intake.address}
                      onChange={(e) => setIntake((p) => ({ ...p, address: e.target.value }))}
                      placeholder="Hotel name + room, or full address"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Contact apps (optional)</Label>
                    <p className="text-xs text-gray-500 mt-1">Select any you use, or choose “None of these”.</p>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: 'whatsapp', label: 'WhatsApp' },
                        { key: 'zalo', label: 'Zalo' },
                        { key: 'wechat', label: 'WeChat' },
                        { key: 'fb_messenger', label: 'Facebook Messenger' },
                      ].map((opt) => (
                        <label key={opt.key} className="flex items-center gap-2 text-sm text-gray-800">
                          <Checkbox
                            checked={Boolean(intake.contact_channels[opt.key])}
                            onCheckedChange={(checked) => {
                              const nextChecked = checked === true;
                              setIntake((p) => {
                                const next = {
                                  ...p,
                                  contact_channels: { ...p.contact_channels },
                                };

                                next.contact_channels[opt.key] = nextChecked;
                                if (nextChecked) next.contact_channels.none = false;
                                return next;
                              });
                            }}
                          />
                          {opt.label}
                        </label>
                      ))}

                      <label className="flex items-center gap-2 text-sm text-gray-800">
                        <Checkbox
                          checked={Boolean(intake.contact_channels.none)}
                          onCheckedChange={(checked) => {
                            const nextChecked = checked === true;
                            setIntake((p) => {
                              if (!nextChecked) {
                                return {
                                  ...p,
                                  contact_channels: { ...p.contact_channels, none: false },
                                };
                              }
                              return {
                                ...p,
                                contact_channels: {
                                  whatsapp: false,
                                  zalo: false,
                                  wechat: false,
                                  fb_messenger: false,
                                  none: true,
                                },
                              };
                            });
                          }}
                        />
                        None of these
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      value={intake.notes}
                      onChange={(e) => setIntake((p) => ({ ...p, notes: e.target.value }))}
                      placeholder="Pickup details, license info, delivery request, etc."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>Review before submitting.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Dates</span>
                      <span className="font-medium">{startDate} → {endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="font-medium">{dayCount > 0 ? `${dayCount} day${dayCount === 1 ? '' : 's'}` : '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total vehicles</span>
                      <span className="font-medium">{totalSelectedQty}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    {selectedItems.length === 0 ? (
                      <p className="text-sm text-gray-600">No vehicles selected yet.</p>
                    ) : (
                      <ul className="space-y-2">
                        {selectedItems.map((x) => (
                          <li key={x.vehicleId} className="flex justify-between text-sm">
                            <span className="text-gray-800">{vehiclesById[x.vehicleId]?.name || 'Vehicle'}</span>
                            <span className="font-medium">× {x.qty}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button
                    type="submit"
                    disabled={submitting || loadingVehicles || loadingAvailability || dayCount <= 0 || totalSelectedQty <= 0}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {submitting ? 'Submitting…' : 'Submit booking request'}
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">
                    By submitting, you agree we can contact you to confirm availability.
                  </p>
                </div>
              </Card>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default BookingPage;
