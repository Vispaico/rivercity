import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

const safeNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const PartnerPortalPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [schemaMissing, setSchemaMissing] = useState(false);

  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    bank_account_name: '',
    bank_name: '',
    bank_account_number: '',
    bank_branch: '',
    payout_notes: '',
  });
  const [insuranceAck, setInsuranceAck] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const [vehicles, setVehicles] = useState([]);
  const [savingVehicle, setSavingVehicle] = useState(false);
  const [submittingVehicleId, setSubmittingVehicleId] = useState(null);

  const [newVehicle, setNewVehicle] = useState({
    category: 'motorbike',
    name: '',
    description: '',
    image_url: '',
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const [unavailability, setUnavailability] = useState([]);
  const [block, setBlock] = useState({
    vehicle_id: '',
    start_date: '',
    end_date: '',
    reason: '',
  });
  const [savingBlock, setSavingBlock] = useState(false);
  const [deletingBlockId, setDeletingBlockId] = useState(null);

  const [payouts, setPayouts] = useState([]);
  const [loadingPayouts, setLoadingPayouts] = useState(false);

  const myApprovedVehicles = useMemo(
    () => vehicles.filter((v) => v.listing_status === 'approved' && v.active),
    [vehicles]
  );

  const fetchAll = async () => {
    if (!supabase || !user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setSchemaMissing(false);

    const [profileRes, vehiclesRes] = await Promise.all([
      supabase.from('owner_profiles').select('*').eq('user_id', user.id).maybeSingle(),
      supabase
        .from('vehicles')
        .select(
          'id, category, name, description, image_url, active, listing_status, submitted_at, approved_at, rejected_at, rejection_reason, price_per_day, created_at'
        )
        .eq('owner_user_id', user.id)
        .order('created_at', { ascending: false }),
    ]);

    const maybeSchemaError = profileRes.error?.message || vehiclesRes.error?.message;
    if (maybeSchemaError && /relation .* does not exist|column .* does not exist/i.test(maybeSchemaError)) {
      setSchemaMissing(true);
      setLoading(false);
      return;
    }

    if (profileRes.error) {
      toast({ title: 'Could not load payout profile', description: profileRes.error.message, variant: 'destructive' });
    } else if (profileRes.data) {
      setProfile({
        full_name: profileRes.data.full_name || '',
        phone: profileRes.data.phone || '',
        bank_account_name: profileRes.data.bank_account_name || '',
        bank_name: profileRes.data.bank_name || '',
        bank_account_number: profileRes.data.bank_account_number || '',
        bank_branch: profileRes.data.bank_branch || '',
        payout_notes: profileRes.data.payout_notes || '',
      });
      setInsuranceAck(Boolean(profileRes.data.insurance_ack_at));
    }

    if (vehiclesRes.error) {
      toast({ title: 'Could not load your vehicles', description: vehiclesRes.error.message, variant: 'destructive' });
      setVehicles([]);
    } else {
      setVehicles(vehiclesRes.data || []);
      setBlock((p) => {
        if (p.vehicle_id) return p;
        const firstApproved = (vehiclesRes.data || []).find((v) => v.listing_status === 'approved' && v.active);
        return { ...p, vehicle_id: firstApproved?.id || '' };
      });
    }

    const vehicleIds = (vehiclesRes.data || []).map((v) => v.id).filter(Boolean);
    if (vehicleIds.length === 0) {
      setUnavailability([]);
    } else {
      const { data: blocksData, error: blocksError } = await supabase
        .from('vehicle_unavailability')
        .select('id, vehicle_id, start_date, end_date, reason, created_at')
        .in('vehicle_id', vehicleIds)
        .order('start_date', { ascending: true });
      if (blocksError) {
        if (/relation .* does not exist|column .* does not exist/i.test(blocksError.message)) {
          setSchemaMissing(true);
          setLoading(false);
          return;
        }
        toast({ title: 'Could not load availability blocks', description: blocksError.message, variant: 'destructive' });
        setUnavailability([]);
      } else {
        setUnavailability(blocksData || []);
      }
    }

    setLoading(false);
  };

  const fetchPayouts = async () => {
    if (!supabase || !user) return;
    setLoadingPayouts(true);

    const { data, error } = await supabase
      .from('payouts')
      .select('id, booking_id, gross_amount, platform_fee_amount, net_amount, eligible_at, status, paid_at, payment_reference, created_at')
      .eq('owner_user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      if (/relation .* does not exist/i.test(error.message)) {
        setSchemaMissing(true);
      } else {
        toast({ title: 'Could not load payouts', description: error.message, variant: 'destructive' });
      }
      setPayouts([]);
    } else {
      setPayouts(data || []);
    }

    setLoadingPayouts(false);
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    fetchPayouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const saveProfile = async () => {
    if (!supabase || !user) return;
    setSavingProfile(true);

    const payload = {
      user_id: user.id,
      full_name: profile.full_name || null,
      phone: profile.phone || null,
      bank_account_name: profile.bank_account_name || null,
      bank_name: profile.bank_name || null,
      bank_account_number: profile.bank_account_number || null,
      bank_branch: profile.bank_branch || null,
      payout_notes: profile.payout_notes || null,
      insurance_ack_at: insuranceAck ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('owner_profiles').upsert(payload, { onConflict: 'user_id' });
    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Saved', description: 'Payout details updated.', className: 'bg-blue-500 text-white' });
    }

    setSavingProfile(false);
  };

  const createVehicle = async () => {
    if (!supabase || !user) return;
    const name = newVehicle.name.trim();
    if (!name) {
      toast({ title: 'Name required', description: 'Enter a vehicle name.', variant: 'destructive' });
      return;
    }
    if (!insuranceAck) {
      toast({
        title: 'Insurance required',
        description: 'Please confirm you have the required insurance before submitting vehicles.',
        variant: 'destructive',
      });
      return;
    }

    // Ensure owner profile exists so payouts can be created later.
    const { error: profileError } = await supabase.from('owner_profiles').upsert(
      {
        user_id: user.id,
        full_name: profile.full_name || null,
        phone: profile.phone || null,
        bank_account_name: profile.bank_account_name || null,
        bank_name: profile.bank_name || null,
        bank_account_number: profile.bank_account_number || null,
        bank_branch: profile.bank_branch || null,
        payout_notes: profile.payout_notes || null,
        insurance_ack_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );
    if (profileError) {
      toast({ title: 'Could not save payout profile', description: profileError.message, variant: 'destructive' });
      return;
    }

    setSavingVehicle(true);
    const { error } = await supabase.from('vehicles').insert([
      {
        owner_user_id: user.id,
        category: newVehicle.category,
        name,
        description: newVehicle.description.trim() || null,
        image_url: newVehicle.image_url.trim() || null,
        inventory_count: 1,
        active: false,
        listing_status: 'draft',
        price_per_day: null,
      },
    ]);

    if (error) {
      toast({ title: 'Create failed', description: error.message, variant: 'destructive' });
      setSavingVehicle(false);
      return;
    }

    toast({ title: 'Created', description: 'Vehicle saved as draft.', className: 'bg-blue-500 text-white' });
    setNewVehicle({ category: 'motorbike', name: '', description: '', image_url: '' });
    await fetchAll();
    setSavingVehicle(false);
  };

  const uploadImageFile = async (file) => {
    if (!supabase || !user) return;
    if (!file) return;

    if (!file.type?.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please choose an image.', variant: 'destructive' });
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please upload an image up to 8MB.', variant: 'destructive' });
      return;
    }

    setUploadingImage(true);
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw new Error('You must be signed in to upload images.');
      }

      const signRes = await fetch('/api/cloudinary-sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({}),
      });

      if (!signRes.ok) {
        const payload = await signRes.json().catch(() => null);
        throw new Error(payload?.error || 'Could not prepare upload.');
      }

      const { cloudName, apiKey, folder, timestamp, signature } = await signRes.json();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', String(timestamp));
      formData.append('signature', signature);
      formData.append('folder', folder);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const uploadPayload = await uploadRes.json().catch(() => null);
      if (!uploadRes.ok) {
        throw new Error(uploadPayload?.error?.message || 'Upload failed.');
      }

      if (!uploadPayload?.secure_url) {
        throw new Error('Upload failed (missing URL).');
      }

      setNewVehicle((p) => ({ ...p, image_url: uploadPayload.secure_url }));
      toast({ title: 'Uploaded', description: 'Image uploaded successfully.', className: 'bg-blue-500 text-white' });
    } catch (err) {
      toast({ title: 'Upload failed', description: err?.message || 'Please try again.', variant: 'destructive' });
    } finally {
      setUploadingImage(false);
    }
  };

  const submitForApproval = async (vehicleId) => {
    if (!supabase) return;
    setSubmittingVehicleId(vehicleId);
    const { error } = await supabase.rpc('submit_vehicle_for_approval', { p_vehicle_id: vehicleId });
    if (error) {
      toast({ title: 'Submit failed', description: error.message, variant: 'destructive' });
      setSubmittingVehicleId(null);
      return;
    }
    toast({ title: 'Submitted', description: 'We will review and set pricing.', className: 'bg-blue-500 text-white' });
    await fetchAll();
    setSubmittingVehicleId(null);
  };

  const addBlock = async () => {
    if (!supabase || !user) return;
    if (!block.vehicle_id) {
      toast({ title: 'Choose a vehicle', description: 'Select a vehicle first.', variant: 'destructive' });
      return;
    }
    if (!block.start_date || !block.end_date) {
      toast({ title: 'Dates required', description: 'Select a start and end date.', variant: 'destructive' });
      return;
    }
    if (block.end_date <= block.start_date) {
      toast({ title: 'Invalid dates', description: 'End date must be after start date.', variant: 'destructive' });
      return;
    }

    setSavingBlock(true);
    const { error } = await supabase.from('vehicle_unavailability').insert([
      {
        vehicle_id: block.vehicle_id,
        start_date: block.start_date,
        end_date: block.end_date,
        reason: block.reason.trim() || null,
        created_by: user.id,
      },
    ]);

    if (error) {
      toast({ title: 'Could not save block', description: error.message, variant: 'destructive' });
      setSavingBlock(false);
      return;
    }

    toast({ title: 'Saved', description: 'Availability updated.', className: 'bg-blue-500 text-white' });
    setBlock((p) => ({ ...p, start_date: '', end_date: '', reason: '' }));
    await fetchAll();
    setSavingBlock(false);
  };

  const deleteBlock = async (id) => {
    if (!supabase) return;
    setDeletingBlockId(id);
    const { error } = await supabase.from('vehicle_unavailability').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Removed', description: 'Block deleted.', className: 'bg-blue-500 text-white' });
      await fetchAll();
    }
    setDeletingBlockId(null);
  };

  return (
    <div className="bg-gray-50">
      <PageHeader
        title="Partner Portal"
        subtitle="List your vehicle, manage availability, and track payouts."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Dashboard', link: '/dashboard' }, { name: 'Partner Portal' }]}
      />

      <main className="container mx-auto px-4 py-12 space-y-6">
        {!supabase && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Supabase not configured</CardTitle>
              <CardDescription>Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable the partner portal.</CardDescription>
            </CardHeader>
          </Card>
        )}

        {supabase && schemaMissing && (
          <Card className="shadow-lg border border-yellow-200">
            <CardHeader>
              <CardTitle>Marketplace schema not installed</CardTitle>
              <CardDescription>
                Run <code>supabase/partner_marketplace_schema.sql</code> in the Supabase SQL editor, then refresh this page.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {supabase && !schemaMissing && (
          <Tabs defaultValue="vehicles" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-white shadow-sm">
              <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
            </TabsList>

            <TabsContent value="vehicles" className="mt-6 space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Payout details (bank transfer)</CardTitle>
                  <CardDescription>
                    We pay 70% to the owner, 7 days after the rental is completed. Owners are responsible for insurance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full name</Label>
                    <Input id="full_name" value={profile.full_name} onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="bank_account_name">Bank account name</Label>
                    <Input
                      id="bank_account_name"
                      value={profile.bank_account_name}
                      onChange={(e) => setProfile((p) => ({ ...p, bank_account_name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank_name">Bank name</Label>
                    <Input id="bank_name" value={profile.bank_name} onChange={(e) => setProfile((p) => ({ ...p, bank_name: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="bank_account_number">Bank account number</Label>
                    <Input
                      id="bank_account_number"
                      value={profile.bank_account_number}
                      onChange={(e) => setProfile((p) => ({ ...p, bank_account_number: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank_branch">Branch (optional)</Label>
                    <Input id="bank_branch" value={profile.bank_branch} onChange={(e) => setProfile((p) => ({ ...p, bank_branch: e.target.value }))} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="payout_notes">Notes (optional)</Label>
                    <Textarea
                      id="payout_notes"
                      value={profile.payout_notes}
                      onChange={(e) => setProfile((p) => ({ ...p, payout_notes: e.target.value }))}
                      placeholder="Anything we should know about payouts"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm text-gray-800">
                      <input
                        type="checkbox"
                        checked={insuranceAck}
                        onChange={(e) => setInsuranceAck(e.target.checked)}
                      />
                      I confirm I have the insurance required to rent out this vehicle.
                    </label>
                    <Button type="button" onClick={saveProfile} disabled={savingProfile} className="bg-blue-600 hover:bg-blue-700">
                      {savingProfile ? 'Saving…' : 'Save'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Add a vehicle</CardTitle>
                  <CardDescription>We review and set the rental price. Drafts are not visible publicly.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new_category">Category</Label>
                    <select
                      id="new_category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newVehicle.category}
                      onChange={(e) => setNewVehicle((p) => ({ ...p, category: e.target.value }))}
                    >
                      <option value="motorbike">Motorbike</option>
                      <option value="car">Car</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="new_name">Vehicle name</Label>
                    <Input
                      id="new_name"
                      value={newVehicle.name}
                      onChange={(e) => setNewVehicle((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Honda Airblade 2020"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="new_desc">Description (optional)</Label>
                    <Textarea
                      id="new_desc"
                      value={newVehicle.description}
                      onChange={(e) => setNewVehicle((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Condition, transmission, extras, etc."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Vehicle image (optional)</Label>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                      <div>
                        <label className="text-sm text-gray-700">Upload image</label>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingImage}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            if (file) void uploadImageFile(file);
                            e.target.value = '';
                          }}
                          className="mt-1 block w-full text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">PNG/JPG/WebP up to 8MB.</p>
                      </div>

                      <div>
                        <Label htmlFor="new_image">Or paste image URL</Label>
                        <Input
                          id="new_image"
                          value={newVehicle.image_url}
                          onChange={(e) => setNewVehicle((p) => ({ ...p, image_url: e.target.value }))}
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    {newVehicle.image_url ? (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">Preview</p>
                        <img
                          src={newVehicle.image_url}
                          alt="Vehicle preview"
                          className="h-24 w-40 object-cover rounded-md border"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="md:col-span-2 flex gap-3">
                    <Button type="button" onClick={createVehicle} disabled={savingVehicle || uploadingImage} className="bg-blue-600 hover:bg-blue-700">
                      {savingVehicle ? 'Saving…' : 'Create draft'}
                    </Button>
                    <Button type="button" variant="outline" onClick={fetchAll} disabled={loading}>
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>My vehicles</CardTitle>
                  <CardDescription>{loading ? 'Loading…' : `${vehicles.length} total`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vehicles.length === 0 && <p className="text-gray-700">No vehicles yet.</p>}

                  {vehicles.map((v) => (
                    <div key={v.id} className="p-4 bg-white border rounded-lg space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-900">{v.name}</p>
                          <p className="text-sm text-gray-600 capitalize">{v.category}</p>
                          <p className="text-xs text-gray-500">Status: <span className="font-semibold">{v.listing_status}</span></p>
                          {v.rejection_reason ? <p className="text-xs text-red-600">Reason: {v.rejection_reason}</p> : null}
                        </div>
                        <div className="text-sm text-gray-700">
                          {v.price_per_day ? <p><span className="font-semibold">Price:</span> ${safeNumber(v.price_per_day)}/day</p> : <p className="text-gray-500">Price: pending</p>}
                          <p className={v.active ? 'text-green-700 font-semibold' : 'text-gray-600 font-semibold'}>{v.active ? 'Active' : 'Inactive'}</p>
                        </div>
                      </div>

                      {v.description ? <p className="text-sm text-gray-700">{v.description}</p> : null}

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          type="button"
                          onClick={() => submitForApproval(v.id)}
                          disabled={submittingVehicleId === v.id || !['draft', 'rejected'].includes(v.listing_status)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {submittingVehicleId === v.id ? 'Submitting…' : 'Submit for approval'}
                        </Button>
                        <Button type="button" variant="outline" onClick={fetchAll} disabled={loading}>
                          Refresh
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="mt-6 space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Block dates (owner-controlled availability)</CardTitle>
                  <CardDescription>Blocked dates make your vehicle unavailable for customer bookings.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2">
                    <Label htmlFor="block_vehicle">Vehicle</Label>
                    <select
                      id="block_vehicle"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={block.vehicle_id}
                      onChange={(e) => setBlock((p) => ({ ...p, vehicle_id: e.target.value }))}
                    >
                      <option value="">Select…</option>
                      {myApprovedVehicles.map((v) => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </select>
                    {myApprovedVehicles.length === 0 ? (
                      <p className="text-xs text-gray-500 mt-1">You’ll be able to block dates after a vehicle is approved and active.</p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="block_start">Start</Label>
                    <Input id="block_start" type="date" value={block.start_date} onChange={(e) => setBlock((p) => ({ ...p, start_date: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="block_end">End</Label>
                    <Input id="block_end" type="date" value={block.end_date} onChange={(e) => setBlock((p) => ({ ...p, end_date: e.target.value }))} />
                  </div>
                  <div className="md:col-span-4">
                    <Label htmlFor="block_reason">Reason (optional)</Label>
                    <Input id="block_reason" value={block.reason} onChange={(e) => setBlock((p) => ({ ...p, reason: e.target.value }))} placeholder="Maintenance, personal use, etc." />
                  </div>
                  <div className="md:col-span-4 flex gap-3">
                    <Button type="button" onClick={addBlock} disabled={savingBlock || !block.vehicle_id} className="bg-blue-600 hover:bg-blue-700">
                      {savingBlock ? 'Saving…' : 'Add block'}
                    </Button>
                    <Button type="button" variant="outline" onClick={fetchAll} disabled={loading}>
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Existing blocks</CardTitle>
                  <CardDescription>{loading ? 'Loading…' : `${unavailability.length} total`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {unavailability.length === 0 ? <p className="text-gray-700">No blocks.</p> : null}
                  {unavailability.map((b) => {
                    const v = vehicles.find((x) => x.id === b.vehicle_id);
                    return (
                      <div key={b.id} className="p-4 bg-white border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">{v?.name || b.vehicle_id}</p>
                          <p className="text-gray-700">{b.start_date} → {b.end_date}</p>
                          {b.reason ? <p className="text-gray-500">{b.reason}</p> : null}
                        </div>
                        <Button type="button" variant="outline" onClick={() => deleteBlock(b.id)} disabled={deletingBlockId === b.id}>
                          {deletingBlockId === b.id ? 'Removing…' : 'Remove'}
                        </Button>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payouts" className="mt-6 space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Payouts</CardTitle>
                  <CardDescription>{loadingPayouts ? 'Loading…' : `${payouts.length} total`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-700">
                    <p>
                      Owner share: <span className="font-semibold">70%</span>. Eligible: <span className="font-semibold">7 days</span> after completion.
                    </p>
                  </div>

                  {payouts.length === 0 ? <p className="text-gray-700">No payouts yet.</p> : null}

                  {payouts.map((p) => (
                    <div key={p.id} className="p-4 bg-white border rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">Booking: <code className="break-all">{p.booking_id}</code></p>
                          <p className="text-gray-700">Status: <span className="font-semibold">{p.status}</span></p>
                          <p className="text-gray-700">Eligible at: <span className="font-semibold">{p.eligible_at}</span></p>
                          {p.paid_at ? <p className="text-green-700 font-semibold">Paid at: {p.paid_at}</p> : null}
                          {p.payment_reference ? <p className="text-gray-600">Ref: {p.payment_reference}</p> : null}
                        </div>
                        <div className="text-sm text-gray-800">
                          <p>Gross: <span className="font-semibold">${safeNumber(p.gross_amount)}</span></p>
                          <p>Fee (30%): <span className="font-semibold">${safeNumber(p.platform_fee_amount)}</span></p>
                          <p>Net (70%): <span className="font-semibold">${safeNumber(p.net_amount)}</span></p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={fetchPayouts} disabled={loadingPayouts}>
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
      <ContactSection />
    </div>
    
  );
};

export default PartnerPortalPage;
