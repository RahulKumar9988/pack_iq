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
    <div className="flex flex-col w-full ">
      {/* Hero Section - Full width with proper spacing */}
      <section className="w-full mt-0">
        <HeroSection/>
      </section>

      {/* Recommended Products - Responsive padding */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <div className="px-3 sm:px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
          <Recomended_product />
        </div>
      </section>

      {/* Packaging Achievements - Full width */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <PackagingAchievements/>
      </section>

      {/* Partners Section - Full width */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <Partner/>
      </section>

      {/* Testimonials Section - Full width with spacing */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <TestimonialSection/>
      </section>

      {/* CTA Section - Full width */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <CTA/>
      </section>

      {/* FAQ Section - Full width */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <FAQ/>
      </section>

      {/* Advanced Q&A Contact - Full width */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <AdvancedQAContact/>
      </section>
    </div>
  );
}