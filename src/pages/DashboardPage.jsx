import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, Settings, LogOut, CalendarDays, Edit3, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";

const DashboardPage = () => {
  const { user, signOut, loading: authLoading, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [savingAccount, setSavingAccount] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setFullName(user?.user_metadata?.full_name || "");
    setPhone(user?.user_metadata?.phone || "");
  }, [user]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await signOut();
      if (error) throw error;
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        className: "bg-blue-500 text-white"
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: error.message || "Could not log you out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user?.user_metadata?.full_name || user?.email || 'Rider'}!`}
        subtitle="Manage your bookings, view history, and update your profile."
        breadcrumbs={[{ name: "Home", link: "/" }, { name: "Dashboard" }]}
      />
      <section className="pt-24 pb-16 lg:pb-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Card className="shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <CardHeader>
                  <CardTitle>Admin Tools</CardTitle>
                  <CardDescription className="text-blue-100">Access special management sections.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/dashboard/blog">
                      <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                        <Edit3 className="mr-2 h-4 w-4" /> Manage Blog Posts
                      </Button>
                    </Link>
                    <Link to="/dashboard/vehicles">
                      <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                        <CalendarDays className="mr-2 h-4 w-4" /> Manage Vehicle Inventory
                      </Button>
                    </Link>
                    <Link to="/dashboard/marketplace">
                      <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                        <Briefcase className="mr-2 h-4 w-4" /> Marketplace Admin
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Earn with your vehicle</CardTitle>
                <CardDescription>
                  List your car or motorbike on Rivercity. We set the rental price, pay you 70% by bank transfer, 7 days after completion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/dashboard/partner">
                  <Button className="bg-blue-600 hover:bg-blue-700">Open Partner Portal</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <Tabs defaultValue="bookings" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 h-auto p-2 mb-8 bg-white shadow-sm">
                <TabsTrigger value="bookings" className="py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow-md">
                  <CalendarDays className="mr-2 h-5 w-5" /> My Bookings
                </TabsTrigger>
                <TabsTrigger value="history" className="py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow-md">
                  <Briefcase className="mr-2 h-5 w-5" /> Rental History
                </TabsTrigger>
                <TabsTrigger value="profile" className="py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow-md">
                  <User className="mr-2 h-5 w-5" /> Profile
                </TabsTrigger>
                <TabsTrigger value="settings" className="py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow-md">
                  <Settings className="mr-2 h-5 w-5" /> Settings
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TabsContent value="bookings">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Current & Upcoming Bookings</CardTitle>
                    <CardDescription>Manage your active and future rentals.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">You have no upcoming bookings. <Link to="/motorbikes" className="text-blue-600 hover:underline">Book a new ride?</Link></p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Rental History</CardTitle>
                    <CardDescription>View your past rentals with us.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">Your rental history is empty.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>Update your personal information and preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <User className="h-10 w-10 text-blue-600" />
                        <div>
                            <p className="font-medium text-gray-800">{user?.user_metadata?.full_name || "N/A"}</p>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                     <Button variant="outline" disabled><Edit3 className="mr-2 h-4 w-4" /> Edit Profile (Coming Soon)</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription>Update your basic account details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Email</Label>
                          <Input value={user?.email || ""} disabled readOnly />
                        </div>
                        <div>
                          <Label>User ID</Label>
                          <Input value={user?.id || ""} disabled readOnly />
                        </div>
                        <div>
                          <Label htmlFor="account_full_name">Full name</Label>
                          <Input
                            id="account_full_name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Your name"
                            disabled={savingAccount}
                          />
                        </div>
                        <div>
                          <Label htmlFor="account_phone">Phone (optional)</Label>
                          <Input
                            id="account_phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+84..."
                            disabled={savingAccount}
                          />
                        </div>
                      </div>

                      <Button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={savingAccount || !supabase}
                        onClick={async () => {
                          if (!supabase) {
                            toast({ title: "Settings unavailable", description: "Supabase is not configured.", variant: "destructive" });
                            return;
                          }

                          setSavingAccount(true);
                          try {
                            const { error } = await supabase.auth.updateUser({
                              data: {
                                full_name: fullName.trim() || null,
                                phone: phone.trim() || null,
                              },
                            });
                            if (error) throw error;
                            toast({
                              title: "Saved",
                              description: "Your account details were updated.",
                              className: "bg-green-500 text-white",
                            });
                          } catch (error) {
                            toast({
                              title: "Could not update account",
                              description: error.message || "Please try again.",
                              variant: "destructive",
                            });
                          } finally {
                            setSavingAccount(false);
                          }
                        }}
                      >
                        {savingAccount ? "Saving…" : "Save changes"}
                      </Button>
                      {!supabase && <p className="text-sm text-gray-600">Account settings are unavailable because Supabase is not configured.</p>}
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>Change your password.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="new_password">New password</Label>
                          <Input
                            id="new_password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            disabled={savingPassword}
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirm_password">Confirm new password</Label>
                          <Input
                            id="confirm_password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            disabled={savingPassword}
                          />
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        disabled={savingPassword || !supabase}
                        onClick={async () => {
                          if (!supabase) {
                            toast({ title: "Password change unavailable", description: "Supabase is not configured.", variant: "destructive" });
                            return;
                          }

                          const next = newPassword.trim();
                          if (next.length < 6) {
                            toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" });
                            return;
                          }
                          if (next !== confirmPassword.trim()) {
                            toast({ title: "Passwords do not match", description: "Please re-type your new password.", variant: "destructive" });
                            return;
                          }

                          setSavingPassword(true);
                          try {
                            const { error } = await supabase.auth.updateUser({ password: next });
                            if (error) throw error;
                            toast({
                              title: "Password updated",
                              description: "Your password has been changed.",
                              className: "bg-green-500 text-white",
                            });
                            setNewPassword("");
                            setConfirmPassword("");
                          } catch (error) {
                            toast({
                              title: "Could not update password",
                              description: error.message || "Please try again.",
                              variant: "destructive",
                            });
                          } finally {
                            setSavingPassword(false);
                          }
                        }}
                      >
                        {savingPassword ? "Updating…" : "Update password"}
                      </Button>
                      <p className="text-xs text-gray-500">
                        If you can’t access your account, use <Link to="/login" className="text-blue-600 hover:underline">Forgot password</Link>.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Sign out</CardTitle>
                      <CardDescription>Log out of your account on this device.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={handleLogout} variant="destructive" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
                        Log Out
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;