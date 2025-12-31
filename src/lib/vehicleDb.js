import { supabase } from '@/lib/supabaseClient';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export const fetchAllVehicles = async () => {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('vehicles')
    .select('id, category, name, description, image_url, price_per_day, price_per_week, price_per_month, inventory_count, active, sort_order')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }

  return data || [];
};

export const fetchVehiclesByCategory = async (category) => {
  const all = await fetchAllVehicles();
  return all.filter((v) => v.category === category);
};

export const mapDbVehicleToCardFormat = (dbVehicle) => {
  const day = Number(dbVehicle.price_per_day);
  const week = Number(dbVehicle.price_per_week);
  const month = Number(dbVehicle.price_per_month);

  const dailyPrice = Number.isFinite(day) ? day : null;
  const weeklyPrice = Number.isFinite(week) ? week : dailyPrice !== null ? dailyPrice * 5 : null;
  const monthlyPrice = Number.isFinite(month) ? month : dailyPrice !== null ? dailyPrice * 10 : null;
  const nameLower = dbVehicle.name.toLowerCase();

  let slug = slugify(dbVehicle.name);

  // Map specific database vehicles to their catalog slugs
  if (nameLower.includes('vinfast') && nameLower.includes('feliz')) {
    slug = 'vinfast-feliz';
  } else if (nameLower.includes('vinfast') && nameLower.includes('fadil')) {
    slug = 'vinfast-fadil';
  } else if (nameLower.includes('honda') && nameLower.includes('crv')) {
    slug = 'honda-crv';
  } else if (nameLower.includes('honda') && nameLower.includes('cr-v')) {
    slug = 'honda-crv';
  } else if (nameLower.includes('vinfast') && nameLower.includes('lux')) {
    slug = 'vinfast-lux-sa';
  }

  return {
    id: dbVehicle.id,
    category: dbVehicle.category,
    name: dbVehicle.name,
    description: dbVehicle.description,
    image: dbVehicle.image_url,
    price: dailyPrice !== null ? dailyPrice.toString() : '',
    priceWeek: weeklyPrice !== null ? weeklyPrice.toString() : '',
    priceMonth: monthlyPrice !== null ? monthlyPrice.toString() : '',
    bookingQuery: dbVehicle.name,
    slug: slug,
    specs: [],
  };
};
