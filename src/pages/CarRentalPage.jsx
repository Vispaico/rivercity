import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
import ContactSection from "@/components/ContactSection";
import CustomQuoteCard from "@/components/CustomQuoteCard";

import { fetchVehiclesByCategory, mapDbVehicleToCardFormat } from "@/lib/vehicleDb";

const CarRentalPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      const data = await fetchVehiclesByCategory('car');
      const formatted = data.map(mapDbVehicleToCardFormat);
      setCars(formatted);
      setLoading(false);
    };
    loadCars();
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VehicleRentalBusiness",
    name: "Rivercity Car Rentals",
    url: "https://www.rivercitybikerentals.com/cars",
    description:
      "Hire cars in Haiphong with airport pickup, driver services and premium insurance options.",
    priceRange: "$50-$130",
    telephone: "+84902197160",
    areaServed: "Haiphong, Cat Bi Airport, Ha Long Bay",
    makesOffer: cars.map((car) => ({
      "@type": "Offer",
      name: car.name,
      price: car.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <div>
      <Helmet>
        <title>Car Rentals Haiphong | VinFast &amp; Honda | Airport Pickup | $50-130/Day</title>
        <meta
          name="description"
          content="Reserve VinFast and Honda cars in Haiphong with airport pickup, driver service and full insurance. Transparent pricing from $50 per day."
        />
        <link rel="canonical" href="https://www.rivercitybikerentals.com/cars" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <PageHeader
        title="Car Rentals in Haiphong"
        subtitle="Explore Haiphong and its surroundings in comfort and style with our diverse fleet of cars."
        breadcrumbs={[{ name: "Home", link: "/" }, { name: "Car Rentals" }]}
      />
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-700">Loading cars...</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-700">No cars available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car, index) => (
                <VehicleCard key={car.id || index} vehicle={car} index={index} type="car" />
              ))}
            </div>
          )}

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pricing &amp; Inclusions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Daily rates include unlimited mileage within Haiphong.</li>
                <li>Weekly bookings receive complimentary Cat Bi Airport pickup.</li>
                <li>Monthly rentals include one scheduled maintenance service.</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Insurance &amp; Deposits</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Standard insurance with VND 15M deductible included.</li>
                <li>Full coverage upgrade available for $12/day (zero deductible).</li>
                <li>Security deposit from $200, refundable at handover.</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Driver &amp; Delivery Options</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Professional English-speaking drivers from $35/day.</li>
                <li>Delivery to Cat Ba Island or Ha Long from $25 each way.</li>
                <li>Child seats and Wi-Fi hotspots available on request.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <CustomQuoteCard />
      <ContactSection />
    </div>
  );
};

export default CarRentalPage;