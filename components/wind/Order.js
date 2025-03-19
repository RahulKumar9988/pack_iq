"use client";
import { useAppSelector } from "@/redux/hooks";
import { Image } from "@nextui-org/react";
import React from "react";
import { IoCheckmark } from "react-icons/io5";

export default function Order() {
  const cartItem = useAppSelector((state) => state?.cart?.item);
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
          <span className="mobile:hidden text-sm text-[#081F38A6]">
            Your Order Details
          </span>
          <span className="max-mobile:hidden text-sm text-[#081F38A6]">
            Your Order
          </span>
        </div>

        <div className="grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-3">
          <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Packaging type
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {cartItem.name}
          </span>

          <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Size
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {`${cartItem.size} (${cartItem.dimension})`}
          </span>

          <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Quantity
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {cartItem.quantity}
          </span>

          <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Design
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {cartItem.design_number}
          </span>

          <IoCheckmark className="self-center" />
          <span className="mobile:font-semibold text-gray-800 max-mobile:text-sm">
            Material
          </span>
          <span className="text-gray-700 max-mobile:text-black max-mobile:text-sm max-mobile:font-medium">
            : {cartItem.material}
          </span>
        </div>
      </div>

      <p className="text-gray-700 max-mobile:text-sm">
        For order related queries :{" "}
        <a href="tel:+910235602356" className="text-blue-500">
          +91 02356 02356
        </a>
      </p>
    </div>
  );
}
