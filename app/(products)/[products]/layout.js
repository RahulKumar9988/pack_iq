"use client";
import React from "react";
import TabBar from "@/components/TabBar";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import NavDetails from "@/components/NavDetails";
import { Button, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const content = {
    "packaging-type": {
      heading: "Packaging Type",
      title: "Common features",
      value: ["Zipper", "V notch"],
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
    material: {
      heading: "Material",
      title:
        "Get a discount when ordering larger quantities and select even more designs for your pouches.",
      title2: "Get a discount by choosing bigger sizes and save more",
    },
  };

  const pathName = usePathname();

  // Define the order of the pages
  const pageOrder = [
    "/", // Add home "/" at the start
    "packaging-type",
    "size",
    "quantity",
    // "design",
    "material",
  ];

  // Extract the last segment of the path
  const lastSegment = pathName.split("/").pop();

  // Find the current index and calculate the previous index
  const currentIndex = pageOrder.findIndex((page) => page === lastSegment);

  // If on "packaging-type", set previousIndex to 0 to go to "/"
  const previousIndex =
    currentIndex === 0 || currentIndex === 1 ? 0 : currentIndex - 1;

  // Determine the previous page path
  const previousPage =
    previousIndex === 0 ? "/" : `/${pageOrder[previousIndex]}`;

  return (
    <div className="flex flex-col gap-5 mobile:gap-8 h-full">
      <div className="mobile:mt-8">
        <TabBar content={content} />
      </div>
      <div className="flex flex-col gap-[35px] max-mobile:gap-5 flex-grow">
        <div className="flex mobile:gap-3 items-start">
          <Link className="max-md:hidden" href={previousPage}>
            <IoArrowBackCircleOutline size={24} color="#081F38" />
          </Link>
          <NavDetails content={content} />
        </div>
        <div className="flex flex-col flex-grow justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}
