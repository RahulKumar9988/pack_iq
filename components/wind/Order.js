"use client";

import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Order() {
  const [orderDetails, setOrderDetails] = useState({});
  const cartItem = useSelector((state) => state.cart.item) || {};
  const router = useRouter();

  useEffect(() => {
    // Get order details from localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      try {
        setOrderDetails(JSON.parse(savedOrder));
      } catch (error) {
        console.error("Error parsing order data from localStorage:", error);
      }
    }
  }, []);

  // Use orderDetails instead of cartItem for display
  const displayData = Object.keys(orderDetails).length > 0 ? orderDetails : cartItem;

  return (
    <div className="flex flex-col items-center max-mobile:my-10 mobile:p-10">
      <div className="flex justify-center items-center mb-6">
        <Image
          className="max-mobile:hidden"
          src="/orderSucceed.png"
          alt="Order Successful"
          width={183.78}
          height={143.18}
        />
        <Image
          className="mobile:hidden"
          src="/orderSucceed.png"
          alt="Order Successful"
          width={130}
          height={101}
        />
      </div>
      <h2 className="mobile:text-2xl text-base font-bold text-gray-800 mb-2">
        Order successful
      </h2>
      <p className="text-[#00000080] text-xs mobile:text-base mb-6 text-center">
        Our support team will contact you shortly within 24 hours. Here&apos;s
        your order details
      </p>
      
      <div className="bg-[#f4f9fb] p-6 rounded-lg flex flex-col gap-3 shadow-md mb-6 w-full max-w-md text-left">
        <div>
          <span className="mobile:hidden text-sm text-[#081F38A6]">Your Order Details</span>
          <span className="max-mobile:hidden text-sm text-[#081F38A6]">Your Order</span>
        </div>

        <div className="grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-3">
          <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Packaging type
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {displayData?.name || "N/A"}
          </span>

          {/* <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Size
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {displayData?.size ? `${displayData.size} (${displayData.dimension || "N/A"})` : "N/A"}
          </span> */}

          <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Quantity
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {displayData?.quantity || "N/A"}
          </span>

          <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Design
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {displayData?.design_number || "N/A"}
          </span>

          <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Material
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {displayData?.material || "N/A"}
          </span>

          <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Additions
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {displayData?.addons 
                ? (Array.isArray(displayData.addons) 
                    ? displayData.addons.map(addon => addon.name).join(', ') || "Not selected" 
                    : typeof displayData.addons === 'object' 
                      ? displayData.addons.name || "Not selected" 
                      : displayData.addons)
                : "Not selected"}
          </span>
        </div>
      </div>

      <p className="text-gray-700 max-mobile:text-sm">
        For order-related queries:{" "}
        <a href="tel:+910235602356" className="text-blue-500">
          +91 02356 02356
        </a>
      </p>
    </div>
  );
}