import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const generateSitemap = async () => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Anon Key is missing. Make sure they are in your .env.local file.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const baseUrl = 'https://rivercitybikerentals.com';
  const pages = [
    '/',
    '/about',
    '/cars',
    '/motorbikes',
    '/privacy-policy',
    '/cookies',
    '/terms-of-use',
    '/blog',
  ];

  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts for sitemap:', error);
    return;
  }

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
      ${posts
        .map(({ slug, created_at }) => {
          return `
            <url>
              <loc>${baseUrl}/blog/${slug}</loc>
              <lastmod>${new Date(created_at).toISOString()}</lastmod>
              <changefreq>yearly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
};

(async () => {
  await generateSitemap();
})();
