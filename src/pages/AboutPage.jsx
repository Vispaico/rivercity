import React from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Award, Users, MapPin } from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    { 
      name: "Alice Wonderland", 
      role: "Operations Manager", 
      image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761196452/rvc/boss.webp",
      imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_150/v1761196452/rvc/boss.webp 150w, https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761196452/rvc/boss.webp 300w",
    },
    { 
      name: "Bob The Builder", 
      role: "CEO & Founder", 
      image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761196452/rvc/Mama_LogoPic.webp",
      imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_150/v1761196452/rvc/Mama_LogoPic.webp 150w, https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761196452/rvc/Mama_LogoPic.webp 300w",
    },
    { 
      name: "Charlie Brown", 
      role: "Customer Support", 
      image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761196452/rvc/charlie.webp",
      imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_150/v1761196452/rvc/charlie.webp 150w, https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761196452/rvc/charlie.webp 300w",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Rivercity Bike Rentals",
    description:
      "Learn about Rivercity Bike Rentals, Haiphong's trusted motorbike and car rental company founded in 2019 with 2,000+ happy travelers served.",
    mainEntity: {
      "@type": "VehicleRentalBusiness",
      name: "Rivercity Bike Rentals",
      foundingDate: "2019",
      numberOfEmployees: "12",
      areaServed: "Haiphong, Vietnam",
      url: "https://www.rivercitybikerentals.com/about",
    },
  };

  return (
    <div>
      <Helmet>
        <title>About Rivercity Bike Rentals | Founded 2019 | Best Motorbike Rentals Haiphong</title>
        <meta
          name="description"
          content="Rivercity Bike Rentals has delivered safe motorbike and car rentals in Haiphong since 2019. Discover our story, safety standards and service commitments."
        />
        <link rel="canonical" href="https://www.rivercitybikerentals.com/about" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <PageHeader
        title="About Rivercity Bike Rentals"
        subtitle="Haiphong's trusted rental partner since 2019 with 2,000+ adventures planned."
        breadcrumbs={[{ name: "Home", link: "/" }, { name: "About Us" }]}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                alt="Scenic view of Haiphong with motorbikes"
               src="https://images.unsplash.com/photo-1613131145282-9476375618e1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
               srcSet="https://images.unsplash.com/photo-1613131145282-9476375618e1?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 400w, https://images.unsplash.com/photo-1613131145282-9476375618e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 800w, https://images.unsplash.com/photo-1613131145282-9476375618e1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1200w"
               sizes="(max-width: 1024px) 100vw, 50vw" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission: Unleash Your Spirit of Adventure
              </h2>
              <p className="text-lg text-gray-700 mb-4">At Rivercity Rentals, we believe the best way to experience a new destination is on two wheels (or four!). Since 2019 we have delivered reliable, high-quality vehicles and concierge-level support so every traveler can explore Haiphong with confidence.</p>
              <p className="text-lg text-gray-700 mb-4">
                Our local team of 12 full-time specialists maintains a diverse fleet of 35+ motorbikes and cars with rigorous daily inspections, GPS-enabled safety checks and proactive maintenance schedules.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're a solo traveler seeking winding coastal roads, a couple on a romantic getaway, or a family needing comfortable city transport, we tailor every rental with safety briefings, route tips and on-demand assistance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Founded", value: "2019" },
              { label: "Travelers Served", value: "2,000+" },
              { label: "Fleet Size", value: "35 Vehicles" },
              { label: "Safety Record", value: "0 Major Incidents" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6 text-center"
              >
                <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Ride With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Award className="h-10 w-10 text-blue-600 mb-4" />, title: "Quality Fleet", text: "Modern, well-maintained motorbikes and cars for a safe and comfortable journey." },
              { icon: <Users className="h-10 w-10 text-blue-600 mb-4" />, title: "Local Expertise", text: "Friendly staff with in-depth knowledge of Haiphong's best routes and attractions." },
              { icon: <MapPin className="h-10 w-10 text-blue-600 mb-4" />, title: "Convenient Location", text: "Easy-to-access shop in the heart of Haiphong, ready to get you on the road quickly." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                {item.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg overflow-hidden shadow-xl">
                <img  className="w-full h-64 object-cover" alt="men sitting in front of street" src="https://images.unsplash.com/photo-1721601636299-10b3b62d5f01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2Nvb3RlcnMlMjB2aWV0bmFtfGVufDB8fDB8fHww" srcSet="https://images.unsplash.com/photo-1721601636299-10b3b62d5f01?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2Nvb3RlcnMlMjB2aWV0bmFtfGVufDB8fDB8fHww 300w, https://images.unsplash.com/photo-1721601636299-10b3b62d5f01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2Nvb3RlcnMlMjB2aWV0bmFtfGVufDB8fDB8fHww 600w, https://images.unsplash.com/photo-1721601636299-10b3b62d5f01?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2Nvb3RlcnMlMjB2aWV0bmFtfGVufDB8fDB8fHww 900w" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </motion.div>
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-lg overflow-hidden shadow-xl">
                <img  className="w-full h-64 object-cover" alt="Vietnam Street by Night" src="https://images.unsplash.com/photo-1748591654928-516338ccf352?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" srcSet="https://images.unsplash.com/photo-1748591654928-516338ccf352?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 300w, https://images.unsplash.com/photo-1748591654928-516338ccf352?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 600w, https://images.unsplash.com/photo-1748591654928-516338ccf352?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 900w" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </motion.div>
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="rounded-lg overflow-hidden shadow-xl">
                <img  className="w-full h-64 object-cover" alt="Customer receiving keys for a rental vehicle" src="https://images.unsplash.com/photo-1557598628-bdd7d0767917" srcSet="https://images.unsplash.com/photo-1557598628-bdd7d0767917?w=300 300w, https://images.unsplash.com/photo-1557598628-bdd7d0767917?w=600 600w, https://images.unsplash.com/photo-1557598628-bdd7d0767917?w=900 900w" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </motion.div>
          </div>
        </div>
      </section>
      <ContactSection />
    </div>
  );
};

export default AboutPage;