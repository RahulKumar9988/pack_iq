"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import HeroSection from "./Herosection";
import Products from "../products/Products";
// import ShopByBusinessApproach from "./ShopByBusinessApproach";
import Quality_section from "./Quality_section";
import Innovations from "./Innovations";
import TestimonialSection from "./TestimonialSection";
import FAQ from "./FAQ";
import PackagingAchievements from "./PackagingAchievements ";

const inter = Inter({ subsets: ["latin"] });

export default function Homepage() {

  return (
    <div className="flex flex-col gap-5 mt-10 md:mt-0">
      
      <HeroSection/>
      <div className="mt-10 px-6">
        <p className="md:text-[32px] text-[24px] font-medium md:text-start text-center md:px-16 px-0 text-[#143761]">Shop by popularity</p>
        <Products/>
      </div>
      <Innovations/>
      <div className="mt-10 px-6">
        <p className="md:text-[32px] text-[24px] font-medium md:text-start text-center md:px-16 px-0 text-[#143761]">Shop by popularity</p>
        <Products/>
      </div>
      <PackagingAchievements/>
      <Quality_section/>
      <Innovations/>
      <TestimonialSection/>
      <FAQ/>
      
    </div>
  );
}
