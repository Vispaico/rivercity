import React from "react";
import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";

const motorbikes = [
  {
    name: "Honda Airblade",
        price: "7",
        image: "/airblade.webp",
        description: "Lightweight and fuel-efficient, perfect for city exploration.",
        specs: [
            { type: "engine", value: "125cc" },
            { type: "transmission", value: "Automatic" },
            { type: "capacity", value: "2 Persons" },
            { type: "feature", value: "Storage" }
        ],
      },
      {
        name: "Yamaha NVX",
        price: "10",
        image: "/nvx1.webp",
        description: "Sporty design with powerful engine for city and countryside.",
        specs: [
            { type: "engine", value: "155cc" },
            { type: "transmission", value: "Automatic" },
            { type: "capacity", value: "2 Persons" },
            { type: "feature", value: "ABS" }
        ],
      },
      {
        name: "Honda Cube",
        price: "5",
        image: "/wave01.webp",
        description: "Smooth handling and robust for enduring anything.",
        specs: [
            { type: "engine", value: "125cc" },
            { type: "transmission", value: "Half Automatic" },
            { type: "capacity", value: "2 Persons" },
            { type: "feature", value: "Countryside" }
            
    ],
  },
  {
    name: "Honda Cube",
        price: "4",
        image: "/cube.webp",
        description: "No drivers license needed.",
        specs: [
            { type: "engine", value: "50cc" },
            { type: "transmission", value: "Half Automatic" },
            { type: "capacity", value: "2 Persons" },
            { type: "feature", value: "Easy Peasy" }
        ],
      },
      {
        name: "Yamaha NVX",
        price: "10",
        image: "/nvxgreen.webp",
        description: "Sporty design with powerful engine for city and countryside.",
        specs: [
            { type: "engine", value: "155cc" },
            { type: "transmission", value: "Automatic" },
            { type: "capacity", value: "2 Persons" },
            { type: "feature", value: "ABS" }
        ],
      },
      {
        name: "Yamaha NVX",
        price: "10",
        image: "/nvxblack.webp",
        description: "Sporty design with powerful engine for city and countryside.",
        specs: [
            { type: "engine", value: "155cc" },
            { type: "transmission", value: "Automatic" },
            { type: "capacity", value: "2 Persons" },
            { type: "feature", value: "ABS" }
            
    ],
  },
];

const MotorbikeRentalPage = () => {
  return (
    <div>
      <PageHeader
        title="Motorbike Rentals in Haiphong"
        subtitle="Feel the freedom of the open road with our selection of reliable and fun motorbikes."
        breadcrumbs={[{ name: "Home", link: "/" }, { name: "Motorbike Rentals" }]}
      />
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {motorbikes.map((bike, index) => (
              <VehicleCard key={index} vehicle={bike} index={index} type="motorbike" />
            ))}
          </div>
        </div>
      </section>
       <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready for an Adventure?</h2>
           <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Pick your ride and get ready to explore the vibrant streets of Haiphong and the scenic beauty of Vietnam.
           </p>
           <a href="/#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors">
             Book Your Bike
           </a>
        </div>
      </section>
    </div>
  );
};

export default MotorbikeRentalPage;