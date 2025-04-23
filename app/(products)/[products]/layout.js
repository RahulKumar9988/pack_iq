"use client";

import React from "react";
import TabBar from "@/components/TabBar";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import NavDetails from "@/components/NavDetails";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Layout({ children }) {
  const content = {
    "packaging-type": {
      heading: "Packaging Type",
      title: "Pick your packaging style:-",
      
    },
    material: {
      heading: "Material",
      title: "Pick your finish:-",
    },
    size: {
      heading: "Size",
      title: "Pick your perfect Size:-",
    },
    quantity: {
      heading: "Quantity",
      title:"How many would you like to order?",
    },
    // designs: {
    //   heading: "no_designs",
    //   title:
    //     "Get a discount when ordering larger quantities and select even more designs for your pouches.",
    //   title2: "Get a discount by choosing bigger sizes and save more",
    // },
    additions: {
      heading: "Additions",
      title:"Select Features on the pouches"
    },
    Summery: {
      heading: "Summery",
      title:
        "Get a discount when ordering larger quantities and select even more designs for your pouches.",
      title2: "Get a discount by choosing bigger sizes and save more",
    },
  };

  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract product type and current section from URL
  const extractPathInfo = () => {
    const segments = pathName.split("/");
    let productType = null;
    let currentSection = null;

    if (segments.length === 2 && segments[1] === "packaging-type") {
      // First step: /packaging-type
      currentSection = "packaging-type";
    } else if (segments.length >= 3) {
      // Other steps: /product-type/section
      productType = segments[1];
      currentSection = segments[2];
      
      // Handle URL encoded spaces in the path
      if (currentSection.includes("%20")) {
        currentSection = currentSection.replace(/%20/g, "-");
      }
    }

    return { productType, currentSection };
  };

  const { productType, currentSection } = extractPathInfo();

  // Define navigation flow
  const navigationFlow = [
    { section: "packaging-type", path: "/packaging-type" },
    { section: "material", path: productType ? `/${productType}/material` : "/material" },
    { section: "size", path: productType ? `/${productType}/size` : "/size" },
    { section: "quantity", path: productType ? `/${productType}/quantity` : "/quantity" },
    { section: "additions", path: productType ? `/${productType}/additions` : "/additions" },
    { section: "Summery", path: productType ? `/${productType}/summary` : "/summary" }
  ];

  // Find current position in flow
  const currentIndex = navigationFlow.findIndex(item => 
    item.section === currentSection || 
    (currentSection === "summary" && item.section === "Summery") ||
    (currentSection === "addon" && item.section === "additions")
  );

  // Calculate previous page, defaulting to home if not found or at first step
  const getPreviousPage = () => {
    if (currentIndex <= 0) {
      return "/";
    }
    
    const prevIndex = currentIndex - 1;
    let prevPath = navigationFlow[prevIndex].path;
    
    // Add query params if going to size from quantity
    if (navigationFlow[prevIndex].section === "size" && searchParams.has("size_id")) {
      prevPath += `?size_id=${searchParams.get("size_id")}`;
    }
    
    return prevPath;
  };

  const previousPage = getPreviousPage();

  // Handle back button click
  const handleBackClick = () => {
    router.push(previousPage);
  };

  return (
    <div className="flex flex-col gap-5 mobile:gap-8 h-full mt-1 w-full md:mt-0 px-2 md:px-16 bg-[#]">
      <div className="mt-8 md:block hidden bg-[#]">
        <TabBar content={content} />
      </div>
      <div className="flex flex-col gap-[35px] max-mobile:gap-5 flex-grow bg-[#]">
        <div className="flex mobile:gap-3 items-start bg-[#]">
          <div 
            className="max-md:hidden cursor-pointer"
            onClick={handleBackClick}
          >
            <IoArrowBackCircleOutline size={24} color="#081F38" />
          </div>
          <NavDetails content={content} />
        </div>
        <div className="flex flex-col flex-grow justify-between bg-[#]">
          {children}
        </div>
      </div>
    </div>
  );
}