import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Wallet, HeartPulse, Smartphone, Bike, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import GuidesPostGrid from '@/components/GuidesPostGrid';
import AdBanner from '@/components/AdBanner';

const LivingInHaiphongExpatGuidePage = () => {
  const metaTitle = 'Living in Haiphong: Complete Expat Guide (2025) | Rivercity';
  const metaDescription =
    'Moving to Haiphong? This expat guide covers neighborhoods, housing, cost of living, healthcare, SIM cards, getting around, and long-term motorbike rentals.';
  const canonicalUrl = 'https://www.rivercitybikerentals.com/guides/living-in-haiphong-expat-guide';

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <PageHeader
        title="Living in Haiphong: Expat Guide"
        subtitle="The stuff you wish someone told you before you signed a lease, bought a rice cooker, and accidentally joined three Facebook groups."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Guides', link: '/guides' }, { name: 'Living in Haiphong' }]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-3">
              <div className="sticky top-28 rounded-2xl border bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Table of contents</p>
                <nav className="mt-4 space-y-2 text-sm">
                  {[
                    ['#why', 'Why Haiphong'],
                    ['#cost', 'Cost of living'],
                    ['#housing', 'Finding housing'],
                    ['#healthcare', 'Healthcare + insurance'],
                    ['#transport', 'Getting around'],
                    ['#work', 'Working + digital nomads'],
                    ['#language', 'Learning Vietnamese'],
                    ['#connected', 'SIM + internet + banking'],
                    ['#community', 'Expat community'],
                    ['#checklist', 'Settling-in checklist'],
                  ].map(([href, label]) => (
                    <a key={href} href={href} className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-white hover:text-blue-700">
                      {label}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 rounded-xl border bg-white p-4">
                  <p className="text-sm font-bold text-gray-900">Long stay = long-term wheels</p>
                  <p className="mt-2 text-sm text-gray-700">
                    Monthly rentals are usually cheaper (and calmer) than living on taxis.
                  </p>
                  <Link
                    to="/motorbikes"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <Bike className="h-4 w-4" />
                    See long-term options
                  </Link>
                </div>
              </div>
            </aside>

            <article className="lg:col-span-9">
              <div className="overflow-hidden rounded-3xl border bg-white shadow-lg">
                <div className="relative h-56 sm:h-64">
                  <img
                    src="/haiphong-skyline.webp"
                    alt="Haiphong skyline."
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
                  <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-center sm:justify-end">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/80">Quick vibe check</p>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                      Haiphong is a working city. That’s the whole charm.
                    </h2>
                    <p className="mt-3 text-white/90 max-w-2xl">
                      Less tourist theatre, more daily life. If you like good food and quiet wins, you’ll probably love it.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-10">
                  <div className="mb-8 flex justify-center">
                    <AdBanner className="rounded-2xl border bg-white p-4 shadow-sm" />
                  </div>

                  <section id="why" className="scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Why choose Haiphong?</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      People move here for the same reasons they accidentally stay: it’s practical, it’s affordable compared to bigger hubs,
                      and you’re close to islands, beaches, and countryside without needing a two-day logistics spreadsheet.
                    </p>
                    <p className="mt-4 text-gray-700 leading-7">
                      Another underrated perk: Haiphong is less “expat bubble” by default.
                      You’ll still find community, but you’re not living inside an Instagram caption.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[{
                        icon: <Home className="h-5 w-5 text-blue-700" />,
                        title: 'Livable',
                        text: 'Daily routines feel doable: errands, food, commutes, repeat.',
                      }, {
                        icon: <Wallet className="h-5 w-5 text-blue-700" />,
                        title: 'Budget-friendly',
                        text: 'Your money tends to stretch further (especially on food).',
                      }, {
                        icon: <ArrowRight className="h-5 w-5 text-blue-700" />,
                        title: 'Well-located',
                        text: 'Great base for Cat Ba, Ha Long region routes, and quick weekend escapes.',
                      }].map((c) => (
                        <div key={c.title} className="rounded-2xl border bg-white p-4">
                          <div className="flex items-center gap-2 font-semibold text-gray-900">{c.icon}{c.title}</div>
                          <p className="mt-2 text-sm text-gray-700">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="cost" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Cost of living</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Prices change, and your lifestyle matters more than any random “average.”
                      The easiest way to think about it: your big knobs are housing, transport, and how often you eat Western comfort food.
                    </p>
                    <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
                      <p className="text-sm font-bold text-gray-900">Budget snapshot (placeholder)</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Replace this box with a simple table once you want exact numbers.
                        For now: plan for a range and adjust after your first month.
                      </p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="rounded-xl bg-white p-4 border">
                          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Housing</p>
                          <p className="mt-2 font-bold text-gray-900">Biggest variable</p>
                          <p className="mt-1 text-sm text-gray-700">Neighborhood + building + how new it is.</p>
                        </div>
                        <div className="rounded-xl bg-white p-4 border">
                          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Food</p>
                          <p className="mt-2 font-bold text-gray-900">Generally friendly</p>
                          <p className="mt-1 text-sm text-gray-700">Local meals are great value.</p>
                        </div>
                        <div className="rounded-xl bg-white p-4 border">
                          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Transport</p>
                          <p className="mt-2 font-bold text-gray-900">Choose your pain</p>
                          <p className="mt-1 text-sm text-gray-700">Bike rental vs taxis adds up fast.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="housing" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Finding housing</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Apartment hunting here is very doable, but it helps to treat the first two weeks like a scouting mission.
                      Book something short-term, explore neighborhoods in person, then commit.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Neighborhood checklist</h3>
                        <ul className="mt-3 space-y-3 text-sm text-gray-700">
                          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Walk it at night. Noise has opinions.</li>
                          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Check commute reality: school/work/gym/coffee loop.</li>
                          <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Ask about water pressure and internet speed. Seriously.</li>
                        </ul>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <h3 className="text-lg font-extrabold text-gray-900">Transport hack</h3>
                        <p className="mt-3 text-gray-700 leading-7">
                          Viewing apartments is 10x easier with your own wheels.
                          Monthly rental = you can hop between viewings, errands, and furniture stores without building a taxi relationship.
                        </p>
                        <Link
                          to="/motorbikes"
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          <Bike className="h-4 w-4" />
                          Browse motorbikes
                        </Link>
                      </div>
                    </div>
                  </section>

                  <section id="healthcare" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Healthcare & insurance</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Good rule: keep your basics sorted before you need them.
                      Have a clinic/hospital option, save emergency numbers, and keep insurance docs somewhere you can find without crying.
                    </p>
                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <div className="flex items-start gap-3">
                        <HeartPulse className="h-5 w-5 text-blue-700 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-gray-900">Reality check</p>
                          <p className="mt-2 text-gray-700 leading-7">
                            For anything complicated, you may still choose larger cities depending on your needs.
                            For everyday care, Haiphong has plenty of options.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="transport" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Getting around</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      The boring truth: the right transport choice decides how much you’ll enjoy living here.
                      If you rely on taxis for everything, you’ll feel “stuck” even though the city is fine.
                      If you have a bike (or car), Haiphong becomes easy.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border bg-gray-50 p-6">
                        <p className="text-sm font-semibold text-gray-900">Monthly motorbike rental</p>
                        <p className="mt-2 text-sm text-gray-700">Best for: daily commutes, errands, flexibility.</p>
                        <p className="mt-2 text-sm text-gray-700">Also best for: not waiting outside in humidity while an app searches for drivers.</p>
                      </div>
                      <div className="rounded-2xl border bg-gray-50 p-6">
                        <p className="text-sm font-semibold text-gray-900">Car rental</p>
                        <p className="mt-2 text-sm text-gray-700">Best for: families, longer distances, rainy season comfort.</p>
                        <p className="mt-2 text-sm text-gray-700">Downside: parking and city traffic logistics.</p>
                      </div>
                    </div>
                    <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-7 text-white">
                      <p className="text-xs uppercase tracking-[0.35em] text-white/80">CTA</p>
                      <h3 className="mt-2 text-2xl font-extrabold">Monthly rentals from $100</h3>
                      <p className="mt-3 text-white/90">Flexible, maintained, and you don’t have to “buy a bike” to live well here.</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link to="/motorbikes" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-50">
                          View motorbikes <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/guides/motorbike-rental-guide-vietnam" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15">
                          Rental guide <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </section>

                  <section id="work" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Working & digital nomads</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      If you work remotely, your world is basically: Wi‑Fi, coffee, and a chair that doesn’t ruin your posture.
                      The nice part is Haiphong has plenty of cafes. The tricky part is finding the ones that don’t blast music like it’s a club.
                    </p>
                    <p className="mt-4 text-gray-700 leading-7">
                      Pro move: keep two spots.
                      One “serious work” place, one “creative chaos” place for when you need a vibe.
                    </p>
                  </section>

                  <section id="language" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Learning Vietnamese</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      You don’t need to become fluent overnight.
                      Learn the basics, then add one useful phrase per week. After a month, people will suddenly treat you like you’ve unlocked a secret level.
                    </p>
                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <p className="text-sm font-bold text-gray-900">Starter phrases (gentle mode)</p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                        {[
                          'Xin chào (hello)',
                          'Cảm ơn (thank you)',
                          'Bao nhiêu tiền? (how much?)',
                          'Không cay (not spicy)',
                          'Cho mình… (can I have…)',
                          'Tính tiền (bill, please)',
                        ].map((p) => (
                          <div key={p} className="rounded-xl bg-gray-50 p-3 border">{p}</div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section id="connected" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">SIM, internet, banking</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border bg-white p-6">
                        <div className="flex items-start gap-3">
                          <Smartphone className="h-5 w-5 text-blue-700 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-gray-900">SIM cards</p>
                            <p className="mt-2 text-gray-700 leading-7">
                              Get one early. Data makes everything easier: maps, translations, and the ability to pretend you didn’t see a message.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border bg-white p-6">
                        <div className="flex items-start gap-3">
                          <Wallet className="h-5 w-5 text-blue-700 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-gray-900">Banking</p>
                            <p className="mt-2 text-gray-700 leading-7">
                              Keep cash + card. Use whichever is normal for where you’re standing.
                              If you’re staying long-term, ask your employer/contacts what’s easiest locally.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="community" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Expat community</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Community exists; it’s just not always in-your-face.
                      Most people find friends through work, sports, cafes, and—yes—Facebook groups.
                      Show up consistently and you’ll be “a regular” faster than you expect.
                    </p>
                    <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-blue-700 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-gray-900">Your social strategy</p>
                          <ul className="mt-3 space-y-2 text-sm text-gray-700">
                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Pick one hobby and stick with it for a month.</li>
                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Say yes to invites early on (within reason).</li>
                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />Learn names. It’s basically friendship magic.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="checklist" className="mt-12 scroll-mt-28">
                    <h2 className="text-3xl font-extrabold text-gray-900">Settling-in checklist</h2>
                    <p className="mt-4 text-gray-700 leading-7">
                      Print it. Screenshot it. Tattoo it (please don’t). This is the “first two weeks” sanity list.
                    </p>
                    <div className="mt-6 rounded-2xl border bg-white p-6">
                      <ul className="space-y-3 text-sm text-gray-700">
                        {[
                          'Get a local SIM + set up maps + translation apps.',
                          'Choose your transport plan (monthly bike rental makes life easy).',
                          'Find your go-to: grocery spot, pharmacy, coffee shop.',
                          'Save emergency contacts + your address in Vietnamese on your phone.',
                          'Figure out rent terms + deposits before you commit to a long lease.',
                          'Buy basics: rain gear, power adapter, and something for mosquitoes.',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10 rounded-2xl border bg-gray-50 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Related guides</p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link className="rounded-xl bg-white p-4 border hover:border-blue-300" to="https://www.rivercitybikerentals.com/blog/cost-of-living-in-haiphong-2026-complete-budget-breakdown">
                          <p className="font-bold text-gray-900">Cost of Living in Haiphong 2026:</p>
                          <p className="mt-1 text-sm text-gray-700">Complete Budget Breakdown</p>
                        </Link>
                        <Link className="rounded-xl bg-white p-4 border hover:border-blue-300" to="/guides/haiphong-travel-guide">
                          <p className="font-bold text-gray-900">Ultimate Haiphong Travel Guide</p>
                          <p className="mt-1 text-sm text-gray-700">For visitors, day trips, food, and city basics.</p>
                        </Link>
                      </div>
                    </div>
                  </section>

                  <GuidesPostGrid
                    title="Articles for long-stay life"
                    subtitle="Published posts only (so you won’t click into a dead end)."
                    limit={6}
                  />

                  <section className="mt-12 rounded-2xl border bg-white p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Quick summary for skimmers</p>
                    <ul className="mt-4 space-y-3 text-sm text-gray-700">
                      {[
                        'Haiphong is a livable, practical base with easy escapes to islands and coastal routes.',
                        'Your biggest “cost knobs” are housing, transport, and how often you chase imported comfort food.',
                        'Do a short-term stay first, then choose a neighborhood after you’ve walked it at different times.',
                        'Sort basics early: SIM/data, emergency contacts, and a healthcare option.',
                        'Monthly motorbike rental is usually the simplest way to make daily life easy.',
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
                        'living in haiphong',
                        'haiphong expat guide',
                        'move to haiphong vietnam',
                        'haiphong cost of living',
                        'monthly motorbike rental haiphong',
                        'best neighborhoods in haiphong',
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

export default LivingInHaiphongExpatGuidePage;
