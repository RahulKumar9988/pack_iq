"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ProductSkeleton from "@/components/ProductSkeleton";
import Products from "@/components/wind/products/Products";
import Recomended_product from "@/components/Recomended_product";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (params.id) {
      getProductDetails();
    }
  }, [params.id]);

  async function getProductDetails() {
    setLoading(true);
    try {
      // Get the full list of products
      const response = await axios.get(`${baseUrl}/api/v1/resources/packaging-type`);
      if (response.status === 200) {
        // Find the specific product by ID
        const productData = response.data.data.find(item => 
          item.packaging_id.toString() === params.id
        );
        
        if (productData) {
          // Create thumbnail images - in a real scenario, you'd get these from the API
          const thumbnails = [
            productData.packaging_image_url,
            productData.packaging_image_icon_url || productData.packaging_image_url,
            productData.packaging_image_url,
          ];
          
          setProduct({
            packaging_id: productData.packaging_id,
            icon: productData.packaging_image_icon_url,
            description: productData.description || "Our flat bottom pouches are particularly durable and resistant. Because of the integrated panel valve, these pouches are the best for coffee products.",
            name: productData.name,
            time: productData.delivery_time || "4-7 weeks",
            minimum_qty: productData.minimum_qty || 500,
            price: productData.price ? 
              `₹${productData.price} - ₹${(parseFloat(productData.price) + 0.1).toFixed(3)}/Pieces` : 
              "₹0.479 - ₹0.930/Pieces",
            packaging_image_url: productData.packaging_image_url,
            thumbnails: thumbnails,
            priceRange: "₹0.930 /per unit",
            priceRangeAlt: "₹0.930 /per unit",
          });
        }
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  }
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= (product?.minimum_qty || 1)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log(`Adding ${quantity} of ${product.name} to cart`);
    router.push('/packaging-type');
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleCustomize = () => {
    router.push('/packaging-type')
    console.log("Customize now clicked");
    // Implement customize functionality
  };

  if (loading) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="w-full flex flex-col gap-4 sm:gap-8">
          <ProductSkeleton height="lg" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Product Not Found</h1>
          <Button onClick={handleGoBack} color="primary">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left column - Image gallery */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Thumbnails section - stacked vertically on mobile, horizontally on small devices, vertically on medium+ */}
          <div className="flex flex-row sm:flex-col md:flex-col gap-2 sm:gap-3 order-2 sm:order-1 justify-center sm:justify-start overflow-x-auto sm:overflow-visible">
            {product.thumbnails.map((thumbnail, index) => (
              <div 
                key={index} 
                className={`min-w-16 w-16 h-16 sm:w-20 sm:h-20 border cursor-pointer ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={() => handleImageClick(index)}
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={thumbnail} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Main image */}
          <div className="relative w-full h-48 xs:h-64 sm:h-72 md:h-80 lg:h-96 order-1 sm:order-2 mb-2 sm:mb-0">
            <Image 
              src={product.thumbnails[selectedImage]} 
              alt={product.name} 
              fill 
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
        
        {/* Right column - Product details */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Product name with dropdown indicator */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-medium text-gray-800">{product.name}</h1>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-500"
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Product description */}
          <p className="text-gray-600 text-sm">
            {product.description}
          </p>
          
          {/* Promotional price */}
          <div className="mt-1 sm:mt-2">
            <p className="text-xs sm:text-sm text-gray-500">Promotional Price</p>
            <p className="text-base sm:text-lg font-medium">{product.price}</p>
          </div>
          
          {/* Production time */}
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Production</p>
            <p className="text-base sm:text-lg font-medium">{product.time}</p>
          </div>
          
          {/* Minimum quantity */}
          <div className="flex items-center justify-between sm:justify-start sm:gap-16 mt-2 sm:mt-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Minimum Quantity:</p>
              <p className="text-sm sm:text-base font-medium">{product.minimum_qty}</p>
            </div>
          </div>
          
          {/* Price range */}
          <div className="mt-1 sm:mt-2">
            <p className="text-xs sm:text-sm text-gray-500">Price Range:</p>
            <p className="text-sm sm:text-base font-medium">{product.priceRange}</p>
          </div>
          
          {/* Price range alternate */}
          {/* <div>
            <p className="text-xs sm:text-sm text-gray-500">Price Range:</p>
            <p className="text-sm sm:text-base font-medium">{product.priceRangeAlt}</p>
          </div> */}
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4">
            <Button 
              className="w-full sm:flex-1 bg-white border border-blue-500 text-blue-500 rounded-md text-sm sm:text-base py-2"
              onClick={handleCustomize}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 sm:mr-2"
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
              </svg>
              Customize now
            </Button>
            
            <Button 
              className="w-full sm:flex-1 bg-blue-500 text-white rounded-md text-sm sm:text-base py-2"
              onClick={handleAddToCart}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 sm:mr-2"
              >
                <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z" fill="currentColor"/>
              </svg>
              Add to cart
            </Button>
          </div>
        </div>
      </div>  

      <div className="w-full text-left mb-2 md:mb-4 mt-20 text-[#143761]">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-medium">
          Recomendations..
        </h1>
      </div>
      <Recomended_product/>
    </div>
  );
}