import { useState, useEffect, useRef } from 'react';

export default function LinkedPortraitGallery() {
  const words = ["Solution", "Standup", "Rounded", "Rollon", "Flat", "Flow"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const preloadedImages = useRef(new Set());
  
  // Fixed image mapping with unique images for each word
  const imageMapping = {
    "Solution": [
      "/CENTER SEAL BAR/Center seal bar 03.png",
      "/CENTER SEAL BAR/Center seal bar.png",
      "/CENTER SEAL BAR/Center seal bar 04.png"
    ],
    "Flat": [
      "/Flat bottom/Flat bottom.png",
      "/Flat bottom/Flat bottom 02.png",
      "/Flat bottom/Flat bottom 03-01.png"
    ],
    "Standup": [
      "/STAND UP/STAND UP.png",
      "/STAND UP/Nut TREES STAND UP POUCH 2.png",
      "/STAND UP/Nut TREES STAND UP POUCH 3.png"
    ],
    "Rounded": [
      "/THREE SIDE SEAL/Three side seal.png",
      "/THREE SIDE SEAL/Three side seal 2.png",
      "/THREE SIDE SEAL/Three side seal 3.png"
    ],

  };

  // Colors mapping for background circles
  const colorMapping = {
    "Solution": "from-white to-white",
    "Standup": "from-white to-white",
    "Rounded": "from-white to-white",
    "Rollon": "from-white to-white",
    "Flat": "from-white to-white",
  };

  // Preload all images for smooth transitions
  useEffect(() => {
    const preloadImages = async () => {
      const allImages = Object.values(imageMapping).flat();
      const uniqueImages = [...new Set(allImages)]; // Remove duplicates
      
      const promises = uniqueImages.map(src => {
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
          img.onerror = () => resolve(src);
          img.src = src;
        });
      });
      
      await Promise.all(promises);
      setIsLoading(false);
    };

    preloadImages();
  }, []);

  // Simulate FlipWords functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prevWord => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        const nextWord = words[nextIndex];
        
        // Trigger animation
        setAnimationKey(prev => prev + 1);
        
        return nextWord;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Get images for current word
  const getCurrentImages = () => {
    return imageMapping[currentWord] || imageMapping["Solution"];
  };

  // Get current gradient colors
  const getCurrentGradient = () => {
    return colorMapping[currentWord] || colorMapping["Solution"];
  };

  return (
    <div className="relative w-full mt-[-10px] sm:mt-[-15px] md:mt-[-30px] lg:mt-[-30px] xl:mt-[-30px] 2xl:mt-[-30px]">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Gallery Section */}
      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {/* Main featured image - shown on all screens */}
          <div className="relative group">
            <div 
              key={`main-${animationKey}-${currentWord}`}
              className="w-[200px] h-[300px] sm:w-[220px] sm:h-[320px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] md:mt-20 
                         flex items-center justify-center relative 
                         transition-all duration-700 ease-out
                         transform 
                         animate-fadeInScale"
            >
              {/* Background gradient circle */}
              <div 
                className={`absolute inset-0 rounded-full scale-110 animate-pulse`}
              />
              
              <img 
                src={getCurrentImages()[0]}
                alt={`${currentWord} packaging main`}
                className="w-full h-full object-contain 
                          transform transition-all duration-700 ease-out
                          filter drop-shadow-xl relative z-10"
                style={{
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              />
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={`particle-${animationKey}-${i}`}
                    className="absolute w-2 h-2 rounded-full animate-float"
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
          
          {/* Right column portraits - hidden on mobile, shown on md and larger */}
          <div className="hidden md:flex md:flex-col md:gap-8 lg:gap-12">
            {/* Top right portrait */}
            <div 
              key={`top-${animationKey}-${currentWord}`}
              className="group relative animate-fadeInScale"
              style={{
                animationDelay: '0.3s',
                animationFillMode: 'both'
              }}
            >
              <div className="w-[150px] h-[200px] md:w-[180px] md:h-[210px] lg:w-[180px] lg:h-[240px] 
                             flex items-center justify-center relative 
                             transition-all duration-500 ease-out
                             transform">
                {getCurrentImages()[1] && (
                  <img 
                    src={getCurrentImages()[1]}
                    alt={`${currentWord} packaging variant 1`}
                    className="w-full h-full object-contain 
                              transform transition-all duration-500 ease-out
                              filter drop-shadow-lg md:mt-5"
                  />
                )}
              </div>
            </div>
            
            {/* Bottom right portrait */}
            <div 
              key={`bottom-${animationKey}-${currentWord}`}
              className="relative group animate-fadeInScale"
              style={{
                animationDelay: '0.6s',
                animationFillMode: 'both'
              }}
            >
              <div className="w-[180px] h-[240px] md:w-[230px] md:h-[210px] lg:w-[210px] lg:h-[270px] 
                             flex items-center justify-center relative 
                             transition-all duration-500 ease-out
                             transform">
                {getCurrentImages()[1] && (
                  <img 
                    src={getCurrentImages()[2]}
                    alt={`${currentWord} packaging variant 2`}
                    className="w-full md:mr-20 md:mt-[-10px] h-full object-contain 
                              transform transition-all duration-500 ease-out
                              filter drop-shadow-lg"
                  />
                )}
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
            transform: scale(0.9) translateY(20px);
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

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
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

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Smooth transitions for all elements */
        * {
          transition-property: transform, opacity, box-shadow, filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Remove any duplicate animations */
        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}