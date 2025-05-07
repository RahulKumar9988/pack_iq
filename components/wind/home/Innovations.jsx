import React from 'react';
import { Sparkles, Package, Recycle, PenTool, Globe, ArrowRight, Palette, Leaf, Box } from 'lucide-react';
import { useRouter } from 'next/navigation';

function PackagingInspirationsSection() {
  const router = useRouter(); 
  return (
    <div className="h-full relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 ">
      {/* Background elements */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 leading-tight break-words">
                Discover Your <br />
                <span className=" text-blue-600 mt-1 sm:mt-2 lg:mt-3 bg-gradient-to-r from-blue-900 to-cyan-400 bg-clip-text text-transparent">Packaging Vision</span>
              </h2>
              <Sparkles className="absolute top-1 sm:top-2 md:top-3 lg:top-4 right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-amber-400" />
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-700/90 leading-relaxed">
              Explore our curated collection of <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">innovative packaging designs</span> that combine functionality with stunning aesthetics
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-slate-700">Eco-friendly material options</span>
              </div>
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-slate-700">Custom color matching technology</span>
              </div>
            </div>
            
            <div className="pt-2 sm:pt-4 w-fit hidden sm:block">
              <button 
              onClick={()=> router.push("/inspirations")}
                className="bg-gradient-to-r from-blue-950 to-cyan-800 hover:from-blue-950 hover:to-cyan-9 00 text-white font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-full inline-flex items-center gap-2 sm:gap-3 transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Explore Inspirations
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
              </button>
            </div>
          </div>

          {/* Right Column - For larger screens */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 hidden sm:block">
            <img src="/pack/all items.png" alt="" className='rounded-2xl' />
          </div>

          {/* Right Column - Mobile version */}
          <div className="w-full mt-2 block sm:hidden">
            <img src="/pack/all items.png" alt="" className='rounded-2xl' />
            <div className="pt-5 sm:pt-4 w-fit">
              <button 
              onClick={()=> router.push("/inspirations")}
                className="bg-gradient-to-r from-blue-950 to-cyan-950 hover:from-blue-950 hover:to-cyan-900 text-white font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-full inline-flex items-center gap-2 sm:gap-3 transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Explore Inspirations
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackagingInspirationsSection;