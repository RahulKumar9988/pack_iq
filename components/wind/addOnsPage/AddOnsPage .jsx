"use client"

import React, { useState, createElement as e, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Package, Zap, Recycle, Sparkles, Image } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { addAddon, removeAddon } from '@/redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const AddOnsPage = () => {
  const params = useParams(); 
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [hoveredAddon, setHoveredAddon] = useState(null);
  const [activePreview, setActivePreview] = useState('default');
  const cartItem = useAppSelector((state) => state?.cart?.item);
  const router = useRouter();
  const dispatch = useDispatch();
  

  const addons = [
    {
      id: 'eurohole',
      name: 'Eurohole',
      price: '+ 0,01 €',
      description: 'A slit-shaped cutout at the top of packaging. A great choice if you want to present your products hanging at the point of sale.',
      recommended: true,
      icon: Package,
      image: '/pack/kurkure.png'
    },
    {
      id: 'zipper',
      name: 'Standard Zipper',
      price: '+ 0,01 € - 0,00 €',
      description: 'Add a convenient zipper closure to your packaging for easy access and resealing.',
      icon: Zap,
      image: '/pack/sealtype.png'
    }
  ];

  const sustainabilitySeal = {
    id: 'recycling',
    name: '"Made For Recycling"-Certification',
    price: '+ 0,02 €',
    description: 'Certify your packaging as recyclable and show your commitment to sustainability.',
    icon: Recycle,
    image: '/pack/xs.png'
  };

  useEffect(() => {
    if (!cartItem.packaging_id) {
      router.back();
    }
    if (cartItem.addons && cartItem.addons.length > 0) {
      setSelectedAddons(cartItem.addons.map(addon => addon.id));
    }
    // Validate if the URL package name matches the cart item
    if (params.packageName) {
      const formattedCartName = cartItem.name?.toLowerCase().replace(/\s+/g, '-');
      if (formattedCartName && params.packageName !== formattedCartName) {
        console.warn('URL package name does not match cart item');
        // Optional: redirect to correct URL or handle this case
      }
    }
  }, [cartItem, params, router]); 
  
  // Rest of component remains the same...

  const toggleAddon = (id) => {
    const addon = [...addons, sustainabilitySeal].find(addon => addon.id === id);
    
    if (selectedAddons.includes(id)) {
      // Remove addon
      setSelectedAddons(prev => prev.filter(item => item !== id));
      dispatch(removeAddon(id));
    } else {
      // Add addon
      setSelectedAddons(prev => [...prev, id]);
      dispatch(addAddon(addon));
    }
    
    setActivePreview(id);
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
      } ${isHovered ? 'translate-y-[-4px]' : ''} bg-white`
    }, 
      e('div', { className: 'p-4 sm:p-6 relative overflow-hidden' },
        isSelected && e('div', {
          className: 'absolute top-0 right-0 p-2'
        }, e(Sparkles, { className: 'w-5 h-5 text-blue-500' })),
        e('div', { className: 'flex items-start gap-3 sm:gap-4' },
          e('div', { // Changed from button to div, since entire card is now clickable
            className: `w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex-shrink-0 mt-1 transition-all ${
              isSelected
                ? 'bg-blue-500 border-blue-500 shadow-md shadow-blue-500/30'
                : 'border-gray-400 hover:border-blue-400'
            }`
          }, isSelected && renderCheckmark()),
          e('div', { className: 'flex-grow' },
            e('div', { className: 'flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2' },
              e(addon.icon, { 
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
            e('p', { 
              className: `font-medium text-sm sm:text-base ${isSelected ? 'text-blue-900' : 'text-blue-500'}`
            }, `${addon.price} / Piece`)
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
    if (activePreview === 'default') {
      return '/pack/all size.png';
    }
    
    const selectedAddon = [...addons, sustainabilitySeal].find(addon => addon.id === activePreview);
    return selectedAddon ? selectedAddon.image : '/pack/all size.png';
  };

  return e('div', { 
    className: 'min-h-screen bg-white text-blue-900 relative'
  },
    e('div', { className: 'max-w-6xl mx-auto px-4 py-4 sm:p-6 relative z-10' },
      // Header
      e('div', { className: 'flex justify-between items-center mb-6 sm:mb-12 pb-4 border-b border-gray-200' },
        e('div', { className: 'space-y-1 sm:space-y-2' },
          e('h1', { 
            className: 'text-2xl sm:text-4xl font-bold text-[#143761]'
          }, 'Add-ons'),
          e('p', { className: 'text-sm sm:text-base text-[#143761]' }, 'Customize your package with premium features')
        )
      ),

      e('div', {
        className: 'fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-4 z-50 md:relative md:mt-12 md:shadow-none md:border-t-0 md:p-0'
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
            disabled: false, // You can set this to a condition if needed
            onClick: navigateToSummary,
            className: `px-6 py-3 rounded-lg font-medium text-white transition-all ${
              selectedAddons.length > 0 ? 
              'bg-[#143761] hover:bg-[#0f2a4d] cursor-pointer' : 
              'bg-gray-400 cursor-not-allowed'
            }`
          }, 'Confirm and Continue')
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
            e('h2', { 
              className: 'text-xl sm:text-2xl font-semibold text-[#143761] flex items-center gap-2'
            }, 
              e(Package, { className: 'w-5 h-5 sm:w-6 sm:h-6 text-[#143761]' }),
              'Add-Ons'
            ),
            e('div', { className: 'space-y-3 sm:space-y-4' },
              addons.map(addon => renderAddon(addon))
            )
          ),
          e('section', { className: 'space-y-4 sm:space-y-6' },
            e('h2', { 
              className: 'text-xl sm:text-2xl font-semibold text-[#143761] flex items-center gap-2'
            }, 
              e(Recycle, { className: 'w-5 h-5 sm:w-6 sm:h-6 text-green-500' }),
              'Sustainability seal'
            ),
            renderAddon(sustainabilitySeal)
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