
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import useRevealInView from "@/hooks/useRevealInView";
import { Shield, Clock, Map, Settings, Award, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Safety First",
    description:
      "All our wheels are regularly maintained and bikes come with helmets and safety gear.",
  },
  {
    icon: <Clock className="h-6 w-6 text-white" />,
    title: "Flexible Rental",
    description:
      "Rent by day, week or months. We accommodate your schedule with easy extensions.",
  },
  {
    icon: <Map className="h-6 w-6 text-white" />,
    title: "Local Routes",
    description:
      "Get insider tips on the best routes and hidden spots around Haiphong.",
  },
  {
    icon: <Settings className="h-6 w-6 text-white" />,
    title: "24/7 Support",
    description:
      "Roadside assistance and technical support available whenever you need it.",
  },
  {
    icon: <Award className="h-6 w-6 text-white" />,
    title: "Quality Bikes & Cars",
    description:
      "Our fleet features well-maintained bikes and cars from trusted brands for reliability.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-white" />,
    title: "Easy Payment",
    description:
      "Multiple payment options including cash, card, crypto and mobile payments.",
  },
];

const FeatureCard = ({ icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useRevealInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1 },
        },
      }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useRevealInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-gray-100 to-blue-100"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.6 } },
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Why Choose <span className="text-blue-600">Rivercity</span> Bike Rentals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide more than just wheels - we offer a complete experience for
            exploring Haiphong with confidence and style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
