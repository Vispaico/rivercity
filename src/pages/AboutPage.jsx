import React from "react";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Award, Users, MapPin } from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    { 
      name: "Alice Wonderland", 
      role: "Operations Manager", 
      image: "/boss.webp"
    },
    { 
      name: "Bob The Builder", 
      role: "CEO & Founder", 
      image: "/Mama LogoPic.webp"
    },
    { 
      name: "Charlie Brown", 
      role: "Customer Support", 
      image: "/charlie.webp"
    },
  ];

  return (
    <div>
      <PageHeader
        title="About Rivercity Rentals"
        subtitle="Your trusted partner for memorable adventures in Haiphong and beyond."
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
               src="https://images.unsplash.com/photo-1613131145282-9476375618e1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
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
              <p className="text-lg text-gray-700 mb-4">At Rivercity Rentals, we believe that the best way to experience a new place is on two wheels (or four!). We are passionate about providing reliable, high-quality vehicles and exceptional customer service to make your exploration of Haiphong and its stunning surroundings seamless and unforgettable.</p>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2019, our local team is dedicated to sharing the beauty and culture of our city. We offer a diverse fleet of motorbikes and cars, meticulously maintained for your safety and comfort.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're a solo traveler seeking winding coastal roads, a couple on a romantic getaway, or a family looking for convenient city transport, we have the perfect ride for you.
              </p>
            </motion.div>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    className="w-full h-full object-cover"
                    alt={`Team member ${member.name}`}
                    src={member.image} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-blue-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg overflow-hidden shadow-xl">
                <img  className="w-full h-64 object-cover" alt="men sitting in front of street" src="https://images.unsplash.com/photo-1721601636299-10b3b62d5f01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2Nvb3RlcnMlMjB2aWV0bmFtfGVufDB8fDB8fHww" />
            </motion.div>
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-lg overflow-hidden shadow-xl">
                <img  className="w-full h-64 object-cover" alt="Vietnam Street by Night" src="https://images.unsplash.com/photo-1748591654928-516338ccf352?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </motion.div>
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="rounded-lg overflow-hidden shadow-xl">
                <img  className="w-full h-64 object-cover" alt="Customer receiving keys for a rental vehicle" src="https://images.unsplash.com/photo-1557598628-bdd7d0767917" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;