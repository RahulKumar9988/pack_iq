"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { GoArrowUpRight } from 'react-icons/go';

// Skeleton Loader Component
export const BlogListSkeleton = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Skeleton for Search Bar */}
      <div className="mb-8 w-full flex justify-end">
        <div className="w-full max-w-md h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
      
      {/* Skeleton Grid for Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
              
              <div className="flex justify-between mb-4">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
              </div>
              
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Memoized Blog Card Component
const BlogCard = React.memo(({ blog }) => {
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'null') return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${blog.blog_id}`} className="block">
        <div className="relative w-full h-48">
          {blog.blog_image_url && blog.blog_image_url !== "tes" ? (
            <img 
              src={blog.blog_image_url} 
              alt={blog.blog_title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x200?text=Blog+Image';
              }}
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/blog/${blog.blog_id}`} className="block">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600">{blog.blog_title}</h2>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.blog_description}</p>
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>By {blog.createBy || 'Unknown'}</span>
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        
        <Link 
          href={`/blog/${blog.blog_id}`}
          className="mt-4 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
});

BlogCard.displayName = 'BlogCard';

export default function Blog_list() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const blogsPerPage = 8;

  // Fetch blogs only once on component mount
  useEffect(() => {
    const controller = new AbortController();
    
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/v1/blog`, {
          signal: controller.signal
        });
        const fetchedBlogs = response.data.data || [];
        setBlogs(fetchedBlogs);
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Failed to fetch blogs. Please try again later.');
          console.error('Error fetching blogs:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    
    // Cleanup function to cancel request if component unmounts
    return () => controller.abort();
  }, [baseUrl]);

  // Filter blogs based on search term - memoized to prevent unnecessary recalculations
  const filteredBlogs = useMemo(() => {
    if (searchTerm.trim() === '') {
      return blogs;
    }
    return blogs.filter(blog => 
      blog.blog_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, blogs]);

  // Calculate displayed blogs based on current page - memoized
  const displayedBlogs = useMemo(() => {
    const endIndex = page * blogsPerPage;
    return filteredBlogs.slice(0, endIndex);
  }, [filteredBlogs, page, blogsPerPage]);

  // Memoized checks for UI states
  const hasMoreBlogs = useMemo(() => 
    displayedBlogs.length < filteredBlogs.length, 
    [displayedBlogs.length, filteredBlogs.length]
  );

  const isEmpty = useMemo(() => 
    displayedBlogs.length === 0, 
    [displayedBlogs.length]
  );

  // Callbacks to prevent unnecessary re-renders
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset pagination when search term changes
  }, []);

  const loadMoreBlogs = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  if (loading) {
    return <BlogListSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Search Filter */}
      <div className="mb-8 w-full mx-auto flex justify-end">
        <div className="relative w-full max-w-md ml-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search blog titles..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {isEmpty ? (
        <div className="text-center text-gray-500 py-8">
          {searchTerm ? 'No blogs found matching your search.' : 'No blogs found. Check back later for new content.'}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedBlogs.map((blog) => (
              <BlogCard key={blog.blog_id} blog={blog} />
            ))}
          </div>
          
          {/* Load More Button */}
          {hasMoreBlogs && (
            <div className="flex justify-center mt-8 mb-12">
              <Button
                onClick={loadMoreBlogs}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                endContent={<GoArrowUpRight className="rotate-90" />}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}