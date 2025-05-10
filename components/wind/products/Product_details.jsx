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
    
    const [carouselSelectedImage, setCarouselSelectedImage] = useState(0);
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState("");
    const [selectedAddon, setSelectedAddon] = useState("");
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
        setSelectedAddon("");
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

            // Use main image as first, then gallery images
            const thumbnailImages = [
              productData.packaging_image_url,
              ...galleryImages
            ];

            setProduct({
              ...productData,
              thumbnails: thumbnailImages,
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
        // Fetch materials and sizes in parallel
        const [materialsRes, sizesRes] = await Promise.all([
          axios.get(`${baseUrl}/api/v1/resources/material`),
          axios.get(`${baseUrl}/api/v1/resources/list-packaging-type-size/${packagingId}`)
        ]);
    
        setMaterials(materialsRes.data?.data || []);
        setSizes(sizesRes.data?.data || []);
        
        const addonsRes = await axios.get(
          `${baseUrl}/api/v1/resources/list-additions/${packagingId}?addition_type=${additionType}`
        );
        
        console.log('Addons API response:', addonsRes.data);
        
        // Handle different response structures
        const responseData = addonsRes.data?.data;
    
        const additions = Array.isArray(responseData?.get_all_additions)
          ? responseData.get_all_additions
          : [];
    
        const selected = Array.isArray(responseData?.selected_addition)
          ? responseData.selected_addition
          : [];
    
        // Combine data from both arrays into addonData
        const addonData = [...additions, ...selected];
    
        console.log('Final combined addon data:', addonData);
        
        // Update state with the combined data
        setAddons(addonData);
        
        // If you need to perform operations after state update, use useEffect in your component
        // React state updates don't immediately reflect in the next line of code
        
        return addonData; // Return the combined data if needed elsewhere
      } catch (error) {
        console.error("Form options error:", error);
        console.error("Error details:", error.response || error.message);
        return [];
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

    const prevIndex = selectedImage === 0 ? product?.thumbnails?.length - 1 : selectedImage - 1;
    const nextIndex = selectedImage === product?.thumbnails?.length - 1 ? 0 : selectedImage + 1;

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
      const selectedMaterialItem = materials.find(m => m.material_id.toString() === selectedMaterial);
      const selectedSizeItem = sizes.find(s => (s.size_id || s.sizeId?.size_id).toString() === selectedSize);

      const selectedQuantityItem = quantities.find(q => q.quantity_id.toString() === selectedQuantity);
      const selectedAddonItem = addons.find(a => a.additionsId.additions_id.toString() === selectedAddon);
      
      // Get proper price from selected quantity
      const price = selectedQuantityItem?.price || product.price;
      
      // Create proper addon object format as expected by Cart component
      let addonFormatted = null;
      if (selectedAddonItem) {
        addonFormatted = {
          id: selectedAddonItem.additionsId.additions_id,
          name: selectedAddonItem.additionsId.additions_title,
          description: selectedAddonItem.additionsId.additions_desc,
        };
      }

      const cartItem = {
        packaging_id: product.packaging_id,
        name: product.name,
        image: product.packaging_image_url,
        material: selectedMaterialItem?.name || "test",
        material_id: selectedMaterial,
        size_id: selectedSize,
        packaging_type_size_id: selectedSizeId,
        quantity: selectedQuantityItem?.quantity || "",
        quantity_id: selectedQuantity,
        packaging_type_size_quantity_id: selectedQuantity,
        price: price,
        design_number: selectedQuantityItem?.design_number,
        addition_type:product.addition_type,
        // Format addons correctly for cart component
        addons: selectedAddonItem ? [{
          id: selectedAddonItem.additionsId.additions_id,
          name: selectedAddonItem.additionsId.additions_title,
          description: selectedAddonItem.additionsId.additions_desc,
          image: selectedAddonItem.additionsId.additions_image
        }] : []
      };

      console.log(cartItem);
      

      // Dispatch to Redux store
      dispatch(addToCart(cartItem));
      
      // Also save to localStorage as backup
      localStorage.setItem("lastOrder", JSON.stringify(cartItem));
      
      // Navigate to cart page
      router.push("/cart");
    };

    // Add to cart button is disabled if required fields are not selected
    const isAddToCartDisabled = !selectedMaterial || !selectedSize || !selectedQuantity;

    if (loading) return <Recomend_Scleton />;
    if (!product) return <div className="w-full text-center py-12 text-lg">Product Not Found</div>;
    const currentSize = sizes.find(s => getSizeId(s)?.toString() === selectedSize?.toString());

    return (
        <div className="w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 bg-[#]">
          {/* Main content container with responsive max width */}
          <div className="mx-auto">
            {/* Product grid with improved professional styling */}
            <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {/* Image Gallery - Enhanced for professional appearance */}
              <div className="w-full flex flex-col gap-4 h-full">
                {/* Main product image with subtle zoom effect */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md group">
                  <Image 
                    src={product.thumbnails[selectedImage]} 
                    alt={`${product.name} - Image ${selectedImage + 1}`} 
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-102"
                  />
                  
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
                  
                  {/* Image counter indicator with improved design */}
                  <div className="absolute bottom-3 right-3 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                    {selectedImage + 1}/{product.thumbnails.length}
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
                    className="flex gap-3 overflow-x-auto py-2 px-1 snap-x snap-mandatory scroll-smooth hide-scrollbar"
                    role="region" 
                    aria-label="Product image thumbnails"
                  >
                    {product.thumbnails.map((thumbnail, index) => (
                      <button 
                        key={index} 
                        className={`min-w-16 w-16 h-16 border flex-shrink-0 snap-center${
                          selectedImage === index 
                            ? 'border-[#143761] ' 
                            : 'border-gray-200 opacity-80 hover:opacity-100 hover:shadow-sm'
                        }`}
                        onClick={() => setSelectedImage(index)}
                        aria-label={`View product image ${index + 1} of ${product.thumbnails.length}`}
                        aria-pressed={selectedImage === index}
                      >
                        <div className="relative w-full h-full">
                          <Image 
                            src={thumbnail} 
                            alt="" 
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

              <div className="flex flex-col gap-5 p-6 md:p-8 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] border border-gray-100 rounded-xl shadow-lg">
                {/* Product Header Section */}
                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#143761] to-[#2a5a8f] bg-clip-text text-transparent mb-2">
                    {product.name}
                  </h1>
                  <p
                    className="text-gray-600 text-sm sm:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></p>

                </div>

                {/* Selection Sections */}
                <div className="space-y-6 flex-grow">
                  {/* Material Select */}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm sm:text-base text-gray-700 flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5 text-blue-500" />
                      Material Selection
                    </label>
                    <button 
                      className="p-2 bg-white border-2 border-gray-100 rounded-xl w-full text-sm sm:text-base flex items-center justify-between hover:border-blue-200 transition-all duration-300 group shadow-sm"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                      type="button"
                      disabled={materialDisabled}
                    >
                      {selectedMaterial ? (
                        <div className="flex items-center gap-3">
                          <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-gray-200">
                            <img 
                              src={materials.find(m => m.material_id.toString() === selectedMaterial)?.material_image_url} 
                              alt="" 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <span className="font-medium text-gray-800">
                            {materials.find(m => m.material_id.toString() === selectedMaterial)?.name || selectedMaterial}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500">Choose material</span>
                      )}
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </button>

                    {isDropdownOpen && (
                      <div className="relative animate-fade-in">
                        <ul className="absolute top-1 left-0 w-full bg-white border-2 border-blue-50 rounded-xl shadow-xl mt-1 max-h-60 overflow-y-auto z-20">
                          {materials.map((material) => (
                            <li
                              key={material.material_id}
                              className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                                material.material_id.toString() === selectedMaterial 
                                  ? 'bg-blue-50/50' 
                                  : 'hover:bg-gray-50'
                              }`}
                              onClick={() => {
                                setSelectedMaterial(material.material_id.toString()); 
                                setIsDropdownOpen(false);
                              }}
                            >
                              <div className="h-10 w-10 rounded-lg border border-gray-200 overflow-hidden">
                                <img src={material.material_image_url} alt="" className="h-full w-full object-cover" />
                              </div>
                              <div>
                                <span className="font-medium text-gray-800">{material.name}</span>
                                <p className="text-xs text-gray-500 mt-1">{material.description}</p>
                              </div>
                              {material.material_id.toString() === selectedMaterial && (
                                <CheckCircleIcon className="w-5 h-5 text-green-600 ml-auto shrink-0" />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Size Select */}
                  <div className="flex flex-col gap-2 relative">
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
                  <div className="flex flex-col gap-2 relative">
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
                  <div className="flex flex-col gap-2 relative">
                    <label className="font-semibold text-sm sm:text-base text-gray-700 flex items-center gap-2">
                      <PlusCircleIcon className="w-5 h-5 text-blue-500" />
                      Custom Add-Ons
                      <span className="text-gray-500 font-normal text-sm">(optional)</span>
                    </label>
                    <button
                      type="button"
                      className="p-2 bg-white border-2 border-gray-100 rounded-xl w-full text-sm sm:text-base flex items-center justify-between hover:border-blue-200 transition-all duration-300 group shadow-sm"
                      onClick={() =>!addonDisabled && setIsDropdownOpenAddon(!isDropdownOpenAddon)}
                      disabled={addonDisabled}
                    >
                      <span className={!selectedAddon ? "text-gray-500" : "text-gray-800"}>
                        {selectedAddon 
                          ? addons.find(a => a.additionsId.additions_id.toString() === selectedAddon)?.additionsId.additions_title 
                          : "Enhance your package"
                        }
                      </span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </button>

                    {isDropdownOpenAddon && (
                      <div className="absolute top-full left-0 w-full bg-white border-2 border-blue-50 rounded-xl shadow-xl mt-1 z-20 animate-fade-in">
                        <ul className="max-h-52 overflow-y-auto divide-y divide-gray-100">
                          {Array.isArray(addons) && addons.length > 0 ? (
                            addons.map((addon) => (
                              <li
                                key={addon?.additionsId?.additions_id || `addon-${Math.random()}`}
                                className={`flex items-center gap-4 p-3 cursor-pointer transition-colors ${
                                  addon?.additionsId?.additions_id?.toString() === selectedAddon 
                                    ? 'bg-blue-50/30' 
                                    : 'hover:bg-gray-50'
                                }`}
                                onClick={() => {
                                  setSelectedAddon(addon?.additionsId?.additions_id?.toString());
                                  setIsDropdownOpenAddon(false);
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
                                {addon?.additionsId?.additions_id?.toString() === selectedAddon && (
                                  <CheckCircleIcon className="w-5 h-5 text-green-600 ml-2 shrink-0" />
                                )}
                              </li>
                            ))
                          ) : (
                            <li className="p-3 text-center text-gray-500">No addons available</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-4 border-t border-gray-200">
                  <Button
                    className="group relative bg-gradient-to-r from-[#0b2949] to-indigo-800 text-white font-semibold text-sm sm:text-base py-3.5 px-8 rounded-xl w-full sm:w-auto transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-200/50"
                    onClick={() => router.push('/packaging-type')}
                  >
                    <span className="relative z-10">Customize Your Kit</span>
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
                      <p
                        className="text-gray-600 text-sm sm:text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      ></p>

                    </div>
                  </div>
                  <ImageComparisonFeature 
                  title={product.name}
                  beforeImage='/lable.webp' // You can use product images from your state
                  afterImage={product.thumbnails[0] || product.thumbnails[0]} // Fallback to first image if no second exists
                  beforeText="Bye, labels..."
                  afterText="Hello, unique design!"
                  theme="light-blue"
                />
                  
                  {/* Carousel-style Gallery with center-focused layout */}
                  <Carousel
                    images={product.thumbnails}
                    altPrefix={`${product.name} - Image`}
                    title={`This is what your ${product.name} could look like`}
                    selectedImage={carouselSelectedImage}
                    setSelectedImage={setCarouselSelectedImage}
                    />
                    
                  </div>

              </div>

              <div className="flex flex-col gap-5 md:flex-row w-full bg-blue-50 md:p-10 p-5 rounded-lg items-center justify-between">
                <div className="flex-shrink-0">
                  {/* Using a placeholder image since real image paths won't work here */}
                  <img
                    src="/samplekit.webp" // Replace with actual image path
                    alt="Packaging Sample Kit"
                    className="md:object-cover h-96 w-96 object-contain"
                  />
                </div>
                
                <div className="flex-1 max-w-lg">
                  <h1 className="text-4xl font-bold text-black mb-4">
                    You want to test the packaging first?
                  </h1>
                  
                  <p className="text-gray-700 mb-6">
                    You want everything to fit with your new packaging. Take your time 
                    to look at your packaging samples and try out to fill your product. 
                    That way you are guaranteed to find the perfect material and the 
                    right size.
                  </p>
                  
                  <button className='flex items-center gap-2 px-5 py-4 font-light bg-gradient-to-r from-[#0b2949] to-indigo-800 rounded-lg text-white hover:shadow-lg transition-all duration-200' onClick={() => router.push('/free-sample')}>
                    GET A FREE SAMPLE KIT
                  </button>
                </div>
              </div>

              
            
          </div>
        </div>
    );
  }