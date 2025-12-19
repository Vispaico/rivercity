import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Shield,
  Sparkles,
} from "lucide-react";

import ContactSection from "@/components/ContactSection";
import CustomQuoteCard from "@/components/CustomQuoteCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  getVehicleByCategoryAndSlug,
  getVehicleDetailPath,
  getVehicleMonthPriceUsd,
  getVehiclePriceUsd,
  getVehicleWeekPriceUsd,
} from "@/lib/vehicleCatalog";

const BASE_URL = "https://www.rivercitybikerentals.com";

const categoryUi = {
  motorbike: {
    labelPlural: "Motorbikes",
    listPath: "/motorbikes",
    accent: "from-cyan-500 to-blue-700",
  },
  car: {
    labelPlural: "Cars",
    listPath: "/cars",
    accent: "from-blue-600 to-indigo-800",
  },
};

const VehicleDetailPage = ({ category }) => {
  const { slug } = useParams();
  const ui = categoryUi[category] || categoryUi.motorbike;
  const vehicle = useMemo(() => getVehicleByCategoryAndSlug(category, slug), [category, slug]);
  const adSlotRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const next = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
      setScrollProgress(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!vehicle) return;

    const slot = adSlotRef.current;
    if (!slot) return;

    slot.innerHTML = "";

    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.innerHTML = `
      atOptions = {
        key: 'b612b7529555730cbd4d2a6607dff9b5',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {}
      };
    `;

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = "//prototypesorting.com/b612b7529555730cbd4d2a6607dff9b5/invoke.js";
    invokeScript.async = true;

    slot.appendChild(configScript);
    slot.appendChild(invokeScript);

    return () => {
      slot.innerHTML = "";
      if (window.atOptions) delete window.atOptions;
    };
  }, [vehicle?.slug]);

  const canonicalPath = vehicle
    ? getVehicleDetailPath(category, vehicle.slug)
    : ui.listPath;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  if (!vehicle) {
    return (
      <div className="bg-gray-50 min-h-[70vh]">
        <Helmet>
          <title>Vehicle not found | Rivercity</title>
          <meta name="robots" content="noindex" />
          <link rel="canonical" href={`${BASE_URL}${ui.listPath}`} />
        </Helmet>
        <div className="container mx-auto px-4 pt-28 pb-16">
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle>We couldn’t find that vehicle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                The page may have moved, or the link is incorrect.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to={ui.listPath}>
                  Browse {ui.labelPlural}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const priceUsd = getVehiclePriceUsd(vehicle);
  const priceWeekUsd = getVehicleWeekPriceUsd(vehicle);
  const priceMonthUsd = getVehicleMonthPriceUsd(vehicle);
  const longTail = vehicle?.seo?.longTailKeywords || [];
  const aiBullets = vehicle?.seo?.aiSummaryBullets || [];

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${vehicle.name} Rental`,
    description: vehicle?.seo?.metaDescription || vehicle.description,
    image: [vehicle.image],
    brand: vehicle.brand ? { "@type": "Brand", name: vehicle.brand } : undefined,
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      price: vehicle.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="bg-gray-50">
      <div
        className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent"
        aria-hidden="true"
      >
        <div
          className={`h-full bg-gradient-to-r ${ui.accent}`}
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      <Helmet>
        <title>{vehicle?.seo?.metaTitle || `${vehicle.name} Rental | Rivercity`}</title>
        <meta name="description" content={vehicle?.seo?.metaDescription || vehicle.description} />
        {longTail.length > 0 && (
          <meta name="keywords" content={longTail.join(", ")} />
        )}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={vehicle?.seo?.metaTitle || `${vehicle.name} Rental | Rivercity`} />
        <meta property="og:description" content={vehicle?.seo?.metaDescription || vehicle.description} />
        {vehicle.image && <meta property="og:image" content={vehicle.image} />}
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(productStructuredData)}</script>
      </Helmet>

      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={vehicle.image}
            srcSet={vehicle.imageSrcSet}
            sizes="100vw"
            alt={`${vehicle.name} rental in Haiphong`}
            className="h-[520px] w-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${ui.accent} opacity-55`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
        </div>

        <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <motion.div
          className="pointer-events-none absolute -bottom-28 -left-16 h-[360px] w-[360px] rounded-full bg-cyan-400/25 blur-3xl"
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9 }}
        />
        <motion.div
          className="pointer-events-none absolute -top-28 -right-16 h-[360px] w-[360px] rounded-full bg-indigo-400/25 blur-3xl"
          initial={{ opacity: 0, x: 30, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        />

        <div className="relative container mx-auto px-4 pt-28 pb-14">
          <nav className="text-sm text-white/80">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link to={ui.listPath} className="hover:underline">
              {ui.labelPlural}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/95 font-semibold">{vehicle.name}</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold text-white"
            >
              {vehicle.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-4 text-white/90 text-lg"
            >
              {vehicle.description}
            </motion.p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {Number.isFinite(priceUsd) && (
                <Badge className="bg-white/15 text-white border border-white/20">
                  ${priceUsd}/day
                </Badge>
              )}
              {Number.isFinite(priceWeekUsd) && (
                <Badge className="bg-white/15 text-white border border-white/20">
                  ${priceWeekUsd}/week
                </Badge>
              )}
              {Number.isFinite(priceMonthUsd) && (
                <Badge className="bg-white/15 text-white border border-white/20">
                  ${priceMonthUsd}/month
                </Badge>
              )}
              <Badge className="bg-white/15 text-white border border-white/20">
                {category === "motorbike" ? "Haiphong motorbike rental" : "Haiphong car rental"}
              </Badge>
              <Badge className="bg-white/15 text-white border border-white/20">
                Fast online booking
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Card className="shadow-lg overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  At a glance
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border bg-white p-4">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Number.isFinite(priceUsd) ? `$${priceUsd}/day` : "—"}
                  </p>
                  <div className="mt-3 space-y-1 text-sm text-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Weekly</span>
                      <span className="font-semibold">{Number.isFinite(priceWeekUsd) ? `$${priceWeekUsd}` : "—"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Monthly</span>
                      <span className="font-semibold">{Number.isFinite(priceMonthUsd) ? `$${priceMonthUsd}` : "—"}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Day, week, and month options</p>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <p className="text-sm text-gray-500">Pickup</p>
                  <p className="text-2xl font-bold text-gray-900">Haiphong</p>
                  <p className="text-xs text-gray-500 mt-1">Hotel / city pickup options</p>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <p className="text-sm text-gray-500">Support</p>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-xs text-gray-500 mt-1">Help when you need it</p>
                </div>
              </CardContent>
            </Card>

            <div className="my-6 flex justify-center">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Advertisement</p>
                <div
                  ref={adSlotRef}
                  className="mx-auto flex h-[70px] w-[340px] items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50"
                >
                  <span className="text-xs text-gray-400">Loading ad…</span>
                </div>
              </div>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Specs & features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(vehicle.detailSpecs || []).map((row) => (
                    <div key={row.label} className="rounded-xl border bg-white p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">{row.label}</p>
                      <p className="mt-1 font-semibold text-gray-900">{row.value}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Note: specs can vary slightly by unit/year in the fleet.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>What’s included</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(vehicle.included || []).map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl border bg-white p-4">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <p className="text-gray-800">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick AI summary (for fast answers)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-gray-800">
                  {aiBullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {longTail.length > 0 && (
                  <div className="rounded-xl border bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Search-friendly phrases</p>
                    <ul className="mt-3 grid grid-cols-1 gap-2">
                      {longTail.map((kw) => (
                        <li key={kw} className="text-sm text-gray-800">
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1">{kw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900">How do I book this {vehicle.name}?</p>
                  <p className="mt-1">
                    Click “Book now” and confirm your dates. If you need a custom pickup or delivery, request a quote.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">What do I need to rent?</p>
                  <p className="mt-1">
                    A passport/ID for check-in and a refundable deposit depending on the model and duration.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Can you deliver to my hotel?</p>
                  <p className="mt-1">Yes in many cases — availability depends on schedule and location.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-5">
              <Card className="shadow-xl overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${ui.accent}`} />
                <CardHeader>
                  <CardTitle>Book {vehicle.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border bg-white p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Daily price</p>
                      <p className="text-lg font-bold text-gray-900">{Number.isFinite(priceUsd) ? `$${priceUsd}` : "—"}</p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-gray-50 border px-3 py-2">
                        <p className="text-xs text-gray-500">Weekly</p>
                        <p className="text-sm font-semibold text-gray-900">{Number.isFinite(priceWeekUsd) ? `$${priceWeekUsd}` : "—"}</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 border px-3 py-2">
                        <p className="text-xs text-gray-500">Monthly</p>
                        <p className="text-sm font-semibold text-gray-900">{Number.isFinite(priceMonthUsd) ? `$${priceMonthUsd}` : "—"}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Final totals depend on rental length, optional add-ons, and deposit.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link to={`/book?vehicle=${encodeURIComponent(vehicle.bookingQuery || vehicle.name)}`}>
                        Book now
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={ui.listPath}>Back to {ui.labelPlural}</Link>
                    </Button>
                  </div>

                  <div className="rounded-xl border bg-white p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      Pickup in Haiphong (delivery options available)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                      <Clock className="h-4 w-4 text-blue-600" />
                      Fast handover and quick support
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                      <Shield className="h-4 w-4 text-blue-600" />
                      Optional coverage and deposit protection
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Best for</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {(vehicle.bestFor || []).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      <CustomQuoteCard />
      <ContactSection />
    </div>
  );
};

export default VehicleDetailPage;
