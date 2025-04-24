"use client"

import React, { useState, useEffect } from 'react';
import { Package, Zap, Recycle, Sparkles, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { addAddon } from '@/redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AddOnsPage = () => {
  const params = useParams();
  const [hoveredAddon, setHoveredAddon] = useState(null);
  const [activePreview, setActivePreview] = useState('default');
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false); // Flag to track if data has been fetched
  const cartItem = useAppSelector((state) => state?.cart?.item);
  const router = useRouter();
  const dispatch = useDispatch();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  // Define a mapping of icons to use based on addition title keywords
  const getIconNameForAddon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('zipper')) return 'zap';
    if (titleLower.includes('recycl') || titleLower.includes('sustain')) return 'recycle';
    // Default icon name
    return 'package';
  };

  // Fetch addons only once when component mounts
  useEffect(() => {
    if (!cartItem.packaging_id) {
      router.back();
      return;
    }

    // Only fetch data if it hasn't been fetched yet
    if (!dataFetched) {
      const fetchAddons = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${baseUrl}/api/v1/resources/list-additions/${cartItem.packaging_id}`);
          
          if (response.data.status === 200) {
            // Map backend data to the format expected by the component
            const formattedAddons = response.data.data.map(addon => ({
              id: addon.additionsId.additions_id.toString(),
              name: addon.additionsId.additions_title,
              description: addon.additionsId.additions_desc,
              recommended: addon.additionsId.additions_id === 1, // Example logic - you can adjust as needed
              iconName: getIconNameForAddon(addon.additionsId.additions_title),
              image: addon.additionsId.additions_image
            }));
            
            setAddons(formattedAddons);
            setDataFetched(true); // Mark data as fetched
            
            // Automatically add all addons to cart when they are loaded
            formattedAddons.forEach(addon => {
              dispatch(addAddon(addon));
            });
            
            // Set the last addon as active preview if any exist
            if (formattedAddons.length > 0) {
              setActivePreview(formattedAddons[formattedAddons.length - 1].id);
            }
          } else {
            setError('Failed to fetch addons');
          }
        } catch (err) {
          console.error('Error fetching addons:', err);
          setError('Error connecting to server');
        } finally {
          setLoading(false);
        }
      };
    
      fetchAddons();
    }
  }, [cartItem.packaging_id, baseUrl, dataFetched, router, dispatch]);

  // Separate useEffect for handling URL validation
  useEffect(() => {
    // Validate URL package name against cart item
    if (params.packageName) {
      const formattedCartName = cartItem.name?.toLowerCase().replace(/\s+/g, '-');
      if (formattedCartName && params.packageName !== formattedCartName) {
        console.warn('URL package name does not match cart item');
      }
    }
  }, [cartItem.name, params]);
  
  // Helper function to get the icon component based on name
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'zap': return Zap;
      case 'recycle': return Recycle;
      case 'package': 
      default: return Package;
    }
  };
  
  const handleAddonClick = (id) => {
    // Just update the preview image when clicking an addon
    setActivePreview(id);
  };

  const navigateToSummary = () => {
    router.push('/summary');
  };

  const handleBack = () => {
    router.back();
  };
  
  // Get preview image based on active selection
  const getPreviewImage = () => {
    // If no addons are selected or we explicitly set to default, show default image
    if (activePreview === 'default') {
      return '/pack/all size.png';
    }
    
    const selectedAddonObj = addons.find(addon => addon.id === activePreview);
    return selectedAddonObj ? selectedAddonObj.image : '/pack/all size.png';
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500  rounded-full animate-spin mx-auto mb-4" />
          <p className="text-blue-900 font-medium">Loading add-ons...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 rounded-xl border border-red-200 bg-red-50">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-blue-900 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Fixed footer */}
        <div className="bg-white fixed bottom-0 left-0 w-full border-t shadow-md p-4 z-50 md:relative md:mt-1 md:shadow-none md:border-t-0 md:p-0">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-sm text-gray-700">
              All {addons.length} add-ons included
            </div>
            <div className='flex gap-10 '>
              <button
                onClick={handleBack}
                className="px-3 py-2 mr-2 rounded-lg font-medium text-[#143761] border border-[#143761] transition-all hover:bg-blue-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={navigateToSummary}
                className="px-5 py-2 rounded-lg font-medium text-white transition-all bg-gradient-to-r from-[#0b2949] to-indigo-800 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile view - Preview image at top */}
        <div className="md:hidden mb-8">
          <div className="rounded-xl p-4 shadow-xs border border-blue-100">
            <h3 className="text-lg font-semibold text-[#143761] mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#143761]" />
              Packaging type
            </h3>
            <div className="relative rounded-xl overflow-hidden ">
              <img
                src={getPreviewImage()}
                alt="Package Preview"
                className="w-full h-64 object-contain p-2"
              />
            </div>
            <p className="mt-3 text-gray-500 text-xs text-center italic">
              Click on any add-on to preview how it looks on your package
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-wrap gap-6 md:gap-8">
          {/* Left side - Add-on selection */}
          <div className="w-full md:flex-1 space-y-8 md:space-y-12">
            <section className="space-y-4 sm:space-y-6">
              {addons.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {addons.map(addon => {
                    const isHovered = hoveredAddon === addon.id;
                    const isActive = activePreview === addon.id;
                    const IconComponent = getIconComponent(addon.iconName);
                    
                    return (
                      <div
                        key={addon.id}
                        onMouseEnter={() => setHoveredAddon(addon.id)}
                        onMouseLeave={() => setHoveredAddon(null)}
                        onClick={() => handleAddonClick(addon.id)}
                        className={`shadow-xs rounded-xl transition-all transform cursor-pointer ${
                          isActive 
                            ? 'border-2 border-blue-200 scale-102' 
                            : isHovered
                              ? 'border-2 border-blue-300'
                              : 'border-2 border-blue-200'
                        } ${isHovered ? 'shadow-md' : ''}`}
                      >
                        <div className="p-4 sm:p-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-2">
                            <Sparkles className="w-5 h-5 text-blue-500" />
                          </div>
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex-shrink-0 mt-1 transition-all bg-blue-500 border-blue-500 shadow-md shadow-blue-500/30">
                              <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                <h3 className="font-semibold text-sm sm:text-base text-blue-900">
                                  {addon.name}
                                </h3>
                                {addon.recommended && (
                                  <span className="px-2 py-0.5 text-xs font-medium text-blue-900 bg-blue-100 rounded-full border border-blue-200">  
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
                                {addon.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 border border-gray-200 rounded-lg">
                  No add-ons available for this packaging type
                </div>
              )}
            </section>
          </div>
          
          {/* Right side - Preview image (hidden on mobile) */}
          <div className="hidden md:block md:flex-1 sticky top-8 h-fit">
            <div className="rounded-xl p-6 shadow-xs border border-blue-100">
              <h3 className="text-xl font-semibold text-[#143761] mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#143761]" />
                Packaging type
              </h3>
              <div className="relative rounded-xl overflow-hidden ">
                <img
                  src={getPreviewImage()}
                  alt="Package Preview"
                  className="w-full h-96 object-contain p-4"
                />
              </div>
              <p className="mt-4 text-gray-500 text-sm text-center italic">
                Click on any add-on to preview how it looks on your package
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnsPage;