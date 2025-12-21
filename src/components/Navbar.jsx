import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, ChevronDown } from "lucide-react";
import VispaicoContactModal from "@/components/VispaicoContactModal";
import { guides } from "@/lib/guides";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);
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
    setMobileGuidesOpen(false);
  }, [location.pathname]);

  const navItemsLeft = [
    { name: "Home", path: "/" },
    { name: "Motorbikes", path: "/motorbikes" },
    { name: "Cars", path: "/cars" },
    { name: "Earn", path: "/rent-out" },
  ];

  const navItemsRight = [
    { name: "Blog", path: "/blog" },
  ];

  const guideItems = guides.map((g) => ({ name: g.title, path: g.href }));

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
                RiverCity
              </span>
              <span className={`text-xl sm:text-2xl font-bold ml-1 ${isScrolled || !isHomePage ? "text-white" : "text-white"}`}>
                Bike Rentals
              </span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItemsLeft.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.path.startsWith("/#") ? (
                  <a
                    href={item.path}
                    className={`text-base font-medium transition-colors hover:text-blue-600 ${
                      isScrolled || !isHomePage ? "text-white" : "text-white"
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-base font-medium transition-colors hover:text-blue-600 ${
                      isScrolled || !isHomePage ? "text-white" : "text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}

            <motion.div
              key="Guides"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: navItemsLeft.length * 0.1 }}
              className="relative"
            >
              <DropdownMenu.Root modal={false}>
                <DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 text-base font-medium transition-colors hover:text-blue-600 ${
                      isScrolled || !isHomePage ? "text-white" : "text-white"
                    }`}
                    aria-label="Open guides menu"
                  >
                    Guides
                    <ChevronDown className="h-4 w-4 opacity-80" />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    sideOffset={10}
                    align="start"
                    className="z-50 w-[320px] overflow-hidden rounded-2xl border bg-white shadow-xl"
                  >
                    <div className="p-4 border-b bg-gray-50">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Travel Guides</p>
                      <p className="mt-1 text-sm text-gray-700">Big, evergreen guides (not blog posts).</p>
                    </div>
                    <div className="p-2">
                      {guideItems.map((g) => (
                        <DropdownMenu.Item key={g.path} asChild>
                          <Link
                            to={g.path}
                            className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-900 outline-none hover:bg-blue-50 hover:text-blue-800 focus:bg-blue-50 focus:text-blue-800"
                          >
                            {g.name}
                          </Link>
                        </DropdownMenu.Item>
                      ))}

                      <DropdownMenu.Separator className="my-2 h-px bg-gray-200" />

                      <DropdownMenu.Item asChild>
                        <Link
                          to="/guides"
                          className="block rounded-xl px-3 py-2 text-sm font-semibold text-blue-700 outline-none hover:bg-blue-50 focus:bg-blue-50"
                        >
                          View All Guides →
                        </Link>
                      </DropdownMenu.Item>
                    </div>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </motion.div>

            {navItemsRight.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (navItemsLeft.length + 1 + index) * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`text-base font-medium transition-colors hover:text-blue-600 ${
                    isScrolled || !isHomePage ? "text-white" : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
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
                className={`rounded-full ${isScrolled || !isHomePage ? "text-white text-base hover:text-blue-600 hover:bg-blue-50" : "text-white text-lg hover:text-blue-600 hover:bg-white/20" } `}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Button
              onClick={() => setIsContactModalOpen(true)}
              size="lg"
              className="text-base rounded-full bg-blue-600 hover:bg-blue-700 text-white"
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
              {[...navItemsLeft, { name: "Blog", path: "/blog" }].map((item) => {
                if (item.name === 'Blog') {
                  return (
                    <React.Fragment key="mobile-guides-block">
                      <button
                        type="button"
                        onClick={() => setMobileGuidesOpen((v) => !v)}
                        className="flex items-center justify-between text-gray-800 hover:text-blue-600 py-2 text-sm font-medium"
                        aria-expanded={mobileGuidesOpen}
                      >
                        <span>Travel Guides</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileGuidesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileGuidesOpen && (
                        <div className="ml-3 border-l pl-3 space-y-1">
                          {guideItems.map((g) => (
                            <Link
                              key={g.path}
                              to={g.path}
                              className="block text-gray-700 hover:text-blue-600 py-1.5 text-sm"
                            >
                              {g.name}
                            </Link>
                          ))}
                          <Link to="/guides" className="block text-blue-700 font-semibold hover:underline py-1.5 text-sm">
                            View All Guides →
                          </Link>
                        </div>
                      )}

                      <Link
                        to={item.path}
                        className="text-gray-800 hover:text-blue-600 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    </React.Fragment>
                  );
                }

                return item.path.startsWith("/#") ? (
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
                );
              })}
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