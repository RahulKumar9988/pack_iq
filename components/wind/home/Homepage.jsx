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

const inter = Inter({ subsets: ["latin"] });

export default function Homepage() {

  return (
    <div className="w-full flex flex-col gap-5">

      <HeroSection/>
      <div className="mt-10">
        <p className="md:text-[32px] text-[24px] font-semibold px-40 md:text-start text-center">Shop by popularity</p>
        <Products/>
      </div>
      <Innovations/>
      <div className="mt-10">
        <p className="md:text-[32px] text-[24px] font-semibold px-40 md:text-start text-center">Shop by popularity</p>
        <Products/>
      </div>
      <Quality_section/>
      <Innovations/>
      <TestimonialSection/>
      <FAQ/>
      
    </div>
  );
}
