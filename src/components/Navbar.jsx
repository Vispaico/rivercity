import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false); 
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Motorbikes", path: "/motorbikes" },
    { name: "Cars", path: "/cars" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/#contact" }, 
  ];

  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <img src="/rivercity_logo_car.png" alt="RiverCity Bike Rentals" className="h-10 w-auto" width="80" height="80" />
              <span className={`text-xl sm:text-2xl font-bold ml-1 ${isScrolled || !isHomePage ? "text-blue-600" : "text-blue-200"}`}>
                RiverCity
              </span>
              <span className={`text-xl sm:text-2xl font-bold ml-1 ${isScrolled || !isHomePage ? "text-gray-600" : "text-white"}`}>
                Bike Rentals
              </span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.path.startsWith("/#") ? (
                  <a
                    href={item.path}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                      isScrolled || !isHomePage ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                      isScrolled || !isHomePage ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-2"
          >
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full ${isScrolled || !isHomePage ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" : "text-white hover:text-blue-600 hover:bg-white/20" } `}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <a href="tel:+84902197160">
              <Button
                size="sm"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Phone className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </a>
          </motion.div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled || !isHomePage ? "text-gray-800" : "text-white"}
              aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                 item.path.startsWith("/#") ? (
                  <a
                    key={item.name}
                    href={item.path}
                    className="text-gray-800 hover:text-blue-600 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-800 hover:text-blue-600 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link to="/dashboard" className="text-gray-800 hover:text-blue-600 py-2 text-sm font-medium flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </Link>
              <Button
                variant="default"
                size="sm"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white w-full mt-3"
                asChild
              >
                <a href="tel:+84902197160">
                  <Phone className="mr-2 h-4 w-4" />
                  Book Now
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;