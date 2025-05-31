"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import HeroSection from "./Herosection";
import Innovations from "./Innovations";
import TestimonialSection from "./TestimonialSection";
import FAQ from "./FAQ";
import PackagingAchievements from "./PackagingAchievements ";
import Recomended_product from "@/components/Recomended_product";
import Partner from "./Partner";
import CTA from "./CTA";
import AdvancedQAContact from "./AdvancedQAContact";

const inter = Inter({ subsets: ["latin"] });

export default function Homepage() {

  return (
    <div className="flex flex-col gap-5 mt-0 md:mt-0 w-full  ">
      <HeroSection/>
      <div className=" px-4 sm:px-8 md:px-20 mt-20 ">
        <Recomended_product />
      </div>
      <PackagingAchievements/>
      <Partner/>
      {/* <Innovations/> */}
      {/* <Quality_section/> */}
      {/* <Innovations/> */}
      <TestimonialSection/>
      <CTA/>
      <FAQ/>
      <AdvancedQAContact/>
      
    </div>
  );
}
