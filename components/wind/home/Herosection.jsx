import React from "react";
import Hero_text from "./Hero_text";
import PortraitGallery from "./PortraitGallery";

export default function HeroSection({ inter }) {
  return (
    <section className="md:mt-10 w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-100 rounded-3xl shadow-md overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center 
                      min-h-[50vh]  /* Consistent height for all devices */
                      px-4 sm:px-6 md:px-8 lg:px-12 max-h-[100dvh]">
        
        {/* Left: Text content - takes full width on mobile, half on desktop */}
        <div className="w-full h-full flex items-center justify-center p-4 lg:p-0">
          <Hero_text inter={inter} />
        </div>

        {/* Right: Gallery - hidden on mobile if space is tight, shown on larger screens */}
        <div className="w-full h-[55vh] sm:h-[55vh] md:h-[55vh] lg:h-[55vh] relative">

          <PortraitGallery />
          
        </div>
      </div>
    </section>
  );
}