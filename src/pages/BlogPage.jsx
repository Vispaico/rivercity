import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import PageHeader from '../components/PageHeader';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Blog | Rivercity Bike Rentals</title>
        <meta name="description" content="Read the latest articles and updates from Rivercity Bike Rentals. Discover tips for motorbike and car rentals, travel guides, and more." />
        <link rel="canonical" href="https://rivercitybikerentals.com/blog" />
      </Helmet>
      <PageHeader 
        title="Insider News"
        subtitle="News, tips, and insights from our team"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id} className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                {post.featured_image_url && (
                  <img 
                    src={post.featured_image_url} 
                    alt={post.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{format(new Date(post.created_at), 'MMMM d, yyyy')}</p>
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h3>
                <p className="text-gray-600 line-clamp-3">{post.content.replace(/<[^>]+>/g, '').substring(0, 120)}...</p>
                <span className="inline-block mt-4 text-blue-600 font-semibold group-hover:underline">Read More &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
