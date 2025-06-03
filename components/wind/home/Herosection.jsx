import React from "react";
import  ThreeDMarqueeDemo  from "./ThreeDMarqueeDemo";
import Hero_text from "./Hero_text";
import PortraitGallery from "./PortraitGallery";

export default function HeroSection({ inter }) {

  return (
    <div className="rounded-3xl flex flex-col md:mt-10 md:flex-row justify-between w-full h-[100dvh] md:h-[78vh] overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-indigo-100">
      <Hero_text/>
      <div className=" w-full relative overflow-hidden">
      {/* <ThreeDMarqueeDemo /> */} 
        <PortraitGallery/>
      </div>
    </div>
  );
}