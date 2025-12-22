import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { vehicleCatalog } from '@/lib/vehicleCatalog';

const DashboardVehiclesPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [catalogPresetKey, setCatalogPresetKey] = useState('');

  const catalogPresets = useMemo(() => {
    const all = [...(vehicleCatalog.motorbike || []), ...(vehicleCatalog.car || [])];
    return all
      .filter((v) => v?.category && v?.slug)
      .map((v) => ({
        key: `${v.category}:${v.slug}`,
        category: v.category,
        name: v.name,
        price_per_day: v.price ?? '',
        description: v.description ?? '',
        image_url: v.image ?? '',
      }));
  }, []);

  const [newVehicle, setNewVehicle] = useState({
    category: 'motorbike',
    name: '',
    description: '',
    image_url: '',
    price_per_day: '',
    inventory_count: '0',
    active: true,
  });

  const byCategory = useMemo(() => {
    return vehicles.reduce((acc, v) => {
      const key = v.category || 'other';
      acc[key] = acc[key] || [];
      acc[key].push(v);
      return acc;
    }, {});
  }, [vehicles]);

  const fetchVehicles = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('vehicles')
      .select('id, category, name, description, image_url, price_per_day, inventory_count, active, sort_order')
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      toast({ title: 'Failed to load vehicles', description: error.message, variant: 'destructive' });
      setVehicles([]);
    } else {
      setVehicles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateVehicle = async (id, patch) => {
    if (!supabase) return;
    setSavingId(id);
    const { error } = await supabase.from('vehicles').update(patch).eq('id', id);
    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Saved', description: 'Vehicle updated.', className: 'bg-blue-500 text-white' });
      await fetchVehicles();
    }
    setSavingId(null);
  };

  const createVehicle = async () => {
    if (!supabase) return;
    const name = newVehicle.name.trim();
    const description = newVehicle.description.trim();
    const imageUrl = newVehicle.image_url.trim();
    if (!name) {
      toast({ title: 'Name required', description: 'Enter a vehicle name.', variant: 'destructive' });
      return;
    }

    const inventory = Math.max(0, parseInt(newVehicle.inventory_count, 10) || 0);
    const price = newVehicle.price_per_day === '' ? null : Number(newVehicle.price_per_day);

    setSavingId('new');
    const baseRow = {
      category: newVehicle.category,
      name,
      description: description || null,
      image_url: imageUrl || null,
      inventory_count: inventory,
      price_per_day: Number.isFinite(price) ? price : null,
      active: Boolean(newVehicle.active),
    };

    // If the marketplace schema is installed, mark Rivercity fleet vehicles as approved by default.
    let { error } = await supabase.from('vehicles').insert([
      {
        ...baseRow,
        listing_status: 'approved',
      },
    ]);

    if (error && /column .*listing_status.* does not exist/i.test(error.message)) {
      ({ error } = await supabase.from('vehicles').insert([baseRow]));
    }

    if (error) {
      toast({ title: 'Create failed', description: error.message, variant: 'destructive' });
      setSavingId(null);
      return;
    }

    toast({ title: 'Created', description: 'Vehicle added.', className: 'bg-blue-500 text-white' });
    setCatalogPresetKey('');
    setNewVehicle({ category: 'motorbike', name: '', description: '', image_url: '', price_per_day: '', inventory_count: '0', active: true });
    await fetchVehicles();
    setSavingId(null);
  };

  return (
    <div className="bg-gray-50">
      <PageHeader
        title="Vehicle Inventory"
        subtitle="Set availability per vehicle model (inventory count)."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Dashboard', link: '/dashboard' }, { name: 'Vehicles' }]}
      />

      <main className="container mx-auto px-4 py-12 space-y-6">
        {!supabase && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Supabase not configured</CardTitle>
              <CardDescription>Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable inventory management.</CardDescription>
            </CardHeader>
          </Card>
        )}

        {supabase && (
          <>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Add a vehicle</CardTitle>
                <CardDescription>
                  This controls what shows on the booking page. You can also manage vehicles in Supabase Table Editor.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
                  <div>
                    <Label htmlFor="new_category">Category</Label>
                    <select
                      id="new_category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newVehicle.category}
                      onChange={(e) => {
                        setNewVehicle((p) => ({ ...p, category: e.target.value }));
                        setCatalogPresetKey('');
                      }}
                    >
                      <option value="motorbike">Motorbike</option>
                      <option value="car">Car</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="new_preset">From site catalog (optional)</Label>
                    <select
                      id="new_preset"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={catalogPresetKey}
                      onChange={(e) => {
                        const nextKey = e.target.value;
                        setCatalogPresetKey(nextKey);
                        const preset = catalogPresets.find((p) => p.key === nextKey);
                        if (!preset) return;

                        setNewVehicle((prev) => ({
                          ...prev,
                          category: preset.category,
                          name: preset.name,
                          description: preset.description,
                          image_url: preset.image_url,
                          price_per_day: String(preset.price_per_day ?? ''),
                          inventory_count: prev.inventory_count === '0' ? '1' : prev.inventory_count,
                          active: true,
                        }));
                      }}
                    >
                      <option value="">Select a model…</option>
                      {catalogPresets
                        .slice()
                        .sort((a, b) => `${a.category} ${a.name}`.localeCompare(`${b.category} ${b.name}`))
                        .map((p) => (
                          <option key={p.key} value={p.key}>
                            {p.category} — {p.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="new_name">Name</Label>
                    <Input
                      id="new_name"
                      value={newVehicle.name}
                      onChange={(e) => {
                        setNewVehicle((p) => ({ ...p, name: e.target.value }));
                        setCatalogPresetKey('');
                      }}
                      placeholder="e.g. Yamaha Exciter 150"
                    />
                  </div>

                  <div>
                    <Label htmlFor="new_inventory">Inventory</Label>
                    <Input
                      id="new_inventory"
                      type="number"
                      min={0}
                      value={newVehicle.inventory_count}
                      onChange={(e) => setNewVehicle((p) => ({ ...p, inventory_count: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="new_price">Price/day (USD)</Label>
                    <Input
                      id="new_price"
                      type="number"
                      min={0}
                      value={newVehicle.price_per_day}
                      onChange={(e) => setNewVehicle((p) => ({ ...p, price_per_day: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new_image_url">Image URL (optional)</Label>
                    <Input
                      id="new_image_url"
                      value={newVehicle.image_url}
                      onChange={(e) => setNewVehicle((p) => ({ ...p, image_url: e.target.value }))}
                      placeholder="https://... or /image.webp"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new_description">Short description (optional)</Label>
                    <Textarea
                      id="new_description"
                      value={newVehicle.description}
                      onChange={(e) => setNewVehicle((p) => ({ ...p, description: e.target.value }))}
                      rows={2}
                      placeholder="Shown on the booking page"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" onClick={createVehicle} disabled={savingId === 'new'} className="bg-blue-600 hover:bg-blue-700">
                    {savingId === 'new' ? 'Adding…' : 'Add vehicle'}
                  </Button>
                  <Button type="button" variant="outline" onClick={fetchVehicles} disabled={loading}>
                    Refresh
                  </Button>
                  <Button asChild variant="ghost">
                    <Link to="/book">View booking page</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Vehicles</CardTitle>
                <CardDescription>{loading ? 'Loading…' : `${vehicles.length} total`}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {Object.entries(byCategory).map(([category, list]) => (
                  <div key={category} className="space-y-3">
                    <h3 className="text-lg font-semibold capitalize">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {list.map((v) => (
                        <Card key={v.id} className="border border-gray-200">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-semibold text-gray-900">{v.name}</p>
                                <p className="text-sm text-gray-600">ID: <code className="break-all">{v.id}</code></p>
                              </div>
                              <div className="text-sm">
                                <span className={v.active ? 'text-green-700 font-semibold' : 'text-gray-600 font-semibold'}>
                                  {v.active ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor={`inv_${v.id}`}>Inventory</Label>
                                <Input
                                  id={`inv_${v.id}`}
                                  type="number"
                                  min={0}
                                  defaultValue={v.inventory_count ?? 0}
                                  onBlur={(e) => {
                                    const next = Math.max(0, parseInt(e.target.value, 10) || 0);
                                    if (next !== (v.inventory_count ?? 0)) {
                                      updateVehicle(v.id, { inventory_count: next });
                                    }
                                  }}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`price_${v.id}`}>Price/day</Label>
                                <Input
                                  id={`price_${v.id}`}
                                  type="number"
                                  min={0}
                                  defaultValue={v.price_per_day ?? ''}
                                  onBlur={(e) => {
                                    const raw = e.target.value;
                                    const next = raw === '' ? null : Number(raw);
                                    const current = v.price_per_day === null || v.price_per_day === undefined ? null : Number(v.price_per_day);
                                    const normalized = Number.isFinite(next) ? next : null;
                                    if (normalized !== current) {
                                      updateVehicle(v.id, { price_per_day: normalized });
                                    }
                                  }}
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <Button
                                type="button"
                                variant="outline"
                                disabled={savingId === v.id}
                                onClick={() => updateVehicle(v.id, { active: !v.active })}
                              >
                                {savingId === v.id ? 'Saving…' : v.active ? 'Deactivate' : 'Activate'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardVehiclesPage;
