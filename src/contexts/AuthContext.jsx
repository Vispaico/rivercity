import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      console.warn('Supabase credentials are missing; auth features are disabled.');
      return;
    }

    const getSessionAndUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;
      setUser(currentUser ?? null);
      setIsAdmin(currentUser?.user_metadata?.role === 'admin');
      setLoading(false);
    };

    getSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setIsAdmin(currentUser?.user_metadata?.role === 'admin');
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  const unsupported = () => {
    throw new Error('Supabase auth is disabled.');
  };

  const getRedirectTo = (path = '/dashboard') => {
    if (typeof window === 'undefined') return undefined;
    return `${window.location.origin}${path}`;
  };

  const value = {
    signUp: supabase
      ? (data) => {
          const redirectTo = getRedirectTo('/dashboard');
          const nextOptions = {
            ...(data?.options || {}),
            emailRedirectTo: data?.options?.emailRedirectTo || redirectTo,
          };
          return supabase.auth.signUp({ ...data, options: nextOptions });
        }
      : unsupported,
    signIn: supabase ? (data) => supabase.auth.signInWithPassword(data) : unsupported,
    requestPasswordReset: supabase
      ? async (email) => {
          const redirectTo = getRedirectTo('/reset-password');
          return supabase.auth.resetPasswordForEmail(email, redirectTo ? { redirectTo } : undefined);
        }
      : unsupported,
    signInWithProvider: supabase
      ? (provider) => {
          const redirectTo = getRedirectTo('/dashboard');
          return supabase.auth.signInWithOAuth({
            provider,
            options: redirectTo ? { redirectTo } : undefined,
          });
        }
      : unsupported,
    signOut: supabase ? () => supabase.auth.signOut() : unsupported,
    user,
    isAdmin,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};