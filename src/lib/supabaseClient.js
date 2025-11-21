import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const rawSupabaseEnabled = import.meta.env.VITE_SUPABASE_ENABLED;
const supabaseEnabled =
  rawSupabaseEnabled === undefined
    ? Boolean(supabaseUrl && supabaseAnonKey)
    : !['false', '0', 'off'].includes(String(rawSupabaseEnabled).toLowerCase());

export const supabase =
  supabaseEnabled && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;