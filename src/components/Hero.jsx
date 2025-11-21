
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Boat on a scenic sea in Haiphong, Vietnam"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1616438376211-18da49e0f98f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          srcSet="https://images.unsplash.com/photo-1616438376211-18da49e0f98f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 800w, https://images.unsplash.com/photo-1616438376211-18da49e0f98f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1200w, https://images.unsplash.com/photo-1616438376211-18da49e0f98f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1920w"
          sizes="100vw"
        />
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
            Haiphong Motorbike & Car Rentals from $4/Day
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
          >
            Premium Honda, Yamaha and VinFast rentals with free hotel delivery, helmets and
            24/7 roadside support. Reserve online in minutes and start exploring immediately.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 shadow-lg shadow-blue-900/30"
              onClick={() => scrollToSection("pricing")}
            >
              Check Availability & Prices
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-8"
              asChild
            >
              <a
                href="https://wa.me/84902197160?text=Hi%20Rivercity!%20I'd%20like%20to%20check%20availability."
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp a Quick Quote
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-8"
              asChild
            >
              <a
                href="https://zalo.me/0902197160"
                target="_blank"
                rel="noreferrer"
              >
                Zalo Quick Quote
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-8"
              onClick={() => scrollToSection("bike-showcase")}
            >
              View Motorbikes & Cars
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 grid gap-3 sm:grid-cols-2 text-white/90"
          >
            {[
              "Trusted by 2,000+ travelers since 2019",
              "4.7★ Google rating (18 verified reviews)",
              "Free hotel delivery & phone holder included",
              "Airport pickup, monthly and chauffeur options",
            ].map((item, index) => (
              <li key={index} className="flex items-center text-sm md:text-base">
                <CheckCircle2 className="mr-2 h-5 w-5 text-emerald-300" />
                {item}
              </li>
            ))}
          </motion.ul>
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
