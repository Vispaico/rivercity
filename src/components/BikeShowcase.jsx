import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import useRevealInView from "@/hooks/useRevealInView";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import VehicleCard from "@/components/VehicleCard"; 

import { vehicleCatalog } from "@/lib/vehicleCatalog";

const fleetCategories = [
  {
    id: "motorbikes",
    label: "Motorbikes",
    listPath: "/motorbikes",
    type: "motorbike",
    vehicles: vehicleCatalog.motorbike,
  },
  {
    id: "cars",
    label: "Cars",
    listPath: "/cars",
    type: "car",
    vehicles: vehicleCatalog.car,
  },
];

const BikeShowcase = () => {
  const ref = useRef(null);
  const isInView = useRevealInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="bikes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.6 } },
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Premium <span className="text-blue-600">Fleet</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide selection of well-maintained wheels for your
            perfect Haiphong adventure.
          </p>
        </motion.div>

        {fleetCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: categoryIndex * 0.2 } },
            }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {category.label}
              </h3>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                asChild
              >
                <Link to={category.listPath}>
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.vehicles.map((bike, index) => (
                <VehicleCard 
                  key={bike.slug || index} 
                  vehicle={bike} 
                  index={index} 
                  type={category.type} 
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BikeShowcase;