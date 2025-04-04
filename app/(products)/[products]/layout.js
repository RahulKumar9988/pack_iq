"use client";

import React from "react";
import TabBar from "@/components/TabBar";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import NavDetails from "@/components/NavDetails";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const content = {
    "packaging-type": {
      heading: "Packaging Type",
      title: "Common features",
      value: ["Zipper", "V notch"],
    },
    material: {
      heading: "Material",
      title:
        "Get a discount when ordering larger quantities and select even more designs for your pouches.",
      title2: "Get a discount by choosing bigger sizes and save more",
    },
    size: {
      heading: "Size",
      title: "Get a discount by choosing bigger sizes and save more",
      title2: "Get a discount by choosing bigger sizes and save more",
    },
    quantity: {
      heading: "Quantity",
      title:
        "Get a discount when ordering larger quantities and select even more designs for your pouches.",
      title2: "Get a discount by choosing bigger sizes and save more",
    },
    // designs: {
    //   heading: "no_designs",
    //   title:
    //     "Get a discount when ordering larger quantities and select even more designs for your pouches.",
    //   title2: "Get a discount by choosing bigger sizes and save more",
    // },
    additions: {
      heading: "Additions",
      title:
        "Get a discount when ordering larger quantities and select even more designs for your pouches.",
      title2: "Get a discount by choosing bigger sizes and save more",
    },
    Summery: {
      heading: "Summery",
      title:
        "Get a discount when ordering larger quantities and select even more designs for your pouches.",
      title2: "Get a discount by choosing bigger sizes and save more",
    },
    
  };

  const pathName = usePathname();

  // Define the order of the pages
  const pageOrder = [
    "/", 
    "packaging-type",
    "material",
    "size",
    "quantity",
    "addon"
  ];

  // Extract the last segment of the path
  const lastSegment = pathName === "/" ? "/" : pathName.split("/").pop();

  // Find the current index and calculate the previous index
  const currentIndex = pageOrder.findIndex((page) => page === lastSegment);
  
  // Handle cases where path isn't found in pageOrder (defaulting to -1)
  const validCurrentIndex = currentIndex === -1 ? 0 : currentIndex;

  // If on "packaging-type", set previousIndex to 0 to go to "/"
  const previousIndex =
    validCurrentIndex === 0 || validCurrentIndex === 1 ? 0 : validCurrentIndex - 1;

  // Determine the previous page path
  const previousPage =
    previousIndex === 0 ? "/" : `/${pageOrder[previousIndex]}`;

  return (
    <div className="flex flex-col gap-5 mobile:gap-8 h-full mt-1 w-full md:mt-0 px-2 md:px-16 bg-[#fffef7]">
      <div className="mt-8 md:block hidden  bg-[#fffef7]">
        <TabBar content={content} />
      </div>
      <div className="flex flex-col gap-[35px] max-mobile:gap-5 flex-grow  bg-[#fffef7]">
        <div className="flex mobile:gap-3 items-start  bg-[#fffef7]">
          <Link className="max-md:hidden" href={previousPage}>
            <IoArrowBackCircleOutline size={24} color="#081F38" />
          </Link>
          <NavDetails content={content} />
        </div>
        <div className="flex flex-col flex-grow justify-between  bg-[#fffef7]">
          {children}
        </div>
      </div>
    </div>
  );
}