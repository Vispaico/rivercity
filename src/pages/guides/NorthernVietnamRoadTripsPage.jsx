import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Map, Route, Backpack, CloudRain, ShieldCheck, ArrowRight, Bike, CalendarDays } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import GuidesPostGrid from '@/components/GuidesPostGrid';
import AdBanner from '@/components/AdBanner';

const NorthernVietnamRoadTripsPage = () => {
  const metaTitle = 'Northern Vietnam Road Trips (2025) | Routes, Packing, Safety';
  const metaDescription =
    'A practical road trip hub for Northern Vietnam: route ideas from Haiphong, planning tips, best bikes, packing list, seasonal weather notes, and safety prep.';
  const canonicalUrl = 'https://www.rivercitybikerentals.com/guides/northern-vietnam-road-trips';

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <PageHeader
        title="Northern Vietnam Road Trips"
        subtitle="Routes, tips, and planning from Haiphong—so your trip feels adventurous, not accidental."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Guides', link: '/guides' }, { name: 'Northern Vietnam Road Trips' }]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-3">
              <div className="sticky top-28 rounded-2xl border bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Table of contents</p>
                <nav className="mt-4 space-y-2 text-sm">
                  {[
                    ['#why-start', 'Why start from Haiphong'],
                    ['#routes', 'Classic routes overview'],
                    ['#planning', 'Planning your trip'],
                    ['#bike', 'Choosing your bike'],
                    ['#packing', 'Packing essentials'],
                    ['#safety', 'Safety + preparation'],
                    ['#seasons', 'Seasonal considerations'],
                    ['#budget', 'Budget planning'],
                    ['#practical', 'Practical tips'],
                    ['#inspiration', 'Inspiration + trip reports'],
                  ].map(([href, label]) => (
                    <a key={href} href={href} className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-white hover:text-blue-700">
                      {label}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 rounded-xl border bg-white p-4">
                  <p className="text-sm font-bold text-gray-900">Touring bike vibes</p>
                  <p className="mt-2 text-sm text-gray-700">Want extra power and comfort for longer days?</p>
                  <div className="mt-3 space-y-2">
                    <Link
                      to="/motorbikes/yamaha-nvx"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Yamaha NVX (155cc) <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/motorbikes"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      View all bikes
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            <article className="lg:col-span-9">
              <div className="overflow-hidden rounded-3xl border bg-white shadow-lg">
                <div className="relative h-56 sm:h-64">
                  <img
                    src="/ha-long-bay-boat-cruise.webp"
                    alt="Ha Long Bay boat cruise."
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
                  <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/80">The promise</p>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                      You can do epic trips without suffering.
                    </h2>
                    <p className="mt-3 text-white/90 max-w-2xl">
                      “Epic” should mean scenery, not mechanical issues and sad rain pants.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-10">
                  <div className="mb-8 flex justify-center">
                    <AdBanner className="rounded-2xl border bg-white p-4 shadow-sm" />
                  </div>

                  <section id="why-start" className="scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Why start from Haiphong?</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Haiphong is a sneaky-good launch point.
                      You can shoot toward the coast, swing into the north, or do islands—without spending day one trapped in a capital-city exit queue.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[{
                        icon: <Route className="h-5 w-5 text-blue-700" />,
                        title: 'Easy access',
                        text: 'Coastal routes and northern roads are within reach fast.',
                      }, {
                        icon: <Map className="h-5 w-5 text-blue-700" />,
                        title: 'Great base',
                        text: 'Stay a night, prep, then roll out early.',
                      }, {
                        icon: <Bike className="h-5 w-5 text-blue-700" />,
                        title: 'Bike-friendly',
                        text: 'Get your rental sorted before you chase big distances.',
                      }].map((c) => (
                        <div key={c.title} className="rounded-2xl border bg-white p-4">
                          <div className="flex items-center gap-2 font-semibold text-gray-900">{c.icon}{c.title}</div>
                          <p className="mt-2 text-sm text-gray-700">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="routes" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Classic routes overview</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Below are route ideas with a simple difficulty vibe.
                      Distances and timing depend on stops, weather, and whether you’re the type who stops for every coffee sign.
                      (No judgment. That’s a valid personality.)
                    </p>

                    <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
                      <p className="text-sm font-bold text-gray-900">Mini map preview</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Haiphong → Coast (Cat Ba/Ha Long region) and Haiphong → Northern mountain routes.”
                      </p>
                      <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-100 to-white" />
                      <img
                    src="/haiphong-halong-cat-ba-map.webp"
                    alt="Map showing common Northern Vietnam motorbike road trip directions starting from Haiphong."
                  />
                    </div>

                    <div className="mt-6 space-y-5">
                      {[{
                        title: 'Coastal escape (2–3 days)',
                        difficulty: 'Beginner-friendly',
                        highlights: 'Sea air, easy roads, island vibes (Cat Ba / nearby bays).',
                      }, {
                        title: 'Weekend countryside loop (2–3 days)',
                        difficulty: 'Easy → medium',
                        highlights: 'Green roads, local towns, and the joy of not being in a city.',
                      }, {
                        title: 'Northern mountains (5–10 days)',
                        difficulty: 'Intermediate → advanced',
                        highlights: 'Big scenery, more altitude, more weather mood swings.',
                      }, {
                        title: 'Long-haul adventure (10+ days)',
                        difficulty: 'Advanced',
                        highlights: 'You’ll want a plan, backups, and a bike you trust.',
                      }].map((r) => (
                        <div key={r.title} className="rounded-2xl border bg-white p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <h3 className="text-xl font-extrabold text-gray-900">{r.title}</h3>
                            <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                              {r.difficulty}
                            </span>
                          </div>
                          <p className="mt-3 text-gray-700 leading-7">{r.highlights}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="planning" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Planning your trip</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Your trip is a triangle: time, comfort, and distance.
                      Pick two.
                      If you cram too much distance into each day, you’ll spend your evenings tired and your mornings negotiating with your spine.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border bg-white p-6">
                        <p className="font-extrabold text-gray-900">How long do you need?</p>
                        <p className="mt-2 text-gray-700 leading-7">
                          If you have 2–3 days, keep it coastal or countryside.
                          If you have a week, you can go north and still have rest days.
                        </p>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <p className="font-extrabold text-gray-900">Solo vs group</p>
                        <p className="mt-2 text-gray-700 leading-7">
                          Solo is flexible.
                          Group travel is fun… and also a logistics hobby.
                          Decide who leads navigation and who carries the snacks.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="bike" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Choosing your bike</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      The best road trip bike is the one you can ride comfortably for hours.
                      Not the one that looks coolest in a parking lot.
                    </p>
                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Simple recommendations</p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="rounded-2xl border bg-gray-50 p-4">
                          <p className="font-bold text-gray-900">Short trips (2–3 days)</p>
                          <p className="mt-2 text-sm text-gray-700">Honda Airblade is a comfy, easy automatic.</p>
                          <Link to="/motorbikes/honda-airblade" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline">
                            View Airblade <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                        <div className="rounded-2xl border bg-gray-50 p-4">
                          <p className="font-bold text-gray-900">Medium trips (5–7 days)</p>
                          <p className="mt-2 text-sm text-gray-700">Yamaha NVX gives extra power for longer days.</p>
                          <Link to="/motorbikes/yamaha-nvx" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline">
                            View NVX <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                        <div className="rounded-2xl border bg-gray-50 p-4">
                          <p className="font-bold text-gray-900">Budget + local roads</p>
                          <p className="mt-2 text-sm text-gray-700">Honda Wave is simple and fuel-friendly.</p>
                          <Link to="/motorbikes/honda-wave" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline">
                            View Wave <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="packing" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Packing essentials</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Pack light, then pack one more layer.
                      Northern weather can flip on you.
                      Your goal is to be comfortable without hauling your entire closet.
                    </p>

                    <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
                      <div className="flex items-start gap-3">
                        <Backpack className="h-5 w-5 text-blue-700 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-gray-900">Road trip packing list (starter)</p>
                          <ul className="mt-3 space-y-2 text-sm text-gray-700">
                            {[
                              'Rain poncho + a dry bag (or plastic bag magic).',
                              'Light layers (morning can feel cooler).',
                              'Power bank + phone mount + offline maps.',
                              'Basic first aid (bandages, antiseptic, painkillers).',
                              'Copies/photos of documents (phone + cloud).',
                              'Cash for remote areas and small shops.',
                            ].map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="safety" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Safety & preparation</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Road trips are won by boring habits: helmet, hydration, and not riding tired.
                      Save the hero moments for the views.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border bg-white p-6">
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="h-5 w-5 text-blue-700 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-gray-900">Skill check</p>
                            <p className="mt-2 text-gray-700 leading-7">
                              If you’re new to riding, start with short rides near Haiphong first.
                              Build comfort before you stack long days.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <div className="flex items-start gap-3">
                          <CloudRain className="h-5 w-5 text-blue-700 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-gray-900">Weather plan</p>
                            <p className="mt-2 text-gray-700 leading-7">
                              Rain slows everything.
                              Plan shorter days if forecasts look spicy.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="seasons" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Seasonal considerations</h2>
                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <div className="flex items-start gap-3">
                        <CalendarDays className="h-5 w-5 text-blue-700 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-gray-900">Month-by-month? (placeholder)</p>
                          <p className="mt-2 text-gray-700 leading-7">
                            Replace this with a simple chart once you want to go deep: temperature, rain, and visibility.
                            For now, the practical rule is: check forecasts and keep buffer days.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="budget" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Budget planning</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Road trip budgets usually break down into: fuel, food, accommodation, and the “oops” fund.
                      The “oops” fund is not optional.
                    </p>
                    <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
                      <p className="text-sm font-bold text-gray-900">Budget Info</p>
                      <p className="mt-2 text-sm text-gray-700">
                        I wrote an entire article about the cost of living in Haiphong.
                        {' '}
                        <a
                          href="https://www.rivercitybikerentals.com/blog/cost-of-living-in-haiphong-2026-complete-budget-breakdown"
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-blue-700 hover:underline"
                        >
                          You can read it here.
                        </a>
                      </p>
                      <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-100 to-white" />
                      <a
                        href="https://www.rivercitybikerentals.com/blog/cost-of-living-in-haiphong-2026-complete-budget-breakdown"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 block overflow-hidden rounded-xl border bg-white"
                      >
                        <img
                          src="/cost-of-living-in-haiphong.webp"
                          alt="Header image showing cost of living in Haiphong."
                          className="h-auto w-full"
                          loading="lazy"
                        />
                      </a>
                    </div>
                  </section>

                  <section id="practical" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Practical tips (the unglamorous heroes)</h2>
                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <ul className="space-y-3 text-sm text-gray-700">
                        {[
                          'Download offline maps before you leave Wi‑Fi.',
                          'Fuel up before remote stretches (don’t trust “maybe there’s a station”).',
                          'Finish riding before it gets fully dark if you can.',
                          'Take breaks every 60–90 minutes. Fatigue makes bad decisions.',
                          'If something feels off with the bike: stop and check. Don’t push it “just a bit farther.”',
                        ].map((t) => (
                          <li key={t} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <section id="inspiration" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Trip reports & inspiration</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      This is where we’ll keep adding real stories, route notes, and photo galleries.
                      If you have a trip you’re proud of, send it to us—we love featuring rider stories.
                    </p>

                    <div className="mt-6 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                      <p className="text-xs uppercase tracking-[0.35em] text-white/80">Final CTA</p>
                      <h3 className="mt-2 text-2xl font-extrabold">Start your adventure from Haiphong</h3>
                      <p className="mt-3 text-white/90">Book your bike, and we’ll help you get rolling with the basics sorted.</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link to="/motorbikes" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-50">
                          Book a road-trip bike <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/guides/motorbike-rental-guide-vietnam" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15">
                          Rental guide <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="mt-10 rounded-2xl border bg-gray-50 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Related guides</p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link className="rounded-xl bg-white p-4 border hover:border-blue-300" to="/guides/haiphong-travel-guide">
                          <p className="font-bold text-gray-900">Ultimate Haiphong Travel Guide</p>
                          <p className="mt-1 text-sm text-gray-700">Base info, day trips, food, and city planning.</p>
                        </Link>
                        <Link className="rounded-xl bg-white p-4 border hover:border-blue-300" to="/guides/living-in-haiphong-expat-guide">
                          <p className="font-bold text-gray-900">Living in Haiphong: Expat Guide</p>
                          <p className="mt-1 text-sm text-gray-700">For longer stays and daily life logistics.</p>
                        </Link>
                      </div>
                    </div>
                  </section>

                  <GuidesPostGrid
                    title="Road-trip reading (blog)"
                    subtitle="Only published posts show up here—no broken links."
                    limit={6}
                  />

                  <section className="mt-12 rounded-2xl border bg-white p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Quick summary for skimmers</p>
                    <ul className="mt-4 space-y-3 text-sm text-gray-700">
                      {[
                        'Haiphong is a great launch point for coastal rides and bigger northern routes.',
                        'Pick routes based on time + comfort, not just distance.',
                        'Choose a bike you can ride for hours (comfort beats “cool”).',
                        'Pack for weather flips: rain gear, layers, and offline maps.',
                        'Plan shorter days if forecasts look rough; fatigue is the quiet danger.',
                      ].map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="mt-12 rounded-2xl border bg-white p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Search-friendly phrases</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        'northern vietnam motorbike road trip',
                        'vietnam road trip itinerary from haiphong',
                        'best motorbike for vietnam road trip',
                        'packing list for motorbike trip vietnam',
                        'haiphong to northern vietnam route',
                        'multi-day motorbike rental haiphong',
                      ].map((kw) => (
                        <span key={kw} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
};

export default NorthernVietnamRoadTripsPage;
