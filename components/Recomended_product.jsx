"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardBody, Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowRight, LuSparkles } from "react-icons/lu";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Decorative elements component
const DecorativeElements = ({ position }) => {
  return (
    <div className={`absolute ${position} z-0 pointer-events-none`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{ 
          scale: [0.8, 1, 0.8],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <LuSparkles className="text-[#E45971] opacity-60" size={16} />
      </motion.div>
    </div>
  );
};

// Circle background decoration
const CircleDecoration = ({ size, position, color, delay }) => {
  return (
    <motion.div 
      className={`absolute ${position} rounded-full bg-${color} opacity-30 z-0 pointer-events-none`}
      style={{ width: size, height: size }}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ 
        scale: [0.6, 1, 0.6],
        opacity: [0, 0.3, 0]
      }}
      transition={{ 
        duration: 4,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export default function RecommendedProducts() {
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const productsPerPage = 4;

  useEffect(() => {
    getPackagingType();
  }, []);

  const navigateToProductDetail = (productId) => {
    router.push(`/products/${productId}`);
  };

  // Create a truncated description for cards
  const getTruncatedDescription = useCallback((description) => {
    return description.split(' ').slice(0, 15).join(' ') + '...';
  }, []);

  async function getPackagingType() {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/v1/resources/packaging-type`);
      if (response.status === 200) {
        let responseData = response.data.data;
        
        // Find standup pouch and move it to the first position
        const standupPouchIndex = responseData.findIndex(
          (item) => item.name.toLowerCase().includes("standup pouch") || 
                   item.name.toLowerCase().includes("stand up pouch") ||
                   item.name.toLowerCase().includes("stand-up pouch")
        );
        
        if (standupPouchIndex !== -1) {
          // Remove standup pouch from its current position
          const standupPouch = responseData[standupPouchIndex];
          responseData.splice(standupPouchIndex, 1);
          // Add it to the beginning of the array
          responseData = [standupPouch, ...responseData];
        }
        
        // Take only the first 'productsPerPage' items
        const displayedProducts = responseData.slice(0, productsPerPage).map((ele) => ({
          packaging_id: ele.packaging_id,
          icon: ele.packaging_image_icon_url,
          description: ele.description,
          name: ele.name,
          minimum_qty: ele.minimum_qty,
          packaging_image_url: ele.packaging_image_url,
          quantity: ele.minimum_qty,
        }));
        
        setProductList(displayedProducts);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  }

  const BestSellingBadge = () => {
    return (
      <motion.div
        className="absolute -top-2 -right-2 z-20"
      >
        <img src="/best-seller-icon.png" alt="Best Seller" className="w-20 h-20" />
      </motion.div>
    );
  };


  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      {loading ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {Array(productsPerPage)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="h-96 animate-pulse bg-gray-100 rounded-lg relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="absolute bottom-6 left-0 right-0 mx-auto w-32 h-4 bg-gray-200 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 right-0 mx-auto w-24 h-4 bg-gray-200 animate-pulse mb-6"></div>
              </div>
            ))}
        </div>
      ) : productList.length === 0 ? (
        <div className="text-center py-8 sm:py-12 text-gray-500 text-sm sm:text-base">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {productList.map((product, index) => {
            const isHovered = hoveredItem === index;
            const truncatedDescription = getTruncatedDescription(product.description);
            const isStandupPouch = product.name.toLowerCase().includes("standup pouch");
            
            return (
              <div
                key={product.packaging_id || index}
                className="h-96 relative cursor-pointer"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => navigateToProductDetail(product.packaging_id)}
              >
                {isStandupPouch && <BestSellingBadge />}

                {/* Decorative elements */}
                <DecorativeElements position="top-3 right-3" />
                <DecorativeElements position="bottom-6 left-8" />
                <CircleDecoration size="70px" position="top-1 right-1" color="pink-200" delay={0} />
                <CircleDecoration size="40px" position="bottom-4 left-4" color="blue-200" delay={1.5} />
                
                <motion.div
                  whileHover={{ translateY: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="h-full"
                >
                  <Card
                    shadow="sm"
                    className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 h-full w-full relative overflow-visible"
                    isPressable
                  >
                    <CardBody className="flex flex-col items-center justify-between p-4">
                      {/* Image centered and emphasized */}
                      <div className="flex-1 flex items-center justify-center w-full relative mb-4">
                        <motion.div
                          animate={{ 
                            boxShadow: isHovered ? "0 8px 32px rgba(228, 89, 113, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0)" 
                          }}
                          transition={{ duration: 0.3 }}
                          className=" relative"
                        >
                          <Image
                            src={product.packaging_image_url}
                            className="object-contain"
                            alt={product.name}
                            width={120}
                            height={120}
                            priority={index < 2}
                            loading={index < 2 ? "eager" : "lazy"}
                          />
                        </motion.div>
                      </div>

                      {/* Text content at bottom */}
                      <div className="w-full text-center">
                        <h3 className="text-base font-semibold mb-1 line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{truncatedDescription}</p>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                          <span>Min Qty: </span>
                          <span className="font-medium">{product.quantity}</span>
                        </div>
                      </div>
                      
                      {/* Always visible detail button with hover effect */}
                      <div className="absolute bottom-3 right-3 z-10">
                        <Button
                          isIconOnly
                          className={`${isHovered ? 'bg-[#E45971]' : 'bg-gray-300'} text-white shadow-md hover:bg-[#d34663] transition-colors duration-200`}
                          size="sm"
                          radius="full"
                        >
                          <LuArrowRight size={16} />
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
                
                {/* Full Description Overlay - Only render when hovered */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 backdrop-blur-lg bg-[#e4f1ff]/90 z-10 flex flex-col justify-between rounded-lg overflow-hidden"
                    >
                      {/* Decorative circles in the overlay */}
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E45971]/10 rounded-full"></div>
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/30 rounded-full"></div>
                      
                      <div className="h-full flex flex-col p-6 relative z-10">
                        {/* Larger image at the top */}
                        <div className="flex-1 flex justify-center items-center mb-4">
                          <Image
                            src={product.packaging_image_url}
                            alt={product.name}
                            width={140}
                            height={140}
                            className="object-contain"
                          />
                        </div>
                        
                        {/* Content at the bottom */}
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-[#253670] text-center">{product.name}</h3>
                          <p className="text-sm text-gray-700 line-clamp-3">{product.description}</p>
                          
                          <div className="flex justify-between items-center text-sm mt-2">
                            <span className="font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full text-xs">
                              {product.time}
                            </span>
                            <span className="font-medium text-purple-600">{product.price}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Global animation styles */}
      <style jsx global>{`
        @keyframes ping-once {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-ping-once {
          animation: ping-once 0.8s cubic-bezier(0, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}