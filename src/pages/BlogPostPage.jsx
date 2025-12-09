import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import PageHeader from '../components/PageHeader';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabaseUnavailable = !supabase;
  const adSlotRef = useRef(null);

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

  useEffect(() => {
    if (!post) return;

    const wrapper = adSlotRef.current;
    if (!wrapper) return;

    wrapper.innerHTML = "";

    const adContainer = document.createElement('div');
    adContainer.id = 'container-5e70758bd01ee3daaa6700cdeec214f7';
    adContainer.className = 'w-full';

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//prototypesorting.com/5e70758bd01ee3daaa6700cdeec214f7/invoke.js';

    wrapper.appendChild(adContainer);
    wrapper.appendChild(script);

    return () => {
      wrapper.innerHTML = "";
    };
  }, [post?.id]);

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

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || plainTextContent.substring(0, 160)} />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || plainTextContent.substring(0, 160)} />
        {post.featured_image_url && <meta property="og:image" content={post.featured_image_url} />}
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://rivercitybikerentals.com/blog/${post.slug}`} />
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
          <div className="my-8">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Advertisement</p>
            <div className="flex justify-center">
              <div
                ref={adSlotRef}
                className="w-full max-w-3xl min-h-[120px] rounded-lg border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center"
              >
                <span className="text-gray-400 text-sm">Loading ad…</span>
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
