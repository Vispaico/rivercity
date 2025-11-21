import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BikeShowcase from "@/components/BikeShowcase"; 
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";

const HomePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VehicleRentalBusiness",
    name: "Rivercity Bike Rentals",
    image: "https://www.rivercitybikerentals.com/Mama%20LogoPic.webp",
    url: "https://www.rivercitybikerentals.com/",
    telephone: "+84902197160",
    priceRange: "$4-$180",
    address: {
      "@type": "PostalAddress",
      streetAddress: "23/32 To 2 Xom Trung, Ngo Quyen District",
      addressLocality: "Haiphong",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 20.8449,
      longitude: 106.6881,
    },
    openingHours: "Mo-Fr 08:00-22:00, Sa-Su 07:00-23:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "18",
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Honda Airblade 125cc Rental",
        price: "7",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Yamaha NVX 155cc Rental",
        price: "10",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "VinFast Fadil Car Rental",
        price: "50",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Motorbike &amp; Car Rentals in Haiphong | Rivercity Bike Rentals</title>
        <meta
          name="description"
          content="Premium motorbike and car rentals in Haiphong, Vietnam. Daily, weekly &amp; monthly rates from $4. Honda, Yamaha, VinFast fleet with free hotel delivery and 24/7 support."
        />
        <meta property="og:title" content="Motorbike &amp; Car Rentals in Haiphong | Rivercity Bike Rentals" />
        <meta
          property="og:description"
          content="Book Honda, Yamaha and VinFast rentals in Haiphong with free helmets, hotel delivery and roadside assistance. Daily to monthly packages from $4."
        />
        <link rel="canonical" href="https://www.rivercitybikerentals.com/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Hero />
      <Features />
     <section id="bike-showcase">
        <BikeShowcase />
      </section>
      <Pricing />
      <Testimonials />
      <ContactSection />
    </>
  );
};

export default HomePage;