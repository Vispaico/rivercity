import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import useRevealInView from "@/hooks/useRevealInView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock, Send, Navigation } from "lucide-react";

const WhatsAppIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const ZaloIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...props}>
    <rect width="50" height="50" rx="12" fill="#0A94FF" />
    <text x="25" y="30" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">Zalo</text>
  </svg>
);

const MessengerIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.448 5.51 3.717 7.22V22l3.406-1.87c.91.252 1.876.387 2.877.387 5.523 0 10-4.145 10-9.243C22 6.144 17.523 2 12 2zm.993 12.415l-2.567-2.74-5.008 2.74 5.51-5.845 2.63 2.74 4.945-2.74-5.51 5.845z" />
  </svg>
);

const ContactSection = () => {
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useRevealInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  const [quickEmail, setQuickEmail] = useState("");
  const [quickMessage, setQuickMessage] = useState("");
  const [quickSending, setQuickSending] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleQuickInquirySubmit = async (e) => {
    e.preventDefault();

    const email = quickEmail.trim();
    const message = quickMessage.trim();

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address so we can reply.",
        variant: "destructive",
      });
      return;
    }

    if (!/.+@.+\..+/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!message) {
      toast({
        title: "Message required",
        description: "Please type a short message so we know how to help.",
        variant: "destructive",
      });
      return;
    }

    setQuickSending(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
          source: "contact_section",
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error || "Failed to send.");
      }

      toast({
        title: "Message sent",
        description: "Thanks — we’ll reply to your email shortly.",
        className: "bg-blue-500 text-white",
      });
      setQuickEmail("");
      setQuickMessage("");
    } catch (err) {
      toast({
        title: "Could not send message",
        description: err?.message || "Please try again, or use WhatsApp/Zalo.",
        variant: "destructive",
      });
    } finally {
      setQuickSending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const botFieldValue = formData.get("company");

    if (botFieldValue) {
      return;
    }

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const vehicle = formData.get("vehicle");
    const message = formData.get("message");

    toast({
      title: "Message Submission Pending",
      description: `${name || "Guest"} | ${email}${phone ? ` | ${phone}` : ""
        } | ${vehicle || "Vehicle TBD"} (${startDate} - ${endDate}). Message preview: ${message.slice(0, 60)}${message.length > 60 ? "…" : ""
        }. Backend integration required for sending.`,
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
            Have questions or ready to book?<br />Can't find the motorbike or car you're looking for or have specific requirements?<br />Our team is here to help you find the perfect vehicle for your needs.<br />Contact us for quick assistance or
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
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 p-3 rounded-full mr-4 shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Our Location
                    </h4>
                    <p className="text-gray-600 mb-2">
                      23/32 To 2 Xom Trung, Ngo Quyen District
                      <br />
                      Haiphong, Vietnam
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      asChild
                    >
                      <a
                        href="https://maps.app.goo.gl/h3i7dKKjHPc1UhmT6"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Navigation className="mr-2 h-4 w-4" />
                        Open in Maps
                      </a>
                    </Button>
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

              <div className="mt-8 bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-100">
                <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
                  Quick Contact Options
                </h4>
                <p className="text-center text-sm text-gray-600 mb-4">
                  Choose your preferred way to reach us
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    href="https://wa.me/84902197160?text=Hi%20Rivercity!%20I%20have%20a%20question%20about%20rentals."
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <WhatsAppIcon className="w-8 h-8" />
                    <span className="text-sm font-semibold">WhatsApp</span>
                  </motion.a>

                  <motion.a
                    href="https://www.facebook.com/RiverCityBikeRentals/"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <MessengerIcon className="w-8 h-8" />
                    <span className="text-sm font-semibold">Messenger</span>
                  </motion.a>

                  <motion.a
                    href="https://zalo.me/0902197160"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <ZaloIcon className="w-8 h-8" />
                    <span className="text-sm font-semibold">Zalo</span>
                  </motion.a>

                  <motion.a
                    href="tel:+84902197160"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Phone className="w-8 h-8" />
                    <span className="text-sm font-semibold">Phone</span>
                  </motion.a>

                  <motion.a
                    href="mailto:info@rivercitybikerentals.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg col-span-2"
                  >
                    <Mail className="w-8 h-8" />
                    <span className="text-sm font-semibold">Email Us</span>
                  </motion.a>
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Available 7 days a week • Response within 2 hours
                </p>
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
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Quick question?</h3>
                <p className="text-gray-600 mb-4">
                  Send a short message and we’ll reply by email.
                </p>

                <form onSubmit={handleQuickInquirySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quick_inquiry_email">Email</Label>
                    <Input
                      id="quick_inquiry_email"
                      type="email"
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quick_inquiry_message">Message</Label>
                    <Textarea
                      id="quick_inquiry_message"
                      value={quickMessage}
                      onChange={(e) => setQuickMessage(e.target.value)}
                      placeholder="Tell us what you need (dates, vehicle type, pickup location, etc.)"
                      rows={4}
                      required
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={quickSending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {quickSending ? "Sending…" : "Send message"}
                  </Button>
                </form>
              </div>

              <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  Secure Your Ride
                </h3>
                <p className="text-gray-600 mb-6">
                  Complete the form and we will reply within two working hours with availability,
                  insurance options and confirmation details.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="sr-only">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Traveler"
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

                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp or Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+84 902 197 160"
                    required
                    className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Pickup Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      required
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Return Date</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      required
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle Preference</Label>
                  <select
                    id="vehicle"
                    name="vehicle"
                    required
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a vehicle
                    </option>
                    <option value="Honda Wave 110cc">Honda Wave 110cc</option>
                    <option value="Honda Airblade 125cc">Honda Airblade 125cc</option>
                    <option value="Yamaha NVX 155cc">Yamaha NVX 155cc</option>
                    <option value="VinFast Fadil">VinFast Fadil</option>
                    <option value="Honda CR-V">Honda CR-V</option>
                    <option value="VinFast Lux SA">VinFast Lux SA (7 seats)</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;