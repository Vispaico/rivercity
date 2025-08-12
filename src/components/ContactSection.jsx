import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    toast({
      title: "Message Submission Pending",
      description: `Name: ${name}, Email: ${email}, Subject: ${subject}. Backend functionality needed.`,
      duration: 7000,
      className: "bg-yellow-500 text-black",
    });
    e.target.reset();
  };

  return (
    <section id="contact" className="py-20 bg-white">
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
            Get in <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to book? Contact us for quick assistance or
            visit our shop in Haiphong.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, transition: { delay: 0.2 } }
                : { opacity: 0, x: -30 }
            }
            className="flex flex-col"
          >
            <div className="bg-gray-50 p-8 rounded-xl h-full">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 p-3 rounded-full mr-4 shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Our Location
                    </h4>
                    <p className="text-gray-600">
                      23/32 To 2 Xom Trung, Ngo Quyen District
                      <br />
                      Haiphong, Vietnam
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 p-3 rounded-full mr-4 shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Phone Number
                    </h4>
                    <a href="tel:+84902197160" className="text-gray-600 hover:text-blue-600 block">+84 (0) 902 197 160 (WhatsApp & Zalo)</a>
                    <a href="tel:+84936166892" className="text-gray-600 hover:text-blue-600 block">+84 (0) 936 166 892 (WhatsApp & Zalo)</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 p-3 rounded-full mr-4 shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <a href="mailto:info@rivercitybikerentals.com" className="text-gray-600 hover:text-blue-600 block">info@rivercitybikerentals.com</a>
                    <a href="mailto:booking@rivercitybikerentals.com" className="text-gray-600 hover:text-blue-600 block">booking@rivercitybikerentals.com</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 p-3 rounded-full mr-4 shrink-0">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Opening Hours
                    </h4>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 10:00 PM
                    </p>
                    <p className="text-gray-600">
                      Saturday - Sunday: 7:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 h-96 w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
                 <iframe
                    src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;coord=20.838411,106.709917&amp;q=Rivercity%20Bike%20Rentals%2C%2019%2C%20B%E1%BA%BFn%20L%C3%A1ng%2C%20H%E1%BA%A3i%20Ph%C3%B2ng+(Rivercity%20Bike%20Rentals)&amp;ie=UTF8&amp;t=h&amp;z=13&amp;iwloc=A&amp;output=embed"
                    width="100%"
                    height="100%"
                    style={{ border:0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rivercity Bike Rentals Location"
                  ></iframe>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, transition: { delay: 0.4 } }
                : { opacity: 0, x: 30 }
            }
          >
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Bike Rental Inquiry"
                    required
                    className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="I'm interested in renting a bike for my trip to Haiphong..."
                    rows={5}
                    required
                    className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;