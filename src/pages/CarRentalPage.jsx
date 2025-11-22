import React from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
import ContactSection from "@/components/ContactSection";
import CustomQuoteCard from "@/components/CustomQuoteCard";

const cars = [
  {
    name: "Compact Car (e.g., Vinfast Fadil)",
    price: "50",
    image: "https://images.unsplash.com/photo-1649475659702-b641646c1322?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageSrcSet: "https://images.unsplash.com/photo-1649475659702-b641646c1322?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 300w, https://images.unsplash.com/photo-1649475659702-b641646c1322?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 600w, https://images.unsplash.com/photo-1649475659702-b641646c1322?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 900w",
    description: "Reliable and fuel-efficient, perfect for navigating city streets and short trips. Easy to park and maneuver.",
    specs: [
      { type: "engine", value: "1.0L - 1.2L" },
      { type: "transmission", value: "Automatic" },
      { type: "capacity", value: "4 Passengers" },
      { type: "feature", value: "VETC Card" },
    ],
  },
  {
    name: "Sedan or small SUV (e.g., Honda CRV)",
    price: "100",
    image: "https://images.unsplash.com/photo-1623597780975-38ccd5030c83?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageSrcSet: "https://images.unsplash.com/photo-1623597780975-38ccd5030c83?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 300w, https://images.unsplash.com/photo-1623597780975-38ccd5030c83?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 600w, https://images.unsplash.com/photo-1623597780975-38ccd5030c83?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 900w",
    description: "Experience ultimate comfort and style. Perfect for business travel or making a statement on special occasions.",
    specs: [
      { type: "engine", value: "2.0L Petrol" },
      { type: "transmission", value: "Automatic" },
      { type: "capacity", value: "5 Passengers" },
      { type: "feature", value: "VETC Card" },
    ],
  },
  {
    name: "SUV, 7 Seater (e.g., Vinfast Lux SA)",
    price: "130",
    image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761195856/rvc/vf_l5tiij.webp",
    imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761195856/rvc/vf_l5tiij.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600/v1761195856/rvc/vf_l5tiij.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900/v1761195856/rvc/vf_l5tiij.webp 900w",
    description: "Spacious and versatile, ideal for families or groups needing extra room and comfort for longer journeys or varied terrains.",
    specs: [
      { type: "engine", value: "2.5L Petrol" },
      { type: "transmission", value: "Automatic" },
      { type: "capacity", value: "7 Passengers" },
      { type: "feature", value: "VETC Card" },
    ],
  },
];

const CarRentalPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VehicleRentalBusiness",
    name: "Rivercity Car Rentals",
    url: "https://www.rivercitybikerentals.com/cars",
    description:
      "Hire VinFast and Honda cars in Haiphong with airport pickup, driver services and premium insurance options.",
    priceRange: "$50-$180",
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
        <title>Car Rentals Haiphong | VinFast &amp; Honda | Airport Pickup | $50-180/Day</title>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <VehicleCard key={index} vehicle={car} index={index} type="car" />
            ))}
          </div>

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