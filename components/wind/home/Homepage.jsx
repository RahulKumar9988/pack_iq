"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import HeroSection from "./Herosection";
import Products from "../products/Products";
import ShopByBusinessApproach from "./ShopByBusinessApproach";
import Quality_section from "./Quality_section";
import Innovations from "./Innovations";
import TestimonialSection from "./TestimonialSection";
import FAQ from "./FAQ";

const inter = Inter({ subsets: ["latin"] });

export default function Homepage() {

  return (
    <div className="w-full flex flex-col gap-5">
      <HeroSection/>
      <Products/>
      <Innovations/>
      <ShopByBusinessApproach/>
      <Quality_section/>
      <Innovations/>
      <TestimonialSection/>
      <FAQ/>
      
    </div>
  );
}
