import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hdueofykrghmbrqrhvwc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWVvZnlrcmdobWJycXJodndjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NzgzNTQsImV4cCI6MjA2NDE1NDM1NH0.O6uCVdyntPzDR_aMGyBM7KmDGVjEkAZ3SD9aKfcLgzo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);