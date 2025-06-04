import React from "react";
import ThreeDMarqueeDemo from "./ThreeDMarqueeDemo";
import Hero_text from "./Hero_text";
import PortraitGallery from "./PortraitGallery";

export default function HeroSection({ inter }) {
  return (
    <div className="md:mt-10 rounded-3xl flex flex-col sm:flex-row justify-between w-full 
                    min-h-[70vh] sm:h-[70vh] md:h-[70vh] lg:h-[75vh] 
                    overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-indigo-100 
                    px-4 sm:px-0">
      
      {/* Text Section - Full width on mobile, 55% on larger screens */}
      <div className="w-full sm:w-[55%] flex items-center py-6 sm:py-0 sm:pl-6 md:pl-8 lg:pl-12">
        <Hero_text inter={inter} />
      </div>

      {/* Gallery Section - Full width on mobile, 45% on larger screens */}
      <div className="w-full sm:w-[45%] h-[50vh] sm:h-full relative overflow-hidden">
        <PortraitGallery />
        {/* <ThreeDMarqueeDemo /> */}
      </div>
    </div>
  );
}