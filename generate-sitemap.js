import { supabase } from './src/lib/supabaseClient.js';
import fs from 'fs';

const generateSitemap = async () => {
  const baseUrl = 'https://horizons-rivercity.com';
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
