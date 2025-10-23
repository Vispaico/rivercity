import React from "react";
import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
import ContactSection from "@/components/ContactSection";

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
  return (
    <div>
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
        </div>
      </section>
      <ContactSection />
    </div>
  );
};

export default CarRentalPage;