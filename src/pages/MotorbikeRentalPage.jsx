import React from "react";
import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
import ContactSection from "@/components/ContactSection";

const motorbikes = [
  {
    name: "Honda Airblade",
        price: "7",
        image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761196452/rvc/airblade_r8xuni.webp",
        imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761196452/rvc/airblade_r8xuni.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600/v1761196452/rvc/airblade_r8xuni.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900/v1761196452/rvc/airblade_r8xuni.webp 900w",
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
        image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761196452/rvc/nvx1_omtxja.webp",
        imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761196452/rvc/nvx1_omtxja.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600/v1761196452/rvc/nvx1_omtxja.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900/v1761196452/rvc/nvx1_omtxja.webp 900w",
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
        image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761196452/rvc/wave01_yhfzpr.webp",
        imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761196452/rvc/wave01_yhfzpr.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600/v1761196452/rvc/wave01_yhfzpr.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900/v1761196452/rvc/wave01_yhfzpr.webp 900w",
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
        image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761196451/rvc/cube_uddvdx.webp",
        imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761196451/rvc/cube_uddvdx.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600/v1761196451/rvc/cube_uddvdx.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900/v1761196451/rvc/cube_uddvdx.webp 900w",
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
        image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761196452/rvc/nvxgreen_ome92c.webp",
        imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761196452/rvc/nvxgreen_ome92c.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600/v1761196452/rvc/nvxgreen_ome92c.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900/v1761196452/rvc/nvxgreen_ome92c.webp 900w",
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
        image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761196452/rvc/nvxblack_u4ue17.webp",
        imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761196452/rvc/nvxblack_u4ue17.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600/v1761196452/rvc/nvxblack_u4ue17.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900/v1761196452/rvc/nvxblack_u4ue17.webp 900w",
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
        <ContactSection />
    </div>
  );
};

export default MotorbikeRentalPage;