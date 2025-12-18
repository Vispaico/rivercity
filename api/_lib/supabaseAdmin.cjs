let cached = null;

const getEnv = (name) => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
};

const getSupabaseAdmin = async () => {
  if (cached) return cached;

  const url = getEnv('SUPABASE_URL');
  const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

  const mod = await import('@supabase/supabase-js');
  const createClient = mod.createClient;

  cached = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cached;
};

module.exports = {
  getSupabaseAdmin,
};
