"use client"

import React, { useState, useEffect } from 'react';
import { Package, Zap, Recycle, Sparkles, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { addAddon, removeAddon, updateAddons } from '@/redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AddOnsPage = () => {
  const params = useParams();
  const [hoveredAddon, setHoveredAddon] = useState(null);
  const [activePreview, setActivePreview] = useState('default');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [optionalAddons, setOptionalAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [additionType, setAdditionType] = useState(0); // Default addition type is 0
  const cartItem = useAppSelector((state) => state?.cart?.item);
  const cartAddons = useAppSelector((state) => state?.cart?.item?.addons || []);
  const router = useRouter();
  const dispatch = useDispatch();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  // Define a mapping of icons to use based on addition title keywords
  const getIconNameForAddon = (title) => {
    const titleLower = title?.toLowerCase() || '';
    if (titleLower.includes('zipper')) return 'zap';
    if (titleLower.includes('recycl') || titleLower.includes('sustain')) return 'recycle';
    // Default icon name
    return 'package';
  };

  // Format addon data from API response
  const formatAddonData = (addonData) => {
    return {
      id: addonData.additions_id.toString(),
      name: addonData.additions_title,
      description: addonData.additions_desc,
      recommended: addonData.additions_id === 1, // Example logic - adjust as needed
      iconName: getIconNameForAddon(addonData.additions_title),
      image: addonData.additions_image
    };
  };

  // Format selected addon data from API response (different structure)
  const formatSelectedAddonData = (addonData) => {
    return {
      id: addonData.additionsId.additions_id.toString(),
      name: addonData.additionsId.additions_title,
      description: addonData.additionsId.additions_desc,
      recommended: addonData.additionsId.additions_id === 1, // Example logic - adjust as needed
      iconName: getIconNameForAddon(addonData.additionsId.additions_title),
      image: addonData.additionsId.additions_image
    };
  };

  // Fetch addons when component mounts
  useEffect(() => {
    if (!cartItem.packaging_id) {
      router.back();
      return;
    }

    const fetchAddons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/v1/resources/list-additions/${cartItem.packaging_id}?addition_type=${cartItem.addition_type}`
        );        
        console.log("API Response:", response.data);
        
        if (response.data.status === 200) {
          // Get addition type from cart item
          const additionTypeFromCart = cartItem.addition_type || 0;
          setAdditionType(additionTypeFromCart);
          
          // Process selected additions (always selected)
          const formattedSelectedAddons = response.data.data.selected_addition?.map(formatSelectedAddonData) || [];
          setSelectedAddons(formattedSelectedAddons);
          
          // Process optional additions (only for addition_type 1)
          let formattedOptionalAddons = [];
          if (additionTypeFromCart === 1 && response.data.data.get_all_additions) {
            // Format the get_all_additions array directly
            formattedOptionalAddons = response.data.data.get_all_additions.map(addon => ({
              id: addon.additions_id.toString(),
              name: addon.additions_title,
              description: addon.additions_desc,
              recommended: addon.additions_id === 1, // Example logic - adjust as needed
              iconName: getIconNameForAddon(addon.additions_title),
              image: addon.additions_image
            }));
            
            // Filter out duplicates from selected_addition
            const selectedIds = new Set(formattedSelectedAddons.map(addon => addon.id));
            formattedOptionalAddons = formattedOptionalAddons.filter(addon => !selectedIds.has(addon.id));
          }
          setOptionalAddons(formattedOptionalAddons);
          
          // Set the first selected addon as active preview if any exist
          if (formattedSelectedAddons.length > 0) {
            setActivePreview(formattedSelectedAddons[0].id);
          }
          
          // Initialize cart addons with selected addons
          dispatch(updateAddons(formattedSelectedAddons));
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
  }, [cartItem.packaging_id, cartItem.addition_type, baseUrl, router, dispatch]);

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

  const handleToggleOptionalAddon = (addon) => {
    // Check if addon is already in cart
    const isAddonInCart = isAddonSelected(addon.id);
    
    if (isAddonInCart) {
      dispatch(removeAddon(addon.id));
    } else {
      dispatch(addAddon(addon));
    }
    
    // Log current state after toggle for debugging
    console.log(`Toggle addon ${addon.id}: ${isAddonInCart ? 'removed' : 'added'}`);
  };

  const isAddonSelected = (addonId) => {
    return cartAddons.some(addon => addon.id === addonId);
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
    
    const allAddons = [...selectedAddons, ...optionalAddons];
    const selectedAddonObj = allAddons.find(addon => addon.id === activePreview);
    return selectedAddonObj ? selectedAddonObj.image : '/pack/all size.png';
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin mx-auto mb-4" />
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

  // Calculate total addons count
  const totalSelectedAddons = selectedAddons.length + optionalAddons.filter(addon => isAddonSelected(addon.id)).length;

  console.log("Selected addons:", selectedAddons);
  console.log("Optional addons:", optionalAddons);
  console.log("Addition type:", additionType);
  console.log("Cart addons:", cartAddons);

  return (
    <div className="min-h-screen text-blue-900 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Fixed footer */}
        <div className="bg-white fixed bottom-0 left-0 w-full border-t shadow-md p-4 z-50 md:relative md:mt-1 md:shadow-none md:border-t-0 md:p-0">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-sm text-gray-700">
              {totalSelectedAddons} add-ons selected
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
            {/* Render selected addons (always fixed/selected) */}
            {selectedAddons.length > 0 && (
              <section className="space-y-4 sm:space-y-6">
                <h2 className="text-lg font-semibold text-[#143761]">
                  Selected Add-ons
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {selectedAddons.map(addon => {
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
                                <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full border border-green-200">  
                                  Included
                                </span>
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
              </section>
            )}

            {/* Render optional addons (only for addition_type 1) */}
            {additionType === 1 && optionalAddons.length > 0 && (
              <section className="space-y-4 sm:space-y-6">
                <h2 className="text-lg font-semibold text-[#143761]">
                  Optional Add-ons
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {optionalAddons.map(addon => {
                    const isHovered = hoveredAddon === addon.id;
                    const isActive = activePreview === addon.id;
                    const isSelected = isAddonSelected(addon.id);
                    const IconComponent = getIconComponent(addon.iconName);
                    
                    return (
                      <div
                        key={addon.id}
                        onMouseEnter={() => setHoveredAddon(addon.id)}
                        onMouseLeave={() => setHoveredAddon(null)}
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
                            {isSelected && <Sparkles className="w-5 h-5 text-blue-500" />}
                          </div>
                          <div className="flex items-start gap-3 sm:gap-4">
                            {/* Checkbox/toggle control */}
                            <div 
                              onClick={() => handleToggleOptionalAddon(addon)}
                              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex-shrink-0 mt-1 transition-all ${
                                isSelected
                                  ? 'bg-blue-500 border-blue-500 shadow-md shadow-blue-500/30'
                                  : 'bg-white border-gray-300'
                              }`}
                            >
                              {isSelected && (
                                <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            {/* Content section */}
                            <div className="flex-grow">
                              <div 
                                className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2"
                                onClick={() => handleAddonClick(addon.id)}
                              >
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
                              <p 
                                className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2"
                                onClick={() => handleAddonClick(addon.id)}
                              >
                                {addon.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* No addons message */}
            {selectedAddons.length === 0 && (additionType !== 1 || optionalAddons.length === 0) && (
              <div className="p-4 text-center text-gray-500 border border-gray-200 rounded-lg">
                No add-ons available for this packaging type
              </div>
            )}
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