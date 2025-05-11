"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import ProductSkeleton from "@/components/ProductSkeleton";
import { setFilteredProducts } from '@/redux/features/filter/productFilterSlice';
import { motion } from "framer-motion";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Products() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(null);
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

    // Sort the products to show standup pouches first
    productsToDisplay = sortProductsWithStandupPouchesFirst(productsToDisplay);

    const endIndex = page * productsPerPage;
    const slicedProducts = productsToDisplay.slice(0, endIndex);
    
    setDisplayedProducts(slicedProducts);
    dispatch(setFilteredProducts(slicedProducts));
  };

  // New function to sort products with standup pouches first
  const sortProductsWithStandupPouchesFirst = (products) => {
    return [...products].sort((a, b) => {
      // Check if product is a standup pouch using name (case insensitive)
      const isAStandupPouch = a.name.toLowerCase().includes('standup') || a.name.toLowerCase().includes('stand up') || a.name.toLowerCase().includes('stand-up');
      const isBStandupPouch = b.name.toLowerCase().includes('standup') || b.name.toLowerCase().includes('stand up') || b.name.toLowerCase().includes('stand-up');
      
      if (isAStandupPouch && !isBStandupPouch) return -1;
      if (!isAStandupPouch && isBStandupPouch) return 1;
      return 0;
    });
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
        
        // Sort immediately after getting data to ensure standup pouches appear first in initial load
        const sortedData = sortProductsWithStandupPouchesFirst(responseData);
        setProductList(sortedData);
      }
    } catch (error) {
      console.error("Error fetching products:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  }

  // Animation variants for product cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const BestSellingBadge = () => {
    return (
      <div className="absolute top-2 -right-2 z-40 pointer-events-none">
        <img src="/best-seller-icon.png" alt="Best Seller" className="w-20 h-20" />
      </div>
    );
  };

  // Function to highlight standup pouches with a special badge
  const renderProductCard = (product, index) => {
    const isStandupPouch = product.name.toLowerCase().includes("standup pouch");
    return (
      <motion.div
        key={`product-${product.packaging_id}-${index}`}
        variants={cardVariants}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.2 }
        }}
        onClick={() => navigateToProductDetail(product.packaging_id)}
        onMouseEnter={() => setIsHovering(index)}
        onMouseLeave={() => setIsHovering(null)}
        className="flex flex-col justify-between rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full relative"
      >
        {/* Badge for standup pouches */}
        {isStandupPouch && <BestSellingBadge />}
        
        {/* Responsive image container with hover effects */}
        <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
          <motion.div
            animate={{ 
              scale: isHovering === index ? 1.08 : 1
            }}
            transition={{ duration: 0.3 }}
            className="w-full h-full relative"
          >
            <Image
              className="object-contain p-4"
              src={product.packaging_image_url}
              alt={product.name}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNmM2YzZjMiLz48L3N2Zz4="
            />
          </motion.div>
        </div>

        {/* Product details with better spacing and animations */}
        <div className="flex flex-col gap-2 p-4 border-1">
          <div className="font-medium text-sm sm:text-base text-gray-800 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </div>
          
          {/* <div className="mt-1 flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-xs sm:text-sm">
            <span className="text-gray-600 font-medium">Min Order:</span>
            <span className="text-blue-600 font-bold">{product.minimum_qty} units</span>
          </div> */}
          
          {/* Animated button on hover */}
          <motion.button
            // whileHover={{ scale: 1.03 }}
            // whileTap={{ scale: 0.97 }}
            className={`mt-2 w-full py-2 text-sm font-bold text-white 'bg-gradient-to-r bg-gradient-to-r from-[#0b2949] to-indigo-800 rounded-md transition-colors`}
          >
            View Details
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 w-full max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        {/* You can add a heading or title here if needed */}
      </motion.div>

      {loading ? (
        // Responsive skeleton grid with animation
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        >
          {Array(productsPerPage)
            .fill(0)
            .map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductSkeleton />
              </motion.div>
            ))}
        </motion.div>
      ) : displayedProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-base sm:text-lg font-medium p-8 sm:p-12 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p>No products found matching your filters</p>
            <Button 
              color="primary" 
              size="sm"
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              Reset Filters
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center w-full">
          {/* Responsive product grid with animations */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          >
            {displayedProducts.map((product, index) => renderProductCard(product, index))}
          </motion.div>

          {/* Enhanced Load More button with animation */}
          {productList.length > displayedProducts.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 w-full flex justify-center"
            >
              <Button 
                onClick={loadMore} 
                color="primary"
                size="lg"
                className="px-8 py-2 font-medium bg-gradient-to-r from-blue-600 to-blue-500 shadow-md hover:shadow-lg transition-all duration-300 min-w-[200px]"
              >
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 2,
                    repeatDelay: 1
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  Load More
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </motion.span>
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}