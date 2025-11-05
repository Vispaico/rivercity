
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jesper Tost",
    location: "Denmark",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUZsRAPiQSmDYUz8_Kbd7x4ZOQ33oQqtE_h5CO5zi8cEf7AWAMR=w72-h72-p-rp-mo-ba5-br100",
    rating: 5,
    text: "I rented a Yamaha NVX here for a little over a week and was very satisfied! The owner is an incredibly pleasant person, who was also very flexible with both pick-up and drop-off. If you come to Hai Phong, this is definitely where you should rent 👌🏼",
  },
  {
    name: "Henney Lee",
    location: "South Korea",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocL6XuKSq0KODV5FACkT7H2wl3GYgK0NWGeHLvTP2ESkzZU58w=w72-h72-p-rp-mo-ba3-br100",
    rating: 5,
    text: "I rent a bike for 1 day, this rental shop is the best. The Mr.Niels bring bike to my hotel. He was really nice. I will use this service when I come Hai phong again! Thank you!",
  },
  {
    name: "Nadya Yaroslavtseva",
    location: "Russia",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVoBQkTlfWEEqTN3tUGqBDKXt__j6zpSwk955Q5_0RPNp79dqM=w72-h72-p-rp-mo-ba4-br100",
    rating: 5,
    text: "The owner and owner are wonderful, very warm people. We are incredibly happy that fate brought us to their office. We also rented a Yamaha NWX-155 bike from them, in excellent condition and at a very attractive price. We wish these wonderful people health, prosperity, and all the best.",
  },
  {
    name: "Matilde Vietti",
    location: "Italy",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKBnpY58bw6J8-jIej7eOOO7_wk1MlwTu06_F02PbLbWb84Uw=w72-h72-p-rp-mo-br100",
    rating: 5,
    text: "Amazing service. Niels and his wife were incredibly kind and helpful. The scooter we rented was perfect.",
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
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-gray-400">{testimonial.name}</h3>
            <p className="text-sm text-gray-400">{testimonial.location}</p>
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

        <p className="text-gray-300 italic flex-grow">{testimonial.text}</p>
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
         src="https://images.unsplash.com/photo-1696215104193-65e6b5467523?w=400&auto=format&fit=crop" 
         srcSet="https://images.unsplash.com/photo-1696215104193-65e6b5467523?w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1696215104193-65e6b5467523?w=800&auto=format&fit=crop 800w, https://images.unsplash.com/photo-1696215104193-65e6b5467523?w=1200&auto=format&fit=crop 1200w"
         sizes="100vw" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-400">
            What Our <span className="text-blue-400">Riders</span> Say
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
