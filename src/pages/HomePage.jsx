import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BikeShowcase from "@/components/BikeShowcase"; 
import Pricing from "@/components/Pricing";
import FeaturedGuides from "@/components/FeaturedGuides";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        name: "VinFast Feliz Electric Scooter Rental",
        price: "8",
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
        name: "Yamaha Exciter 150 Rental",
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

      <FeaturedGuides />

      <Testimonials />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-8">
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl md:text-3xl">Earn extra income with your vehicle</CardTitle>
                  <CardDescription className="mt-2">
                    Have a motorbike or car you don’t use every day? List it on Rivercity, control your availability, and get paid 70% by bank transfer.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-6 space-y-4">
                  <ul className="text-sm text-gray-700 grid gap-2">
                    <li><span className="font-semibold">70% owner payout</span> (Rivercity fee 30% only when rented)</li>
                    <li><span className="font-semibold">You control availability</span> by blocking dates anytime</li>
                    <li><span className="font-semibold">We handle customer support</span> and keep renter contact private</li>
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/rent-out">Learn how it works</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/dashboard/partner">Open Partner Portal</Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
              <div className="lg:col-span-5 relative">
                <img
                  src="/haiphong-port-scenic-view.webp"
                  alt="Road in Vietnam"
                  className="w-full h-full object-cover min-h-[220px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent" />
              </div>
            </div>
          </Card>
        </div>
      </section>
      <CTASection />
      <ContactSection />
    </>
  );
};

export default HomePage;