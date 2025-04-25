"use client";
import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export default function NavDetails({ content }) {
  const pathName = usePathname();
  const cartItem = useAppSelector((state) => state?.cart?.item);
  
  // Find the key in content that matches the current path
  const key = Object.keys(content || {}).find((ele) => pathName.includes(ele));
  
  // Add safety checks
  const currentContent = key && content ? content[key] : null;

  if (!currentContent) {
    // Return a fallback UI when content for the current path is not found
    return (
      <div className="flex justify-between w-full px-6 md:px-0">
        <div className="leading-none flex flex-col max-mobile:gap-[6px] mobile:gap-4">
          <div className={`text-xl max-mobile:font-medium mobile:text-[26px]`}>
            Page Details
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between w-full px-6 md:px-0">
      <div className="leading-none flex flex-col max-mobile:gap-[6px] mobile:gap-4">
        <div
          className={`text-4xl font-bold text-[#072745]`}
        >
          {currentContent.heading}
        </div>
        <div className="text-[#072745] text-xl font-bold flex items-center justify-evenly gap-4">
          <div>
            <span className="max-mobile:hidden">{currentContent.title}</span>
            <span className="mobile:hidden">{currentContent.title2}</span>
          </div>
          <span className="flex gap-4">
            {currentContent?.value?.map((ele, i) => {
              return (
                <span
                  className="flex items-center mobile:text-sm text-xs font-semibold text-[#2F4693] gap-2"
                  key={i}
                >
                  <GiCheckMark color="#2F4693" />
                  {ele}
                </span>
              );
            })}
          </span>
        </div>
      </div>
      {cartItem.price && (
        <div className="max-md:hidden flex items-center gap-3 h-fit">
          {/* <span className="text-base whitespace-nowrap font-normal">
            Total Price :{" "}
          </span> */}
          {/* <span className="bg-[#fef2e9] font-semibold text-base text-[#F47A1F] px-2 py-1 whitespace-nowrap rounded-full">
            {cartItem.price}
          </span> */}
        </div>
      )}
    </div>
  );
}