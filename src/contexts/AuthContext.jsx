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

  const value = {
    signUp: supabase ? (data) => supabase.auth.signUp(data) : unsupported,
    signIn: supabase ? (data) => supabase.auth.signInWithPassword(data) : unsupported,
    signInWithProvider: supabase ? (provider) => supabase.auth.signInWithOAuth({ provider }) : unsupported,
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