import React, { useState, useEffect, useRef } from "react";

const ImageComparisonFeature = ({
  title = "Image Comparison",
  beforeImage = "/api/placeholder/400/400",
  afterImage = "/api/placeholder/400/400",
  beforeText = "Bye, labels...",
  afterText = "Hello, unique design!",
  beforeDescription = "",
  afterDescription = "",
  theme = "light-blue",
  sliding_desc= "product details",
  product_desc="product_desc"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Theme color mapping
  const themeColors = {
    "light-blue": {
      primary: "bg-blue-500",
      secondary: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-300",
      glow: "shadow-blue-300"
    },
    "green": {
      primary: "bg-emerald-500",
      secondary: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-300",
      glow: "shadow-emerald-300"
    },
    "purple": {
      primary: "bg-purple-500",
      secondary: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-300",
      glow: "shadow-purple-300"
    },
    "orange": {
      primary: "bg-orange-500",
      secondary: "bg-orange-100",
      text: "text-orange-600",
      border: "border-orange-300",
      glow: "shadow-orange-300"
    }
  };
  
  const colors = themeColors[theme] || themeColors["light-blue"];
  
  // Animation classes
  const fadeInClass = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Animated heading section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${fadeInClass}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative inline-block">
            <span className="bg-clip-text text-transparent bg-blue-900">
              {title}
            </span>
            <div className={`absolute -bottom-2 left-0 w-full h-1 ${colors.primary} rounded-full transform origin-left transition-all duration-500 ease-out scale-x-0 group-hover:scale-x-100`}></div>
          </h2>
          <p
            className="text-gray-600 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product_desc }}
          ></p>

        </div>
        
        {/* Main card container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* 3D Flip Card */}
          <div 
            className={`relative w-full max-w-xl perspective-1000 transition-all duration-1000 ease-out ${fadeInClass} delay-200`}
            style={{ perspective: "1000px", height: "500px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
              onClick={handleFlip}
            >
              {/* Front Side (Before) */}
              <div className={`absolute w-full h-full rounded-2xl backface-hidden border-1 shadow-2xl overflow-hidden transform-style-3d transition-all duration-500 ${isHovered && !isFlipped ? '' : ''}`}>
                {/* Card content */}
                <div className="absolute inset-0 bg-slate-50 text-white">
                  {/* Header */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4">
                    <h3 className={`text-2xl font-bold text-blue-950`}>{beforeText}</h3>
                    <div className={`px-3 py-1 bg-blue-800 text-white rounded-full text-sm flex items-center space-x-1`}>
                      <span>BEFORE</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Main image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className={`relative w-4/5 h-4/5 rounded-lg overflow-hidden transition-all duration-500 transform ${isHovered && !isFlipped ? 'scale-105' : ''}`}
                      onClick={handleFlip} // Added onClick handler here too
                    >
                      <img 
                        src={beforeImage} 
                        alt={beforeText} 
                        className="w-full h-full object-cover"
                        onClick={handleFlip} // Added onClick handler on the image
                      />
                      
                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-4 left-4 w-16 h-16">
                          <svg viewBox="0 0 100 100" fill="none">
                            <path d="M10 10L30 10L30 30" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="absolute bottom-4 right-4 w-16 h-16">
                          <svg viewBox="0 0 100 100" fill="none">
                            <path d="M90 90L70 90L70 70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  {beforeDescription && (
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-gray-300">{beforeDescription}</p>
                    </div>
                  )}
                  
                  {/* Flip instruction */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                    <span className="text-gray-950 text-sm">Tap to compare</span>
                    <div className="animate-bounce text-red-800">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Back Side (After) */}
              <div className={`absolute w-full h-full rounded-2xl backface-hidden border-2 shadow-2xl overflow-hidden rotate-y-180 transform-style-3d transition-all duration-500 ${isHovered && isFlipped ? 'scale-105' : ''}`}>
                {/* Card content */}
                <div className="absolute inset-0 text-white">
                  {/* Header */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4">
                    <h3 className={`text-2xl font-bold text-blue-950`}>{afterText}</h3>
                    <div className={`px-3 py-1 bg-blue-800 text-white rounded-full text-sm flex items-center space-x-1`}>
                      <span>AFTER</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 9l7-7 7 7M5 15l7 7 7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Main image */}
                  <div className="absolute inset-0 flex items-center justify-center" >
                    <div 
                      className={`relative w-4/5 h-4/5 rounded-lg overflow-hidden transition-all duration-500 transform ${isHovered && isFlipped ? 'scale-105' : ''}`}
                      
                    >
                      <img 
                        src={afterImage} 
                        alt={afterText} 
                        className="w-full h-full object-cover"
                        onClick={handleFlip} // Added onClick handler on the image
                      />
                      
                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-4 left-4 w-16 h-16">
                          <svg viewBox="0 0 100 100" fill="none">
                            <path d="M10 10L30 10L30 30" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="absolute bottom-4 right-4 w-16 h-16">
                          <svg viewBox="0 0 100 100" fill="none">
                            <path d="M90 90L70 90L70 70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  {afterDescription && (
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-gray-300">{afterDescription}</p>
                    </div>
                  )}
                  
                  {/* Flip instruction */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                    <span className="text-gray-950 text-sm">Tap to compare</span>
                    <div className="animate-bounce text-red-900">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Circular pulse around card */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-opacity-20 transform scale-90 transition-all duration-1000 z-0 ${isHovered ? 'animate-ping-slow opacity-50' : 'opacity-0'}`}></div>
          </div>
          
          {/* Side info area */}
          <div className={`lg:w-1/3 space-y-8 transition-all duration-1000 ${fadeInClass} delay-400`}>
            {/* Feature points */}
            <div className="space-y-4">
              <div className={`flex items-start space-x-3 p-4 rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
                <div className={`flex-shrink-0 w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <circle cx="10" cy="13" r="2" />
                    <path d="M10 15v3M14 13h.01" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Full Surface Design</h4>
                  <p className="text-gray-600 text-sm">Print your designs across the entire package with no limitations</p>
                </div>
              </div>
              
              <div className={`flex items-start space-x-3 p-4 rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
                <div className={`flex-shrink-0 w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Special Effects</h4>
                  <p className="text-gray-600 text-sm">Add natural paper textures, transparent windows, or shimmering highlights</p>
                </div>
              </div>
              
              <div className={`flex items-start space-x-3 p-4 rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
                <div className={`flex-shrink-0 w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">No Extra Costs</h4>
                  <p className="text-gray-600 text-sm">All customization options included at the standard price</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Additional info */}
        <div className={`mt-16 md:text-left text-justify px-1 mx-auto text-gray-600 transition-all duration-1000 ${fadeInClass} delay-500`}>
          <p
            className="text-gray-600 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sliding_desc }}
          ></p>
        </div>
      </div>
      
      {/* Custom CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes ping-slow {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.2;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.6;
          }
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default ImageComparisonFeature;