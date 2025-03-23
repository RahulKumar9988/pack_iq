"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { GoArrowUpRight } from 'react-icons/go';
import Blog_Banner from './Blog_Banner';
import Blog_list from './Blog_list';

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className='flex flex-col gap-10 w-full'>
      {/* Skeleton for Banner */}
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
      
      {/* Skeleton for Blog List */}
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
    </div>
  );
};

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/v1/blog`);
        const fetchedBlogs = response.data.data || [];
        setBlogs(fetchedBlogs);
        setFilteredBlogs(fetchedBlogs);
        setError(null);
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [baseUrl]);

  useEffect(() => {
    // Filter blogs based on search term
    if (searchTerm.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => 
        blog.blog_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, blogs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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

  if (loading) {
    return <SkeletonLoader />;
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
    <div className='flex flex-col gap-10 w-full mb-10'>
      <Head>
        <title>Our Blog</title>
        <meta name="description" content="Latest articles and news" />
      </Head>

      <Blog_Banner/>

      <Blog_list/>
    </div>
  );
}