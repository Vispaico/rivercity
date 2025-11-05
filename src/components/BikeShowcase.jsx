import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import VehicleCard from "@/components/VehicleCard"; 

// TODO: Optimize the images by resizing them to a smaller size.
// For example, /nvx1.webp is displayed at 380x277, but the original image is 1000x591.
const bikeCategories = [
  {
    id: "scooters",
    label: "Motorbikes",
    bikes: [
      {
        name: "Honda Airblade",
        price: "7",
        image: "public/airblade.webp",
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
        image: "public/nvx1.webp",
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
        price: "5",
        image: "public/wave01.webp",
        imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300,f_auto,q_auto/v1761196452/rvc/wave01_yhfzpr.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600,f_auto,q_auto/v1761196452/rvc/wave01_yhfzpr.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900,f_auto,q_auto/v1761196452/rvc/wave01_yhfzpr.webp 900w",
        description: "Smooth handling and robust for enduring anything.",
        specs: [
            { type: "engine", value: "125cc" },
            { type: "transmission", value: "Half Automatic" },
            { type: "capacity", value: "2 Persons" },
            { type: "feature", value: "Countryside" }
        ],
      },
    ],
  },
  {
    id: "motorcycles",
    label: "Cars",
    bikes: [
      {
        name: "Compact Car (e.g., Vinfast Fadil)",
    price: "50",
    image: "https://images.unsplash.com/photo-1649475659702-b641646c1322?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageSrcSet: "https://images.unsplash.com/photo-1649475659702-b641646c1322?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 300w, https://images.unsplash.com/photo-1649475659702-b641646c1322?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 600w, https://images.unsplash.com/photo-1649475659702-b641646c1322?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 900w",
    description: "Reliable and fuel-efficient, perfect for navigating city streets and short trips. Easy to park and maneuver.",
    specs: [
      { type: "engine", value: "1.0L - 1.2L" },
      { type: "transmission", value: "Automatic" },
      { type: "capacity", value: "4 Passengers" },
      { type: "feature", value: "VETC Card" },
    ],
      },
      {
        name: "Sedan or small SUV (e.g., Honda CRV)",
    price: "100",
    image: "https://images.unsplash.com/photo-1623597780975-38ccd5030c83?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageSrcSet: "https://images.unsplash.com/photo-1623597780975-38ccd5030c83?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 300w, https://images.unsplash.com/photo-1623597780975-38ccd5030c83?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 600w, https://images.unsplash.com/photo-1623597780975-38ccd5030c83?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 900w",
    description: "Experience ultimate comfort and style. Perfect for business travel or making a statement on special occasions.",
    specs: [
      { type: "engine", value: "2.0L Petrol" },
      { type: "transmission", value: "Automatic" },
      { type: "capacity", value: "5 Passengers" },
      { type: "feature", value: "VETC Card" },
    ],
      },
      {
        name: "SUV, 7 Seater (e.g., Vinfast Lux SA)",
    price: "130",
    image: "https://res.cloudinary.com/kinhcode01/image/upload/v1761195856/rvc/vf_l5tiij.webp",
    imageSrcSet: "https://res.cloudinary.com/kinhcode01/image/upload/w_300/v1761195856/rvc/vf_l5tiij.webp 300w, https://res.cloudinary.com/kinhcode01/image/upload/w_600/v1761195856/rvc/vf_l5tiij.webp 600w, https://res.cloudinary.com/kinhcode01/image/upload/w_900/v1761195856/rvc/vf_l5tiij.webp 900w",
    description: "Spacious and versatile, ideal for families or groups needing extra room and comfort for longer journeys or varied terrains.",
    specs: [
      { type: "engine", value: "2.5L Petrol" },
      { type: "transmission", value: "Automatic" },
      { type: "capacity", value: "7 Passengers" },
      { type: "feature", value: "VETC Card" },
    ],
      },
    ],
  },
];

const BikeShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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

        <Tabs defaultValue="scooters" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-200 text-gray-700">
              {bikeCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {bikeCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.bikes.map((bike, index) => (
                  <VehicleCard key={index} vehicle={bike} index={index} type="motorbike" />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
            asChild
          >
            <Link to="/motorbikes">
              View All Motorbikes
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
            asChild
          >
            <Link to="/cars">
              View All Cars
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BikeShowcase;