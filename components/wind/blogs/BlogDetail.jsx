"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';

export default function BlogDetail() {
  const params = useParams();
  const id = params?.id;
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    // Only fetch data when id is available
    if (!id) return;
    
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        // First try the detail endpoint
        try {
          const response = await axios.get(`${baseUrl}/api/v1/blog/${id}`);
          if (response.data && response.data.data) {
            setBlog(response.data.data);
            setError(null);
            return;
          }
        } catch (detailError) {
          console.error('Error fetching from detail endpoint:', detailError);
          // If detail endpoint fails, continue to fallback
        }

        // Fallback: Fetch all blogs and filter by ID
        const allBlogsResponse = await axios.get(`${baseUrl}/api/v1/blog`);
        const blogs = allBlogsResponse.data.data || [];
        const foundBlog = blogs.find(b => b.blog_id.toString() === id.toString());
        
        if (foundBlog) {
          setBlog(foundBlog);
          setError(null);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        setError('Failed to fetch blog details. Please try again later.');
        console.error('Error fetching blog details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id, baseUrl]);

  // Sanitize description function
  const sanitizeDescription = (htmlContent) => {
    // First, sanitize the HTML to prevent XSS
    const sanitizedHTML = DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: [], // Remove all HTML tags
      ALLOWED_ATTR: [] // Remove all attributes
    });

    // Create a temporary div to extract text content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedHTML;
    
    // Return the text content, trimmed
    return tempDiv.textContent?.trim() || '';
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'null') return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!id || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
        <Link href="/blog" className="text-blue-600 hover:underline">
          Back to Blogs
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>Blog not found</p>
        </div>
        <Link href="/blogs" className="text-blue-600 hover:underline">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.blog_title}</title>
        <meta 
          name="description" 
          content={sanitizeDescription(blog.blog_description)?.substring(0, 160) || 'Blog post'} 
        />
      </Head>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Blogs
        </Link>
        
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {blog.blog_image_url && blog.blog_image_url !== "tes" ? (
            <img 
              src={blog.blog_image_url} 
              alt={blog.blog_title} 
              className="w-full h-64 md:h-96 object-cover"
            />
          ) : (
            <div className="bg-gray-200 w-full h-64 md:h-96 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.blog_title}</h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span>By {blog.createBy || 'Unknown'}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">
                {sanitizeDescription(blog.blog_description)}
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}