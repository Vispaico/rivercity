import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);

  const supabaseUnavailable = !supabase;

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let unsub;
    (async () => {
      const { data } = await supabase.auth.getSession();
      setHasSession(Boolean(data?.session));
      setLoading(false);
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(Boolean(session));
      setLoading(false);
    });
    unsub = authListener?.subscription;

    return () => {
      unsub?.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) return;

    const next = password.trim();
    if (next.length < 6) {
      toast({ title: 'Password too short', description: 'Use at least 6 characters.', variant: 'destructive' });
      return;
    }
    if (next !== confirm.trim()) {
      toast({ title: 'Passwords do not match', description: 'Please re-type your new password.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: next });
    if (error) {
      toast({ title: 'Could not reset password', description: error.message, variant: 'destructive' });
      setSaving(false);
      return;
    }

    toast({ title: 'Password updated', description: 'You can now continue using your account.', className: 'bg-green-500 text-white' });
    setSaving(false);
    navigate('/dashboard');
  };

  const canonicalUrl = useMemo(() => {
    if (typeof window === 'undefined') return 'https://www.rivercitybikerentals.com/reset-password';
    return `${window.location.origin}/reset-password`;
  }, []);

  return (
    <div>
      <Helmet>
        <title>Reset Password | Rivercity Bike Rentals</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <PageHeader
        title="Reset your password"
        subtitle="Choose a new password for your account."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Reset password' }]}
      />

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 flex justify-center">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Set a new password</CardTitle>
              <CardDescription>
                {supabaseUnavailable
                  ? 'Password reset is currently unavailable.'
                  : 'Enter and confirm your new password.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <p className="text-sm text-gray-600 text-center">Loading…</p>
              ) : supabaseUnavailable ? (
                <p className="text-sm text-gray-600 text-center">Supabase is not configured.</p>
              ) : !hasSession ? (
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    Please open the password reset link from your email. If the link expired, request a new one from the login page.
                  </p>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link to="/login">Back to login</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new_password">New password</Label>
                    <Input
                      id="new_password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm_password">Confirm new password</Label>
                    <Input
                      id="confirm_password"
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={saving}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={saving}>
                    {saving ? 'Updating…' : 'Update password'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordPage;
