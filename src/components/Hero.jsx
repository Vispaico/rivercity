
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          alt="Boat on a scenic sea in Haiphong, Vietnam"
          className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1616438376211-18da49e0f98f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center mb-6"
          >
            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              Haiphong, Vietnam
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight"
          >
            Explore Haiphong on Wheels
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
          >
            Premium motorbike and car rentals for your adventure in Vietnam's port city.
            Discover hidden gems and scenic routes with our reliable vehicles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
            >
              Book a Ride
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full px-8"
            >
              View Our Fleet
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
