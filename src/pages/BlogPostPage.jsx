import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import PageHeader from '../components/PageHeader';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
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
        <link rel="canonical" href={`https://horizons-rivercity.com/blog/${post.slug}`} />
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
