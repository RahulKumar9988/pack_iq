"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa6";

export default function TabBar({ content }) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabList = Object.keys(content).map((ele) =>
    ele.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );

  const keyIndex = Object.keys(content).findIndex((ele) =>
    pathName.includes(ele)
  );

  // Extract product type from URL
  const getProductType = () => {
    const segments = pathName.split("/");
    // Check if there's a product type in the URL
    if (segments.length > 1 && segments[1] !== "packaging-type") {
      return segments[1];
    }
    return null;
  };

  const productType = getProductType();

  // Function to create the correct URL for navigation
  const createUrl = (section) => {
    // Special case for first step
    if (section === "packaging-type") {
      return "/packaging-type";
    }

    // For subsequent steps, include product type if available
    if (productType) {
      // Handle special cases for section names
      if (section === "additions") {
        return `/${productType}/additions`;
      } else if (section === "Summery") {
        return `/${productType}/summary`;
      } else {
        return `/${productType}/${section}`;
      }
    } else {
      // Fallback if no product type (should rarely happen)
      return `/${section}`;
    }
  };

  // Preserve query parameters for certain sections
  const getQueryString = (section) => {
    // If we're on size or quantity and have query params, preserve them
    if ((section === "size" || section === "quantity") && searchParams.toString()) {
      return `?${searchParams.toString()}`;
    }
    return "";
  };

  // Function to handle tab click
  const handleTabClick = (index) => {
    // Only allow navigation to completed tabs or the current tab
    if (index <= keyIndex) {
      const section = Object.keys(content)[index];
      const baseUrl = createUrl(section);
      const queryString = getQueryString(section);
      router.push(`${baseUrl}${queryString}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-[#fffef7]">
      <Tabs
        aria-label="Options"
        color="#fffef7"
        variant="underlined"
        classNames={{
          base: "w-full",
          tabList:
            "w-full justify-center relative rounded-none gap-0 p-0 border-divider",
          cursor: "w-full bg-transparent",
          tab: "max-w-fit px-0 h-4 mobile:h-12",
          tabContent: "group-data-[selected=true]:text-[#2CB041]",
        }}
      >
        {tabList.map((item, i) => {
          const isSelectedOrBefore = i <= keyIndex;
          return (
            <Tab
              key={item}
              title={
                <div 
                  className="cursor-pointer"
                  onClick={() => handleTabClick(i)}
                >
                  <div
                    className="flex max-mobile:justify-between items-center gap-2 bg-[#fffef7]"
                  >
                    <span
                      className={`relative max-w-fit min-w-min box-border whitespace-nowrap border-medium sm:px-1 max-mobile:h-3 mobile:h-4 lg:h-7 font-medium max-mobile:text-[9px] max-xs:text-[10px] max-sm:text-[11px] max-md:text-xs max-ml:text-sm rounded-full bg-transparent aspect-square flex justify-center items-center ${
                        isSelectedOrBefore
                          ? "border-[#2CB041] text-[#2CB041]"
                          : "border-default text-black"
                      }`}
                    >
                      {isSelectedOrBefore ? <FaCheck size={25} /> : i + 1}
                    </span>
                    <span className="flex items-center">
                      <span
                        className={`max-mobile:text-xs max-xs:text-[11px] max-sm:text-[11px] max-md:text-[15px] max-ml:text-sm font-medium ${
                          isSelectedOrBefore ? "text-[#2CB041]" : "text-black font-semibold"
                        }`}
                      >
                        {item}
                      </span>
                      {i + 1 !== tabList.length && (
                        <div
                          className={`border-t-medium lg:border-t-large border-dashed ${
                            isSelectedOrBefore
                              ? "border-[#2CB041]"
                              : "border-[#240812]"
                          }  max-mobile:w-[14px] max-xs:w-[32px] max-sm:w-[42px] max-lg:w-16 lg:w-20 mx-auto`}
                        ></div>
                      )}
                    </span>
                  </div>
                </div>
              }
            />
          );
        })}
      </Tabs>
    </div>
  );
}