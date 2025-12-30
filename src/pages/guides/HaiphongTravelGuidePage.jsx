import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Bike, MapPin, UtensilsCrossed, Sun, ArrowRight, ShieldCheck, Route } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import GuidesPostGrid from '@/components/GuidesPostGrid';
import AdBanner from '@/components/AdBanner';

const HaiphongTravelGuidePage = () => {
  const metaTitle = 'Ultimate Haiphong Travel Guide (2025) | Rivercity Bike Rentals';
  const metaDescription =
    'A no-fluff Haiphong travel guide: how to get here, where to stay, what to eat, top attractions, day trips (Cat Ba + Lan Ha Bay), and how to get around with confidence.';
  const canonicalUrl = 'https://www.rivercitybikerentals.com/guides/haiphong-travel-guide';

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <PageHeader
        title="Ultimate Haiphong Travel Guide"
        subtitle="How to get here, what to do, what to eat, and how to move around without feeling like a confused Roomba."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Guides', link: '/guides' }, { name: 'Haiphong Travel Guide' }]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border bg-white shadow-lg">
            <div className="relative h-56 sm:h-64">
              <img
                src="/haiphong-port-scenic-view.webp"
                alt="Haiphong: the port at golden hour."
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                <p className="text-xs uppercase tracking-[0.35em] text-white/80">Quick plan</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white max-w-2xl">
                  48 hours in Haiphong: eat crab noodles, ride somewhere green, and brag about it later.
                </h2>
                <p className="mt-3 text-white/90 max-w-2xl">
                  This page is your “I landed, now what?” guide. Keep it open, steal the ideas you like, and ignore the rest.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="mb-8 flex justify-center">
                <AdBanner className="rounded-2xl border bg-white p-4 shadow-sm" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-3">
                  <div className="sticky top-28 rounded-2xl border bg-gray-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Quick navigation</p>
                    <nav className="mt-4 space-y-2 text-sm">
                      {[
                        ['#intro', 'Intro: why Haiphong is worth your time'],
                        ['#getting-to-haiphong', 'Getting to Haiphong'],
                        ['#getting-around', 'Getting around (with sanity)'],
                        ['#top-attractions', 'Top attractions'],
                        ['#day-trips', 'Best day trips'],
                        ['#food', 'Food & dining'],
                        ['#where-to-stay', 'Where to stay'],
                        ['#beaches', 'Beaches near Haiphong'],
                        ['#practical', 'Practical info'],
                      ].map(([href, label]) => (
                        <a
                          key={href}
                          href={href}
                          className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-white hover:text-blue-700"
                        >
                          {label}
                        </a>
                      ))}
                    </nav>

                    <div className="mt-6 rounded-xl bg-white p-4 border">
                      <p className="text-sm font-bold text-gray-900">Want the easy mode?</p>
                      <p className="mt-1 text-sm text-gray-700">
                        Grab a motorbike, save time, and stop paying “Grab tax” on every little hop.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link
                          to="/motorbikes"
                          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          <Bike className="h-4 w-4" />
                          View motorbikes
                        </Link>
                        <Link
                          to="/cars"
                          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        >
                          View cars
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </aside>

                <article className="lg:col-span-9">
                  <section id="intro" className="scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Why Haiphong?</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Haiphong is Vietnam’s port city with a practical, lived-in vibe. It’s not trying to be cute for tourists.
                      It’s just busy doing Haiphong things: shipping containers, street food that punches above its weight, and
                      being the main launchpad for Cat Ba Island and Lan Ha Bay.
                    </p>
                    <p className="mt-4 text-gray-700 leading-7">
                      If Hanoi feels like a beautiful, chaotic group chat, Haiphong is the friend who replies late—but when they
                      do, the message is actually useful. You can eat ridiculously well, ride out to something green, and still
                      be back in time for a second dinner.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="rounded-2xl border bg-white p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          Gateway city
                        </div>
                        <p className="mt-2 text-sm text-gray-700">
                          Great base for Cat Ba + Lan Ha Bay, plus plenty to do inside the city.
                        </p>
                      </div>
                      <div className="rounded-2xl border bg-white p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <UtensilsCrossed className="h-4 w-4 text-blue-600" />
                          Food city
                        </div>
                        <p className="mt-2 text-sm text-gray-700">
                          Crab noodle soup and crispy crab rolls are basically a love letter.
                        </p>
                      </div>
                      <div className="rounded-2xl border bg-white p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <Route className="h-4 w-4 text-blue-600" />
                          Easy escapes
                        </div>
                        <p className="mt-2 text-sm text-gray-700">
                          Beaches, islands, and quiet countryside are all “half a day trip” away.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="getting-to-haiphong" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Getting to Haiphong</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Most people arrive from Hanoi, Noi Bai Airport, or from the coast (Ha Long / Cat Ba routes).
                      Travel times depend on traffic and your exact pickup point, but the headline is simple: it’s not far.
                    </p>

                    <div className="mt-6 overflow-hidden rounded-2xl border">
                      <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-50">
                        <div className="p-5">
                          <p className="text-sm font-bold text-gray-900">From Hanoi (Old Quarter)</p>
                          <p className="mt-2 text-sm text-gray-700">
                            Bus/limousine, private car, or train. Roughly 2–3 hours depending on the option and traffic.
                          </p>
                        </div>
                        <div className="p-5 border-t md:border-t-0 md:border-l">
                          <p className="text-sm font-bold text-gray-900">From Noi Bai (HAN)</p>
                          <p className="mt-2 text-sm text-gray-700">
                            Private transfer is the “no drama” choice. Expect extra time for airport distance and traffic.
                          </p>
                        </div>
                        <div className="p-5 border-t md:border-t-0 md:border-l">
                          <p className="text-sm font-bold text-gray-900">By plane</p>
                          <p className="mt-2 text-sm text-gray-700">
                            Cat Bi International Airport (HPH) is close to town—often ~20–30 minutes by car.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border bg-blue-50 p-6">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="h-5 w-5 text-blue-700 mt-0.5" />
                        <div>
                          <p className="font-bold text-blue-900">Tiny traveler tip</p>
                          <p className="mt-2 text-sm text-blue-900/90 leading-6">
                            If you’re arriving late: book your first night in the city center.
                            Once you’ve slept and eaten something that isn’t airport potato chips, then do your island/day-trip plans.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="getting-around" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Getting around (with sanity)</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Haiphong is spread out. You <em>can</em> bounce around with taxis/Grab, but it gets old fast.
                      A motorbike gives you the sweet spot: fast, flexible, and you can actually stop when something looks interesting.
                    </p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Options (ranked by how much freedom you want)</h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-700">
                          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Motorbike rental: best for exploring, day trips, and not waiting around.</li>
                          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Car + driver: comfy, great for families and airport days.</li>
                          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Grab/taxi: fine for a couple rides, less fun as a lifestyle.</li>
                        </ul>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">If you ride: the “don’t panic” rules</h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-700">
                          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Go with the flow. Sudden stops are the main villain.</li>
                          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Assume everyone will do something weird. You’ll be right often.</li>
                          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Wear a good helmet. Your brain is the most expensive luggage you brought.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">CTA</p>
                          <p className="mt-1 text-xl font-extrabold text-gray-900">Want a bike that’s actually maintained?</p>
                          <p className="mt-2 text-gray-700">
                            Choose your ride, pick your dates, and get rolling.
                          </p>
                        </div>
                        <Link
                          to="/motorbikes"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
                        >
                          View motorbikes
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </section>

                  <section id="top-attractions" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Top attractions (the hits)</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Here’s a mix of “classic tourist” and “local-life, but interesting.”
                      For now, the deep dives live on our blog—this hub links only to posts that actually exist.
                      (So if you don’t see a dedicated post yet, it means we’re still cooking it.)
                    </p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: 'Cat Ba Island + Lan Ha Bay',
                          blurb:
                            'The obvious day-trip/overnight move. Think limestone islands, calm bays, and the kind of photos your friends hate.',
                          icon: <Sun className="h-5 w-5 text-blue-700" />,
                        },
                        {
                          title: 'Tam Bac Lake stroll',
                          blurb:
                            'Easy walk, good people-watching, and a nice reset if you’ve been on a scooter all day.',
                          icon: <MapPin className="h-5 w-5 text-blue-700" />,
                        },
                        {
                          title: 'Old streets + French-era corners',
                          blurb:
                            'Haiphong has pockets of older architecture and wide boulevards. Great for a slow wander and coffee breaks.',
                          icon: <MapPin className="h-5 w-5 text-blue-700" />,
                        },
                        {
                          title: 'Food streets (yes, this is an attraction)',
                          blurb:
                            'If you only came to eat, nobody would judge you. Not even a little.',
                          icon: <UtensilsCrossed className="h-5 w-5 text-blue-700" />,
                        },
                      ].map((a) => (
                        <div key={a.title} className="rounded-2xl border bg-white p-6">
                          <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-blue-50 p-2">{a.icon}</div>
                            <h3 className="text-lg font-extrabold text-gray-900">{a.title}</h3>
                          </div>
                          <p className="mt-3 text-gray-700 leading-7">{a.blurb}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="day-trips" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Best day trips</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Haiphong is positioned perfectly for “leave after breakfast, back before it gets weird” adventures.
                      Pick your vibe:
                    </p>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
                      <div className="rounded-2xl border bg-white p-6">
                        <p className="text-sm font-semibold text-gray-900">Island day</p>
                        <p className="mt-2 text-sm text-gray-700">Cat Ba + Lan Ha Bay. Boats, viewpoints, and a very real chance you’ll extend your stay.</p>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <p className="text-sm font-semibold text-gray-900">Temple + mountain day</p>
                        <p className="mt-2 text-sm text-gray-700">Yen Tu area is a popular spiritual trip with pagodas and (often) cable cars.</p>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <p className="text-sm font-semibold text-gray-900">Beach day</p>
                        <p className="mt-2 text-sm text-gray-700">Do Son is the classic local beach escape. Easy, close, and snack-friendly.</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl bg-gray-50 p-6 border">
                      <p className="text-sm font-bold text-gray-900">Mini infographic</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Haiphong center → Cat Ba → Do Son → Yen Tu.
                      </p>
                      <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-100 to-white" />
                      <img
                    src="/haiphong-yen-tu-cat-ba-do-don-map.webp"
                    alt="Map showing popular day trip directions from Haiphong to Cat Ba Island, Do Son Beach, and Yen Tu Mountain."
                  />
                    </div>
                  </section>

                  <section id="food" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Food & dining</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Haiphong is famous in Vietnam for food that’s bold, salty-in-a-good-way, and deeply snackable.
                      Two classics you’ll see everywhere:
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Bánh đa cua (crab noodle soup)</h3>
                        <p className="mt-2 text-gray-700 leading-7">
                          Rich broth, crab, chewy noodles, and enough toppings to make you suspicious.
                          It’s the kind of bowl that turns “I’ll just have a light lunch” into a lie.
                        </p>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Nem cua bể (crispy crab rolls)</h3>
                        <p className="mt-2 text-gray-700 leading-7">
                          Square-ish crab spring rolls that crackle when you bite them.
                          Dip, crunch, repeat. Your only job is to not burn your tongue.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Food strategy</p>
                      <ul className="mt-3 space-y-3 text-sm text-gray-700">
                        <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Eat early, eat often. Small meals = more variety.</li>
                        <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />If a place is busy with locals, that’s your green flag.</li>
                        <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Carry tissues. This is not negotiable.</li>
                      </ul>
                    </div>
                  </section>

                  <section id="where-to-stay" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Where to stay</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      If you’re here for a short trip, stay fairly central so you can walk to food and keep rides short.
                      If you’re here longer, pick a neighborhood that matches your daily rhythm (quiet mornings vs. "I want chaos on demand").
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="rounded-2xl border bg-white p-5">
                        <p className="text-sm font-bold text-gray-900">Central / convenient</p>
                        <p className="mt-2 text-sm text-gray-700">Easy food access, simple logistics, good for first-timers.</p>
                      </div>
                      <div className="rounded-2xl border bg-white p-5">
                        <p className="text-sm font-bold text-gray-900">Quieter local areas</p>
                        <p className="mt-2 text-sm text-gray-700">More “real-life Haiphong” and fewer tourists.</p>
                      </div>
                      <div className="rounded-2xl border bg-white p-5">
                        <p className="text-sm font-bold text-gray-900">Beach base (seasonal)</p>
                        <p className="mt-2 text-sm text-gray-700">Do Son can be fun if you want beach first, city second.</p>
                      </div>
                    </div>
                  </section>

                  <section id="beaches" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Beaches near Haiphong</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      If you want sand close to town, Do Son is the classic pick (roughly ~20 km from the city).
                      If you want the “wow” water scenery, aim for Cat Ba and boat routes around Lan Ha Bay.
                    </p>
                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <div className="flex items-start gap-3">
                        <Sun className="h-5 w-5 text-blue-700 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-gray-900">Best months?</p>
                          <p className="mt-2 text-gray-700 leading-7">
                            Warm months are best for beach time. Weather shifts year to year, so check a forecast before you plan your “all beaches, no shoes” week.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="practical" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Practical info (the boring stuff that saves your day)</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Money</h3>
                        <p className="mt-2 text-gray-700 leading-7">
                          Carry some cash for street food and small shops, and use cards where they’re accepted.
                          ATMs exist—just don’t wait until you’re hungry and dramatic.
                        </p>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Safety</h3>
                        <p className="mt-2 text-gray-700 leading-7">
                          Normal city rules: watch your bag, don’t flash valuables, and use a good helmet if you ride.
                          If traffic feels intense, start in quiet areas and work your way up.
                        </p>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Weather</h3>
                        <p className="mt-2 text-gray-700 leading-7">
                          Haiphong has hot, humid stretches and cooler months.
                          Pack light layers and a rain plan (umbrella or poncho). You’ll use it.
                        </p>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Language</h3>
                        <p className="mt-2 text-gray-700 leading-7">
                          A smile helps. So does a screenshot.
                          Learn a couple basics and you’ll suddenly get “local points” for free.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                      <h3 className="text-2xl font-extrabold">Ready to explore?</h3>
                      <p className="mt-3 text-white/90">
                        Book your motorbike, grab a phone holder, and go collect stories.
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          to="/motorbikes"
                          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-50"
                        >
                          View available motorbikes
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          to="/guides/motorbike-rental-guide-vietnam"
                          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
                        >
                          Motorbike rental guide
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="mt-10 rounded-2xl border bg-gray-50 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Related guides</p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link className="rounded-xl bg-white p-4 border hover:border-blue-300" to="/guides/living-in-haiphong-expat-guide">
                          <p className="font-bold text-gray-900">Living in Haiphong: Expat Guide</p>
                          <p className="mt-1 text-sm text-gray-700">For long stays, apartments, and daily life.</p>
                        </Link>
                        <Link className="rounded-xl bg-white p-4 border hover:border-blue-300" to="/guides/northern-vietnam-road-trips">
                          <p className="font-bold text-gray-900">Northern Vietnam Road Trips</p>
                          <p className="mt-1 text-sm text-gray-700">Route ideas and planning for multi-day rides.</p>
                        </Link>
                      </div>
                    </div>
                  </section>

                  <GuidesPostGrid
                    title="Articles you can read next"
                    subtitle="These pull from your published blog posts, so this section only shows stuff that actually exists."
                    limit={6}
                  />

                  <section className="mt-12 rounded-2xl border bg-white p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Quick summary for skimmers</p>
                    <ul className="mt-4 space-y-3 text-sm text-gray-700">
                      {[
                        'Haiphong is a practical port city and a great base for Cat Ba Island and Lan Ha Bay.',
                        'Getting here from Hanoi is straightforward (bus/private car/train); Cat Bi Airport (HPH) is close to town.',
                        'A motorbike is the easiest way to explore the city and do short day trips.',
                        'Must-try food: bánh đa cua (crab noodle soup) and nem cua bể (crispy crab rolls).',
                        'For beaches: Do Son is close; Cat Ba routes are the “wow” option.',
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
                        'haiphong travel guide',
                        'things to do in haiphong',
                        'how to get from hanoi to haiphong',
                        'cat ba day trip from haiphong',
                        'haiphong street food guide',
                        'best way to get around haiphong',
                      ].map((kw) => (
                        <span key={kw} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </section>
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HaiphongTravelGuidePage;
