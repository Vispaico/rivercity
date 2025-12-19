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

    const slot = adSlotRef.current;
    if (!slot) return;

    slot.innerHTML = "";

    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        key: 'b612b7529555730cbd4d2a6607dff9b5',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//prototypesorting.com/b612b7529555730cbd4d2a6607dff9b5/invoke.js';
    invokeScript.async = true;

    slot.appendChild(configScript);
    slot.appendChild(invokeScript);

    return () => {
      slot.innerHTML = "";
      if (window.atOptions) {
        delete window.atOptions;
      }
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
          <div className="my-6 flex justify-center">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Advertisement</p>
              <div
                ref={adSlotRef}
                className="mx-auto flex h-[70px] w-[340px] items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50"
              >
                <span className="text-xs text-gray-400">Loading ad…</span>
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
