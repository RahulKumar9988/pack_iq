"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import axios from "axios";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, clearCart } from "@/redux/features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

// Load font outside component to prevent re-initialization
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Get this from environment variables
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function PackagingType() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

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
  const handleCardClick = useCallback((item) => {
    dispatch(
      addToCart({
        packaging_id: item.packaging_id,
        name: item.name,
        image: item.packaging_image_url,
      })
    );
  }, [dispatch]);

  // Create a truncated description for cards
  const getTruncatedDescription = useCallback((description) => {
    return description.split(' ').slice(0, 15).join(' ') + '...';
  }, []);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className={`grid max-sm:grid-cols-1 max-ml:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 gap-4 mb-[72px] ${poppins.className}`}>
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className=" h-[394px] animate-pulse bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid max-sm:grid-cols-1 scrollbar-hide max-ml:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 mb-[72px] gap-4 ${poppins.className}`}
    >
      {productList.map((item, index) => {
        const isHovered = hoveredItem === index;
        const truncatedDescription = getTruncatedDescription(item.description);
        
        return (
          <Link
            key={item.packaging_id || index}
            className="max-h-[394px] relative group"
            href={`/${item.name.toLowerCase().replace(/\s+/g, "-")}/material`}
            onClick={() => handleCardClick(item)}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Card
              shadow="sm"
              className="border-[#E45971] p-4 h-full w-full max-h-[394px] scrollbar-hide overflow-y-auto relative"
            >
              <CardBody className="p-0">
                <div className="h-full flex gap-5 justify-around items-start pt-2 mobile:items-center mobile:flex-col">
                  <Image
                    src={item.packaging_image_url}
                    className="object-contain"
                    alt={item.name}
                    width={100}
                    height={100}
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                  />

                  <div className="flex flex-col gap-5">
                    <div className="mobile:text-xl text-base font-semibold mobile:text-center">
                      {item.name}
                    </div>
                    <span className="mobile:text-center text-xs mobile:text-sm max-mobile:line-clamp-3">
                      {truncatedDescription}
                    </span>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="text-small p-0 flex-col justify-between border rounded-lg mt-5">
                <div className="flex justify-between w-full p-2">
                  <span className="text-sm font-normal">Minimum Quantity:</span>
                  <span className="font-medium">{item.quantity}</span>
                </div>
                <Divider />
              </CardFooter>

              {/* Full Description Overlay - Only render when hovered */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 backdrop-blur-xl bg-[#cee7ff58] z-10 p-4 flex items-center justify-between"
                  >
                    <div className="h-full text-center flex flex-row md:flex-col justify-around items-start md:items-center gap-5">
                      <Image
                        src={item.packaging_image_url}
                        className="min-w-20"
                        alt={item.name}
                        width={100}
                        height={80}
                      />
                      <div className="flex flex-col h-full">
                        <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                        <p className="text-sm text-black">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}