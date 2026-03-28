export default function handler(req, res) {
  res.status(200).json({
    groq: !!process.env.GROQ_API_KEY,
    supabaseUrl: !!process.env.SUPABASE_URL,
    supabaseKey: !!process.env.SUPABASE_ANON_KEY,
    vercelUrl: process.env.VERCEL_URL || 'localhost'
  });
}