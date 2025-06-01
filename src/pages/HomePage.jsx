import React from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BikeShowcase from "@/components/BikeShowcase"; 
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <BikeShowcase />
      <Pricing />
      <Testimonials />
      <CTASection />
      <ContactSection />
    </>
  );
};

export default HomePage;