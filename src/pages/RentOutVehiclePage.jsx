import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const pct = (n) => `${Math.round(n * 100)}%`;

const RentOutVehiclePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [vehicleNotes, setVehicleNotes] = useState('');

  const ownerShare = 0.7;
  const platformShare = 0.3;

  const example = useMemo(() => {
    const daily = 10;
    const days = 5;
    const gross = daily * days;
    return {
      daily,
      days,
      gross,
      owner: Number((gross * ownerShare).toFixed(2)),
      fee: Number((gross * platformShare).toFixed(2)),
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }
    if (!agreedToTerms) {
      toast({ title: 'Error', description: 'You must agree to the terms and conditions.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            partner_interest: true,
            partner_vehicle_notes: vehicleNotes,
          },
        },
      });
      if (error) throw error;
      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account, then log in and open the Partner Portal.',
        className: 'bg-green-500 text-white',
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Signup failed',
        description: error.message || 'Could not create your account.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Rent Out Your Motorbike or Car | Rivercity Partners</title>
        <meta
          name="description"
          content="Turn your unused car or motorbike into extra income. List with Rivercity, control your availability, and get paid 70% by bank transfer (7 days after completion)."
        />
        <link rel="canonical" href="https://www.rivercitybikerentals.com/rent-out" />
      </Helmet>

      <PageHeader
        title="Rent out your vehicle"
        subtitle="Turn idle days into extra income — you control availability, we bring renters and handle customer support."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Rent out your vehicle' }]}
      />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src="/haiphong-port-scenic-view.webp"
                      alt="Haiphong road scene"
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                    <div className="relative min-h-[320px] md:min-h-[360px] p-6 md:p-8 flex flex-col justify-end">
                      <p className="text-white/90 text-sm">Rivercity Partners</p>
                      <h2 className="text-white text-2xl md:text-3xl font-bold">Make your vehicle work for you</h2>
                      <p className="text-white/90 mt-2 max-w-2xl">
                        If your motorbike or car sits unused for days or weeks, you can list it on Rivercity.
                        We handle marketing and customer service, you keep <span className="font-semibold">{pct(ownerShare)}</span> of rental revenue.
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6 grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-4 rounded-lg bg-white border">
                        <p className="text-sm text-gray-500">Owner payout</p>
                        <p className="text-2xl font-bold text-gray-900">{pct(ownerShare)}</p>
                        <p className="text-xs text-gray-500 mt-1">Paid by bank transfer</p>
                      </div>
                      <div className="p-4 rounded-lg bg-white border">
                        <p className="text-sm text-gray-500">Platform fee</p>
                        <p className="text-2xl font-bold text-gray-900">{pct(platformShare)}</p>
                        <p className="text-xs text-gray-500 mt-1">Only when rented</p>
                      </div>
                      <div className="p-4 rounded-lg bg-white border">
                        <p className="text-sm text-gray-500">Payout timing</p>
                        <p className="text-2xl font-bold text-gray-900">+7 days</p>
                        <p className="text-xs text-gray-500 mt-1">After completion</p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-700">
                      <p className="font-semibold text-gray-900">How it works</p>
                      <ol className="mt-2 space-y-2 list-decimal list-inside">
                        <li>
                          <span className="font-semibold">Create your account</span> and open the Partner Portal.
                        </li>
                        <li>
                          <span className="font-semibold">Add your vehicle</span> (photos, details) and submit for approval.
                        </li>
                        <li>
                          <span className="font-semibold">We review it and set the rental price</span> so it stays competitive.
                        </li>
                        <li>
                          <span className="font-semibold">You control availability</span> by blocking dates anytime.
                        </li>
                        <li>
                          <span className="font-semibold">When it rents, you earn</span> {pct(ownerShare)}. We pay you by bank transfer 7 days after completion.
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Pricing & earnings</CardTitle>
                  <CardDescription>Simple split — no listing fees.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border bg-white">
                      <p className="font-semibold text-gray-900">Revenue split</p>
                      <p className="text-sm text-gray-700 mt-2">
                        Owner receives <span className="font-semibold">{pct(ownerShare)}</span>. Rivercity keeps{' '}
                        <span className="font-semibold">{pct(platformShare)}</span> for marketing, customer support, and operations.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-white">
                      <p className="font-semibold text-gray-900">Example</p>
                      <p className="text-sm text-gray-700 mt-2">
                        ${example.daily}/day × {example.days} days = <span className="font-semibold">${example.gross}</span>
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Owner: <span className="font-semibold">${example.owner}</span> · Fee: <span className="font-semibold">${example.fee}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Note: final pricing is set by Rivercity to keep bookings consistent across the platform.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                  <CardDescription>Clear answers before you list.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900">Do renters contact me directly?</p>
                    <p className="mt-1">
                      No — Rivercity handles renter communication and customer support. This keeps your privacy protected and prevents platform abuse.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Can I control my availability?</p>
                    <p className="mt-1">Yes. You can block dates anytime in the Partner Portal (maintenance, personal use, travel, etc.).</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Who sets the rental price?</p>
                    <p className="mt-1">Rivercity sets the daily price to stay competitive and maximize booking conversion.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">When do I get paid?</p>
                    <p className="mt-1">We pay by bank transfer 7 days after the rental is completed.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Insurance & responsibility</p>
                    <p className="mt-1">
                      Owners are responsible for having any necessary insurance. We will share clear guidelines before you publish.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">What vehicles are accepted?</p>
                    <p className="mt-1">Motorbikes and cars in good condition. We may reject listings that don’t meet safety/quality requirements.</p>
                  </div>
                </CardContent>
              </Card>

            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Ready to start?</CardTitle>
                    <CardDescription>If you already have an account, jump straight into the portal.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/dashboard/partner">Open Partner Portal</Link>
                    </Button>
                    <div className="text-center text-sm text-gray-700">
                      Or{' '}
                      <Link to="/login" className="font-medium text-blue-600 hover:underline">log in</Link>
                      {' '}to your existing account.
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-xl">
                  <CardHeader className="text-center">
                    <CardTitle>Let’s start</CardTitle>
                    <CardDescription>Create your account to list your vehicle.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="partner_name">Full name</Label>
                        <Input
                          id="partner_name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partner_email">Email</Label>
                        <Input
                          id="partner_email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partner_password">Password (min. 6 characters)</Label>
                        <Input
                          id="partner_password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partner_confirm">Confirm password</Label>
                        <Input
                          id="partner_confirm"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partner_notes">What do you want to list? (optional)</Label>
                        <Textarea
                          id="partner_notes"
                          value={vehicleNotes}
                          onChange={(e) => setVehicleNotes(e.target.value)}
                          placeholder="Example: 2× Honda Airblade, 1× Sedan. Condition, year, notes…"
                          disabled={loading}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="partner_terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} disabled={loading} />
                        <Label htmlFor="partner_terms" className="text-sm font-normal">
                          I agree to the{' '}
                          <Link to="/terms-of-use" className="font-medium text-blue-600 hover:underline">Terms of Use</Link>
                          {' '}and{' '}
                          <Link to="/privacy-policy" className="font-medium text-blue-600 hover:underline">Privacy Policy</Link>.
                        </Label>
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                        {loading ? 'Creating account…' : 'Create account'}
                      </Button>

                      <p className="text-xs text-gray-500">
                        After signup, verify your email and then log in to submit your first vehicle.
                      </p>
                    </form>

                    <div className="text-center text-sm text-gray-700">
                      Already have an account?{' '}
                      <Link to="/login" className="font-medium text-blue-600 hover:underline">Log in</Link>
                    </div>

                    <div className="text-xs text-gray-500">
                      Rivercity will review every listing before it goes live.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentOutVehiclePage;
