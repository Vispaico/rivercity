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
const VietnamTravelFaqPage = lazy(() => import("@/pages/vietnam-travel-faq"));
const VietnamFaq1 = lazy(() => import("@/pages/vietnam-travel-faq/is-vietnam-safe-to-visit"));
const VietnamFaq2 = lazy(() => import("@/pages/vietnam-travel-faq/is-1000-enough-for-2-weeks-in-vietnam"));
const VietnamFaq3 = lazy(() => import("@/pages/vietnam-travel-faq/which-is-safer-vietnam-or-thailand"));
const VietnamFaq4 = lazy(() => import("@/pages/vietnam-travel-faq/what-not-to-bring-to-vietnam"));
const VietnamFaq5 = lazy(() => import("@/pages/vietnam-travel-faq/brush-teeth-tap-water-vietnam"));
const VietnamFaq6 = lazy(() => import("@/pages/vietnam-travel-faq/what-to-be-careful-of-when-visiting-vietnam"));
const VietnamFaq7 = lazy(() => import("@/pages/vietnam-travel-faq/bed-bugs-common-in-vietnam"));
const VietnamFaq8 = lazy(() => import("@/pages/vietnam-travel-faq/when-not-to-go-to-vietnam"));
const VietnamFaq9 = lazy(() => import("@/pages/vietnam-travel-faq/most-common-crime-in-vietnam"));
const VietnamFaq10 = lazy(() => import("@/pages/vietnam-travel-faq/use-us-dollars-in-vietnam"));
const VietnamFaq11 = lazy(() => import("@/pages/vietnam-travel-faq/vietnam-cheaper-than-thailand"));
const VietnamFaq12 = lazy(() => import("@/pages/vietnam-travel-faq/what-can-you-get-for-1-dollar-in-vietnam"));
const VietnamFaq13 = lazy(() => import("@/pages/vietnam-travel-faq/vietnam-cheap-for-americans"));
const VietnamFaq14 = lazy(() => import("@/pages/vietnam-travel-faq/tipping-customary-in-vietnam"));
const VietnamFaq15 = lazy(() => import("@/pages/vietnam-travel-faq/is-50000-enough-for-vietnam-trip"));
const VietnamFaq16 = lazy(() => import("@/pages/vietnam-travel-faq/how-much-is-cup-of-coffee-in-vietnam"));
const VietnamFaq17 = lazy(() => import("@/pages/vietnam-travel-faq/wear-red-in-vietnam"));
const VietnamFaq18 = lazy(() => import("@/pages/vietnam-travel-faq/444-meaning-in-vietnam"));
const VietnamFaq19 = lazy(() => import("@/pages/vietnam-travel-faq/what-not-to-do-in-vietnam"));
const VietnamFaq20 = lazy(() => import("@/pages/vietnam-travel-faq/rude-to-cross-fingers-in-vietnam"));
const VietnamFaq21 = lazy(() => import("@/pages/vietnam-travel-faq/foods-to-avoid-in-vietnam"));
const VietnamFaq22 = lazy(() => import("@/pages/vietnam-travel-faq/offensive-hand-gesture-in-vietnam"));
const VietnamFaq23 = lazy(() => import("@/pages/vietnam-travel-faq/anything-cant-wear-in-vietnam"));
const VietnamFaq24 = lazy(() => import("@/pages/vietnam-travel-faq/cash-or-card-in-vietnam"));
const VietnamFaq25 = lazy(() => import("@/pages/vietnam-travel-faq/how-much-7-day-trip-to-vietnam-cost"));
const VietnamFaq26 = lazy(() => import("@/pages/vietnam-travel-faq/carry-usd-or-dong-in-vietnam"));
const VietnamFaq27 = lazy(() => import("@/pages/vietnam-travel-faq/anything-worth-buying-in-vietnam"));
const VietnamFaq28 = lazy(() => import("@/pages/vietnam-travel-faq/credit-cards-widely-accepted-in-vietnam"));
const VietnamFaq29 = lazy(() => import("@/pages/vietnam-travel-faq/is-it-better-to-buy-local-sim-or-esim"));
const VietnamFaq30 = lazy(() => import("@/pages/vietnam-travel-faq/what-to-turn-off-on-phone-when-traveling"));
const VietnamFaq31 = lazy(() => import("@/pages/vietnam-travel-faq/are-travel-sim-cards-cheaper-than-roaming"));
const VietnamFaq32 = lazy(() => import("@/pages/vietnam-travel-faq/can-i-buy-sim-card-before-travel"));
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
              <Route path="/vietnam-travel-faq" element={<VietnamTravelFaqPage />} />
              <Route path="/vietnam-travel-faq/is-vietnam-safe-to-visit" element={<VietnamFaq1 />} />
              <Route path="/vietnam-travel-faq/is-1000-enough-for-2-weeks-in-vietnam" element={<VietnamFaq2 />} />
              <Route path="/vietnam-travel-faq/which-is-safer-vietnam-or-thailand" element={<VietnamFaq3 />} />
              <Route path="/vietnam-travel-faq/what-not-to-bring-to-vietnam" element={<VietnamFaq4 />} />
              <Route path="/vietnam-travel-faq/brush-teeth-tap-water-vietnam" element={<VietnamFaq5 />} />
              <Route path="/vietnam-travel-faq/what-to-be-careful-of-when-visiting-vietnam" element={<VietnamFaq6 />} />
              <Route path="/vietnam-travel-faq/bed-bugs-common-in-vietnam" element={<VietnamFaq7 />} />
              <Route path="/vietnam-travel-faq/when-not-to-go-to-vietnam" element={<VietnamFaq8 />} />
              <Route path="/vietnam-travel-faq/most-common-crime-in-vietnam" element={<VietnamFaq9 />} />
              <Route path="/vietnam-travel-faq/use-us-dollars-in-vietnam" element={<VietnamFaq10 />} />
              <Route path="/vietnam-travel-faq/vietnam-cheaper-than-thailand" element={<VietnamFaq11 />} />
              <Route path="/vietnam-travel-faq/what-can-you-get-for-1-dollar-in-vietnam" element={<VietnamFaq12 />} />
              <Route path="/vietnam-travel-faq/vietnam-cheap-for-americans" element={<VietnamFaq13 />} />
              <Route path="/vietnam-travel-faq/tipping-customary-in-vietnam" element={<VietnamFaq14 />} />
              <Route path="/vietnam-travel-faq/is-50000-enough-for-vietnam-trip" element={<VietnamFaq15 />} />
              <Route path="/vietnam-travel-faq/how-much-is-cup-of-coffee-in-vietnam" element={<VietnamFaq16 />} />
              <Route path="/vietnam-travel-faq/wear-red-in-vietnam" element={<VietnamFaq17 />} />
              <Route path="/vietnam-travel-faq/444-meaning-in-vietnam" element={<VietnamFaq18 />} />
              <Route path="/vietnam-travel-faq/what-not-to-do-in-vietnam" element={<VietnamFaq19 />} />
              <Route path="/vietnam-travel-faq/rude-to-cross-fingers-in-vietnam" element={<VietnamFaq20 />} />
              <Route path="/vietnam-travel-faq/foods-to-avoid-in-vietnam" element={<VietnamFaq21 />} />
              <Route path="/vietnam-travel-faq/offensive-hand-gesture-in-vietnam" element={<VietnamFaq22 />} />
              <Route path="/vietnam-travel-faq/anything-cant-wear-in-vietnam" element={<VietnamFaq23 />} />
              <Route path="/vietnam-travel-faq/cash-or-card-in-vietnam" element={<VietnamFaq24 />} />
              <Route path="/vietnam-travel-faq/how-much-7-day-trip-to-vietnam-cost" element={<VietnamFaq25 />} />
              <Route path="/vietnam-travel-faq/carry-usd-or-dong-in-vietnam" element={<VietnamFaq26 />} />
              <Route path="/vietnam-travel-faq/anything-worth-buying-in-vietnam" element={<VietnamFaq27 />} />
              <Route path="/vietnam-travel-faq/credit-cards-widely-accepted-in-vietnam" element={<VietnamFaq28 />} />
              <Route path="/vietnam-travel-faq/is-it-better-to-buy-local-sim-or-esim" element={<VietnamFaq29 />} />
              <Route path="/vietnam-travel-faq/what-to-turn-off-on-phone-when-traveling" element={<VietnamFaq30 />} />
              <Route path="/vietnam-travel-faq/are-travel-sim-cards-cheaper-than-roaming" element={<VietnamFaq31 />} />
              <Route path="/vietnam-travel-faq/can-i-buy-sim-card-before-travel" element={<VietnamFaq32 />} />
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