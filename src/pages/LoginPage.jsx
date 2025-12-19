import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Smartphone, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, signInWithProvider, requestPasswordReset } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn({ email, password });
      if (error) throw error;
      toast({
        title: "Logged In!",
        description: "Welcome back!",
        className: "bg-green-500 text-white",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    try {
      const { error } = await signInWithProvider(provider);
      if (error) throw error;
      // Supabase handles redirection, so no navigate needed here usually
      // If successful, onAuthStateChange in AuthContext will update user state
    } catch (error) {
      toast({
        title: `${provider} Login Failed`,
        description: error.message || `Could not log in with ${provider}.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const nextEmail = (resetEmail || email).trim();
    if (!nextEmail) {
      toast({
        title: "Email required",
        description: "Enter the email address you used to register.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await requestPasswordReset(nextEmail);
      if (error) throw error;
      toast({
        title: "Reset link sent",
        description: "Check your email for a password reset link.",
        className: "bg-green-500 text-white",
      });
      setShowForgot(false);
    } catch (error) {
      toast({
        title: "Could not send reset link",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Log In to Your Account"
        subtitle="Welcome back! Access your dashboard and manage your rentals."
        breadcrumbs={[{ name: "Home", link: "/" }, { name: "Log In" }]}
      />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 lg:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4 flex justify-center">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back!</CardTitle>
              <CardDescription>Enter your credentials to log in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:underline"
                    onClick={() => {
                      setShowForgot((v) => !v);
                      setResetEmail((resetEmail || email).trim());
                    }}
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                  Log In
                </Button>
              </form>

              {showForgot && (
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm font-semibold text-gray-900">Reset your password</p>
                  <p className="text-sm text-gray-600 mt-1">
                    We can’t send your current password, but we can email you a link to create a new one.
                  </p>
                  <form onSubmit={handlePasswordReset} className="mt-3 space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="reset_email">Email</Label>
                      <Input
                        id="reset_email"
                        type="email"
                        placeholder="you@example.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <Button type="submit" variant="outline" className="w-full" disabled={loading}>
                      {loading ? "Sending…" : "Send password reset link"}
                    </Button>
                    <p className="text-xs text-gray-500">
                      You’ll be sent a secure link to <Link to="/reset-password" className="text-blue-600 hover:underline">reset your password</Link>.
                    </p>
                  </form>
                </div>
              )}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" onClick={() => handleSocialLogin("google")} disabled={loading}>
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                  Google
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin("facebook")} disabled={loading}>
                 <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
                  Facebook
                </Button>
                <Button variant="outline" disabled>
                  <Smartphone className="mr-2 h-4 w-4" /> Sign in with Phone (Coming Soon)
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </motion.section>
    </div>
  );
};

export default LoginPage;