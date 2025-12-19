import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import PageHeader from '../components/PageHeader';
import SocialShareBar from '../components/SocialShareBar';
import AdBanner from '../components/AdBanner';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabaseUnavailable = !supabase;

  useEffect(() => {
    const fetchPost = async () => {
      if (supabaseUnavailable) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
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
      </div>
    </>
  );
};

export default BlogPostPage;
