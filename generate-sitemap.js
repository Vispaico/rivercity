import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

import { vehicleCatalog } from './src/lib/vehicleCatalog.js';

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
  const basePages = [
    '/',
    '/about',
    '/cars',
    '/motorbikes',
    '/privacy-policy',
    '/cookies',
    '/terms-of-use',
    '/blog',
    '/guides',
    '/guides/haiphong-travel-guide',
    '/guides/living-in-haiphong-expat-guide',
    '/guides/motorbike-rental-guide-vietnam',
    '/guides/northern-vietnam-road-trips',
    '/vietnam-travel-faq',
    '/vietnam-travel-faq/is-vietnam-safe-to-visit',
    '/vietnam-travel-faq/is-1000-enough-for-2-weeks-in-vietnam',
    '/vietnam-travel-faq/which-is-safer-vietnam-or-thailand',
    '/vietnam-travel-faq/what-not-to-bring-to-vietnam',
    '/vietnam-travel-faq/brush-teeth-tap-water-vietnam',
    '/vietnam-travel-faq/what-to-be-careful-of-when-visiting-vietnam',
    '/vietnam-travel-faq/bed-bugs-common-in-vietnam',
    '/vietnam-travel-faq/when-not-to-go-to-vietnam',
    '/vietnam-travel-faq/most-common-crime-in-vietnam',
    '/vietnam-travel-faq/use-us-dollars-in-vietnam',
    '/vietnam-travel-faq/vietnam-cheaper-than-thailand',
    '/vietnam-travel-faq/what-can-you-get-for-1-dollar-in-vietnam',
    '/vietnam-travel-faq/vietnam-cheap-for-americans',
    '/vietnam-travel-faq/tipping-customary-in-vietnam',
    '/vietnam-travel-faq/is-50000-enough-for-vietnam-trip',
    '/vietnam-travel-faq/how-much-is-cup-of-coffee-in-vietnam',
    '/vietnam-travel-faq/wear-red-in-vietnam',
    '/vietnam-travel-faq/444-meaning-in-vietnam',
    '/vietnam-travel-faq/what-not-to-do-in-vietnam',
    '/vietnam-travel-faq/rude-to-cross-fingers-in-vietnam',
    '/vietnam-travel-faq/foods-to-avoid-in-vietnam',
    '/vietnam-travel-faq/offensive-hand-gesture-in-vietnam',
    '/vietnam-travel-faq/anything-cant-wear-in-vietnam',
    '/vietnam-travel-faq/cash-or-card-in-vietnam',
    '/vietnam-travel-faq/how-much-7-day-trip-to-vietnam-cost',
    '/vietnam-travel-faq/what-can-1-dollar-buy-in-vietnam',
    '/vietnam-travel-faq/what-can-1-us-dollar-get-you-in-vietnam',
    '/vietnam-travel-faq/carry-usd-or-dong-in-vietnam',
    '/vietnam-travel-faq/anything-worth-buying-in-vietnam',
    '/vietnam-travel-faq/credit-cards-widely-accepted-in-vietnam',
  ];

  const vehiclePages = [
    ...(vehicleCatalog.motorbike || []).map((v) => `/motorbikes/${v.slug}`),
    ...(vehicleCatalog.car || []).map((v) => `/cars/${v.slug}`),
  ];

  const pages = [...basePages, ...vehiclePages];

  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts for sitemap:', error);
    console.log('Continuing without blog posts...');
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
        ? posts
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
            .join('')
        : ''}
    </urlset>
  `;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
};

(async () => {
  await generateSitemap();
})();
