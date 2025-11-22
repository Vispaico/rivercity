import React from "react";
import { Helmet } from "react-helmet-async";
import VehicleCard from "@/components/VehicleCard";
import PageHeader from "@/components/PageHeader";
import ContactSection from "@/components/ContactSection";
import CustomQuoteCard from "@/components/CustomQuoteCard";

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
    price: "4",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VehicleRentalBusiness",
    name: "Rivercity Motorbike Rentals",
    url: "https://www.rivercitybikerentals.com/motorbikes",
    description:
      "Rent Honda Airblade, Yamaha NVX and Honda Wave motorbikes in Haiphong with helmets, insurance and 24/7 support.",
    priceRange: "$4-$10",
    telephone: "+84902197160",
    makesOffer: motorbikes.map((bike) => ({
      "@type": "Offer",
      name: bike.name,
      price: bike.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Haiphong Motorbike Rentals | Honda &amp; Yamaha | $4-10/Day | Free Helmets</title>
        <meta
          name="description"
          content="Choose Honda Airblade, Yamaha NVX or Honda Wave motorbikes in Haiphong. Free helmets, phone holders, hotel delivery and 24/7 support included."
        />
        <link rel="canonical" href="https://www.rivercitybikerentals.com/motorbikes" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Included with Every Rental</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Two DOT-approved helmets &amp; phone holder.</li>
              <li>Vietnam driving tips briefing and route suggestions.</li>
              <li>24/7 hotline for breakdowns or itinerary support.</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Insurance &amp; Deposits</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Standard coverage with VND 5M deductible included.</li>
              <li>Damage waiver add-on: $3/day (reduces deductible to $0).</li>
              <li>Refundable deposit from $80 depending on model.</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Extras You Can Add</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Luggage rack, child seat and rain gear upgrades.</li>
              <li>GoPro &amp; helmet camera rentals for road trips.</li>
              <li>One-way drop-offs to Ha Long Bay or Cat Ba Island.</li>
            </ul>
          </div>
        </div>
      </main>
      <CustomQuoteCard />
      <ContactSection />
    </div>
  );
};

export default MotorbikeRentalPage;