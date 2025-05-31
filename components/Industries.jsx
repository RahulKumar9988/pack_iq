"use client"
import React from "react";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Products from "./wind/products/Products";

export default function Industries() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-full gap-5 md:gap-10">
      {/* Hero Section */}
      <div className="w-full">
        <div
          className="flex items-center justify-start bg-cover bg-center w-full h-[50vh] sm:h-[70vh] md:h-[80vh] lg:h-[100vh] px-4 sm:px-8 lg:px-16 py-12 md:py-20 lg:py-28"
          style={{ backgroundImage: "url('/inspr.png')" }}
        >
          <div className="flex flex-col gap-4 md:gap-8 max-w-full md:max-w-[629px]">
            <div>
              <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white font-semibold w-full md:w-[30vw]">
                We serve across 150 varieties of industries
              </p>
            </div>
            <div className="flex gap-5">
              <Button 
                className="flex justify-center items-center gap-2 bg-white rounded-xl px-3 py-2 md:px-4 md:py-4 font-semibold text-sm md:text-base text-black" 
                onClick={() => router.push('/free-sample')}
              >
                Book a free sample <GoArrowUpRight />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Industries Section - Responsive layout */}
      <div className="px-4 sm:px-8 lg:px-16 py-8 w-full">
        <div className="p-4 md:p-8">
          <h2 className="text-xl md:text-2xl lg:text-[28px] mb-6 md:mb-8 font-medium">
            Industries we serve
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left side - Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <Image
                  src="/inspr demo.png"
                  alt="Industry showcase"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
            
            {/* Right side - Industry details */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8 md:gap-10">
              {/* Industry 1 */}
              <div className="w-full">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#143761] mb-3">
                  Spice and seasoning
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <Button className="bg-white border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50">
                  Explore now
                </Button>
              </div>
              
              {/* Industry 2 */}
              <div className="w-full">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#143761] mb-3">
                  Spice and seasoning
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <Button className="bg-white border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50">
                  Explore now
                </Button>
              </div>
              
              {/* Industry 3 */}
              <div className="w-full">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#143761] mb-3">
                  Spice and seasoning
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <Button className="bg-white border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50">
                  Explore now
                </Button>
              </div>
            </div>
          </div>
          
          {/* Bottom border */}
          <div className="border-b mt-12"></div>
        </div>
      </div>
      <div className="px-5 md:px-20">
        <p className="text-[28px] font-semibold">Shop by popularity.</p>
        <Products/>
      </div>
    </div>
  );
}