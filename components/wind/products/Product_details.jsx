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
    <div className="w-full bg-white mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Main content container with responsive max width */}
      <div className=" mx-auto">
        {/* Product grid with improved responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Image Gallery - Enhanced for better user experience */}
          <div className="flex flex-col gap-4 h-full">
            {/* Main product image with zoom effect on hover */}
            <div className="relative w-full h-64 sm:h-80 md:h-full lg:h-[450px] rounded-lg overflow-hidden shadow-sm group">
              <Image 
                src={product.thumbnails[selectedImage]} 
                alt={product.name} 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                className="object-contain"
                priority
              />
              
              {/* Navigation arrows for desktop */}
              <div className="hidden sm:flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4">
                <button 
                  onClick={() => setSelectedImage(prev => prev === 0 ? product.thumbnails.length - 1 : prev - 1)}
                  className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button 
                  onClick={() => setSelectedImage(prev => prev === product.thumbnails.length - 1 ? 0 : prev + 1)}
                  className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
              
              {/* Image counter indicator */}
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {selectedImage + 1}/{product.thumbnails.length}
              </div>
            </div>
            
            {/* Thumbnails row - with scroll indicators and active state */}
            <div className="relative">
              {/* Scroll indicators for mobile */}
              <div className="sm:hidden flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
                <div className="bg-gradient-to-r from-white to-transparent w-6 h-16 z-10"></div>
                <div className="bg-gradient-to-l from-white to-transparent w-6 h-16 z-10"></div>
              </div>
              
              <div className=" justify-center h-28 mt-0 md:mt-10 flex flex-row gap-2 overflow-x-auto pb-2 px-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scroll-smooth">
                {product.thumbnails.map((thumbnail, index) => (
                  <div 
                    key={index} 
                    className={`min-w-16 w-16 h-16 sm:w-20 sm:h-20 border rounded cursor-pointer flex-shrink-0 snap-center transition-all duration-200 hover:opacity-90 ${
                      selectedImage === index 
                        ? 'border-blue-500 border-2 shadow-md scale-105' 
                        : 'border-gray-200 opacity-80'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={thumbnail} 
                        alt={`Thumbnail ${index + 1}`} 
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Form - With better spacing and responsive padding */}
          <div className="flex flex-col gap-4 sm:gap-6 px-1 sm:px-4 lg:px-8 border-1 md:p-10 p-0 shadow-md rounded-lg">
            <h1 className="text-xl sm:text-2xl font-bold text-[#143761]">{product.name}</h1>
            <p>{product.description}</p>
            
            <div className="space-y-3 sm:space-y-4">
              {/* Material Select */}
              <div className="flex flex-col gap-1 sm:gap-2 relative">
                <label className="font-medium text-sm sm:text-base">Select Material</label>

                {/* Dropdown button */}
                <button 
                  className="p-2 border rounded-md w-full text-sm sm:text-base flex items-center gap-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
                  type="button" // Prevent form submission if inside a form
                >
                  {selectedMaterial ? (
                    <>
                      {/* <img src={selectedMaterial.material_image_url} alt="" className="h-6 w-6" /> */}
                      {materials.find(m => m.material_id.toString() === selectedMaterial)?.name || selectedMaterial}
                    </>
                  ) : (
                    "Choose material"
                  )}
                </button>

                {/* Custom Dropdown List - only show when isDropdownOpen is true */}
                {isDropdownOpen && (
                  <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 max-h-60 overflow-y-auto z-10">
                    {materials.map((material) => (
                      <li
                        key={material.material_id}
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                           setSelectedMaterial(material.material_id.toString()); 
                          setIsDropdownOpen(false); // Close dropdown after selection
                        }}
                      >
                        <img src={material.material_image_url} alt="" className="h-8 w-8" />
                        {material.name} 
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* size Select */}
              <div className="flex flex-col gap-1 sm:gap-2 relative">
                <label className="font-medium text-sm sm:text-base">Choose Size</label>
                
                {/* Custom dropdown button */}
                <button
                  type="button"
                  className="p-2 border rounded-md w-full text-sm sm:text-base text-left flex items-center justify-between"
                  onClick={() => setIsDropdownOpenSize(!isDropdownOpenSize)}
                >
                  <span>
                    {currentSize 
                      ? `${getSizeName(currentSize)} (${getVolume(currentSize)})`
                      : "Select size"
                    }
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Tabular dropdown */}
                {isDropdownOpenSize && (
                  <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 z-10 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 py-2 text-left font-medium">Size</th>
                          <th className="px-2 py-2 text-left font-medium">Dimensions (WxHxD)</th>
                          <th className="px-2 py-2 text-left font-medium">Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizes.map((size) => (
                          <tr 
                            key={getSizeId(size)} 
                            className={`hover:bg-gray-100 cursor-pointer ${
                              getSizeId(size)?.toString() === selectedSize?.toString() ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => handleSizeSelection(getSizeId(size))}
                          >
                            <td className="px-2 py-2 border-t">
                              <div className="flex items-center">
                                <div className={`w-8 h-8 flex items-center justify-center border rounded-md mr-2 ${
                                  getSizeName(size) === 'XXS' ? 'text-base' :
                                  getSizeName(size) === 'XS' ? 'text-base' :
                                  getSizeName(size) === 'S' ? 'text-base' :
                                  getSizeName(size) === 'M' ? 'text-base' :
                                  getSizeName(size) === 'L' ? 'text-base' :
                                  getSizeName(size) === 'XL' ? 'text-base' : 'text-base'
                                }`}>
                                  {getSizeName(size)}
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-2 border-t">{getDimensions(size)}</td>
                            <td className="px-2 py-2 border-t">{getVolume(size)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {/* Show dimensions for selected size below dropdown when closed */}
                {selectedSize && !isDropdownOpen && currentSize && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    {getDimensions(currentSize)} - {getVolume(currentSize)}
                  </p>
                )}
              </div>

              {/* Quantity Select - Tabular Format */}
              <div className="flex flex-col gap-1 sm:gap-2 relative">
                <label className="font-medium text-sm sm:text-base">Set Quantity</label>
                
                {!selectedSize ? (
                  <p className="text-xs sm:text-sm text-gray-500">Please select a size first</p>
                ) : quantities.length === 0 ? (
                  <p className="text-xs sm:text-sm text-gray-500">No quantities available for this size</p>
                ) : (
                  <>
                    {/* Custom dropdown button */}
                    <button
                      type="button"
                      className="p-2 border rounded-md w-full text-sm sm:text-base text-left flex items-center justify-between"
                      onClick={() => setIsDropdownOpenQuantity(!isDropdownOpenQuantity)}
                    >
                      <span>
                        {selectedQuantity 
                          ? `${quantities.find(q => q.quantity_id.toString() === selectedQuantity)?.quantity} units`
                          : "Select quantity"
                        }
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Tabular dropdown with fixed height and scrolling */}
                    {isDropdownOpenQuantity && (
                      <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 z-10">
                        <div className="max-h-60 overflow-y-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 sticky top-0 z-10">
                              <tr>
                                <th className="px-3 py-2 text-left font-medium">Quantity</th>
                                <th className="px-3 py-2 text-left font-medium">Discount</th>
                                <th className="px-3 py-2 text-left font-medium">Price per unit</th>
                                <th className="px-3 py-2 text-left font-medium">Possible designs</th>
                                <th className="px-3 py-2 text-left font-medium">Total price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {quantities.map((qty) => (
                                <tr 
                                  key={qty.quantity_id} 
                                  className={`hover:bg-gray-100 cursor-pointer ${
                                    qty.quantity_id.toString() === selectedQuantity ? 'bg-blue-50' : ''
                                  }`}
                                  onClick={() => {
                                    setSelectedQuantity(qty.quantity_id.toString());
                                    setIsDropdownOpenQuantity(false); // Close dropdown after selection
                                  }}
                                >
                                  <td className="px-3 py-2 border-t">{qty.quantity} units</td>
                                  <td className="px-3 py-2 border-t">
                                    {parseInt(qty.discount) > 0 ? (
                                      <span className="px-2 py-0.5 bg-[#1CC6181A] text-xs text-[#1CC618] rounded-full whitespace-nowrap">
                                        {qty.discount}% off
                                      </span>
                                    ) : (
                                      <span className="text-xs text-[#03172B80]">-</span>
                                    )}
                                  </td>
                                  <td className="px-3 py-2 border-t">₹{Number(qty.price).toFixed(2)}</td>
                                  <td className="px-3 py-2 border-t">{qty.design_number || 1}</td>
                                  <td className="px-3 py-2 border-t font-medium">
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
                      <p className="text-xs sm:text-sm text-gray-500">
                        {quantities.find(q => q.quantity_id.toString() === selectedQuantity)?.quantity} units - 
                        ₹{(Number(quantities.find(q => q.quantity_id.toString() === selectedQuantity)?.price) * 
                          Number(quantities.find(q => q.quantity_id.toString() === selectedQuantity)?.quantity)).toFixed(2)}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Addons Select with Images */}
              <div className="flex flex-col gap-1 sm:gap-2 relative">
                <label className="font-medium text-sm sm:text-base">Add-Ons (optional)</label>
                
                {/* Custom dropdown button */}
                <button
                  type="button"
                  className="p-2 border rounded-md w-full text-sm sm:text-base text-left flex items-center justify-between"
                  onClick={() => setIsDropdownOpenAddon(!isDropdownOpenAddon)}
                >
                  <span>
                    {selectedAddon 
                      ? addons.find(a => a.additions_id.toString() === selectedAddon)?.additions_title
                      : "Select add-on"
                    }
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown with images */}
                {isDropdownOpenAddon && (
                  <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 max-h-60 overflow-y-auto z-10">
                    <li
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedAddon("");
                        setIsDropdownOpenAddon(false);
                      }}
                    >
                    </li>
                    {addons.map((addon) => (
                      <li
                        key={addon.additions_id}
                        className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 ${
                          addon.additions_id.toString() === selectedAddon ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => {
                          setSelectedAddon(addon.additions_id.toString());
                          setIsDropdownOpenAddon(false);
                        }}
                      >
                        <div className="relative w-10 h-10 border rounded overflow-hidden">
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
                          
                          <p>{addon.additions_title}</p>
                          <p className="text-xs">{addon.additions_desc}</p>
                          
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            {/* Responsive button layout that stacks on very small screens */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
              <Button
                className="bg-[#143761] font-medium text-white text-sm sm:text-base py-2 px-4 rounded w-full sm:w-auto"
                onClick={()=>router.push('/packaging-type')}
              >
                Customize kit
              </Button>
              
              <Button
                className={`py-2 px-4 font-medium text-sm sm:text-base rounded w-full sm:w-auto ${isAddToCartDisabled 
                  ? "bg-gray-300 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Recommended Products section */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-[#143761] mb-4 sm:mb-6">Recommended Products</h2>
          <Recomended_product />
        </div>
      </div>
    </div>
  );
}