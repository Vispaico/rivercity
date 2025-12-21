import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '@/components/PageHeader';
import GuideCard from '@/components/GuideCard';
import AdBanner from '@/components/AdBanner';
import { guides, guideIndexMeta } from '@/lib/guides';

const GuidesPage = () => {
  return (
    <>
      <Helmet>
        <title>{guideIndexMeta.title}</title>
        <meta name="description" content={guideIndexMeta.description} />
        <link rel="canonical" href={guideIndexMeta.canonical} />
      </Helmet>

      <PageHeader
        title="Our Featured Travel Guides"
        subtitle="Four big guides. Zero fluff. A little chaos (the fun kind)."
        breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Guides' }]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-gray-900">How to use these</h2>
            <p className="mt-3 text-gray-700 leading-7">
              Pick one guide. Skim the table of contents. Save the bits you actually need. Ignore the rest.
              If you’re the type who prints checklists, I respect you. If you’re the type who wings it… I also respect you.
              Just maybe don’t wing it with your helmet.
            </p>
            <p className="mt-3 text-gray-700 leading-7">
              Each guide is built to stay evergreen (not a blog post that gets buried). We’ll keep adding links to relevant blog posts
              as we publish them—so these pages get better over time.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <AdBanner className="rounded-2xl border bg-white p-4 shadow-sm" />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((g) => (
              <GuideCard key={g.id} guide={g} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default GuidesPage;
