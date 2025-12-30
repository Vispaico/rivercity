import { supabase } from '@/lib/supabaseClient';

export const fetchAllVehicles = async () => {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('vehicles')
    .select('id, category, name, description, image_url, price_per_day, inventory_count, active, sort_order')
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
  const dailyPrice = Number(dbVehicle.price_per_day) || 0;
  return {
    id: dbVehicle.id,
    category: dbVehicle.category,
    name: dbVehicle.name,
    description: dbVehicle.description,
    image: dbVehicle.image_url,
    price: dailyPrice.toString(),
    priceWeek: (dailyPrice * 5).toString(),
    priceMonth: (dailyPrice * 10).toString(),
    bookingQuery: dbVehicle.name,
    slug: null,
    specs: [],
  };
};
