import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { faqData } from "./data";
import { ChevronRight, MapPin, Calendar, DollarSign, Shield, Coffee, Heart, CreditCard, ShoppingBag } from "lucide-react";

const categoryIcons = {
  safety: Shield,
  budget: DollarSign,
  travel: Calendar,
  food: Coffee,
  culture: Heart,
  shopping: ShoppingBag,
  money: CreditCard,
  general: MapPin,
};

const getCategory = (question) => {
  const q = question.toLowerCase();
  if (q.includes("safe") || q.includes("crime") || q.includes("careful") || q.includes("bed bug") || q.includes("when not to go")) return "safety";
  if (q.includes("$") || q.includes("dollar") || q.includes("dong") || q.includes("cost") || q.includes("cheap") || q.includes("tipping") || q.includes("credit card") || q.includes("cash") || q.includes("buy") || q.includes("worth")) return "money";
  if (q.includes("food") || q.includes("eat") || q.includes("brush") || q.includes("water")) return "food";
  if (q.includes("wear") || q.includes("red") || q.includes("444") || q.includes("finger") || q.includes("hand gesture") || q.includes("bring") || q.includes("can't wear") || q.includes("not to do")) return "culture";
  if (q.includes("thailand") || q.includes("7 day") || q.includes("trip to vietnam") || q.includes("coffee")) return "travel";
  return "general";
};

const getCategoryColor = (category) => {
  const colors = {
    safety: "bg-red-100 text-red-700 border-red-200",
    budget: "bg-green-100 text-green-700 border-green-200",
    travel: "bg-blue-100 text-blue-700 border-blue-200",
    food: "bg-amber-100 text-amber-700 border-amber-200",
    culture: "bg-purple-100 text-purple-700 border-purple-200",
    shopping: "bg-pink-100 text-pink-700 border-pink-200",
    money: "bg-emerald-100 text-emerald-700 border-emerald-200",
    general: "bg-gray-100 text-gray-700 border-gray-200",
  };
  return colors[category] || colors.general;
};

const getCategoryLabel = (category) => {
  const labels = {
    safety: "Safety & Health",
    budget: "Budget & Costs",
    travel: "Travel Planning",
    food: "Food & Drink",
    culture: "Culture & Etiquette",
    shopping: "Shopping",
    money: "Money & Payments",
    general: "General Info",
  };
  return labels[category] || labels.general;
};

const VietnamTravelFaqPage = () => {
  return (
    <>
      <Helmet>
        <title>Vietnam Travel FAQ 2026 - Everything You Need to Know Before Visiting Vietnam</title>
        <meta name="description" content="Complete Vietnam travel FAQ for 2026. Get expert answers to 30 essential questions about safety, budget, costs, culture, food, and local customs. Plan your perfect Vietnam trip with our comprehensive guide." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-500/30">
                <MapPin className="w-4 h-4" />
                Your Complete Vietnam Travel Guide
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Vietnam Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">FAQ</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know before visiting Vietnam. From safety tips and budget advice to cultural customs and local secrets — we've got you covered.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">{faqData.length}</div>
                  <div className="text-slate-400 text-sm">Expert Answers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">8</div>
                  <div className="text-slate-400 text-sm">Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-slate-400 text-sm">Free Guides</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-24">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="url(#paint0_linear)" className="fill-slate-50"/>
              <defs>
                <linearGradient id="paint0_linear" x1="720" y1="0" x2="720" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F8FAFC"/>
                  <stop offset="1" stopColor="#F1F5F9"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Introduction */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Planning Your Vietnam Adventure?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We've compiled the most comprehensive answers to the questions travelers ask most. 
              Click on any question below to get detailed, up-to-date information from experts who know Vietnam inside and out.
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-6">
              {faqData.map((faq, index) => {
                const category = getCategory(faq.question);
                const IconComponent = categoryIcons[category] || MapPin;
                const categoryColor = getCategoryColor(category);
                const categoryLabel = getCategoryLabel(category);
                
                return (
                  <Link
                    key={faq.id}
                    to={`/vietnam-travel-faq/${faq.slug}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/60 hover:border-blue-300/60 hover:-translate-y-1">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-white font-bold text-lg">{index + 1}</span>
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${categoryColor}`}>
                              <IconComponent className="w-3 h-3" />
                              {categoryLabel}
                            </span>
                          </div>
                          
                          <h3 className="text-lg md:text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-3">
                            {faq.question}
                          </h3>
                          
                          <p className="text-slate-600 leading-relaxed line-clamp-2 md:line-clamp-3">
                            {faq.shortSnippet}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0 hidden md:flex items-center">
                          <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-500 flex items-center justify-center transition-colors">
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-blue-600/20">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Still Have Questions?
              </h3>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                Can't find what you're looking for? Check out our other travel guides or get in touch with our team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/guides"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Explore Travel Guides
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-blue-500/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500/40 transition-colors border border-white/20"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VietnamTravelFaqPage;
