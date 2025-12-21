import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import PageHeader from '../components/PageHeader';
import SocialShareBar from '../components/SocialShareBar';
import AdBanner from '../components/AdBanner';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabaseUnavailable = !supabase;

  useEffect(() => {
    const fetchPost = async () => {
      if (supabaseUnavailable) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPost(data);

        const { data: recData, error: recError } = await supabase
          .from('posts')
          .select('id, slug, title, created_at, featured_image_url, content, meta_description')
          .eq('is_published', true)
          .neq('slug', slug)
          .order('created_at', { ascending: false })
          .limit(3);

        if (recError) throw recError;
        setRecommendedPosts(recData || []);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const getPostExcerpt = (p) => {
    if (p?.meta_description) return p.meta_description;
    const text = (p?.content || '').replace(/<[^>]+>/g, '');
    return text.length > 140 ? `${text.substring(0, 140)}...` : text;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (supabaseUnavailable) {
    return <div className="flex justify-center items-center h-screen">Blog content is currently unavailable.</div>;
  }

  if (!post) {
    return <div className="flex justify-center items-center h-screen">Post not found.</div>;
  }

  const plainTextContent = post.content.replace(/<[^>]+>/g, '');
  const canonicalUrl = `https://rivercitybikerentals.com/blog/${post.slug}`;
  const shareUrl = typeof window !== 'undefined' && window.location?.href
    ? window.location.href.split('#')[0]
    : canonicalUrl;

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || plainTextContent.substring(0, 160)} />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || plainTextContent.substring(0, 160)} />
        {post.featured_image_url && <meta property="og:image" content={post.featured_image_url} />}
        <meta property="og:type" content="article" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <PageHeader 
        title={post.title}
        subtitle={`Published on ${format(new Date(post.created_at), 'MMMM d, yyyy')}`}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {post.featured_image_url && (
              <img 
                src={post.featured_image_url} 
                alt={post.title} 
                className="w-full h-auto object-cover rounded-lg mb-8"
              />
            )}

            <div className="mb-6">
              <SocialShareBar title={post.title} url={shareUrl} imageUrl={post.featured_image_url} />
            </div>

            <div className="my-6 flex justify-center">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Advertisement</p>
                <div
                  className="mx-auto flex h-[70px] w-[340px] items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50"
                >
                  <AdBanner />
                </div>
              </div>
            </div>

            <div 
              className="prose lg:prose-xl max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {recommendedPosts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedPosts.map((p) => (
                  <Link
                    to={`/blog/${p.slug}`}
                    key={p.id}
                    className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="relative">
                      {p.featured_image_url && (
                        <img
                          src={p.featured_image_url}
                          alt={p.title}
                          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-500 mb-2">{format(new Date(p.created_at), 'MMMM d, yyyy')}</p>
                      <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {p.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">{getPostExcerpt(p)}</p>
                      <span className="inline-block mt-3 text-blue-600 font-semibold group-hover:underline">Read More →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
