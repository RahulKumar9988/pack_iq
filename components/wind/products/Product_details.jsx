"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Recomended_product from "@/components/Recomended_product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import Recomend_Scleton from "@/components/Recomend_Scleton";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Form states
  const [materials, setMaterials] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [addons, setAddons] = useState([]);
  
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


  useEffect(() => {
    if (params.id) getProductDetails();
  }, [params.id]);

  // When size is selected, fetch quantities
  useEffect(() => {
    if (selectedSize && product) {
      fetchQuantities(selectedSizeId);
    }
  }, [selectedSize, selectedSizeId, product]);

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

  async function fetchFormOptions(packagingId) {
    try {
      // Fetch materials and sizes in parallel
      const [materialsRes, sizesRes, addonsRes] = await Promise.all([
        axios.get(`${baseUrl}/api/v1/resources/material`),
        axios.get(`${baseUrl}/api/v1/resources/list-packaging-type-size/${packagingId}`),
        axios.get(`${baseUrl}/api/v1/resources/list-additions/${packagingId}`),
      ]);

      setMaterials(materialsRes.data?.data || []);
      setSizes(sizesRes.data?.data || []);
      setAddons(addonsRes.data?.data || []);

    } catch (error) {
      console.error("Form options error:", error);
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
  };

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
    // Find the selected items from their respective arrays
  const selectedMaterialItem = materials.find(m => m.material_id.toString() === selectedMaterial);
  const selectedSizeItem = sizes.find(s => (s.size_id || s.sizeId?.size_id).toString() === selectedSize);

    const selectedQuantityItem = quantities.find(q => q.quantity_id.toString() === selectedQuantity);
    const selectedAddonItem = addons.find(a => a.additions_id.toString() === selectedAddon);
    
    // Get proper price from selected quantity
    const price = selectedQuantityItem?.price || product.price;
    
    // Create proper addon object format as expected by Cart component
    let addonFormatted = null;
    if (selectedAddonItem) {
      addonFormatted = {
        id: selectedAddonItem.additions_id,
        name: selectedAddonItem.additions_title,
        price: selectedAddonItem.additions_price || 0
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
      // Format addons correctly for cart component
      addons: selectedAddonItem ? [addonFormatted] : []
    };

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
    <div className="w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 bg-[#fffef7]">
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
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                className="object-contain transition-transform duration-300 group-hover:scale-102"
                priority
              />
              
              {/* Navigation arrows with improved design */}
              <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4">
                <button 
                  onClick={() => setSelectedImage(prev => prev === 0 ? product.thumbnails.length - 1 : prev - 1)}
                  className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all opacity-80 hover:opacity-100"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button 
                  onClick={() => setSelectedImage(prev => prev === product.thumbnails.length - 1 ? 0 : prev + 1)}
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

          {/* Product Form - With professional styling and spacing */}
          <div className="flex flex-col gap-5 p-4 md:p-6 bg-gray-50 border border-gray-100 rounded-lg shadow-sm">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#143761] mb-2">{product.name}</h1>
              <p className="text-gray-700 text-sm sm:text-base">{product.description}</p>
            </div>
            
            <div className="space-y-5 flex-grow">
              {/* Material Select */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm sm:text-base text-gray-800">Material</label>

                <button 
                  className="p-3 border border-gray-200 rounded-md w-full text-sm sm:text-base flex items-center justify-between hover:border-gray-300 transition-all"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                  type="button"
                >
                  {selectedMaterial ? (
                    <div className="flex items-center gap-3">
                      <img 
                        src={materials.find(m => m.material_id.toString() === selectedMaterial)?.material_image_url} 
                        alt="" 
                        className="h-6 w-6 object-cover rounded-sm" 
                      />
                      <span>{materials.find(m => m.material_id.toString() === selectedMaterial)?.name || selectedMaterial}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">Choose material</span>
                  )}
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Custom Dropdown List */}
                {isDropdownOpen && (
                  <div className="relative">
                    <ul className="absolute top-1 left-0 w-full bg-gray-50 border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-20">
                      {materials.map((material) => (
                        <li
                          key={material.material_id}
                          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setSelectedMaterial(material.material_id.toString()); 
                            setIsDropdownOpen(false);
                          }}
                        >
                          <img src={material.material_image_url} alt="" className="h-8 w-8 object-cover rounded-sm" />
                          <span className="font-medium">{material.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Size Select */}
              <div className="flex flex-col gap-2 relative">
                <label className="font-medium text-sm sm:text-base text-gray-800">Size</label>
                
                <button
                  type="button"
                  className="p-3 border border-gray-200 rounded-md w-full text-sm sm:text-base flex items-center justify-between hover:border-gray-300 transition-all"
                  onClick={() => setIsDropdownOpenSize(!isDropdownOpenSize)}
                >
                  <span className={!currentSize ? "text-gray-500" : ""}>
                    {currentSize 
                      ? `${getSizeName(currentSize)} (${getVolume(currentSize)})`
                      : "Select size"
                    }
                  </span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Tabular dropdown */}
                {isDropdownOpenSize && (
                  <div className="absolute top-full left-0 w-full bg-gray-50 border border-gray-200 rounded-md shadow-lg mt-1 z-20 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Size</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Dimensions (WxHxD)</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizes.map((size) => (
                          <tr 
                            key={getSizeId(size)} 
                            className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                              getSizeId(size)?.toString() === selectedSize?.toString() ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => handleSizeSelection(getSizeId(size))}
                          >
                            <td className="px-3 py-3 border-t border-gray-100">
                              <div className="flex items-center">
                                <div className={`w-8 h-8 flex items-center justify-center border rounded-md mr-2 font-medium ${
                                  getSizeId(size)?.toString() === selectedSize?.toString() ? 'border-[#143761] text-[#143761]' : 'border-gray-300 text-gray-700'
                                }`}>
                                  {getSizeName(size)}
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-3 border-t border-gray-100">{getDimensions(size)}</td>
                            <td className="px-3 py-3 border-t border-gray-100 font-medium">{getVolume(size)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {/* Show dimensions for selected size below dropdown when closed */}
                {selectedSize && !isDropdownOpenSize && currentSize && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Dimensions: {getDimensions(currentSize)}
                  </p>
                )}
              </div>

              {/* Quantity Select */}
              <div className="flex flex-col gap-2 relative">
                <label className="font-medium text-sm sm:text-base text-gray-800">Quantity</label>
                
                {!selectedSize ? (
                  <p className="text-sm text-gray-500">Please select a size first</p>
                ) : quantities.length === 0 ? (
                  <p className="text-sm text-gray-500">No quantities available for this size</p>
                ) : (
                  <>
                    <button
                      type="button"
                      className="p-3 border border-gray-200 rounded-md w-full text-sm sm:text-base flex items-center justify-between hover:border-gray-300 transition-all"
                      onClick={() => setIsDropdownOpenQuantity(!isDropdownOpenQuantity)}
                      disabled={!selectedSize}
                    >
                      <span className={!selectedQuantity ? "text-gray-500" : ""}>
                        {selectedQuantity 
                          ? `${quantities.find(q => q.quantity_id.toString() === selectedQuantity)?.quantity} units`
                          : "Select quantity"
                        }
                      </span>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Tabular dropdown with fixed height and scrolling */}
                    {isDropdownOpenQuantity && (
                      <div className="absolute top-full left-0 w-full bg-gray-50 border border-gray-200 rounded-md shadow-lg mt-1 z-20">
                        <div className="max-h-64 overflow-y-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 sticky top-0 z-10">
                              <tr>
                                <th className="px-3 py-2 text-left font-semibold text-gray-700">Quantity</th>
                                <th className="px-3 py-2 text-left font-semibold text-gray-700">Discount</th>
                                <th className="px-3 py-2 text-left font-semibold text-gray-700">Price/unit</th>
                                <th className="px-3 py-2 text-left font-semibold text-gray-700">Designs</th>
                                <th className="px-3 py-2 text-left font-semibold text-gray-700">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {quantities.map((qty) => (
                                <tr 
                                  key={qty.quantity_id} 
                                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                                    qty.quantity_id.toString() === selectedQuantity ? 'bg-blue-50' : ''
                                  }`}
                                  onClick={() => {
                                    setSelectedQuantity(qty.quantity_id.toString());
                                    setIsDropdownOpenQuantity(false);
                                  }}
                                >
                                  <td className="px-3 py-3 border-t border-gray-100 font-medium">{qty.quantity} units</td>
                                  <td className="px-3 py-3 border-t border-gray-100">
                                    {parseInt(qty.discount) > 0 ? (
                                      <span className="px-2 py-1 bg-green-50 text-xs text-green-600 rounded-full font-medium whitespace-nowrap">
                                        {qty.discount}% off
                                      </span>
                                    ) : (
                                      <span className="text-xs text-gray-400">-</span>
                                    )}
                                  </td>
                                  <td className="px-3 py-3 border-t border-gray-100">₹{Number(qty.price).toFixed(2)}</td>
                                  <td className="px-3 py-3 border-t border-gray-100">{qty.design_number || 1}</td>
                                  <td className="px-3 py-3 border-t border-gray-100 font-semibold">
                                    ₹{(Number(qty.price) * Number(qty.quantity)).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
                    {/* Show selected quantity details when dropdown is closed */}
                    {selectedQuantity && !isDropdownOpenQuantity && (
                      <div className="flex items-center justify-between mt-1 text-sm">
                        <span className="text-gray-500">
                          {quantities.find(q => q.quantity_id.toString() === selectedQuantity)?.quantity} units
                        </span>
                        <span className="font-semibold text-[#143761]">
                          ₹{(Number(quantities.find(q => q.quantity_id.toString() === selectedQuantity)?.price) * 
                            Number(quantities.find(q => q.quantity_id.toString() === selectedQuantity)?.quantity)).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Addons Select with Images */}
              <div className="flex flex-col gap-2 relative">
                <label className="font-medium text-sm sm:text-base text-gray-800">Add-Ons <span className="text-gray-500 font-normal">(optional)</span></label>
                
                <button
                  type="button"
                  className="p-3 border border-gray-200 rounded-md w-full text-sm sm:text-base flex items-center justify-between hover:border-gray-300 transition-all"
                  onClick={() => setIsDropdownOpenAddon(!isDropdownOpenAddon)}
                >
                  <span className={!selectedAddon ? "text-gray-500" : ""}>
                    {selectedAddon 
                      ? addons.find(a => a.additions_id.toString() === selectedAddon)?.additions_title
                      : "Select add-on"
                    }
                  </span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown with images */}
                {isDropdownOpenAddon && (
                  <div className="absolute top-full left-0 w-full bg-gray-50 border border-gray-200 rounded-md shadow-lg mt-1 z-20">
                    <ul className="max-h-52 overflow-y-auto divide-y divide-gray-100">
                      {addons.map((addon) => (
                        <li
                          key={addon.additions_id}
                          className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                            addon.additions_id.toString() === selectedAddon ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => {
                            setSelectedAddon(addon.additions_id.toString());
                            setIsDropdownOpenAddon(false);
                          }}
                        >
                          <div className="relative w-12 h-12 border rounded-md overflow-hidden flex-shrink-0">
                            {addon.additions_image ? (
                              <Image 
                                src={addon.additions_image} 
                                alt={addon.additions_title} 
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{addon.additions_title}</p>
                            <p className="text-xs text-gray-500">{addon.additions_desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Call-to-action buttons with professional styling */}
            <div className="flex flex-col sm:flex-row gap-3 border-t border-gray-100">
              <Button
                className="bg-[#143761] hover:bg-[#0e2d4e] font-medium text-white text-sm sm:text-base py-3 px-6 rounded-md w-full sm:w-auto transition-colors shadow-sm"
                onClick={() => router.push('/packaging-type')}
              >
                Customize kit
              </Button>
              
              <Button
                className={`py-3 px-6 font-medium text-sm sm:text-base rounded-md w-full sm:w-auto shadow-sm ${isAddToCartDisabled 
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 text-white transition-colors"}`}
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Recommended Products section */}
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#143761] mb-4 sm:mb-6">Recommended Products</h2>
          <Recomended_product />
        </div>
      </div>
    </div>
  );
}