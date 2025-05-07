import React from "react";
import { ThreeDMarqueeDemo } from "./ThreeDMarqueeDemo";
import Hero_text from "./Hero_text";

export default function HeroSection({ inter }) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full md:mt-10 overflow-hidden">
      <Hero_text/>
      <div className="hidden md:block w-full h-full relative overflow-hidden">
        <ThreeDMarqueeDemo />
      </div>
    </div>
  );
}