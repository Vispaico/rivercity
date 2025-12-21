import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { format } from 'date-fns';

const stripHtml = (html) => String(html || '').replace(/<[^>]+>/g, '');

const GuidesPostGrid = ({ title = 'Fresh from the blog', subtitle, limit = 6 }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: e } = await supabase
          .from('posts')
          .select('id, slug, title, created_at, featured_image_url, content, meta_description')
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (e) throw e;
        if (!cancelled) setPosts(data || []);
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Could not load posts.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return (
    <section className="mt-14">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900">{title}</h3>
          {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
        </div>
        <Link to="/blog" className="text-sm font-semibold text-blue-700 hover:underline">
          See all blog posts →
        </Link>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-gray-600">Loading posts…</p>
      ) : !supabase ? (
        <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
          <p className="text-sm text-gray-700">
            Blog posts are currently unavailable (Supabase isn’t configured in this environment).
          </p>
          <p className="mt-2 text-sm text-gray-700">
            On the live site, this section will automatically show only the posts that exist.
          </p>
        </div>
      ) : error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
          <p className="text-sm text-gray-700">
            No published blog posts found yet. Once you publish posts, they’ll appear here automatically.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const excerpt = (post.meta_description || stripHtml(post.content)).slice(0, 140);
            return (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {post.featured_image_url ? (
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-44 w-full bg-gradient-to-br from-blue-100 to-gray-100" />
                )}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                    {post.created_at ? format(new Date(post.created_at), 'MMM d, yyyy') : '—'}
                  </p>
                  <h4 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-700">
                    {post.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">{excerpt}{excerpt.length >= 140 ? '…' : ''}</p>
                  <div className="mt-4 text-sm font-semibold text-blue-700">Read →</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default GuidesPostGrid;
