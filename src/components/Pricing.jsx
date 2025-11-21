
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Honda Wave 110cc",
    subtitle: "Budget-friendly city rider",
    rates: [
      { label: "Daily", value: "$5" },
      { label: "Weekly", value: "$25" },
      { label: "Monthly", value: "$100" },
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
  {
    name: "Honda Airblade 125cc",
    subtitle: "Most popular scooter",
    rates: [
      { label: "Daily", value: "$7" },
      { label: "Weekly", value: "$35" },
      { label: "Monthly", value: "$130" },
    ],
    features: [
      "Spacious under-seat storage",
      "Smart key & ABS braking",
      "Free delivery within Haiphong",
      "24/7 roadside assistance included",
    ],
    popular: true,
    ctaText: "Book Airblade Now",
  },
  {
    name: "Yamaha NVX 155cc",
    subtitle: "Premium touring scooter",
    rates: [
      { label: "Daily", value: "$10" },
      { label: "Weekly", value: "$50" },
      { label: "Monthly", value: "$180" },
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
];

const PricingCard = ({ plan, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const whatsappMessage = encodeURIComponent(
    `Hi Rivercity! I am interested in renting the ${plan.name}.`
  );

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
            ? "border-blue-600 shadow-xl shadow-blue-100"
            : "border-gray-200"
        } relative overflow-hidden`}
      >
        {plan.popular && (
          <div className="absolute top-0 right-0">
            <div className="bg-blue-600 text-white text-xs font-semibold py-1 px-4 rounded-bl-lg">
              Most Popular
            </div>
          </div>
        )}
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {plan.name}
          </CardTitle>
          {plan.subtitle && (
            <p className="mt-2 text-sm uppercase tracking-wide text-blue-600 font-semibold">
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
                    plan.popular ? "bg-blue-600" : "bg-gray-200"
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
            asChild
            className={`w-full ${
              plan.popular
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-800 hover:bg-gray-900"
            } text-white`}
          >
            <a
              href={`https://wa.me/84902197160?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              {plan.ctaText}
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Transparent <span className="text-blue-600">Pricing</span> & Free Add-ons
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the ride that matches your trip. Every rental includes premium helmets,
            free hotel delivery within Haiphong, phone holder, rain poncho and on-demand roadside support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>

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
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <a href="#contact">Request Custom Quote</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <a
                href="https://wa.me/84902197160?text=Hi%20Rivercity!%20I%20need%20a%20custom%20rental%20quote."
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <a
                href="https://zalo.me/0902197160"
                target="_blank"
                rel="noreferrer"
              >
                Chat on Zalo
              </a>
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
