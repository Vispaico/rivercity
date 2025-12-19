import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard } from "lucide-react";
import VispaicoContactModal from "@/components/VispaicoContactModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
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
    { name: "Earn", path: "/rent-out" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
  ];

  const isHomePage = location.pathname === "/";

  return (
    <>
      <VispaicoContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        context={{}}
      />
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-black/60 backdrop-blur-md shadow-md py-2"
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
              <span className={`text-xl sm:text-2xl font-bold ml-1 ${isScrolled || !isHomePage ? "text-blue-400" : "text-blue-500"}`}>
                Rivercity
              </span>
              <span className={`text-xl sm:text-2xl font-bold ml-1 ${isScrolled || !isHomePage ? "text-white" : "text-white"}`}>
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
                      isScrolled || !isHomePage ? "text-white" : "text-white"
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                      isScrolled || !isHomePage ? "text-white" : "text-white"
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
                size="lg"
                className={`rounded-full ${isScrolled || !isHomePage ? "text-white text-lg hover:text-blue-600 hover:bg-blue-50" : "text-white text-lg hover:text-blue-600 hover:bg-white/20" } `}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Button
              onClick={() => setIsContactModalOpen(true)}
              size="lg"
              className="text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get Quick Quotes and Info
            </Button>
          </motion.div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled || !isHomePage ? "text-white" : "text-white"}
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
                onClick={() => {
                  setIsContactModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                variant="default"
                size="sm"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white w-full mt-3"
              >
                Get Quick Quotes and Info
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
};

export default Navbar;