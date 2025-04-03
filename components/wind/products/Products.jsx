"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import ProductSkeleton from "@/components/ProductSkeleton";
import { setFilteredProducts } from '@/redux/features/filter/productFilterSlice';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Products() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // Adjust products per page based on screen size
  const [productsPerPage, setProductsPerPage] = useState(8);

  // Get filters from Redux store
  const filters = useSelector((state) => state.productFilter.filters);
  const filteredProducts = useSelector((state) => state.productFilter.filteredProducts);

  useEffect(() => {
    // Adjust products per page based on screen size
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) { // Mobile
        setProductsPerPage(4);
      } else if (width < 1024) { // Tablet
        setProductsPerPage(6);
      } else { // Desktop
        setProductsPerPage(8);
      }
    };

    // Set initial value and add listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Cleanup listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getPackagingType();
  }, []);

  useEffect(() => {
    updateDisplayedProducts();
  }, [productList, page, filters, productsPerPage]);

  const updateDisplayedProducts = () => {
    let productsToDisplay = [...productList];

    // Apply filters
    if (filters.packagingForm) {
      productsToDisplay = productsToDisplay.filter(
        product => product.name === filters.packagingForm
      );
    }

    if (filters.material) {
      // This would require additional data or API call to filter by material
      console.log("Would filter by material:", filters.material);
    }

    if (filters.size) {
      // This would require additional data or API call to filter by size
      console.log("Would filter by size:", filters.size);
    }

    if (filters.quantity) {
      // This would require additional data or API call to filter by quantity
      console.log("Would filter by quantity:", filters.quantity);
    }

    const endIndex = page * productsPerPage;
    const slicedProducts = productsToDisplay.slice(0, endIndex);
    
    setDisplayedProducts(slicedProducts);
    dispatch(setFilteredProducts(slicedProducts));
  };

  const loadMore = () => {
    setPage(page + 1);
  };
  
  const navigateToProductDetail = (productId) => {
    // Navigate to product detail page with the selected product ID
    router.push(`/products/${productId}`);
  };

  async function getPackagingType() {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/v1/resources/packaging-type`);
      if (response.status === 200) {
        const responseData = response.data.data.map((ele) => ({
          packaging_id: ele.packaging_id,
          icon: ele.packaging_image_icon_url,
          description: ele.description,
          name: ele.name,
          time: ele.delivery_time || "4-7 weeks",
          minimum_qty: ele.minimum_qty,
          price: ele.price ? `₹ ${ele.price}` : "₹ 0.930",
          packaging_image_url: ele.packaging_image_url,
          quantity: ele.minimum_qty,
        }));
        setProductList(responseData);
      }
    } catch (error) {
      console.error("Error fetching products:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {loading ? (
        // Responsive skeleton grid
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {Array(productsPerPage)
            .fill(0)
            .map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="text-center text-base sm:text-lg font-medium p-6 sm:p-12 bg-gray-50 rounded-lg">
          No products found matching your filters
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          {/* Responsive product grid */}
          <div className="w-full grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {displayedProducts.map((product, index) => (
              <div
                key={`product-${product.packaging_id}-${index}`}
                onClick={() => navigateToProductDetail(product.packaging_id)}
                className="group flex flex-col justify-between rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer bg-white h-full"
              >
                {/* Responsive image container */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
                  <Image
                    className="object-contain transition-transform duration-300 group-hover:scale-105 p-2"
                    src={product.packaging_image_url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNmM2YzZjMiLz48L3N2Zz4="
                  />
                </div>
                {/* Product details with responsive text */}
                <div className="flex flex-col gap-2 p-2 sm:p-3">
                  <div className="font-medium text-xs sm:text-sm md:text-base line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </div>
                  <div className="w-full flex items-center justify-between bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium text-[#143761] self-start">
                    <span className="text-gray-600">Min: </span>
                    <span className="text-gray-600">{product.minimum_qty} units </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Responsive Load More button */}
          {productList.length > displayedProducts.length && (
            <Button 
              onClick={loadMore} 
              color="primary" 
              className="mt-6 sm:mt-8 px-4 sm:px-6 py-1.5 sm:py-2 font-medium text-sm sm:text-base w-full sm:w-auto max-w-xs"
            >
              Load More
            </Button>
          )}
        </div>
      )}
    </div>
  );
}