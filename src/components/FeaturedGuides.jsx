import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import GuideCard from '@/components/GuideCard';
import { guides } from '@/lib/guides';

const FeaturedGuides = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
            <BookOpen className="h-4 w-4" />
            Essential travel resources
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
            Travel guides that don’t talk down to you
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Pick a guide, steal the best ideas, and leave the rest. Your future self (and your phone battery) will thank you.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((g) => (
            <GuideCard key={g.id} guide={g} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white font-semibold shadow-lg shadow-blue-900/20 hover:bg-blue-700"
          >
            View all guides
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGuides;
