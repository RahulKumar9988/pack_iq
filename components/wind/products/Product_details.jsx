  "use client";
  import React, { useEffect, useRef, useState } from "react";
  import { Button } from "@nextui-org/react";
  import axios from "axios";
  import Image from "next/image";
  import { useParams, useRouter } from "next/navigation";
  import { useDispatch } from "react-redux";
  import { addToCart } from "@/redux/features/cart/cartSlice";
  import Recomend_Scleton from "@/components/Recomend_Scleton"
  import Carousel from "@/components/Carousel ";
  import {
    SparklesIcon,
    ArrowsPointingOutIcon,
    TagIcon,
    PlusCircleIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ArrowRightIcon,
    ShoppingCartIcon,
    PhotoIcon
  } from '@heroicons/react/24/outline';
import ImageComparisonFeature from "../ImageComparisonFeature";
import { useAppSelector } from "@/redux/hooks";

  export default function ProductDetail() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const cartItem = useAppSelector((state) => state?.cart?.item);
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [selectedImage, setSelectedImage] = useState(0);
    const scrollRef = useRef(null);
    // Form states
    const [materials, setMaterials] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [addons, setAddons] = useState([]);
    const [sliderSelectedImage, setSliderSelectedImage] = useState(0);
    const [carouselSelectedImage, setCarouselSelectedImage] = useState(0);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState("");
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [selectedSizeId, setSelectedSizeId] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpenSize, setIsDropdownOpenSize] = useState(false);
    const [isDropdownOpenQuantity, setIsDropdownOpenQuantity] = useState(false);
    const [isDropdownOpenAddon, setIsDropdownOpenAddon] = useState(false);
    const [firstItemPrice, setFirstItemPrice] = useState(0);
    const [materialDisabled, setMaterialDisabled] = useState(false);
    const [sizeDisabled, setSizeDisabled] = useState(true);
    const [quantityDisabled, setQuantityDisabled] = useState(true);
    const [addonDisabled, setAddonDisabled] = useState(true);


    useEffect(() => {
      if (params.id) getProductDetails();
    }, [params.id]);

    useEffect(() => {
      if (materials && materials.length > 0) {
        // Auto-select the first default material if available
        const defaultMaterial = materials.find(material => material.checked === 1);
        if (defaultMaterial) {
          const materialId = defaultMaterial.materialId?.material_id || defaultMaterial.material_id || defaultMaterial.id;
          setSelectedMaterial(materialId?.toString());
          console.log('Auto-selected default material:', materialId);
        } else {
          // If no default material, don't auto-select - let user choose
          // This ensures placeholder "Select a material" shows initially
          setSelectedMaterial(null);
          console.log('No default material found, showing placeholder');
        }
      }
    }, [materials]);

    // Add new useEffect hooks to control the sequential flow
    useEffect(() => {
      // Enable size selection only when material is selected
      if (selectedMaterial) {
        setSizeDisabled(false);
      } else {
        setSizeDisabled(true);
        setSelectedSize("");
        setQuantityDisabled(true);
        setAddonDisabled(true);
      }
    }, [selectedMaterial]);

    // Add this useEffect after your existing useEffects
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check if click is outside any dropdown
        if (!event.target.closest('.dropdown-container')) {
          setIsDropdownOpen(false);
          setIsDropdownOpenSize(false);
          setIsDropdownOpenQuantity(false);
          setIsDropdownOpenAddon(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    useEffect(() => {
      // Enable quantity selection only when size is selected
      if (selectedSize) {
        setQuantityDisabled(false);
      } else {
        setSelectedQuantity("");
        setQuantityDisabled(true);
        setAddonDisabled(true);
      }
    }, [selectedSize]);

    useEffect(() => {
      // Enable addon selection only when quantity is selected
      if (selectedQuantity) {
        setAddonDisabled(false);
      } else {
        setSelectedAddons("");
        setAddonDisabled(true);
      }
    }, [selectedQuantity]);

    async function getProductDetails() {
      setLoading(true);
      try {
        // Get the product data
        const response = await axios.get(`${baseUrl}/api/v1/resources/packaging-type`);
        if (response.status === 200) {
          const productData = response.data.data.find(
            item => item.packaging_id.toString() === params.id
          );
          
          if (productData) {
            // Create thumbnails array from packaging_gallery
            const galleryImages = productData.packaging_gallery?.map(
              item => item.packaging_gallery_image_url
            ) || [];
    
            // Create slider gallery images array
            const sliderGalleryImages = productData.packaging_slider_gallery?.map(
              item => item.slider_gallery_image
            ) || [];
            
            // Use main image as first, then gallery images
            const thumbnailImages = [
              productData.packaging_image_url,
              ...galleryImages
            ];
            
            
            // Include slider_image_url if available
            const sliderImages = [
              //...(productData.slider_image_url ? [productData.slider_image_url] : []),
              ...sliderGalleryImages
            ];
            
            setProduct({
              ...productData,
              thumbnails: thumbnailImages,
              sliderGalleryImages: sliderImages, // Store slider gallery images separately
            });
            
            // Once we have the product data, fetch all related options
            await fetchFormOptions(productData.packaging_id);
          } else {
            // Handle case where product is not found
            console.error("Product not found");
          }
        }
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchFormOptions(packagingId, additionType = 0) {
  try {
    // Fetch materials, sizes, and addons in parallel (single call each)
    const [materialsRes, sizesRes, addonsRes] = await Promise.all([
      axios.get(`${baseUrl}/api/v1/resources/list-materials/${packagingId}`),
      axios.get(`${baseUrl}/api/v1/resources/list-packaging-type-size/${packagingId}`),
      axios.get(`${baseUrl}/api/v1/resources/list-additions/${packagingId}`)
    ]);

    const materials = materialsRes.data?.data || [];
    const sizes = sizesRes.data?.data || [];
    
    // Log material data to see the actual structure
    console.log('Materials API response:', materials);    
    
    // Set materials directly without duplication
    setMaterials(materials);
    setSizes(sizes);
    
    // Auto-select the first default material if available
    const defaultMaterial = materials.find(material => material.checked === 1);
    if (defaultMaterial) {
      const materialId = defaultMaterial.materialId?.material_id || defaultMaterial.material_id || defaultMaterial.id;
      setSelectedMaterial(materialId?.toString());
      console.log('Auto-selected default material:', materialId);
    } else if (materials.length > 0) {
      // If no default material, select the first available material
      const firstMaterial = materials[0];
      const materialId = firstMaterial.materialId?.material_id || firstMaterial.material_id || firstMaterial.id;
      setSelectedMaterial(materialId?.toString());
      console.log('Auto-selected first material:', materialId);
    }
    
    console.log('Addons API response:', addonsRes.data);
    
    // Handle addons
    if (addonsRes.data.status === 200 && Array.isArray(addonsRes.data.data)) {
      const addons = addonsRes.data.data;
      console.log('Addons data:', addons);
      setAddons(addons);
      return { materials, addons, sizes };
    } else {
      console.error('Unexpected addon response format:', addonsRes.data);
      setAddons([]);
      return { materials, addons: [], sizes };
    }
  } catch (error) {
    console.error("Form options error:", error);
    console.error("Error details:", error.response || error.message);
    
    // Set empty arrays on error
    setMaterials([]);
    setAddons([]);
    setSizes([]);
    setSelectedMaterial(null);
    return { materials: [], addons: [], sizes: [] };
  }
}

    async function fetchQuantities(sizeId) {
      if (!sizeId) return;
      
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/resources/list-packaging-type-size-quantity/${sizeId}`
        );
        
        if (response.status === 200) {
          // Store the first item's price to calculate discounts
          let firstPrice = 0;
          if (response.data.data.length > 0) {
            firstPrice = response.data.data[0].quantityId.price;
            setFirstItemPrice(firstPrice);
          }
          
          const quantitiesData = response.data.data.map((item, index) => {
            // Calculate discount percentage based on first item price
            let discountPercentage = 0;
            if (index > 0 && firstPrice > 0) {
              discountPercentage = ((firstPrice - item.quantityId.price) / firstPrice) * 100;
              // Handle negative discounts (price increases)
              if (discountPercentage < 0) discountPercentage = 0;
            }
            
            return {
              quantity_id: item.quantityId.quantity_id,
              quantity: item.quantityId.quantity,
              price: item.quantityId.price,
              originalPrice: index === 0 ? item.quantityId.price : firstPrice,
              design_number: item.quantityId.design_number,
              discount: index === 0 ? 0 : discountPercentage.toFixed(0)
            };
          });
          
          setQuantities(quantitiesData);
          setSelectedQuantity(""); // Reset quantity selection when size changes
        }
      } catch (error) {
        console.error("Quantities fetch error:", error);
        setQuantities([]); // Clear quantities on error
      }
    }

    const handleSizeSelection = (sizeId) => {
      setSelectedSize(sizeId);
      setSelectedSizeId(sizeId); // Set the sizeId explicitly for API calls
      setIsDropdownOpenSize(false);
      fetchQuantities(sizeId); // Call fetchQuantities function with the selected sizeId
    };

    useEffect(() => {
      if (scrollRef.current && product?.thumbnails?.length > 0) {
        const selectedThumb = scrollRef.current.querySelector(`[data-index="${selectedImage}"]`);
        if (selectedThumb) {
          selectedThumb.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest',
            inline: 'center' 
          });
        }
      }
    }, [selectedImage]);

    const visibleThumbnails = Array.isArray(product?.thumbnails)
      ? product.thumbnails.slice(0, -1)
      : [];


    const prevIndex = selectedImage === 0
      ? visibleThumbnails.length - 1
      : selectedImage - 1;

    const nextIndex = selectedImage === visibleThumbnails.length - 1
      ? 0
      : selectedImage + 1;

    // Calculate carousel navigation indices
    const carouselPrevIndex = carouselSelectedImage === 0 ? product?.thumbnails?.length - 1 : carouselSelectedImage - 1;
    const carouselNextIndex = carouselSelectedImage === product?.thumbnails?.length - 1 ? 0 : carouselSelectedImage + 1;

    if (!product?.thumbnails?.length) return null;

    // Helper function to get size ID from either format
    const getSizeId = (size) => size.size_id || size.sizeId?.size_id;
    
    // Helper function to get size name from either format
    const getSizeName = (size) => size.name || size.sizeId?.name;
    
    // Helper function to get dimensions from either format
    const getDimensions = (size) => size.dimensions || size.sizeId?.dimensions;
    
    // Helper function to get volume from either format
    const getVolume = (size) => size.filling_volume || size.sizeId?.filling_volume;

    const handleAddToCart = () => {
  if (!product) return;
  
  // Find the selected items from their respective arrays
  const selectedSizeItem = sizes.find(s => (s.size_id || s.sizeId?.size_id)?.toString() === selectedSize?.toString());
  const selectedQuantityItem = quantities.find(q => q.quantity_id?.toString() === selectedQuantity?.toString());
  
  // Get proper price from selected quantity
  const price = selectedQuantityItem?.price || product.price;
  
  // Handle single material selection
  let selectedMaterialForCart = null;
  
  if (selectedMaterial && materials && materials.length > 0) {
    // Find the selected material
    const selectedMaterialItem = materials.find(material => {
      const materialId = material.materialId?.material_id || material.material_id || material.id;
      return materialId?.toString() === selectedMaterial?.toString();
    });
    
    if (selectedMaterialItem) {
      const materialId = selectedMaterialItem.materialId?.material_id || selectedMaterialItem.material_id || selectedMaterialItem.id;
      const materialName = selectedMaterialItem.materialId?.name || selectedMaterialItem.name || selectedMaterialItem.material_name || selectedMaterialItem.title || selectedMaterialItem.material_title;
      const materialDescription = selectedMaterialItem.materialId?.description || selectedMaterialItem.description || selectedMaterialItem.material_description || selectedMaterialItem.desc;
      const materialImage = selectedMaterialItem.materialId?.material_image_url || selectedMaterialItem.material_image_url || selectedMaterialItem.image;
      
      selectedMaterialForCart = {
        id: materialId?.toString() || '',
        name: materialName || 'No name',
        description: materialDescription || 'No description available',
        image: materialImage || '',
        checked: selectedMaterialItem.checked || 0
      };
      
      console.log("Selected material for cart:", selectedMaterialForCart);
    }
  }
  
  // If no material is selected, try to get a default material
  if (!selectedMaterialForCart && materials && materials.length > 0) {
    const defaultMaterial = materials.find(material => material.checked === 1);
    
    if (defaultMaterial) {
      const materialId = defaultMaterial.materialId?.material_id || defaultMaterial.material_id || defaultMaterial.id;
      const materialName = defaultMaterial.materialId?.name || defaultMaterial.name || defaultMaterial.material_name || defaultMaterial.title || defaultMaterial.material_title;
      const materialDescription = defaultMaterial.materialId?.description || defaultMaterial.description || defaultMaterial.material_description || defaultMaterial.desc;
      const materialImage = defaultMaterial.materialId?.material_image_url || defaultMaterial.material_image_url || defaultMaterial.image;
      
      selectedMaterialForCart = {
        id: materialId?.toString() || '',
        name: materialName || `Material ${materialId}`,
        description: materialDescription || 'No description available',
        image: materialImage || '',
        checked: 1
      };
      
      console.log("Using default material for cart:", selectedMaterialForCart);
    }
  }
  
  // Handle Addons - Extract only actual addons (not materials)
  let addonsForCart = [];
  
  if (addons && addons.length > 0) {
    console.log("Processing addons:", addons);
    
    // Handle Default Addons (checked=1) - only those with additionsId (not materialId)
    const defaultAddons = addons.filter(addon => addon.checked === 1 && addon.additionsId);
    console.log("Default addons found:", defaultAddons);
    
    defaultAddons.forEach(addon => {
      if (addon.additionsId && addon.additionsId.additions_id) {
        addonsForCart.push({
          id: addon.additionsId.additions_id?.toString() || '',
          name: addon.additionsId.additions_title || 'No name',
          description: addon.additionsId.additions_desc || 'No description available',
          image: addon.additionsId.additions_image || '',
          checked: 1
        });
      }
    });
    
    // Handle Selected Optional Addons (checked=0) - only those with additionsId
    if (selectedAddons && selectedAddons.length > 0) {
      console.log("Selected addons:", selectedAddons);
      
      selectedAddons.forEach(addonId => {
        const selectedAddonItem = addons.find(a => 
          a.additionsId?.additions_id?.toString() === addonId?.toString()
        );
        
        console.log("Found selected addon item:", selectedAddonItem);
        
        if (selectedAddonItem && selectedAddonItem.additionsId) {
          const alreadyExists = addonsForCart.some(a => a.id === selectedAddonItem.additionsId.additions_id?.toString());
          
          if (!alreadyExists) {
            addonsForCart.push({
              id: selectedAddonItem.additionsId.additions_id?.toString() || '',
              name: selectedAddonItem.additionsId.additions_title || 'No name',
              description: selectedAddonItem.additionsId.additions_desc || 'No description available',
              image: selectedAddonItem.additionsId.additions_image || '',
              checked: selectedAddonItem.checked || 0
            });
          }
        }
      });
    }
  }

  console.log("Selected material for cart:", selectedMaterialForCart);
  console.log("Final addons for cart:", addonsForCart);

  // Create the cart item with proper structure
  const cartItem = {
    packaging_id: product.packaging_id,
    name: product.name || '',
    image: product.packaging_image_url || '',
    material: selectedMaterialForCart, // Single material object
    size_id: selectedSize,
    packaging_type_size_id: selectedSizeId,
    quantity: selectedQuantityItem?.quantity || "",
    quantity_id: selectedQuantity,
    packaging_type_size_quantity_id: selectedQuantity,
    price: price || 0,
    design_number: selectedQuantityItem?.design_number || '',
    addons: addonsForCart // Array of addon objects
  };

  console.log("Adding to cart:", cartItem);
  
  // Validation before adding to cart
  if (!selectedSize || !selectedQuantity) {
    console.error("Missing required selections");
    alert("Please select size and quantity before adding to cart");
    return;
  }
  
  // Validation for material selection
  if (!selectedMaterialForCart) {
    console.warn("No material selected");
    alert("Please select a material before adding to cart");
    return;
  }
  
  // Dispatch to Redux store
  dispatch(addToCart(cartItem));
  
  // Also save to localStorage as backup
  try {
    const cartItemForStorage = {
      ...cartItem,
      // Ensure all values are serializable
      material: selectedMaterialForCart ? {
        ...selectedMaterialForCart,
        id: selectedMaterialForCart.id?.toString() || '',
        name: selectedMaterialForCart.name || '',
        description: selectedMaterialForCart.description || '',
        image: selectedMaterialForCart.image || '',
        checked: Number(selectedMaterialForCart.checked) || 0
      } : null,
      addons: addonsForCart.map(addon => ({
        ...addon,
        id: addon.id?.toString() || '',
        name: addon.name || '',
        description: addon.description || '',
        image: addon.image || '',
        checked: Number(addon.checked) || 0
      }))
    };
    
    localStorage.setItem("lastOrder", JSON.stringify(cartItemForStorage));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
  
  // Navigate to cart page
  router.push("/cart");
};

    // Add to cart button is disabled if required fields are not selected
    const isAddToCartDisabled = !selectedMaterial || !selectedSize || !selectedQuantity;

    if (loading) return <Recomend_Scleton />;
    if (!product) return <div className="w-full text-center py-12 text-lg">Product Not Found</div>;
    const currentSize = sizes.find(s => getSizeId(s)?.toString() === selectedSize?.toString());

    return (
        <div className="w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 bg-[#] md:mt-10">
          {/* Main content container with responsive max width */}
          <div className="mx-auto">
            {/* Product grid with improved professional styling */}
            <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {/* Image Gallery - Enhanced for professional appearance */}
              <div className="w-full flex flex-col gap-4 h-full">
                {/* Main product image with subtle zoom effect */}
                <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-blue-50 to-blue-50 border border-gray-200  overflow-hidden shadow-md">
                  {visibleThumbnails.length > 0 && (
                    <Image
                      src={visibleThumbnails[selectedImage]}
                      alt={`${product.name} - Image ${selectedImage + 1}`}
                      fill
                      priority={selectedImage === 0}
                      loading={selectedImage === 0 ? 'eager' : 'lazy'}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-102"
                    />
                  )}
                  
                  {/* Navigation arrows with improved design */}
                  <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4">
                    <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedImage(prevIndex);
                    }}
                      className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all opacity-80 hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedImage(nextIndex);
                      }}
                      className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all opacity-80 hover:opacity-100"
                      aria-label="Next image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Thumbnails row - professionally styled */}
                <div className="relative mt-2">
                  {/* Improved scroll indicators */}
                  <div className="sm:hidden flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full pointer-events-none z-10">
                    <div className="bg-gradient-to-r from-white via-white/80 to-transparent w-8 h-20"></div>
                    <div className="bg-gradient-to-l from-white via-white/80 to-transparent w-8 h-20"></div>
                  </div>
                  
                  <div 
                    className="flex h-44 gap-3 overflow-y-hidden py-2 px-1 snap-x snap-mandatory scroll-smooth hide-scrollbar"
                    role="region" 
                    aria-label="Product image thumbnails"
                  >
                    {Array.isArray(product?.thumbnails) &&
  product.thumbnails.slice(0, -1).map((thumbnail, index) => (
    <button 
      key={index} 
      className={`w-32 border flex-shrink-0 snap-center ${
        selectedImage === index 
          ? 'border-[#143761]' 
          : 'border-gray-200 opacity-80 hover:opacity-100 hover:shadow-sm'
      }`}
      onClick={() => setSelectedImage(index)}
      aria-label={`View product image ${index + 1}`}
      aria-pressed={selectedImage === index}
    >
      <div className="relative w-full h-24">
        <Image 
          src={thumbnail} 
          alt={`Thumbnail ${index + 1}`} 
          fill
          sizes="64px"
          className="object-contain p-1"
        />
      </div>
    </button>
))}

                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 p-6 md:px-8 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] border border-gray-100 rounded-xl shadow-lg">
                {/* Product Header Section */}
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-5xl font-extrabold text-blue-950 ">
                    {product.name}
                  </h1>
                  {product.description
                    .split('.')
                    .filter(Boolean)
                    .map((sentence, index) => {
                      const trimmed = sentence.trim();
                      // const shortText = trimmed.length > 50 ? trimmed.slice(0, 200) + '.' : trimmed + '.';
                      return (
                        <p
                          key={index}
                          className="text-gray-600 text-sm sm:text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: trimmed }}
                        />
                      );
                    })}


                </div>

                {/* Selection Sections */}
                <div className="space-y-6 flex-grow">
                  {/* Material Select - Single Selection */}
                  <div className="flex flex-col gap-2 relative dropdown-container">
                    <label className="font-semibold text-sm sm:text-base text-gray-700 flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5 text-blue-500" />
                      Material Selection
                    </label>
                    
                    <button
                      type="button"
                      className="p-2 bg-white border-2 border-gray-100 rounded-xl w-full text-sm sm:text-base flex items-center justify-between hover:border-blue-200 transition-all duration-300 group shadow-sm"
                      onClick={() => !materialDisabled && setIsDropdownOpen(!isDropdownOpen)}
                      disabled={materialDisabled}
                    >
                      <span className="text-gray-800 truncate max-w-full">
                        {(() => {
                          // Check if no material is selected - show placeholder
                          if (!selectedMaterial) {
                            return <span className="text-gray-500">Select a material</span>;
                          }
                          
                          // Find the selected material from all materials
                          const selectedMaterialItem = materials.find(material => {
                            const materialId = material.materialId?.material_id || material.material_id || material.id;
                            return materialId?.toString() === selectedMaterial?.toString();
                          });
                          
                          // If selected material is found, display its name
                          if (selectedMaterialItem) {
                            const materialName = selectedMaterialItem.materialId?.name || 
                                                selectedMaterialItem.name || 
                                                selectedMaterialItem.material_name || 
                                                selectedMaterialItem.title || 
                                                selectedMaterialItem.material_title;
                            return materialName || 'Selected Material';
                          }
                          
                          // Fallback if material ID exists but item not found
                          return <span className="text-gray-500">Select a material</span>;
                        })()}
                      </span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 w-full bg-white border-2 border-blue-50 rounded-xl shadow-xl mt-1 z-20 animate-fade-in">
                        <div className="mb-2 p-3 border-b border-gray-100">
                          <h4 className="font-medium text-blue-800">Available Materials</h4>
                        </div>
                        
                        <ul className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                          {Array.isArray(materials) && materials.length > 0 ? (
                            materials.map((material) => {
                              const materialId = material?.materialId?.material_id || material?.material_id || material?.id;
                              const isSelected = selectedMaterial?.toString() === materialId?.toString();
                              const isDefault = material.checked === 1;
                              
                              return (
                                <li
                                  key={materialId || `material-${Math.random()}`}
                                  className={`flex items-center gap-4 p-3 cursor-pointer transition-colors ${
                                    isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                                  }`}
                                  onClick={() => {
                                    setSelectedMaterial(materialId?.toString());
                                    setIsDropdownOpen(false); // Close dropdown after selection
                                  }}
                                >
                                  <div className="relative h-12 w-12 rounded-xl border-2 border-gray-200 overflow-hidden">
                                    {material?.materialId?.material_image_url || material?.material_image_url || material?.image ? (
                                      <Image 
                                        src={material.materialId?.material_image_url || material.material_image_url || material.image} 
                                        alt={material.materialId?.name || material.name || 'Material image'} 
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <PhotoIcon className="w-5 h-5 text-gray-400" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium text-gray-800">
                                        {material?.materialId?.name || 
                                        material?.name || 
                                        material?.material_name || 
                                        material?.title || 
                                        material?.material_title || 
                                        `Material ${materialId}` || 
                                        'Unnamed material'}
                                      </p>
                                      {/* {isDefault && (
                                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full border border-green-200">
                                          Default
                                        </span>
                                      )} */}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {material?.materialId?.description || 
                                      material?.description || 
                                      material?.material_description || 
                                      material?.desc || 
                                      'No description available'}
                                    </p>
                                  </div>
                                  
                                  {isSelected ? (
                                    <CheckCircleIcon className="w-5 h-5 text-blue-600 shrink-0" />
                                  ) : (
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full shrink-0" />
                                  )}
                                </li>
                              );
                            })
                          ) : (
                            <li className="p-3 text-center text-gray-500">No materials available</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Size Select */}
                  <div className="flex flex-col gap-2 relative dropdown-container">
                    <label className="font-semibold text-sm sm:text-base text-gray-700 flex items-center gap-2">
                      <ArrowsPointingOutIcon className="w-5 h-5 text-blue-500" />
                      Size Options
                    </label>
                    <button
                      type="button"
                      className="p-2 bg-white border-2 border-gray-100 rounded-xl w-full text-sm sm:text-base flex items-center justify-between hover:border-blue-200 transition-all duration-300 group shadow-sm"
                      onClick={() =>!sizeDisabled && setIsDropdownOpenSize(!isDropdownOpenSize)}
                      disabled={sizeDisabled}
                    >
                      <span className={!currentSize ? "text-gray-500" : "text-gray-800"}>
                        {currentSize 
                          ? `${getSizeName(currentSize)} (${getVolume(currentSize)})`
                          : "Select size"
                        }
                      </span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </button>

                    {isDropdownOpenSize && (
                      <div className="absolute top-full left-0 w-full bg-white border-2 border-blue-50 rounded-xl shadow-xl mt-1 z-20 animate-fade-in">
                        <table className="w-full text-sm">
                          <thead className="bg-blue-50/50">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold text-blue-800">Size</th>
                              <th className="px-4 py-3 text-left font-semibold text-blue-800">Dimensions</th>
                              <th className="px-4 py-3 text-left font-semibold text-blue-800">Volume</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizes.map((size) => (
                              <tr 
                                key={getSizeId(size)} 
                                className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                                  getSizeId(size)?.toString() === selectedSize?.toString() 
                                    ? 'bg-blue-50/30' 
                                    : ''
                                }`}
                                onClick={() => handleSizeSelection(getSizeId(size))}
                              >
                                <td className="px-4 py-3 border-t border-gray-100">
                                  <div className="flex items-center">
                                    <div className={`w-9 h-9 flex items-center justify-center border-2 rounded-lg mr-2 font-medium ${
                                      getSizeId(size)?.toString() === selectedSize?.toString() 
                                        ? 'border-blue-600 text-blue-700' 
                                        : 'border-gray-200 text-gray-700'
                                    }`}>
                                      {getSizeName(size)}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 border-t border-gray-100 font-medium text-gray-700">
                                  {getDimensions(size)}
                                </td>
                                <td className="px-4 py-3 border-t border-gray-100 font-semibold text-blue-700">
                                  {getVolume(size)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Quantity Select */}
                  <div className="flex flex-col gap-2 relative dropdown-container">
                    <label className="font-semibold text-sm sm:text-base text-gray-700 flex items-center gap-2">
                      <TagIcon className="w-5 h-5 text-blue-500" />
                      Quantity & Pricing
                    </label>
                    <button
                      type="button"
                      className="p-2 bg-white border-2 border-gray-100 rounded-xl w-full text-sm sm:text-base flex items-center justify-between hover:border-blue-200 transition-all duration-300 group shadow-sm"
                      onClick={() =>!quantityDisabled && setIsDropdownOpenQuantity(!isDropdownOpenQuantity)}
                      disabled={quantityDisabled}
                    >
                      <span className={!selectedQuantity || quantityDisabled ? "text-gray-500" : "text-gray-800"}>
                        {selectedQuantity 
                          ? `${quantities.find(q => q.quantity_id.toString() === selectedQuantity)?.quantity} units`
                          : "Select quantity"
                        }
                      </span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </button>

                    {isDropdownOpenQuantity && (
                      <div className="absolute top-full left-0 w-full bg-white border-2 border-blue-50 rounded-xl shadow-xl mt-1 z-20 animate-fade-in">
                        <div className="max-h-64 overflow-y-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-blue-50 sticky top-0">
                              <tr>
                                <th className="px-4 py-3 text-left font-semibold text-blue-800">Qty</th>
                                <th className="px-4 py-3 text-left font-semibold text-blue-800">Discount</th>
                                <th className="px-4 py-3 text-left font-semibold text-blue-800">Unit Price</th>
                                <th className="px-4 py-3 text-left font-semibold text-blue-800">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {quantities.map((qty) => (
                                <tr 
                                  key={qty.quantity_id} 
                                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                                    qty.quantity_id.toString() === selectedQuantity 
                                      ? 'bg-blue-50/30' 
                                      : ''
                                  }`}
                                  onClick={() => {
                                    setSelectedQuantity(qty.quantity_id.toString());
                                    setIsDropdownOpenQuantity(false);
                                  }}
                                >
                                  <td className="px-4 py-3 border-t border-gray-100 font-medium text-gray-700">
                                    {qty.quantity}
                                  </td>
                                  <td className="px-4 py-3 border-t border-gray-100">
                                    {parseInt(qty.discount) > 0 ? (
                                      <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
                                        {qty.discount}% OFF
                                      </span>
                                    ) : (
                                      <span className="text-gray-400">-</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 border-t border-gray-100 text-gray-600">
                                    ₹{Number(qty.price).toFixed(2)}
                                  </td>
                                  <td className="px-4 py-3 border-t border-gray-100 font-semibold text-blue-700">
                                    ₹{(Number(qty.price) * Number(qty.quantity)).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Addons Select */}
                  <div className="flex flex-col gap-2 relative dropdown-container">
                    <label className="font-semibold text-sm sm:text-base text-gray-700 flex items-center gap-2">
                      <PlusCircleIcon className="w-5 h-5 text-blue-500" />
                      Custom Add-Ons
                      <span className="text-gray-500 font-normal text-sm">(default addons are already selected)</span>
                    </label>
                    <button
                      type="button"
                      className="p-2 bg-white border-2 border-gray-100 rounded-xl w-full text-sm sm:text-base flex items-center justify-between hover:border-blue-200 transition-all duration-300 group shadow-sm"
                      onClick={() => !addonDisabled && setIsDropdownOpenAddon(!isDropdownOpenAddon)}
                      disabled={addonDisabled}
                    >
                      <span className="text-gray-500 truncate max-w-full">
                        {(() => {
                          // Check if addons array is empty or undefined - show "no addons" message
                          if (!Array.isArray(addons) || addons.length === 0) {
                            return <span className="text-gray-500">No add-ons available</span>;
                          }

                          // Get names of all default add-ons (checked = 1) - these are auto-selected
                          const defaultAddonNames = addons
                            .filter(addon => addon.checked === 1 && addon.additionsId)
                            .map(addon => addon.additionsId?.additions_title)
                            .filter(name => name); // Remove any undefined/null names
                            
                          // Get names of all manually selected optional add-ons  
                          const selectedAddonNames = Array.isArray(selectedAddons) && selectedAddons.length > 0
                            ? selectedAddons
                                .map(addonId => {
                                  const addon = addons.find(a => 
                                    a.additionsId?.additions_id?.toString() === addonId?.toString()
                                  );
                                  return addon?.additionsId?.additions_title;
                                })
                                .filter(name => name) // Remove any undefined/null names
                            : [];
                          
                          // Combine all add-on names (default + manually selected)
                          const allSelectedNames = [...defaultAddonNames, ...selectedAddonNames];
                          
                          // If no addons are selected at all, show placeholder
                          if (allSelectedNames.length === 0) {
                            return <span className="text-gray-500">Select add-ons</span>;
                          }
                          
                          // Display addon names - truncate if more than 2
                          const displayText = allSelectedNames.length > 2 
                            ? `${allSelectedNames.slice(0, 2).join(', ')} +${allSelectedNames.length - 2} more`
                            : allSelectedNames.join(', ');
                            
                          return displayText;
                        })()}
                      </span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </button>

                    {isDropdownOpenAddon && (
                      <div className="absolute top-full left-0 w-full bg-white border-2 border-blue-50 rounded-xl shadow-xl mt-1 z-20 animate-fade-in">
                        <div className="mb-2 p-3 border-b border-gray-100">
                          <h4 className="font-medium text-blue-800">Default Add-ons</h4>
                        </div>
                        
                        <ul className="max-h-52 overflow-y-auto divide-y divide-gray-100">
                          {/* Default addons (checked = 1) */}
                          {Array.isArray(addons) && addons.filter(addon => addon.checked === 1).length > 0 ? (
                            addons.filter(addon => addon.checked === 1).map((addon) => (
                              <li
                                key={addon?.additionsId?.additions_id || `addon-${Math.random()}`}
                                className="flex items-center gap-4 p-3 bg-blue-50/30"
                              >
                                <div className="relative h-12 w-12 rounded-xl border-2 border-gray-200 overflow-hidden">
                                  {addon?.additionsId?.additions_image ? (
                                    <Image 
                                      src={addon.additionsId.additions_image} 
                                      alt={addon.additionsId.additions_title || 'Addon image'} 
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                      <PhotoIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-800">{addon?.additionsId?.additions_title || 'Unnamed addon'}</p>
                                  <p className="text-xs text-gray-500 mt-1">{addon?.additionsId?.additions_desc || 'No description available'}</p>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full border border-green-200">
                                  Included
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="p-3 text-center text-gray-500">No default addons available</li>
                          )}
                        </ul>

                        <div className="mt-2 mb-2 p-3 border-t border-b border-gray-100">
                          <h4 className="font-medium text-blue-800">Optional Add-ons</h4>
                        </div>
                        
                        <ul className="max-h-52 overflow-y-auto divide-y divide-gray-100">
                          {/* Optional addons (checked = 0) with multiple selection */}
                          {Array.isArray(addons) && addons.filter(addon => addon.checked === 0).length > 0 ? (
                            addons.filter(addon => addon.checked === 0).map((addon) => {
                              const addonId = addon?.additionsId?.additions_id?.toString();
                              const isSelected = selectedAddons.includes(addonId);
                              
                              return (
                                <li
                                  key={addonId || `addon-${Math.random()}`}
                                  className={`flex items-center gap-4 p-3 cursor-pointer transition-colors ${
                                    isSelected ? 'bg-blue-50/30' : 'hover:bg-gray-50'
                                  }`}
                                  onClick={() => {
                                    if (isSelected) {
                                      // Remove from selection if already selected
                                      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
                                    } else {
                                      // Add to selection if not already selected
                                      setSelectedAddons([...selectedAddons, addonId]);
                                    }
                                  }}
                                >
                                  <div className="relative h-12 w-12 rounded-xl border-2 border-gray-200 overflow-hidden">
                                    {addon?.additionsId?.additions_image ? (
                                      <Image 
                                        src={addon.additionsId.additions_image} 
                                        alt={addon.additionsId.additions_title || 'Addon image'} 
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <PhotoIcon className="w-5 h-5 text-gray-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-800">{addon?.additionsId?.additions_title || 'Unnamed addon'}</p>
                                    <p className="text-xs text-gray-500 mt-1">{addon?.additionsId?.additions_desc || 'No description available'}</p>
                                  </div>
                                  {isSelected ? (
                                    <div className="flex items-center">
                                      <CheckCircleIcon className="w-5 h-5 text-green-600 ml-2 shrink-0" />
                                    </div>
                                  ) : (
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full ml-2 shrink-0" />
                                  )}
                                </li>
                              );
                            })
                          ) : (
                            <li className="p-3 text-center text-gray-500">No optional addons available</li>
                          )}
                        </ul>
                        
                        {/* <div className="p-3 border-t border-gray-100 flex justify-end">
                          <button
                            type="button"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            onClick={() => setIsDropdownOpenAddon(false)}
                          >
                            Apply Selection
                          </button>
                        </div> */}
                      </div>
                    )}
                  </div>
                </div>
                

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row gap-3 border-t border-gray-200">
                  <Button
                    className="group relative bg-gradient-to-r from-[#0b2949] to-blue-900 text-white font-semibold text-sm sm:text-base py-3.5 px-8 rounded-xl w-full sm:w-auto transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-200/50"
                    onClick={() => router.push('/packaging-type')}
                  >
                    <span className="relative z-10">Customize Now</span>
                    <ArrowRightIcon className="w-5 h-5 ml-2 inline-block transform group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    className={`relative font-semibold text-sm sm:text-base py-3.5 px-8 rounded-xl w-full sm:w-auto transition-all transform ${
                      isAddToCartDisabled 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                        : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:scale-[1.02] shadow-lg hover:shadow-green-200/50"
                    }`}
                    onClick={handleAddToCart}
                    disabled={isAddToCartDisabled}
                  >
                    <span className="relative z-10">
                      {isAddToCartDisabled ? 'Complete Selection' : 'Add to Cart'}
                    </span>
                    {!isAddToCartDisabled && (
                      <ShoppingCartIcon className="w-5 h-5 ml-2 inline-block transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* About Products section */}
              <div className="mt-20 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                  <div className="w-full text-center bg-white ">
                    <h3 className="text-2xl font-semibold text-[#143761] mb-4 flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className=" h-8 w-8 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Info & Details
                    </h3>
                    <div className="text-gray-900 space-y-3">
                      <p className="leading-relaxed md:text-4xl text-3xl font-extrabold">Everything you need to know about {product.name}</p>

                    </div>
                  </div>
                  <ImageComparisonFeature 
                  title={product.name}
                  // product_desc={product.description}
                  afterImage={product.slider_image_url} // You can use product images from your state
                  beforeImage={product.thumbnails[product.thumbnails.length - 1]} // do not use this use statci image 
                  afterText="Hello, unique design!"
                  beforeText="Bye, labels..."
                  theme="light-blue"
                  sliding_desc={product.slider_description}
                />
                  
                  {/* Carousel-style Gallery with center-focused layout */}
                  {product.sliderGalleryImages && product.sliderGalleryImages.length > 1 && (
  <div className="bg-white rounded-lg shadow">
    <Carousel
      images={product.sliderGalleryImages.slice(0, -1)} // Excludes last image
      altPrefix={`${product.name} - Slider Image`}
      title={`This is what your ${product.name} could look like`}
      selectedImage={sliderSelectedImage}
      setSelectedImage={setSliderSelectedImage}
    />
  </div>
)}

                  </div>
              </div>
              <div className="flex flex-col md:flex-row w-full bg-blue-50 md:p-10 p-5 rounded-lg items-center justify-between gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/ChatGPT Image Jun 4, 2025, 11_21_32 AM (2)-01-01.png"
              alt="Packaging Sample Kit"
              className="h-80 w-auto md:h-96 object-contain"
            />
          </div>

  {/* Text Section */}
  <div className="w-full md:w-1/2">
    <h1 className="text-2xl md:text-4xl font-bold text-black mb-4">
      Try before you order — with{" "}
      <span className="italic mt-5 font-extrabold text-3xl md:text-4xl inline-block">
        FREE SAMPLES
      </span>
    </h1>


    <p className="text-gray-700 mb-6 text-base md:text-lg leading-relaxed">
      We offer a free sample kit so you can be sure everything fits just right. Take your time to examine the material, test the size, and try filling it with your actual product. This hands-on experience helps you choose the perfect pouch — ensuring the right feel, fit, and function before placing your full order.
    </p>

    <button
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0b2949] to-blue-900 rounded-full text-white font-medium hover:shadow-lg transition-all duration-200"
      onClick={() => router.push('/free-sample')}
    >
      GET FREE SAMPLE
    </button>
  </div>
</div>

          </div>
        </div>
    );
  }