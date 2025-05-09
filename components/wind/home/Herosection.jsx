import React from "react";
import  ThreeDMarqueeDemo  from "./ThreeDMarqueeDemo";
import Hero_text from "./Hero_text";
import PortraitGallery from "./PortraitGallery";

export default function HeroSection({ inter }) {

  return (
    <div className="rounded-3xl flex justify-between w-full h-[80vh] overflow-hidden  mt-24">
      <Hero_text/>
      <div className="hidden md:block w-full h-full relative overflow-hidden">
      {/* <ThreeDMarqueeDemo /> */} 
        <PortraitGallery/>
      </div>
    </div>
  );
}