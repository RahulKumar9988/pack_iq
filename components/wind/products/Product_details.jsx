"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ProductSkeleton from "@/components/ProductSkeleton";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (params.id) {
      getProductDetails(params.id);
    }
  }, [params.id]);

  async function getProductDetails(productId) {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/v1/resources/packaging-type/${productId}`);
      if (response.status === 200) {
        const productData = response.data.data;
        setProduct({
          packaging_id: productData.packaging_id,
          icon: productData.packaging_image_icon_url,
          description: productData.description,
          name: productData.name,
          time: "4-7 weeks",
          minimum_qty: productData.minimum_qty,
          price: "₹ 0.930",
          packaging_image_url: productData.packaging_image_url,
          quantity: productData.minimum_qty,
        });
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
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full flex flex-col gap-8">
          <ProductSkeleton height="lg" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <Button onClick={handleGoBack} color="primary">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button onClick={handleGoBack} color="primary" variant="light" className="mb-4">
        ← Back to Products
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.packaging_image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <div className="inline-block bg-gray-200 px-4 py-2 rounded-lg text-lg font-semibold text-[#143761]">
              {product.price}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description || "No description available."}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Minimum Quantity</h3>
              <p className="text-lg font-semibold">{product.minimum_qty}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Delivery Time</h3>
              <p className="text-lg font-semibold">{product.time}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Product ID</h3>
              <p className="text-lg font-semibold">{product.packaging_id}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 mt-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (Minimum: {product.minimum_qty})
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={product.minimum_qty}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <Button 
              color="primary" 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}