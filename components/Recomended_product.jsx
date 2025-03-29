"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductSkeleton from "@/components/ProductSkeleton";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Recomended_product() {
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 4; // Changed to 4 products

  useEffect(() => {
    getPackagingType();
  }, []);

  // Navigate to product detail page
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
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 py-8 flex flex-col items-center gap-4 md:gap-8 lg:gap-12">
      {loading ? (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {Array(productsPerPage)
            .fill(0)
            .map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
      ) : productList.length === 0 ? (
        <div className="text-center text-lg font-medium">No products found</div>
      ):(
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {productList.map((ele, i) => (
                      <div
                        key={i}
                        onClick={() => navigateToProductDetail(ele.packaging_id)}
                        className="group flex flex-col justify-between rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                      >
                        <div className="relative w-full aspect-square overflow-hidden">
                          <Image
                            className="object-contain transition-transform duration-300"
                            src={ele.packaging_image_url}
                            alt={ele.name}
                            fill
                            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          />
                        </div>
                        <div className="flex flex-col gap-2 p-3">
                          <div className="font-medium text-sm sm:text-base line-clamp-2">{ele.name}</div>
                          <div className="flex items-center justify-center bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-semibold text-[#143761] self-start">
                            {ele.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
      )}
    </div>
  );
}