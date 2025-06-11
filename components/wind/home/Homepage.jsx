"use client";
import React from "react";
import { Inter } from "next/font/google";
import HeroSection from "./Herosection";
import TestimonialSection from "./TestimonialSection";
import PackagingAchievements from "./PackagingAchievements ";
import Recomended_product from "@/components/Recomended_product";
import Partner from "./Partner";
import CTA from "./CTA";
import AdvancedQAContact from "./AdvancedQAContact";
import FAQ_Home from "./FAQ_Home";
// import { FaWhatsapp } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function Homepage() {
  return (
    <div className="relative flex flex-col w-full">
      {/* Hero Section */}
      <div className="w-full h-full mt-0">
        <HeroSection />
      </div>

      {/* Recommended Products */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <div className="px-3 sm:px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
          <Recomended_product />
        </div>
      </section>

      {/* Packaging Achievements */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <PackagingAchievements />
      </section>

      {/* Partners */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <Partner />
      </section>

      {/* Testimonials */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <TestimonialSection />
      </section>

      {/* CTA */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <CTA />
      </section>

      {/* FAQ */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <FAQ_Home />
      </section>

      {/* Advanced Q&A */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <AdvancedQAContact />
      </section>

      {/* 🟢 Floating WhatsApp Button
      <a
        href="https://wa.me/916289043085" // Replace with your real number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a> */}
    </div>
  );
}
