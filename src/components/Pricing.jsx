
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import useRevealInView from "@/hooks/useRevealInView";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Bike, Car } from "lucide-react";
import VispaicoContactModal from "@/components/VispaicoContactModal";

const motorbikePricing = [
  {
    name: "Yamaha NVX 155cc",
    subtitle: "Premium touring scooter",
    rates: [
      { label: "Daily", value: "$10" },
      { label: "Weekly", value: "$50" },
      { label: "Monthly", value: "$150" },
    ],
    features: [
      "Powerful 155cc engine & sport suspension",
      "ABS + traction control for confident riding",
      "Long-range comfort seat",
      "Includes waterproof luggage bag",
    ],
    popular: false,
    ctaText: "Check NVX Availability",
  },
  {
    name: "Vinfast Feliz Electric Scooter",
    subtitle: "Eco-friendly city rider",
    rates: [
      { label: "Daily", value: "$8" },
      { label: "Weekly", value: "$40" },
      { label: "Monthly", value: "$90" },
    ],
    features: [
      "Perfect for city trips and short trips and eco-friendly travel.",
      "Automatic transmission",
      "Free helmets, charger, phone holder & rain poncho",
      "Optional damage waiver available",
    ],
    popular: false,
    ctaText: "Reserve Vinfast Feliz",
  },
  {
    name: "Honda Airblade 125cc",
    subtitle: "Most popular scooter",
    rates: [
      { label: "Daily", value: "$7" },
      { label: "Weekly", value: "$35" },
      { label: "Monthly", value: "$80" },
    ],
    features: [
      "Spacious under-seat storage",
      "Lightweight and fuel-efficient",
      "Free delivery within Haiphong",
      "24/7 roadside assistance included",
    ],
    popular: true,
    ctaText: "Book Airblade Now",
  },
  {
    name: "Yamaha Exciter 150",
    subtitle: "Sporty manual motorbike",
    rates: [
      { label: "Daily", value: "$9" },
      { label: "Weekly", value: "$45" },
      { label: "Monthly", value: "$100" },
    ],
    features: [
      "Manual transmission for experienced riders",
      "150cc engine with responsive acceleration",
      "Includes 2 helmets + phone holder",
      "Optional delivery within Haiphong (availability)",
    ],
    popular: false,
    ctaText: "Reserve Exciter 150",
  },{
    name: "Honda Wave 110cc",
    subtitle: "Budget-friendly city rider",
    rates: [
      { label: "Daily", value: "$4" },
      { label: "Weekly", value: "$20" },
      { label: "Monthly", value: "$60" },
    ],
    features: [
      "Perfect for city trips and countryside cruising",
      "Half-automatic transmission",
      "Free helmets, phone holder & rain poncho",
      "Optional damage waiver available",
    ],
    popular: false,
    ctaText: "Reserve Honda Wave",
  },
];

const carPricing = [
  {
    name: "Compact Car",
    subtitle: "Vinfast Fadil or similar",
    rates: [
      { label: "Daily", value: "$50" },
      { label: "Weekly", value: "$250" },
      { label: "Monthly", value: "$600" },
    ],
    features: [
      "Perfect for city navigation & short trips",
      "4 passengers + luggage space",
      "VETC card for toll roads included",
      "Free delivery within Haiphong",
    ],
    popular: false,
    ctaText: "Reserve Compact Car",
  },
  {
    name: "Sedan / Small SUV",
    subtitle: "Honda CRV or similar",
    rates: [
      { label: "Daily", value: "$90" },
      { label: "Weekly", value: "$400" },
      { label: "Monthly", value: "$900" },
    ],
    features: [
      "Comfortable for business or family travel",
      "5 passengers with premium comfort",
      "Full insurance & VETC included",
      "24/7 driver service available (extra)",
    ],
    popular: true,
    ctaText: "Book Sedan Now",
  },
  {
    name: "7-Seater SUV",
    subtitle: "Vinfast Lux SA or similar",
    rates: [
      { label: "Daily", value: "$130" },
      { label: "Weekly", value: "$690" },
      { label: "Monthly", value: "$1,380" },
    ],
    features: [
      "Spacious for families & group tours",
      "7 passengers with ample luggage room",
      "Premium interior & advanced safety",
      "Airport pickup & long-distance ready",
    ],
    popular: false,
    ctaText: "Check SUV Availability",
  },
];

const PricingCard = ({ plan, index, vehicleType }) => {
  const ref = useRef(null);
  const isInView = useRevealInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <>
      <VispaicoContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        context={{
          vehicleName: plan.name,
          vehiclePrice: plan.rates[0].value,
          messageType: "rental",
        }}
      />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: index * 0.1 },
          },
        }}
        className="h-full"
      >
      <Card
        className={`h-full border-2 ${
          plan.popular
            ? vehicleType === "motorbike"
              ? "border-green-600 shadow-xl shadow-green-100"
              : "border-blue-600 shadow-xl shadow-blue-100"
            : "border-gray-200"
        } relative overflow-hidden transition-all duration-300`}
      >
        {plan.popular && (
          <div className="absolute top-0 right-0">
            <div className={`${
              vehicleType === "motorbike" ? "bg-green-600" : "bg-blue-600"
            } text-white text-xs font-semibold py-1 px-4 rounded-bl-lg`}>
              Most Popular
            </div>
          </div>
        )}
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {plan.name}
          </CardTitle>
          {plan.subtitle && (
            <p className={`mt-2 text-sm uppercase tracking-wide ${
              vehicleType === "motorbike" ? "text-green-600" : "text-blue-600"
            } font-semibold`}>
              {plan.subtitle}
            </p>
          )}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {plan.rates.map((rate) => (
              <div key={rate.label} className="rounded-lg border border-gray-200 py-3 bg-gray-50">
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  {rate.label}
                </p>
                <p className="text-xl font-extrabold text-gray-900">{rate.value}</p>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <div
                  className={`flex-shrink-0 h-5 w-5 rounded-full ${
                    plan.popular 
                      ? vehicleType === "motorbike" 
                        ? "bg-green-600" 
                        : "bg-blue-600"
                      : "bg-gray-200"
                  } flex items-center justify-center mr-2 mt-0.5`}
                >
                  <Check
                    className={`h-3 w-3 ${
                      plan.popular ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setIsModalOpen(true)}
            className={`w-full ${
              plan.popular
                ? vehicleType === "motorbike"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-800 hover:bg-gray-900"
            } text-white transition-colors duration-300`}
          >
            {plan.ctaText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
    </>
  );
};

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useRevealInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [vehicleType, setVehicleType] = useState("motorbike");
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const currentPricing = vehicleType === "motorbike" ? motorbikePricing : carPricing;

  return (
    <section id="pricing" className="py-20 bg-gray-50">
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
            Transparent <span className={vehicleType === "motorbike" ? "text-green-600" : "text-blue-600"}>Pricing</span> & Free Add-ons
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the ride that matches your trip. Every rental includes premium service,
            free hotel delivery within Haiphong, and 24/7 roadside support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0, transition: { delay: 0.3 } } : { opacity: 0, y: 20 }}
          className="flex justify-center mb-12"
        >
          <div className="relative inline-flex items-center bg-white rounded-full p-1 shadow-lg border-2 border-gray-200">
            <motion.div
              className={`absolute top-1 bottom-1 left-1 rounded-full ${
                vehicleType === "motorbike" ? "bg-green-500" : "bg-blue-500"
              } shadow-md`}
              initial={false}
              animate={{
                x: vehicleType === "motorbike" ? 0 : "100%",
                width: vehicleType === "motorbike" ? "calc(50% - 4px)" : "calc(50% - 4px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setVehicleType("motorbike")}
              className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-colors duration-300 ${
                vehicleType === "motorbike"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Bike className="w-5 h-5" />
              <span>Motorbikes</span>
            </button>
            <button
              onClick={() => setVehicleType("car")}
              className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-colors duration-300 ${
                vehicleType === "car"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Car className="w-5 h-5" />
              <span>Cars</span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={vehicleType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {currentPricing.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} vehicleType={vehicleType} />
            ))}
          </motion.div>
        </AnimatePresence>

        <VispaicoContactModal
          isOpen={isCustomModalOpen}
          onClose={() => setIsCustomModalOpen(false)}
          context={{
            messageType: "custom",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, transition: { delay: 0.6 } }
              : { opacity: 0, y: 20 }
          }
          className="mt-16 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto text-center"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Need Airport Pickup, Chauffeur or Monthly Corporate Rates?
          </h3>
          <p className="text-gray-600 mb-6">
            We create custom packages for long-term rentals, expat relocations and film crews.
            Share your dates and vehicle requirements and we'll send a tailored quote within 2 hours.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => setIsCustomModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Request Custom Quote
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, transition: { delay: 0.8 } }
              : { opacity: 0, y: 20 }
          }
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          {[ 
            "Insurance upgrades and damage waiver available on request",
            "Unlimited mileage for all rentals with complimentary maintenance",
            "Flexible delivery to Cat Bi Airport, Ha Long and Cat Ba (fee applies)"
          ].map((item, index) => (
            <div key={index} className="flex items-start bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <Check className="mt-1 mr-3 h-5 w-5 text-blue-600" />
              <p className="text-gray-600">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
