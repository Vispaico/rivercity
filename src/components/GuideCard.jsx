import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const GuideCard = ({ guide }) => {
  return (
    <Link
      to={guide.href}
      className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative">
        <img
          src={guide.image?.src}
          alt={guide.image?.alt}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

        {guide.badge && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            {guide.badge}
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
          {guide.kicker}
        </p>
        <h3 className="mt-2 text-xl font-extrabold text-gray-900">
          {guide.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-gray-600">{guide.description}</p>

        {Array.isArray(guide.highlights) && guide.highlights.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {guide.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
          Read the guide
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
};

export default GuideCard;
