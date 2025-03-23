"use client";
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button, Input, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ChevronDown, Upload, Image as ImageIcon, Send } from 'lucide-react';

// Import the editor dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading Editor...</p>
});

// We need to import the CSS separately
// Add to your _app.js or layout.js: import 'react-quill/dist/quill.snow.css';

function BlogUpload() {
  // Add a mounted state to track client-side rendering
  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(new Set(['General']));
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Set mounted state after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = ['General', 'Packaging', 'Business', 'Innovation', 'Sustainability', 'Industry News'];

  const selectedCategory = React.useMemo(
    () => Array.from(category).join(', ').replaceAll('_', ' '),
    [category]
  );

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content || !featuredImage) {
      alert("Please fill all required fields and upload a featured image");
      return;
    }
    
    setIsSubmitting(true);
    
    // Create form data for API submission
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', selectedCategory);
    formData.append('featuredImage', featuredImage);
    
    try {
      // Example API call - replace with your actual endpoint
      // const response = await fetch('/api/blogs', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // if (response.ok) {
        alert('Blog post created successfully!');
        // Reset the form
        setTitle('');
        setContent('');
        setCategory(new Set(['General']));
        setFeaturedImage(null);
        setImagePreview('');
      // } else {
      //   alert('Failed to create blog post');
      // }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('An error occurred while creating the blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
        <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              variant="bordered"
              size="lg"
              required
            />
          </div>
          
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                  className="w-full justify-between"
                  endContent={<ChevronDown size={16} />}
                >
                  {selectedCategory}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Category selection"
                selectionMode="single"
                selectedKeys={category}
                onSelectionChange={setCategory}
              >
                {categories.map((cat) => (
                  <DropdownItem key={cat}>{cat}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          
          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Featured Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Featured" 
                    className="mx-auto max-h-64 object-contain rounded"
                  />
                  <Button 
                    color="primary"
                    variant="flat"
                    size="sm"
                    className="mt-3"
                    onClick={triggerFileInput}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <div 
                  className="flex flex-col items-center justify-center py-8 cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <ImageIcon size={48} className="text-gray-400 mb-3" />
                  <p className="text-gray-500 text-center">
                    Click to upload a featured image <br />
                    <span className="text-sm">(JPG, PNG, WebP)</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="bg-white border border-gray-300 rounded-lg">
              {/* Only render the editor when client-side */}
              {isMounted && (
                <ReactQuill 
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your blog content here..."
                  className="h-64 mb-12"
                />
              )}
            </div>
            {!isMounted && (
              <p className="text-sm text-gray-500 mt-2 p-4">
                Rich text editor is loading...
              </p>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full md:w-auto"
              isLoading={isSubmitting}
              endContent={!isSubmitting && <Send size={16} />}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogUpload;