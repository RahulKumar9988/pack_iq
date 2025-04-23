"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, clearCart } from "@/redux/features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

// Get this from environment variables
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
        {/* <LuSparkles className="text-[#E45971] opacity-60" size={16} /> */}
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

export default function PackagingType() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state?.cart?.item);

  // Memoize the API call function
  const getPackagingType = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/packaging-type`
      );
      if (response.status === 200) {
        const responseData = response.data.data.map((ele) => ({
          packaging_id: ele.packaging_id,
          icon: ele.packaging_image_icon_url,
          description: ele.description,
          name: ele.name,
          time: "4-7 weeks",
          minimum_qty: ele.minimum_qty,
          packaging_image_url: ele.packaging_image_url,
          quantity: ele.minimum_qty,
        }));
        setProductList(responseData);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPackagingType();
    dispatch(clearCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPackagingType]);

  // Handle card click
  const handleCardClick = useCallback((item, index) => {
    dispatch(
      addToCart({
        packaging_id: item.packaging_id,
        name: item.name,
        image: item.packaging_image_url,
      })
    );
    setSelectedCardId(item.packaging_id);
    
    // Reset the selection after animation completes
    setTimeout(() => {
      setSelectedCardId(null);
    }, 800);
  }, [dispatch]);

  // Create a truncated description for cards
  const getTruncatedDescription = useCallback((description) => {
    return description.split(' ').slice(0, 20).join(' ') + '...';
  }, []);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-[72px]">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="h-[320px] sm:h-[394px] animate-pulse bg-gray-100 rounded-lg relative overflow-hidden">
            <div className="absolute top-3 left-3 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="absolute top-3 right-3 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="absolute bottom-14 left-4 w-24 sm:w-32 h-4 bg-gray-200 animate-pulse"></div>
            <div className="absolute bottom-8 left-4 w-20 sm:w-24 h-4 bg-gray-200 animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-[72px] scrollbar-hide">
      {productList.map((item, index) => {
        const isHovered = hoveredItem === index;
        const isSelected = selectedCardId === item.packaging_id;
        const truncatedDescription = getTruncatedDescription(item.description);
        
        return (
          <div
            key={item.packaging_id || index}
            className="h-[320px] sm:h-[394px] relative group"
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
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
                className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 p-3 sm:p-4 h-full w-full scrollbar-hide overflow-y-auto relative"
                isPressable
              >
                <CardBody className="p-0">
                  <div className="h-full flex flex-col gap-3 sm:gap-5 items-center sm:items-start sm:justify-around pt-2 relative">
                    <div className="relative w-24 sm:w-auto flex-shrink-0">
                      <motion.div
                        animate={{ 
                          boxShadow: isHovered ? "0 8px 32px rgba(228, 89, 113, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.1)" 
                        }}
                        transition={{ duration: 0.3 }}
                        className="rounded-full bg-white p-2 border border-gray-100"
                      >
                        <Image
                          src={item.packaging_image_url}
                          className="object-contain"
                          alt={item.name}
                          width={100}
                          height={100}
                          priority={index < 4}
                          loading={index < 4 ? "eager" : "lazy"}
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isHovered ? 1 : 0 }}
                        className="absolute -top-2 -right-2 bg-[#E45971] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10"
                      >
                        
                      </motion.div>
                    </div>

                    <div className="flex flex-col gap-2 sm:gap-3 justify-around text-center sm:text-left flex-1">
                      <div className="text-base sm:text-xl font-semibold">
                        {item.name}
                      </div>
                      <span className="text-xs sm:text-sm line-clamp-3 text-gray-600">
                        {truncatedDescription}
                      </span>
                      
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-500 mt-1">
                        <span>Min Qty: </span>
                        <span className="font-medium">{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  
                  
                </CardBody>
              </Card>
            </motion.div>
            
            {/* Full Description Overlay - Show on hover on desktop, and on tap on mobile */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 backdrop-blur-lg bg-[#e4f1ff]/90 z-10 p-4 sm:p-6 flex flex-col justify-between rounded-lg overflow-hidden"
                >
                  {/* Decorative circles in the overlay */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E45971]/10 rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/30 rounded-full"></div>
                  
                  <div className="h-full flex flex-col justify-between relative z-10">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <h3 className="text-lg sm:text-xl font-bold text-[#253670]">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-700 overflow-y-auto max-h-32 sm:max-h-48">{item.description}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 sm:mt-4">
                      <Image
                        src={item.packaging_image_url}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-contain sm:block"
                      />
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          as="a"
                          href={`/${item.name.toLowerCase().replace(/\s+/g, "-")}/material`}
                          onClick={() => handleCardClick(item, index)}
                          className="bg-[#253670] text-white px-4 sm:px-6 py-2 rounded-full w-full sm:w-auto"
                        >
                          Select
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      
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