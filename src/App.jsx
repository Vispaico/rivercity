import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import VispaicoWheel from "@/components/VispaicoWheel";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const CarRentalPage = lazy(() => import("@/pages/CarRentalPage"));
const MotorbikeRentalPage = lazy(() => import("@/pages/MotorbikeRentalPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const CookiesPage = lazy(() => import("@/pages/CookiesPage"));
const TermsOfUsePage = lazy(() => import("@/pages/TermsOfUsePage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const DashboardBlogPage = lazy(() => import("@/pages/DashboardBlogPage"));
const DashboardPostForm = lazy(() => import("@/pages/DashboardPostForm"));
const BookingPage = lazy(() => import("@/pages/BookingPage"));
const BookingSuccessPage = lazy(() => import("@/pages/BookingSuccessPage"));
const DashboardVehiclesPage = lazy(() => import("@/pages/DashboardVehiclesPage"));

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
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cars" element={<CarRentalPage />} />
              <Route path="/motorbikes" element={<MotorbikeRentalPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/terms-of-use" element={<TermsOfUsePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/book/success/:id" element={<BookingSuccessPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/vehicles" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <DashboardVehiclesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/blog" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <DashboardBlogPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/blog/new" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <DashboardPostForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/blog/edit/:id" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <DashboardPostForm />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </Suspense>
        </main>
        <VispaicoWheel />
        <Footer />
        <Toaster />
      </div>
    </HelmetProvider>
  );
}

export default App;