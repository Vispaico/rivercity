import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Bike,
  ShieldCheck,
  FileText,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Map,
  Banknote,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import GuidesPostGrid from '@/components/GuidesPostGrid';
import AdBanner from '@/components/AdBanner';

const MotorbikeRentalGuideVietnamPage = () => {
  const metaTitle = 'Motorbike Rental Guide Vietnam (2025) | Licenses, Safety, Costs';
  const metaDescription =
    'Everything to know before renting a motorbike in Vietnam: licenses, deposits, choosing the right bike, safety tips, scams to avoid, and what to check at pickup.';
  const canonicalUrl = 'https://www.rivercitybikerentals.com/guides/motorbike-rental-guide-vietnam';

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <PageHeader
        title="Motorbike Rental Guide Vietnam"
        subtitle="Rent with confidence: licenses, deposits, choosing a bike, and the stuff that saves you from a bad day."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Guides', link: '/guides' }, { name: 'Motorbike Rental Guide' }]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-3">
              <div className="sticky top-28 rounded-2xl border bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Quick navigation</p>
                <nav className="mt-4 space-y-2 text-sm">
                  {[
                    ['#why', 'Why rent a motorbike?'],
                    ['#legal', 'Legal requirements'],
                    ['#choose', 'Choosing the right bike'],
                    ['#process', 'Rental process + checklist'],
                    ['#safety', 'Safety + insurance'],
                    ['#tips', 'Riding tips'],
                    ['#scams', 'Common scams'],
                    ['#costs', 'Costs + deposits'],
                    ['#regions', 'Regional considerations'],
                    ['#planning', 'Planning your trip'],
                  ].map(([href, label]) => (
                    <a key={href} href={href} className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-white hover:text-blue-700">
                      {label}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 rounded-xl border bg-white p-4">
                  <p className="text-sm font-bold text-gray-900">Want a safe starting point?</p>
                  <p className="mt-2 text-sm text-gray-700">Start with an easy automatic scooter in Haiphong.</p>
                  <div className="mt-3 space-y-2">
                    <Link
                      to="/motorbikes/honda-airblade"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Honda Airblade (125cc) <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/motorbikes/yamaha-nvx"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      Yamaha NVX (155cc)
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            <article className="lg:col-span-9">
              <div className="overflow-hidden rounded-3xl border bg-white shadow-lg">
                <div className="relative h-56 sm:h-64">
                  <img
                    src="/haiphong-motorbike-traffic.webp"
                    alt="Haiphong motorbike riders on a busy road."
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
                  <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/80">The short version</p>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                      Rent the right bike, check it properly, ride predictably.
                    </h2>
                    <p className="mt-3 text-white/90 max-w-2xl">
                      This guide is built to make you confident, not cocky. There’s a difference.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-10">
                  <div className="mb-8 flex justify-center">
                    <AdBanner className="rounded-2xl border bg-white p-4 shadow-sm" />
                  </div>

                  <section id="why" className="scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Why rent a motorbike in Vietnam?</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Renting a motorbike is freedom. It’s also convenience. It’s also sometimes a tiny bit of chaos.
                      The big win is flexibility: you can stop for coffee, take the scenic road, and turn “that looks interesting” into a plan.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[{
                        icon: <Bike className="h-5 w-5 text-blue-700" />,
                        title: 'Freedom',
                        text: 'Go when you want. Stop when you want. Snack when you want.',
                      }, {
                        icon: <Banknote className="h-5 w-5 text-blue-700" />,
                        title: 'Value',
                        text: 'Daily costs are usually far below taxi life.',
                      }, {
                        icon: <Map className="h-5 w-5 text-blue-700" />,
                        title: 'Access',
                        text: 'Small roads, countryside loops, hidden corners.',
                      }].map((c) => (
                        <div key={c.title} className="rounded-2xl border bg-white p-4">
                          <div className="flex items-center gap-2 font-semibold text-gray-900">{c.icon}{c.title}</div>
                          <p className="mt-2 text-sm text-gray-700">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="legal" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Legal requirements (read this part)</h2>
                    <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-800 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-yellow-900">Important</p>
                          <p className="mt-2 text-sm text-yellow-900/90 leading-6">
                            Licensing rules and enforcement can vary.
                            If you’re not sure you’re covered, don’t guess—check official guidance for your nationality and license type.
                            This page is practical help, not legal advice.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border bg-white p-6">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-blue-700 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-gray-900">License / IDP</p>
                            <p className="mt-2 text-gray-700 leading-7">
                              If you plan to ride, sort your paperwork. Only IDPs from <strong>countries that signed the 1968 Vienna Convention</strong> are recognized. Drivers from the US, Japan, Canada, China, and Australia can't drive in Vietnam legally with IDPs.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="h-5 w-5 text-blue-700 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-gray-900">Insurance</p>
                            <p className="mt-2 text-gray-700 leading-7">
                              Ask what’s included. Understand what isn’t.
                              The most expensive mistake is assuming you’re covered because you feel optimistic.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="choose" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Choosing the right bike</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Don’t pick the “coolest” bike. Pick the bike that matches your skill level and your plan.
                      City commuting, day trips, and longer rides all want slightly different things.
                    </p>

                    <div className="mt-6 rounded-2xl border bg-white overflow-hidden">
                      <div className="p-6 border-b bg-gray-50">
                        <h3 className="text-lg font-extrabold text-gray-900">Quick comparison (Rivercity fleet examples)</h3>
                        <p className="mt-2 text-sm text-gray-700">These link to bikes we actually have pages for.</p>
                      </div>

                      <div className="p-6 grid grid-cols-1 gap-4">
                        {[{
                          name: 'Honda Airblade',
                          href: '/motorbikes/honda-airblade',
                          bestFor: 'Easy city riding + short loops',
                          vibe: 'Comfortable automatic, simple to love',
                        }, {
                          name: 'Yamaha NVX',
                          href: '/motorbikes/yamaha-nvx',
                          bestFor: 'More power for longer rides',
                          vibe: 'Sporty automatic, confident feel',
                        }, {
                          name: 'Honda Wave',
                          href: '/motorbikes/honda-wave',
                          bestFor: 'Budget + reliable local roads',
                          vibe: 'Semi-auto, uncomplicated workhorse',
                        }].map((b) => (
                          <Link
                            key={b.name}
                            to={b.href}
                            className="rounded-2xl border p-5 hover:border-blue-300 hover:bg-blue-50/40"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-lg font-extrabold text-gray-900">{b.name}</p>
                                <p className="mt-1 text-sm text-gray-700">{b.vibe}</p>
                                <p className="mt-2 text-sm font-semibold text-gray-900">Best for: <span className="font-normal text-gray-700">{b.bestFor}</span></p>
                              </div>
                              <ArrowRight className="h-5 w-5 text-blue-700" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section id="process" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">The rental process (and the checklist)</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Most rental horror stories start with one of these:
                      a rushed handover, a missing photo, or a “yeah yeah it’s fine” inspection.
                      Here’s the calm way to do it.
                    </p>

                    <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
                      <div className="flex items-start gap-3">
                        <Wrench className="h-5 w-5 text-blue-700 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-gray-900">Pickup checklist</p>
                          <ul className="mt-3 space-y-3 text-sm text-gray-700">
                            {[
                              'Film a 30‑second walkaround: body, mirrors, lights, tires.',
                              'Test brakes front + rear (slowly, in a safe spot).',
                              'Check lights, horn, turn signals.',
                              'Take a photo of the odometer and fuel level.',
                              'Confirm what’s included: helmets, phone holder, rain gear.',
                              'Ask about support if you get a flat or mechanical issue.',
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <p className="text-sm font-bold text-gray-900">Rivercity rentals typically include</p>
                      <p className="mt-2 text-sm text-gray-700">(Always confirm at booking—fleets evolve.)</p>
                      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                        {['2 helmets', 'Phone holder', 'Basic support', 'Optional delivery (availability)', 'Clear pricing', 'Fast booking'].map((item) => (
                          <li key={item} className="rounded-xl bg-gray-50 p-3 border">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <section id="safety" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Safety & insurance</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Vietnam traffic is different.
                      Not “worse.” Different.
                      The fastest way to stay safe is to ride predictably and avoid ego battles.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Helmet</h3>
                        <p className="mt-2 text-gray-700 leading-7">
                          Wear one that fits.
                          If it wobbles, it’s a hat.
                          Your brain deserves better.
                        </p>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Rain plan</h3>
                        <p className="mt-2 text-gray-700 leading-7">
                          Rain changes everything: visibility, braking distance, and how slippery paint lines become.
                          Slow down and give yourself space.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="tips" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Riding tips (the stuff locals don’t explain)</h2>
                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <ul className="space-y-3 text-sm text-gray-700">
                        {[
                          'Look far ahead. Where you look is where you go.',
                          'Be smooth: smooth throttle, smooth brakes, smooth turns.',
                          'Don’t ride right next to big vehicles. Give yourself exits.',
                          'Night riding needs extra caution—slow down and increase spacing.',
                          'If you’re new: start early morning or around lunchtime when traffic is lighter.',
                        ].map((t) => (
                          <li key={t} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <section id="scams" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Common scams (and how to dodge them)</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Most problems are boring and preventable.
                      A legitimate shop with clear communication will avoid 90% of the drama.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[{
                        title: '“New scratch” surprise',
                        text: 'Prevent it by filming the bike at pickup and return.',
                      }, {
                        title: 'Deposits with unclear terms',
                        text: 'Ask what conditions affect the deposit and get it in writing/message.',
                      }, {
                        title: 'Mystery fees',
                        text: 'Confirm daily/weekly/monthly pricing and what’s included before you pay.',
                      }, {
                        title: 'Bad maintenance',
                        text: 'If the bike feels unsafe, walk away. Your trip is not worth it.',
                      }].map((s) => (
                        <div key={s.title} className="rounded-2xl border bg-white p-6">
                          <p className="font-extrabold text-gray-900">{s.title}</p>
                          <p className="mt-2 text-gray-700 leading-7">{s.text}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="costs" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Rental costs (and what affects them)</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Costs depend on bike type, rental length, season, and what’s included.
                      Longer rentals are often better value per day.
                    </p>
                    <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
                      <p className="text-sm font-bold text-gray-900">Rule of thumb</p>
                      <p className="mt-2 text-sm text-gray-700">
                        If you’re staying more than a few days, compare weekly/monthly pricing.
                        It’s the difference between “nice trip” and “why is transport my biggest expense?”
                      </p>
                    </div>
                  </section>

                  <section id="regions" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Regional considerations</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      North vs South riding feels different.
                      Mountains change the game. Coastal routes can be windy.
                      Pick your bike (and your daily distance) based on conditions.
                    </p>
                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <p className="text-sm font-bold text-gray-900">Starting from Haiphong?</p>
                      <p className="mt-2 text-gray-700 leading-7">
                        You’re perfectly placed for coastal rides, island trips, and longer routes into the north.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link to="/guides/haiphong-travel-guide" className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                          Haiphong travel guide <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/guides/northern-vietnam-road-trips" className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                          Northern road trips <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </section>

                  <section id="planning" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Planning your trip</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Your first motorbike trip in Vietnam does not need to be 400 km a day.
                      Start smaller, build confidence, then go bigger.
                      The best trips are the ones where you arrive with enough energy to enjoy the place.
                    </p>

                    <div className="mt-6 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                      <p className="text-xs uppercase tracking-[0.35em] text-white/80">Ready to ride?</p>
                      <h3 className="mt-2 text-2xl font-extrabold">Book with confidence at Rivercity</h3>
                      <p className="mt-3 text-white/90">Clear pricing, solid bikes, and support if something goes sideways.</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link to="/motorbikes" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-50">
                          View available bikes <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15">
                          Book now <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </section>

                  <GuidesPostGrid
                    title="More riding tips (blog)"
                    subtitle="Only published posts show up here, so you won’t hit broken links."
                    limit={6}
                  />

                  <section className="mt-12 rounded-2xl border bg-white p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Quick summary for skimmers</p>
                    <ul className="mt-4 space-y-3 text-sm text-gray-700">
                      {[
                        'Pick a bike that matches your skill level and route plan (automatic scooters are the easiest start).',
                        'Handle licenses and insurance properly—don’t gamble on “it’ll be fine.”',
                        'Film the bike at pickup and do a quick brake/lights check. It prevents 90% of drama.',
                        'Ride predictably, avoid ego battles, and slow down in rain and at night.',
                        'Choose weekly/monthly pricing for longer stays—daily taxis add up fast.',
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
                        'motorbike rental vietnam guide',
                        'how to rent a motorbike in vietnam',
                        'vietnam motorbike license requirements',
                        'motorbike rental deposit vietnam',
                        'beginner tips riding in vietnam',
                        'haiphong motorbike rental',
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

export default MotorbikeRentalGuideVietnamPage;
