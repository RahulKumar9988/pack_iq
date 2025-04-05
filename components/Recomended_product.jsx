"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductSkeleton from "@/components/ProductSkeleton";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function RecommendedProducts() {
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 4;

  useEffect(() => {
    getPackagingType();
  }, []);

  const navigateToProductDetail = (productId) => {
    router.push(`/products/${productId}`);
  };

  async function getPackagingType() {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/v1/resources/packaging-type`);
      if (response.status === 200) {
        const responseData = response.data.data.slice(0, productsPerPage).map((ele) => ({
          packaging_id: ele.packaging_id,
          icon: ele.packaging_image_icon_url,
          description: ele.description,
          name: ele.name,
          time: "4-7 weeks",
          minimum_qty: ele.minimum_qty,
          price: "₹ 0.930",
          packaging_image_url: ele.packaging_image_url,
          quantity: ele.minimum_qty,
        }));
        setProductList(responseData);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      {loading ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {Array(productsPerPage)
            .fill(0)
            .map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
      ) : productList.length === 0 ? (
        <div className="text-center py-8 sm:py-12 text-gray-500 text-sm sm:text-base">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {productList.map((product, index) => (
            <div
              key={index}
              onClick={() => navigateToProductDetail(product.packaging_id)}
              className="group flex flex-col bg-white rounded-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer border border-indigo-100"
            >
              <div className="relative w-full aspect-square bg-gray-50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-30" />
                <Image
                  className="object-contain p-2 sm:p-4"
                  src={product.packaging_image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 2}
                />
              </div>
              
              <div className="p-3 sm:p-4 flex flex-col gap-1 sm:gap-2 flex-grow">
                <h3 className="font-medium text-xs sm:text-sm text-indigo-900 line-clamp-1">
                  {product.name}
                </h3>
                
                <p className="text-xs text-gray-500 line-clamp-2 min-h-[2.5rem]">
                  {(product.description).split(' ').slice(0, 10).join(' ') + '...'}
                </p>
                
                <div className="mt-auto pt-1 sm:pt-2 flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-medium rounded-full bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1">
                    Min: {product.minimum_qty}
                  </span>
                  <span className="text-[10px] sm:text-xs text-purple-600 font-medium">
                    {product.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}