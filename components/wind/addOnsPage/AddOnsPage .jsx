"use client"

import React, { useState, createElement as e, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Package, Zap, Recycle, Sparkles, Image } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { addAddon, removeAddon } from '@/redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AddOnsPage = () => {
  const params = useParams(); 
  const [selectedAddons, setSelectedAddons] = useState([]);
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
            // Using iconName instead of the React component to avoid serialization issues
            const formattedAddons = response.data.data.map(addon => ({
              id: addon.additionsId.additions_id.toString(),
              name: addon.additionsId.additions_title,
              // price: '+ 0,01 €', // You might want to add price to your backend model
              description: addon.additionsId.additions_desc,
              recommended: addon.additionsId.additions_id === 1, // Example logic - you can adjust as needed
              iconName: getIconNameForAddon(addon.additionsId.additions_title),
              image: addon.additionsId.additions_image
            }));
            
            setAddons(formattedAddons);
            setDataFetched(true); // Mark data as fetched
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
  }, [cartItem.packaging_id, baseUrl, dataFetched, router]);

  // Separate useEffect for initializing selected addons from cart
  useEffect(() => {
    // Set selected addons from cart if they exist
    if (cartItem.addons && cartItem.addons.length > 0) {
      setSelectedAddons(cartItem.addons.map(addon => addon.id));
      // Set the last selected addon as the active preview
      if (cartItem.addons.length > 0) {
        setActivePreview(cartItem.addons[cartItem.addons.length - 1].id);
      }
    } else {
      // When no addons are selected, ensure we show the default image
      setActivePreview('default');
    }

    // Validate URL package name against cart item
    if (params.packageName) {
      const formattedCartName = cartItem.name?.toLowerCase().replace(/\s+/g, '-');
      if (formattedCartName && params.packageName !== formattedCartName) {
        console.warn('URL package name does not match cart item');
      }
    }
  }, [cartItem.addons, cartItem.name, params]);
  
  // Helper function to get the icon component based on name
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'zap': return Zap;
      case 'recycle': return Recycle;
      case 'package': 
      default: return Package;
    }
  };
  
  const toggleAddon = (id) => {
    const addon = addons.find(addon => addon.id === id);
    
    if (selectedAddons.includes(id)) {
      // Remove addon
      const newSelectedAddons = selectedAddons.filter(item => item !== id);
      setSelectedAddons(newSelectedAddons);
      dispatch(removeAddon(id));
      
      // If we just removed the last addon, set preview to default
      if (newSelectedAddons.length === 0) {
        setActivePreview('default');
      } else {
        // Otherwise, set to the last selected addon
        setActivePreview(newSelectedAddons[newSelectedAddons.length - 1]);
      }
    } else {
      // Add addon - create a serializable version by removing the icon component
      const serializableAddon = {
        ...addon,
        // Don't include the icon component in the Redux store
      };
      console.log(serializableAddon);
      
      dispatch(addAddon(serializableAddon));
      setSelectedAddons(prev => [...prev, id]);
      // Set the clicked addon as the active preview
      setActivePreview(id);
    }
  };  

  const renderCheckmark = () => {
    return e('svg', {
      className: 'w-5 h-5 text-white',
      viewBox: '0 0 20 20',
      fill: 'currentColor'
    }, e('path', {
      fillRule: 'evenodd',
      d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
      clipRule: 'evenodd'
    }));
  };

  const renderAddon = (addon) => {
    const isSelected = selectedAddons.includes(addon.id);
    const isHovered = hoveredAddon === addon.id;
    const isActive = activePreview === addon.id;
    const IconComponent = getIconComponent(addon.iconName);

    return e('div', {
      key: addon.id,
      onMouseEnter: () => setHoveredAddon(addon.id),
      onMouseLeave: () => setHoveredAddon(null),
      onClick: () => toggleAddon(addon.id), // Toggle selection on entire card click
      className: `shadow-xs rounded-xl transition-all transform cursor-pointer ${
        isSelected 
          ? 'border-2 border-blue-500 scale-102' 
          : isActive
            ? 'border-2 border-blue-300'
            : 'border border-gray-200 hover:border-blue-300'
      } ${isHovered } `
    }, 
      e('div', { className: 'p-4 sm:p-6 relative overflow-hidden' },
        isSelected && e('div', {
          className: 'absolute top-0 right-0 p-2'
        }, e(Sparkles, { className: 'w-5 h-5 text-blue-500' })),
        e('div', { className: 'flex items-start gap-3 sm:gap-4' },
          e('div', { 
            className: `w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex-shrink-0 mt-1 transition-all ${
              isSelected
                ? 'bg-blue-500 border-blue-500 shadow-md shadow-blue-500/30'
                : 'border-gray-400 hover:border-blue-400'
            }`
          }, isSelected && renderCheckmark()),
          e('div', { className: 'flex-grow' },
            e('div', { className: 'flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2' },
              e(IconComponent, { 
                className: `w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-blue-500' : 'text-blue-400'}`
              }),
              e('h3', { 
                className: `font-semibold text-sm sm:text-base ${isSelected ? 'text-blue-900' : 'text-blue-500'}`
              }, addon.name),
              addon.recommended && e('span', {
                className: 'px-2 py-0.5 text-xs font-medium text-blue-900 bg-blue-100 rounded-full border border-blue-200'
              }, 'Recommended')
            ),
            e('p', { 
              className: 'text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2'
            }, addon.description),
            // e('p', { 
            //   className: `font-medium text-sm sm:text-base ${isSelected ? 'text-blue-900' : 'text-blue-500'}`
            // }, `${addon.price} / Piece`)
          )
        )
      )
    );
  };

  const navigateToSummary = () => {
    router.push('/summary');
  };
  
  // Get preview image based on active selection
  const getPreviewImage = () => {
    // If no addons are selected or we explicitly set to default, show default image
    if (activePreview === 'default' || selectedAddons.length === 0) {
      return '/pack/all size.png';
    }
    
    const selectedAddonObj = addons.find(addon => addon.id === activePreview);
    return selectedAddonObj ? selectedAddonObj.image : '/pack/all size.png';
  };

  // Render loading state
  if (loading) {
    return e('div', { className: 'min-h-screen flex items-center justify-center ' },
      e('div', { className: 'text-center' },
        e('div', { className: 'w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4' }),
        e('p', { className: 'text-blue-900 font-medium' }, 'Loading add-ons...')
      )
    );
  }

  // Render error state
  if (error) {
    return e('div', { className: 'min-h-screen flex items-center justify-center' },
      e('div', { className: 'text-center max-w-md mx-auto p-6 rounded-xl border border-red-200 bg-red-50' },
        e('p', { className: 'text-red-600 font-medium mb-4' }, error),
        e('button', {
          onClick: () => window.location.reload(),
          className: 'px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors'
        }, 'Try Again')
      )
    );
  }

  return e('div', { 
    className: 'min-h-screen text-blue-900 relative'
  },
    e('div', { className: 'max-w-6xl mx-auto relative z-10' },
      // Header

      e('div', {
        className: 'fixed bottom-0 left-0 w-full border-t shadow-md p-4 z-50 md:relative md:mt-1 md:shadow-none md:border-t-0 md:p-0'
      },
        e('div', {
          className: 'max-w-6xl mx-auto flex justify-between items-center'
        },
          e('div', {
            className: 'text-sm text-gray-700'
          }, 
            selectedAddons.length > 0 ? 
              `${selectedAddons.length} add-on${selectedAddons.length > 1 ? 's' : ''} selected` : 
              'No add-ons selected'
          ),
          e('button', {
            onClick: navigateToSummary,
            className: `px-3 py-2 mb-4 rounded-lg font-medium text-white transition-all ${
              true ? 
              'bg-[#143761] hover:bg-[#0f2a4d] cursor-pointer' : 
              'bg-gray-400 cursor-not-allowed'
            }`
          }, 'Confirm')
        )
      ),
      
      // Mobile view - Preview image at top
      e('div', { className: 'md:hidden mb-8' },
        e('div', { 
          className: 'rounded-xl p-4 shadow-xs border border-blue-100'
        },
          e('h3', {
            className: 'text-lg font-semibold text-[#143761] mb-3 flex items-center gap-2'
          },
            e(Image, { className: 'w-4 h-4 text-[#143761]' }),
            'Packaging type'
          ),
          e('div', {
            className: 'relative rounded-xl overflow-hidden bg-transparent'
          },
            e('img', {
              src: getPreviewImage(),
              alt: 'Package Preview',
              className: 'w-full h-64 object-contain p-2'
            })
          ),
          e('p', {
            className: 'mt-3 text-gray-500 text-xs text-center italic'
          }, 'Click on any add-on to preview how it looks on your package')
        )
      ),

      // Content
      e('div', { className: 'flex flex-col md:flex-row flex-wrap gap-6 md:gap-8' },
        // Left side - Add-on selection
        e('div', { className: 'w-full md:flex-1 space-y-8 md:space-y-12' },
          e('section', { className: 'space-y-4 sm:space-y-6' },

            addons.length > 0 ? (
              e('div', { className: 'space-y-3 sm:space-y-4' },
                addons.map(addon => renderAddon(addon))
              )
            ) : (
              e('div', { className: 'p-4 text-center text-gray-500 border border-gray-200 rounded-lg' },
                'No add-ons available for this packaging type'
              )
            )
          )
        ),
        
        // Right side - Preview image (hidden on mobile)
        e('div', { className: 'hidden md:block md:flex-1 sticky top-8 h-fit' },
          e('div', { 
            className: 'rounded-xl p-6 shadow-xs border border-blue-100'
          },
            e('h3', {
              className: 'text-xl font-semibold text-[#143761] mb-4 flex items-center gap-2'
            },
              e(Image, { className: 'w-5 h-5 text-[#143761]' }),
              'Packaging type'
            ),
            e('div', {
              className: 'relative rounded-xl overflow-hidden bg-transparent'
            },
              e('img', {
                src: getPreviewImage(),
                alt: 'Package Preview',
                className: 'w-full h-96 object-contain p-4'
              })
            ),
            e('p', {
              className: 'mt-4 text-gray-500 text-sm text-center italic'
            }, 'Click on any add-on to preview how it looks on your package')
          )
        )
      )
    )
  );
};

export default AddOnsPage;