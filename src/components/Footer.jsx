import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
} from "lucide-react";

const TikTokIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.235 6.035a4.514 4.514 0 01-4.27 4.127v5.363a4.007 4.007 0 11-4.007-4.007h3.932V6.035c0-2.21 1.795-4.005 4.005-4.005s4.005 1.795 4.005 4.005c0 .18-.012.357-.035.53a4.51 4.51 0 01-3.63 3.497z" />
  </svg>
);


const Footer = () => {
  const { toast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    toast({
      title: "Subscription Pending",
      description: `Attempting to subscribe ${email}. Backend functionality needed.`,
      duration: 5000,
    });
    e.target.reset();
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Motorbikes", path: "/motorbikes" },
    { name: "Cars", path: "/cars" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/#contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Use", path: "/terms-of-use" },
    { name: "Cookie Policy", path: "/cookies" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-6">
              <span className="text-xl sm:text-2xl font-bold text-blue-400">
                RiverCity
              </span>
              <span className="text-xl sm:text-2xl font-bold ml-1 text-white">
                Bike Rentals
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Premium vehicle rental service in Haiphong, Vietnam. Explore the
              city and countryside with our high-quality bikes and cars.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="bg-gray-800 hover:bg-blue-600 transition-colors p-2 rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 transition-colors p-2 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 transition-colors p-2 rounded-full"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 transition-colors p-2 rounded-full"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our TikTok channel"
                className="bg-gray-800 hover:bg-blue-600 transition-colors p-2 rounded-full"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-lg mb-6">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                   {link.path.startsWith("/#") ? (
                     <a href={link.path} className="text-gray-400 hover:text-blue-400 transition-colors">
                       {link.name}
                     </a>
                   ) : (
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                   )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-lg mb-6">Contact Info</p>
            <ul className="space-y-3 text-gray-400">
              <li>23/32 To 2 Xom Trung, Ngo Quyen District</li>
              <li>Haiphong, Vietnam</li>
              <li><a href="tel:+84902197160" className="hover:text-blue-400 transition-colors">+84 (0) 902 197 160</a></li>
              <li><a href="mailto:info@rivercitybikerentals.com" className="hover:text-blue-400 transition-colors">info@rivercitybikerentals.com</a></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-lg mb-6">Newsletter</p>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates on new vehicles and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" aria-label="Subscribe">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} RiverCity Bike Rentals. All rights
              reserved.
            </p>
            <ul className="flex space-x-6">
              {legalLinks.map((link) => (
                <li key={link.name} className="list-none">
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;