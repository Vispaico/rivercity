import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import CarRentalPage from "@/pages/CarRentalPage";
import MotorbikeRentalPage from "@/pages/MotorbikeRentalPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import CookiesPage from "@/pages/CookiesPage";
import TermsOfUsePage from "@/pages/TermsOfUsePage";
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import Chatbot from "@/components/Chatbot";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScrollAnimation = () => {
      const scrollElements = document.querySelectorAll(".scroll-animation");
      scrollElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation(); 
    
    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
    };
  }, [location.pathname]); 

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cars" element={<CarRentalPage />} />
          <Route path="/motorbikes" element={<MotorbikeRentalPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      <Chatbot />
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
}

export default App;