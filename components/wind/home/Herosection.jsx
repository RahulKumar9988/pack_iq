import React from "react";
import Hero_text from "./Hero_text";
import PortraitGallery from "./PortraitGallery";

export default function HeroSection({ inter }) {
  return (
    <section className="w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-100 rounded-3xl shadow-md overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center 
                      min-h-[50vh] sm:min-h-[60vh] md:min-h-[65vh] 
                      px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Left: Text content */}
        <div className="w-full flex items-center justify-center">
          <Hero_text inter={inter} />
        </div>

        {/* Right: Gallery */}
        <div className="w-full h-[50vh] sm:h-[50vh] md:h-[50vh] lg:h-[55vh] relative">
          <PortraitGallery />
          {/* <ThreeDMarqueeDemo /> */}
        </div>
      </div>
    </section>
  );
}
