"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import HeroSection from "./Herosection";
// import ShopByBusinessApproach from "./ShopByBusinessApproach";
import Quality_section from "./Quality_section";
import Innovations from "./Innovations";
import TestimonialSection from "./TestimonialSection";
import FAQ from "./FAQ";
import PackagingAchievements from "./PackagingAchievements ";
import Recomended_product from "@/components/Recomended_product";

const inter = Inter({ subsets: ["latin"] });

export default function Homepage() {

  return (
    <div className="flex flex-col gap-5 mt-10 md:mt-0 bg-[#fffef7] w-full h-full">
      <HeroSection/>
      <div className="mt-10 px-4 sm:px-8 md:px-20 bg-[#fffef7]">
        <p className="text-[24px] sm:text-[28px] md:text-[32px] font-medium text-center md:text-start text-[#143761]">
          Shop by popularity
        </p>
        <Recomended_product />
      </div>

      <Innovations/>
      <div className="mt-10 px-4 sm:px-8 md:px-20">
        <p className="text-[24px] sm:text-[28px] md:text-[32px] font-medium text-center md:text-start text-[#143761]">
          Shop by popularity
        </p>
        <Recomended_product />
      </div>

      <PackagingAchievements/>
      <Quality_section/>
      <Innovations/>
      <TestimonialSection/>
      <FAQ/>
      
    </div>
  );
}
