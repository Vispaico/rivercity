import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import VispaicoWheel from "@/components/VispaicoWheel";
import AdBanner from "@/components/AdBanner";

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
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const GuidesPage = lazy(() => import("@/pages/GuidesPage"));
const HaiphongTravelGuidePage = lazy(() => import("@/pages/guides/HaiphongTravelGuidePage"));
const LivingInHaiphongExpatGuidePage = lazy(() => import("@/pages/guides/LivingInHaiphongExpatGuidePage"));
const MotorbikeRentalGuideVietnamPage = lazy(() => import("@/pages/guides/MotorbikeRentalGuideVietnamPage"));
const NorthernVietnamRoadTripsPage = lazy(() => import("@/pages/guides/NorthernVietnamRoadTripsPage"));
const DashboardBlogPage = lazy(() => import("@/pages/DashboardBlogPage"));
const DashboardPostForm = lazy(() => import("@/pages/DashboardPostForm"));
const BookingPage = lazy(() => import("@/pages/BookingPage"));
const BookingSuccessPage = lazy(() => import("@/pages/BookingSuccessPage"));
const DashboardVehiclesPage = lazy(() => import("@/pages/DashboardVehiclesPage"));
const PartnerPortalPage = lazy(() => import("@/pages/PartnerPortalPage"));
const DashboardMarketplacePage = lazy(() => import("@/pages/DashboardMarketplacePage"));
const RentOutVehiclePage = lazy(() => import("@/pages/RentOutVehiclePage"));
const VehicleDetailPage = lazy(() => import("@/pages/VehicleDetailPage"));

function App() {
  const location = useLocation();

  const path = location.pathname || "/";
  const hasInlineAd =
    path.startsWith("/guides") ||
    path.startsWith("/blog/") ||
    path.startsWith("/cars/") ||
    path.startsWith("/motorbikes/");
  const showGlobalAd = path !== "/" && !hasInlineAd;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) return;

    const id = decodeURIComponent(location.hash.replace('#', '')).trim();
    if (!id) return;

    let tries = 0;
    const maxTries = 30;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      tries += 1;
      if (tries >= maxTries) return;
      requestAnimationFrame(tryScroll);
    };

    requestAnimationFrame(tryScroll);
  }, [location.hash]);

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
              <Route path="/cars/:slug" element={<VehicleDetailPage category="car" />} />
              <Route path="/motorbikes" element={<MotorbikeRentalPage />} />
              <Route path="/motorbikes/:slug" element={<VehicleDetailPage category="motorbike" />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/terms-of-use" element={<TermsOfUsePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />

              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/guides/" element={<GuidesPage />} />
              <Route path="/guides/haiphong-travel-guide" element={<HaiphongTravelGuidePage />} />
              <Route path="/guides/living-in-haiphong-expat-guide" element={<LivingInHaiphongExpatGuidePage />} />
              <Route path="/guides/motorbike-rental-guide-vietnam" element={<MotorbikeRentalGuideVietnamPage />} />
              <Route path="/guides/northern-vietnam-road-trips" element={<NorthernVietnamRoadTripsPage />} />

              <Route path="/book" element={<BookingPage />} />
              <Route path="/book/success/:id" element={<BookingSuccessPage />} />
              <Route path="/rent-out" element={<RentOutVehiclePage />} />
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
                path="/dashboard/partner" 
                element={
                  <ProtectedRoute>
                    <PartnerPortalPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/marketplace" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <DashboardMarketplacePage />
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
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </Suspense>
        </main>

        {showGlobalAd && (
          <div className="border-t bg-gray-50">
            <div className="container mx-auto px-4 py-6">
              <div className="flex justify-center">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Advertisement</p>
                  <div className="mx-auto flex h-[70px] w-[340px] items-center justify-center rounded-md border border-dashed border-gray-200 bg-white">
                    <AdBanner />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <VispaicoWheel />
        <Footer />
        <Toaster />
      </div>
    </HelmetProvider>
  );
}

export default App;