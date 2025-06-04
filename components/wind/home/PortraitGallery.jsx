import { useState, useEffect, useRef } from 'react';
import { FlipWords } from '@/components/ui/flip-words';

export default function LinkedPortraitGallery() {
  const words = ["Solution", "Standup", "Rounded", "Rollon", "Flat", "Flow"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageCache, setImageCache] = useState({});
  const [animationKey, setAnimationKey] = useState(0);
  const preloadedImages = useRef(new Set());
  
  // Image mapping with arrays for multiple images per word
  const imageMapping = {
    "Solution": [
      "/CENTER SEAL BAR/Center seal bar 03.png",
      "/CENTER SEAL BAR/Center seal bar.png",
      "/CENTER SEAL BAR/Center seal bar 04.png"
    ],
    "Flat": [
      "/Flat bottom/Flat bottom 02.png",
      "/Flat bottom/Flat bottom 03.png",
      "/Flat bottom/Flat bottom.png"
    ],
    "Standup": [
      "/STAND UP/Nut TREES STAND UP POUCH 2.png",
      "/STAND UP/Nut TREES STAND UP POUCH.png",
      "/STAND UP/STAND UP.png"
    ],
    "Rounded": [
      "/THREE SIDE SEAL/Three side seal 2.png",
      "/THREE SIDE SEAL/Three side seal 3.png",
      "/THREE SIDE SEAL/Three side seal.png"
    ],
    "Rollon": [
      "/Flat bottom/Flat bottom 02.png",
      "/Flat bottom/Flat bottom 03.png",
      "/Flat bottom/Flat bottom.png"
    ],
  };

  // Colors mapping for background circles
  const colorMapping = {
    "Solution": "from-yellow-300 to-yellow-500",
    "Standup": "from-purple-300 to-purple-500",
    "Rounded": "from-blue-300 to-blue-500",
    "Rollon": "from-green-300 to-green-500",
    "Flat": "from-orange-300 to-orange-500",
  };

  // Preload all images for smooth transitions
  useEffect(() => {
    const preloadImages = async () => {
      const allImages = Object.values(imageMapping).flat();
      const promises = allImages.map(src => {
        return new Promise((resolve) => {
          if (preloadedImages.current.has(src)) {
            resolve(src);
            return;
          }
          
          const img = new Image();
          img.onload = () => {
            preloadedImages.current.add(src);
            resolve(src);
          };
          img.onerror = () => resolve(src); // Still resolve to continue
          img.src = src;
        });
      });
      
      await Promise.all(promises);
      setIsLoading(false);
    };

    preloadImages();
  }, []);

  // Handle word change with smooth animation
  const handleWordChange = (word) => {
    setAnimationKey(prev => prev + 1);
    setTimeout(() => {
      setCurrentWord(word);
    }, 150); // Small delay for smooth transition
  };

  // Get images for current word
  const getCurrentImages = () => {
    return imageMapping[currentWord] || imageMapping["Solution"];
  };

  // Get current gradient colors
  const getCurrentGradient = () => {
    return colorMapping[currentWord] || colorMapping["Solution"];
  };

  return (
    <div className="relative w-full md:h-full md:p-8 overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center z-50">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animation-delay-75"></div>
          </div>
        </div>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-150"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full blur-3xl opacity-25 animate-pulse animation-delay-300"></div>
      </div>

      {/* Call to Action Section with FlipWords */}
      <div className="text-center hidden">
        <h2 className="text-4xl font-bold mb-4">
          Eco-Friendly Packaging <FlipWords 
            words={words} 
            duration={3000} 
            className="text-[#143761]"
            onWordChange={handleWordChange}
          />
        </h2>
        <p className="text-lg text-[#03172BB0] mb-6">
          Discover innovative and sustainable packaging options that reduce waste and protect our planet.
        </p>
        <button className="bg-[#143761] text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-[#0f2a4a] transition-all duration-300 transform hover:shadow-lg">
          Explore {currentWord} Packaging
        </button>
      </div>

      {/* Gallery Section */}
      <div className="max-w-4xl mx-auto relative">
        {/* Animated decorative elements */}
        <div className="absolute left-4 top-0 animate-bounce animation-delay-200">
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-yellow-400 fill-current filter drop-shadow-lg">
            <path d="M12 1L15.36 8.48L23 9.24L17.5 14.52L19.08 22L12 18.48L4.92 22L6.5 14.52L1 9.24L8.64 8.48L12 1Z" />
          </svg>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {/* Main featured image with enhanced animations */}
          <div className="relative mt-10 group">
            <div 
              key={`main-${animationKey}`}
              className={`bg-gradient-to-br ${getCurrentGradient()} rounded-full w-64 h-96 lg:w-72 lg:h-88 
                         flex items-center justify-center relative 
                         shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out
                         transform hover:scale-105 hover:rotate-1
                         animate-fadeInScale`}
              style={{
                animation: 'fadeInScale 0.8s ease-out forwards'
              }}
            >
              {/* Shimmer effect */}
              
              <img 
                src={getCurrentImages()[0]}
                alt={`${currentWord} packaging`}
                className="h-[280px] md:h-[340px] lg:h-[380px] w-auto object-cover 
                          transform transition-all duration-700 ease-out
                          filter drop-shadow-xl"
                style={{
                  animation: 'fadeInUp 0.6s ease-out 0.2s both'
                }}
              />
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + i}s`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Enhanced blue scribble with animation */}
            <div className="absolute -left-8 top-1/3 transform -translate-y-1/2 animate-pulse">
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                <path 
                  d="M10,50 Q30,30 50,50 T90,50" 
                  stroke="#3b82f6" 
                  strokeWidth="4" 
                  fill="none" 
                  className="animate-draw"
                />
              </svg>
            </div>
          </div>
          
          {/* Right column portraits with staggered animations */}
          <div className="hidden md:flex md:flex-col md:gap-8 lg:gap-12">
            {/* Top right portrait */}
            <div 
              key={`top-${animationKey}`}
              className="group relative"
              style={{
                animation: 'fadeInScale 0.8s ease-out 0.3s both'
              }}
            >
              <div className={`bg-gradient-to-br ${getCurrentGradient()} rounded-full w-40 h-56 lg:w-44 lg:h-52 
                             flex items-center justify-center relative 
                             shadow-xl hover:shadow-2xl transition-all duration-500 ease-out
                             transform hover:-rotate-1`}>
                
                
                <img 
                  src={getCurrentImages()[1] || getCurrentImages()[0]}
                  alt={`${currentWord} packaging variant`}
                  className="h-[220px] lg:h-[240px] w-auto object-cover 
                            transform transition-all duration-500 ease-out
                           filter drop-shadow-lg"
                />
              </div>
            </div>
            
            {/* Bottom right portrait */}
            <div 
              key={`bottom-${animationKey}`}
              className="relative group"
              style={{
                animation: 'fadeInScale 0.8s ease-out 0.6s both'
              }}
            >
              <div className={`bg-gradient-to-br ${getCurrentGradient()} rounded-full w-40 h-60 lg:w-44 lg:h-64 
                             flex items-center justify-center relative 
                             shadow-xl hover:shadow-2xl transition-all duration-500 ease-out
                             transform hover:rotate-1`}>
                
                
                <img 
                  src={getCurrentImages()[2] || getCurrentImages()[0]}
                  alt={`${currentWord} packaging variant`}
                  className="h-[240px] lg:h-[280px] w-auto object-cover 
                            transform transition-all duration-500 ease-out
                            filter drop-shadow-lg"
                />
              </div>
              
              {/* Enhanced radiating lines with animation */}
              <div className="absolute -right-6 bottom-0 animate-spin-slow">
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-gray-700">
                  <g stroke="currentColor" strokeWidth="2" className="animate-pulse">
                    <line x1="12" y1="1" x2="12" y2="4" />
                    <line x1="12" y1="20" x2="12" y2="23" />
                    <line x1="4" y1="12" x2="1" y2="12" />
                    <line x1="23" y1="12" x2="20" y2="12" />
                    <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
                    <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
                    <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
                    <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced bottom star with animation */}
        <div className="absolute left-16 bottom-4 animate-bounce animation-delay-400">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-yellow-400 fill-current filter drop-shadow-md">
            <path d="M12 1L15.36 8.48L23 9.24L17.5 14.52L19.08 22L12 18.48L4.92 22L6.5 14.52L1 9.24L8.64 8.48L12 1Z" />
          </svg>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes draw {
          0% {
            stroke-dasharray: 0 200;
          }
          100% {
            stroke-dasharray: 200 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        .animate-draw {
          stroke-dasharray: 200;
          animation: draw 2s ease-in-out infinite alternate;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        .animation-delay-75 {
          animation-delay: 0.075s;
        }

        .animation-delay-150 {
          animation-delay: 0.15s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        /* Smooth transitions for all elements */
        * {
          transition-property: transform, opacity, box-shadow, filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}