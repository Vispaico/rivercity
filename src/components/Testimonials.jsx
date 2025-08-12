
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "United States",
    avatar: "sarah-johnson",
    rating: 5,
    text: "Renting from RiverCity Bikes was the highlight of my Vietnam trip! The Honda Vision was perfect for exploring Haiphong's narrow streets and the staff gave us amazing local tips.",
  },
  {
    name: "David Chen",
    location: "Singapore",
    avatar: "david-chen",
    rating: 5,
    text: "The Yamaha XSR155 was in perfect condition and made my countryside exploration incredible. The team was professional and the rental process was smooth and hassle-free.",
  },
  {
    name: "Emma Wilson",
    location: "Australia",
    avatar: "emma-wilson",
    rating: 4,
    text: "Great service and well-maintained bikes. The weekly rental package was excellent value, and the included rain gear came in handy! Would definitely recommend.",
  },
  {
    name: "Takashi Yamamoto",
    location: "Japan",
    avatar: "takashi-yamamoto",
    rating: 5,
    text: "The Royal Enfield Himalayan was perfect for my adventure around Haiphong. The staff was incredibly helpful with route suggestions and local knowledge.",
  },
];

const TestimonialCard = ({ testimonial, index }) => {
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
    >
      <div className="testimonial-card p-6 rounded-xl h-full flex flex-col">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4 border-2 border-blue-600">
            <AvatarImage src="" alt={testimonial.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-gray-400">{testimonial.name}</h3>
            <p className="text-sm text-gray-200">{testimonial.location}</p>
          </div>
        </div>

        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-gray-100 italic flex-grow">{testimonial.text}</p>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      id="testimonials"
      className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-90">
        <img 
          alt="Map of Haiphong, Vietnam"
          className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1696215104193-65e6b5467523?w=400&auto=format&fit=crop" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-200">
            What Our <span className="text-blue-400">Riders</span> Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hear from travelers who explored Haiphong with our bikes and
            experienced our service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
