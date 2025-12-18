const getEnv = (name, { optional = false } = {}) => {
  const v = process.env[name];
  if (!v && !optional) throw new Error(`Missing required env var: ${name}`);
  return v;
};

const getSupabaseUrl = () => getEnv('SUPABASE_URL');

const getAnonKey = () => {
  return (
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    getEnv('SUPABASE_ANON_KEY')
  );
};

const requireSupabaseUser = async (req) => {
  const auth = String(req.headers.authorization || '');
  const token = auth.toLowerCase().startsWith('bearer ') ? auth.slice(7).trim() : '';
  if (!token) {
    const err = new Error('Missing Authorization bearer token');
    err.statusCode = 401;
    throw err;
  }

  const url = `${getSupabaseUrl()}/auth/v1/user`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      apikey: getAnonKey(),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = new Error('Invalid session');
    err.statusCode = 401;
    throw err;
  }

  return res.json();
};

module.exports = {
  requireSupabaseUser,
};
