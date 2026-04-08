import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ArrowRight, MapPin, Calendar, DollarSign, Shield, Coffee, Heart, CreditCard, ShoppingBag } from "lucide-react";
import { faqData } from "./data";
import { AffiliateWidgetBox, AffiliateWidget } from "@/components/agents/AffiliateAgent";

const relatedArticles = faqData.filter(f => f.id !== 32).slice(0, 4);

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

const Page = () => {
  const faq = faqData.find(f => f.id === 34);
  const category = getCategory(faq.question);
  const IconComponent = categoryIcons[category] || CreditCard;

  return (
    <>
      <Helmet>
        <title>{faq.metaTitle} - Vietnam Travel FAQ</title>
        <meta name="description" content={faq.metaDescription} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <Link
              to="/vietnam-travel-faq"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 pt-16 md:pt-20"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Vietnam Travel FAQ
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight text-center">
              {faq.question}
            </h1>
            
            <p className="text-lg text-slate-300 max-w-3xl leading-relaxed text-center mx-auto">
              {faq.shortSnippet}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Affiliate Widget */}
            <div className="mb-10 flex justify-center">
              <AffiliateWidgetBox widget={AffiliateWidget} />
            </div>

            {/* Full Answer */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200/60 mb-10">
              <div className="prose prose-lg max-w-none">
                {faq.fullAnswer.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-6 text-slate-700 leading-loose">
                    {paragraph.split('\n').map((line, lineIdx) => (
                      <React.Fragment key={lineIdx}>
                        {line}
                        {lineIdx < paragraph.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></span>
                Related Articles
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/vietnam-travel-faq/${article.slug}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200/60 hover:border-blue-300/60 h-full">
                      <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.question}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                        {article.shortSnippet}
                      </p>
                      <div className="flex items-center text-blue-500 text-sm font-medium">
                        Read more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center">
              <Link
                to="/vietnam-travel-faq"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Vietnam Travel FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
