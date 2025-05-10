"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, clearCart } from "@/redux/features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Get this from environment variables
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Simplified decorative elements - reduced animations
// DecorativeElements component
const DecorativeElements = React.memo(({ position }) => (
  <div className={`absolute ${position} z-0 pointer-events-none`} />
));
DecorativeElements.displayName = 'DecorativeElements';

// CircleDecoration component
const CircleDecoration = React.memo(({ size, position, color }) => (
  <div 
    className={`absolute ${position} rounded-full bg-${color} opacity-20 z-0 pointer-events-none`}
    style={{ width: size, height: size }}
  />
));
CircleDecoration.displayName = 'CircleDecoration';

// BestSellingBadge component
const BestSellingBadge = React.memo(() => (
  <div className="absolute -top-2 -right-2 z-20">
    <img 
      src="/best-seller-icon.png" 
      alt="Best Seller" 
      className="w-20 h-20" 
      loading="lazy" 
    />
  </div>
));
BestSellingBadge.displayName = 'BestSellingBadge';


export default function PackagingType() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // Fetch data with optimized error handling
  const getPackagingType = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/packaging-type`
      );
      if (response.status === 200) {
        return response.data.data.map((ele) => ({
          packaging_id: ele.packaging_id,
          icon: ele.packaging_image_icon_url,
          description: ele.description,
          name: ele.name,
          minimum_qty: ele.minimum_qty,
          packaging_image_url: ele.packaging_image_url,
          quantity: ele.minimum_qty,
          addition_type: ele.addition_type,
        }));
      }
      return [];
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchAndSortData = async () => {
      setIsLoading(true);
      const data = await getPackagingType();
      
      // Sort data - standup pouch first, then alphabetical
      const standupPouch = data.find(item => 
        item.name.toLowerCase().includes("standup pouch")
      );
      const others = data.filter(item => 
        !item.name.toLowerCase().includes("standup pouch")
      ).sort((a, b) => a.name.localeCompare(b.name));
      
      setProductList(standupPouch ? [standupPouch, ...others] : others);
      setIsLoading(false);
    };
    
    fetchAndSortData();
    dispatch(clearCart());
  }, [getPackagingType, dispatch]);

  // Memoize handler function
  const handleSelectAndNavigate = useCallback((item) => {
    dispatch(
      addToCart({
        packaging_id: item.packaging_id,
        name: item.name,
        image: item.packaging_image_url,
        addition_type: item.addition_type,
      })
    );
    
    setSelectedCardId(item.packaging_id);
    
    const materialUrl = `/${item.name.toLowerCase().replace(/\s+/g, "-")}/material`;
    router.push(materialUrl);
    
    setTimeout(() => {
      setSelectedCardId(null);
    }, 800);
  }, [dispatch, router]);

  // Memoize truncation function
  const getTruncatedDescription = useCallback((description) => {
    return description.split(' ').slice(0, 50).join(' ') + '...';
  }, []);

  // Memoized loading skeleton
  const loadingSkeleton = useMemo(() => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-[72px]">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="h-[320px] sm:h-[394px] bg-gray-100 rounded-lg relative overflow-hidden">
          <div className="absolute top-3 left-3 w-16 h-16 rounded-full bg-gray-200"></div>
          <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="absolute bottom-14 left-4 w-24 h-4 bg-gray-200"></div>
          <div className="absolute bottom-8 left-4 w-20 h-4 bg-gray-200"></div>
        </div>
      ))}
    </div>
  ), []);

  if (isLoading) {
    return loadingSkeleton;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-[72px]">
      {productList.map((item, index) => {
        const isHovered = hoveredItem === index;
        const isSelected = selectedCardId === item.packaging_id;
        const truncatedDescription = getTruncatedDescription(item.description);
        const isStandupPouch = item.name.toLowerCase().includes("standup pouch");
        
        return (
          <div
            key={item.packaging_id || index}
            className="h-[320px] sm:h-[394px] relative"
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {isStandupPouch && <BestSellingBadge />}
            
            {/* Simplified decorative elements */}
            <DecorativeElements position="top-3 right-3" />
            <CircleDecoration size="70px" position="top-1 right-1" color="pink-200" />
            
            <motion.div
              whileHover={{ translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="h-full cursor-pointer"
              onClick={() => handleSelectAndNavigate(item, index)}
            >
              <Card
                className={`bg-gradient-to-br from-white to-blue-50 border ${isSelected ? 'border-[#E45971]' : 'border-gray-200'} p-3 sm:p-4 h-full w-full overflow-y-auto relative`}
                isPressable
              >
                <CardBody className="flex flex-col items-center justify-between p-4">
                  {/* Optimized Image loading */}
                  <div className="overflow-hidden flex-1 flex items-center justify-center w-full relative mb-4">
                    <Image
                      src={item.packaging_image_url}
                      className="object-cover"
                      alt={item.name}
                      width={260}
                      height={260}
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Text content */}
                  <div className="w-full text-center">
                    <h3 className="text-xl font-semibold mb-1 line-clamp-1">{item.name}</h3>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
            
            {/* Description Overlay - shown on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 backdrop-blur-lg bg-[#e4f1ff]/90 z-10 p-4 sm:p-6 flex flex-col justify-between rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleSelectAndNavigate(item, index)}
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E45971]/10 rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/30 rounded-full"></div>
                  
                  <div className="h-full flex flex-col justify-between relative z-10">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <h3 className="text-lg sm:text-xl font-bold text-[#253670]">{item.name}</h3>
                      <p
                        className="text-gray-600 text-sm sm:text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: truncatedDescription }}
                      ></p>
                    </div>
                    
                    <div onClick={() => handleSelectAndNavigate(item, index)} className="flex justify-between items-center mt-3 sm:mt-4">
                      <Image
                        src={item.packaging_image_url}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="object-contain sm:block"
                        loading="lazy"
                        
                      />
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectAndNavigate(item, index);
                        }}
                      >
                        <Button
                          className="bg-[#253670] text-white px-4 sm:px-6 py-2 rounded-full sm:w-auto"
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
    </div>
  );
}