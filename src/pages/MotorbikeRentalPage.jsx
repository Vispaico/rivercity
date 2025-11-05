import React from "react";
import VehicleCard from "@/components/VehicleCard";
import PageHeader from "@/components/PageHeader";

const motorbikes = [
    {
        name: "Honda Airblade",
        price: "7",
        image: "https://res.cloudinary.com/kinhcode01/image/upload/f_auto,q_auto/v1761196452/rvc/airblade_r8xuni.webp",
        imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300,f_auto,q_auto/v1761196452/rvc/airblade_r8xuni.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600,f_auto,q_auto/v1761196452/rvc/airblade_r8xuni.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900,f_auto,q_auto/v1761196452/rvc/airblade_r8xuni.webp 900w",
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
        image: "https://res.cloudinary.com/kinhcode01/image/upload/f_auto,q_auto/v1761196452/rvc/nvx1_omtxja.webp",
        imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300,f_auto,q_auto/v1761196452/rvc/nvx1_omtxja.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600,f_auto,q_auto/v1761196452/rvc/nvx1_omtxja.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900,f_auto,q_auto/v1761196452/rvc/nvx1_omtxja.webp 900w",
        description: "Sporty design with powerful engine for city and countryside.",
        specs: [
            { type: "engine", value: "155cc" },
            { type: "transmission", value: "Automatic" },
            { type: "capacity", value: "2 Persons" },
            { type: "feature", value: "ABS" }
        ],
      },
      {
        name: "Honda Wave",
        price: "5",
        image: "https://res.cloudinary.com/kinhcode01/image/upload/f_auto,q_auto/v1761196452/rvc/wave01_yhfzpr.webp",
        imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300,f_auto,q_auto/v1761196452/rvc/wave01_yhfzpr.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600,f_auto,q_auto/v1761196452/rvc/wave01_yhfzpr.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900,f_auto,q_auto/v1761196452/rvc/wave01_yhfzpr.webp 900w",
        description: "Smooth handling and robust for enduring anything.",
        specs: [
            { type: "engine", value: "125cc" },
            { type: "transmission", value: "Half Automatic" },
            { type: "capacity", value: "2 Persons" },
            { type: "feature", value: "Countryside" }
        ],
      },
];

const MotorbikeRentalPage = () => {
  return (
    <div className="bg-gray-50">
      <PageHeader 
        title="Motorbike Rentals"
        subtitle="Explore Haiphong on Two Wheels"
        backgroundImage="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop"
      />
      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {motorbikes.map((bike, index) => (
            <VehicleCard key={index} vehicle={bike} index={index} type="motorbike" />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MotorbikeRentalPage;