import React from "react";
import Hero_text from "./Hero_text";
import PortraitGallery from "./PortraitGallery";

export default function HeroSection({ inter }) {
  return (
    <section className="md:mt-10 w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-100 rounded-3xl shadow-md overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center 
                      min-h-[50vh] max-h-[100dvh]
                      px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Text Content - Full width on mobile, centered */}
        <div className="w-full py-6 md:py-0 flex items-center justify-center">
          <Hero_text inter={inter} />
        </div>

        {/* Gallery - Responsive height with aspect ratio */}
        <div className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] relative">
          <PortraitGallery />
        </div>
      </div>
    </section>
  );
}