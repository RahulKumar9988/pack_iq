import React from "react";
import  ThreeDMarqueeDemo  from "./ThreeDMarqueeDemo";
import Hero_text from "./Hero_text";

export default function HeroSection({ inter }) {

  return (
    <div className="rounded-3xl grid grid-cols-1 md:grid-cols-2 w-full h-[60vh] overflow-hidden  mt-32">
      <Hero_text/>
      <div className="hidden md:block w-full h-full relative overflow-hidden">
        <ThreeDMarqueeDemo />
      </div>
    </div>
  );
}