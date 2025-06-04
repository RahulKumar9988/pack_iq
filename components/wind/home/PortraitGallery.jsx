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
      "/Flat bottom/Flat bottom 03-01.png",
      "/Flat bottom/Flat bottom.png"
    ],
    "Standup": [
      "/STAND UP/Nut TREES STAND UP POUCH 2.png",
      "/STAND UP/Nut TREES STAND UP POUCH 3.png",
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
    "Solution": "from-green-100 to-yellow-500",
    "Standup": "from-purple-300 to-brown-500",
    "Rounded": "from-red-300 to-yellow-200",
    "Rollon": "from-yellow-200 to-orange-400",
    "Flat": "from-orange-200 to-yellow-500",
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
    },); // Small delay for smooth transition
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
    <div className="relative w-full mt-[-10px] sm:mt-[-15px] md:mt-[-30px] lg:mt-[-30px] lx:mt-[-30px] xl:mt-[-30px] 2xl:mt-[-30px]">

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center z-50">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animation-delay-75"></div>
          </div>
        </div>
      )}

      {/* Call to Action Section with FlipWords */}
      <div className="text-center hidden">
        <h2 className="text-4xl font-bold">
          Eco-Friendly Packaging <FlipWords 
            words={words} 
            duration={3000} 
            className="text-[#143761]"
            onWordChange={handleWordChange}
          />
        </h2>
        <p className="text-lg text-[#03172BB0]">
          Discover innovative and sustainable packaging options that reduce waste and protect our planet.
        </p>
        <button className="bg-[#143761] text-white px-6 rounded-full font-semibold text-base hover:bg-[#0f2a4a] transition-all duration-300 transform hover:shadow-lg">
          Explore {currentWord} Packaging
        </button>
      </div>

      {/* Gallery Section */}
      <div className="max-w-4xl mx-auto relative">
        {/* Animated decorative elements */}
        
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {/* Main featured image with enhanced animations */}
          <div className="relative group">
            <div 
              key={`main-${animationKey}`}
              className={` w-64 h-96 lg:w-72 lg:h-88 
                         flex items-center justify-center relative 
                         transition-all duration-700 ease-out
                         transform 
                         animate-fadeInScale`}
              style={{
                animation: 'fadeInScale 0.8s ease-out forwards'
              }}
            >
              {/* Shimmer effect */}
              
              <img 
                src={getCurrentImages()[0]}
                alt={`${currentWord} packaging`}
                className="h-[340px] md:h-[340px] lg:h-[380px] w-auto object-cover 
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
              <div className={` w-40 h-56 lg:w-44 lg:h-52 
                             flex items-center justify-center relative 
                             transition-all duration-500 ease-out
                             transform `}>
                
                
                <img 
                  src={getCurrentImages()[1] || getCurrentImages()[0]}
                  alt={`${currentWord} packaging variant`}
                  className="h-[240px] lg:h-[240px] w-auto object-cover 
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
                animation: 'fadeInScale 0.8s ease-out 0.6s both '
              }}
            >
              <div className={` w-40 h-60 lg:w-44 lg:h-64 
                             flex items-center justify-center relative 
                             transition-all duration-500 ease-out
                             transform `}>
                
                
                <img 
                  src={getCurrentImages()[2] || getCurrentImages()[0]}
                  alt={`${currentWord} packaging variant`}
                  className="h-[240px] lg:h-[280px] w-auto object-cover 
                            transform transition-all duration-500 ease-out
                            filter drop-shadow-lg mr-20"
                />
              </div>
            </div>
          </div>
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