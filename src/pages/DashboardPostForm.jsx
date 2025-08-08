import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_FOLDER = 'rvc';

const DashboardPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewPost = !id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              const formData = new FormData();
              formData.append('file', file);
              formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
              formData.append('api_key', CLOUDINARY_API_KEY); // Ensure API key is sent
              formData.append('folder', CLOUDINARY_FOLDER);

              try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                  method: 'POST',
                  body: formData,
                });
                const data = await response.json();
                if (data.secure_url) {
                  const quill = this.quill;
                  const range = quill.getSelection();
                  quill.insertEmbed(range.index, 'image', data.secure_url);
                } else {
                  throw new Error('Image upload failed');
                }
              } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                alert('Error uploading image. Please check your Cloudinary credentials.');
              }
            } else {
              // If no file selected, prompt for URL
              const imageUrl = prompt('Please enter the image URL:');
              if (imageUrl) {
                const quill = this.quill;
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', imageUrl);
              }
            }
          };
        },
        video: function() {
          const videoUrl = prompt('Please enter the video URL (e.g., YouTube, Vimeo, or direct link):');
          if (videoUrl) {
            const quill = this.quill;
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'video', videoUrl);
          }
        }
      }
    }
  }), []);

  useEffect(() => {
    if (!isNewPost) {
      const fetchPost = async () => {
        try {
          const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
          if (error) throw error;
          setTitle(data.title);
          setContent(data.content);
          setSlug(data.slug);
          setIsPublished(data.is_published);
          setFeaturedImageUrl(data.featured_image_url);
        } catch (error) {
          console.error('Error fetching post:', error.message);
        }
      };
      fetchPost();
    }
  }, [id, isNewPost]);

  const handleTitleChange = useCallback((e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('folder', CLOUDINARY_FOLDER);

    try {
      setLoading(true);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        setFeaturedImageUrl(data.secure_url);
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please check your Cloudinary credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      title,
      content,
      slug,
      is_published: isPublished,
      featured_image_url: featuredImageUrl,
    };

    try {
      let error;
      if (isNewPost) {
        const { error: insertError } = await supabase.from('posts').insert([postData]);
        error = insertError;
      } else {
        const { error: updateError } = await supabase.from('posts').update(postData).eq('id', id);
        error = updateError;
      }

      if (error) throw error;
      alert(`Post ${isNewPost ? 'created' : 'updated'} successfully!`);
      navigate('/dashboard/blog');
    } catch (error) {
      console.error('Error saving post:', error.message);
      alert('Failed to save post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">{isNewPost ? 'Create New Post' : 'Edit Post'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Featured Image</label>
          <div className="mt-1 space-y-2">
            {featuredImageUrl && (
              <div className="relative w-48 h-32 group">
                <img src={featuredImageUrl} alt="Featured" className="w-full h-full object-cover rounded-md" />
                <button
                  type="button"
                  onClick={() => setFeaturedImageUrl('')}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove featured image"
                >
                  X
                </button>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {loading ? 'Uploading...' : 'Upload Image'}
              </button>
              <span className="text-gray-500">OR</span>
              <input
                type="text"
                placeholder="Paste image URL here"
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                className="flex-grow mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="bg-white"
            modules={modules}
          />
        </div>
        <div className="flex items-center">
          <input
            id="isPublished"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">Publish Post</label>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => navigate('/dashboard/blog')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
            {loading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardPostForm;
