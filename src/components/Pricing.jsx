
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Daily Rental",
    price: "4-130",
    description: "Perfect for short trips and city exploration",
    features: [
      "24-hour rental period",
      "Helmet included",
      "Basic insurance coverage",
      "City map provided",
      "Fuel not included",
    ],
    popular: false,
    buttonText: "Rent by Day",
  },
  {
    name: "Weekly Adventure",
    price: "20-650",
    description: "Ideal for exploring Haiphong and surrounding areas",
    features: [
      "7-day rental period",
      "Helmet and rain gear included",
      "Comprehensive insurance",
      "Digital route suggestions",
      "24/7 roadside assistance",
      "10% discount on extensions",
    ],
    popular: true,
    buttonText: "Rent by Week",
  },
  {
    name: "Monthly Explorer",
    price: "50-2000",
    description: "For extended stays and thorough exploration",
    features: [
      "30-day rental period",
      "Complete safety gear package",
      "Premium insurance coverage",
      "Maintenance included",
      "Free bike replacement",
      "Unlimited mileage",
      "20% discount on extensions",
    ],
    popular: false,
    buttonText: "Rent by Month",
  },
];

const PricingCard = ({ plan, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
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
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-extrabold text-gray-900">
              ${plan.price}
            </span>
            <span className="ml-1 text-xl text-gray-500">/period</span>
          </div>
          <p className="mt-2 text-gray-600">{plan.description}</p>
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
            className={`w-full ${
              plan.popular
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-800 hover:bg-gray-900"
            } text-white`}
          >
            {plan.buttonText}
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
            Simple, Transparent <span className="text-blue-600">Pricing</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the rental period that suits your adventure needs. All prices
            vary based on the bike model you select.
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
            Need a Custom Rental Plan?
          </h3>
          <p className="text-gray-600 mb-4">
            Contact us for special arrangements, group discounts, or long-term
            rentals beyond one month.
          </p>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Contact for Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
