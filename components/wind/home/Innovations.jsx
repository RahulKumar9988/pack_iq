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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 leading-tight break-words">
                Discover Your <br />
                <span className="text-blue-600 mt-1 sm:mt-2 lg:mt-3 bg-gradient-to-r from-blue-900 to-cyan-400 bg-clip-text text-transparent">Packaging Vision</span>
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
            
            <div className="pt-2 sm:pt-4 w-fit">
              <button 
              onClick={()=> router.push("/inspirations")}
                className="bg-gradient-to-r from-blue-800 to-cyan-400 hover:from-blue-900 hover:to-cyan-500 text-white font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-xl inline-flex items-center gap-2 sm:gap-3 transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Explore Inspirations
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
              </button>
            </div>
          </div>

          {/* Right Column - For larger screens */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 hidden sm:block">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 sm:w-56 lg:w-64 h-48 sm:h-56 lg:h-64 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full opacity-30" />
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-4 sm:mb-6 lg:mb-8 relative z-10">
                <Box className="inline-block w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mr-2 text-blue-600 -mt-1" />
                Packaging Excellence
              </h3>
              
              <div className="space-y-4 sm:space-y-5 lg:space-y-6 relative z-10">
                {/* Cards */}
                <div className="flex gap-3 sm:gap-4 items-start group bg-gradient-to-r from-white to-blue-50 p-3 sm:p-4 rounded-xl cursor-pointer hover:translate-x-2 transition-transform">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors flex-shrink-0">
                    <Package className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 sm:mb-2">Structural Design</h4>
                    <p className="text-sm sm:text-base text-slate-600">Smart packaging solutions with enhanced durability</p>
                    <div className="mt-2 sm:mt-3 flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full opacity-50" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 items-start group bg-gradient-to-r from-white to-emerald-50 p-3 sm:p-4 rounded-xl cursor-pointer hover:translate-x-2 transition-transform">
                  <div className="p-2 sm:p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors flex-shrink-0">
                    <Recycle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 sm:mb-2">Eco Solutions</h4>
                    <p className="text-sm sm:text-base text-slate-600">Biodegradable materials & sustainable practices</p>
                    <div className="mt-2 sm:mt-3 flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full opacity-50" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 items-start group bg-gradient-to-r from-white to-purple-50 p-3 sm:p-4 rounded-xl cursor-pointer hover:translate-x-2 transition-transform">
                  <div className="p-2 sm:p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors flex-shrink-0">
                    <PenTool className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 sm:mb-2">Brand Artistry</h4>
                    <p className="text-sm sm:text-base text-slate-600">Custom designs that tell your brand story</p>
                    <div className="mt-2 sm:mt-3 flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-600 rounded-full opacity-50" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 sm:mt-8 relative bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 rounded-xl overflow-hidden">
                <div className="bg-white rounded-xl p-3 sm:p-4 flex items-center justify-center gap-2 sm:gap-3">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    Trusted by 5,000+ Global Brands
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Mobile version */}
          <div className="w-full mt-6 block sm:hidden">
            <div className="bg-white rounded-2xl shadow-xl p-4 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full opacity-30" />
              
              <h3 className="text-xl font-bold text-slate-800 mb-4 relative z-10 flex items-center">
                <Box className="w-6 h-6 mr-2 text-blue-600" />
                <span>Packaging Excellence</span>
              </h3>
              
              <div className="space-y-3 relative z-10">
                {/* Mobile Cards - Simplified and more compact */}
                <div className="flex gap-2 items-start bg-gradient-to-r from-white to-blue-50 p-3 rounded-xl">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-slate-800">Structural Design</h4>
                    <p className="text-xs text-slate-600 truncate">Smart packaging solutions</p>
                  </div>
                </div>

                <div className="flex gap-2 items-start bg-gradient-to-r from-white to-emerald-50 p-3 rounded-xl">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <Recycle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-slate-800">Eco Solutions</h4>
                    <p className="text-xs text-slate-600 truncate">Sustainable practices</p>
                  </div>
                </div>

                <div className="flex gap-2 items-start bg-gradient-to-r from-white to-purple-50 p-3 rounded-xl">
                  <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                    <PenTool className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-slate-800">Brand Artistry</h4>
                    <p className="text-xs text-slate-600 truncate">Custom brand designs</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackagingInspirationsSection;