// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper for the Edge Function (search-knowledge)
export async function searchKnowledge(query, category = 'all') {
  let builder = supabase
    .from('knowledge')
    .select('title, content, url, category')
    .limit(6);

  // Full-text search
  if (query) {
    builder = builder.textSearch('content', query, { 
      type: 'websearch', 
      config: 'english' 
    });
  }

  // Filter by category if specified
  if (category !== 'all') {
    builder = builder.eq('category', category);
  }

  const { data, error } = await builder;

  if (error) {
    console.error('Supabase search error:', error);
    return [];
  }

  return data || [];
}