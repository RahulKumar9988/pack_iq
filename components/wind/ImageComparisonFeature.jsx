import React, { useState, useEffect, useRef } from "react";

const ImageComparisonFeature = ({
  title = "Image Comparison",
  beforeImage = "https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Before",
  afterImage = "https://via.placeholder.com/400x400/10B981/FFFFFF?text=After",
  beforeText = "Bye, labels...",
  afterText = "Hello, unique design!",
  beforeDescription = "",
  afterDescription = "",
  theme = "light-blue",
  sliding_desc = "product details"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
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

  const themeColors = {
    "light-blue": {
      primary: "bg-blue-500",
      secondary: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-300",
      glow: "shadow-blue-300"
    },
    green: {
      primary: "bg-emerald-500",
      secondary: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-300",
      glow: "shadow-emerald-300"
    },
    purple: {
      primary: "bg-purple-500",
      secondary: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-300",
      glow: "shadow-purple-300"
    },
    orange: {
      primary: "bg-orange-500",
      secondary: "bg-orange-100",
      text: "text-orange-600",
      border: "border-orange-300",
      glow: "shadow-orange-300"
    }
  };

  const colors = themeColors[theme] || themeColors["light-blue"];
  const fadeInClass = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${fadeInClass}`}>
          <p
            className="text-gray-600 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sliding_desc }}
          ></p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div
            className={`relative w-full max-w-xl transition-all duration-1000 ease-out ${fadeInClass} delay-200`}
            style={{ perspective: "1000px", height: "500px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`relative w-full h-full cursor-pointer transition-transform duration-700`}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
              }}
              onClick={handleFlip}
            >
              {/* Front Side */}
              <div 
                className="absolute w-full h-full rounded-2xl border shadow-2xl overflow-hidden transition-all duration-500 bg-slate-50"
                style={{
                  backfaceVisibility: "hidden"
                }}
              >
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4">
                  <h3 className="text-2xl font-bold text-blue-950">{beforeText}</h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5 rounded-lg overflow-hidden">
                    <img
                      src={beforeImage}
                      alt={beforeText}
                      className="w-full h-full object-contain transition-transform duration-300"
                    />
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
                {beforeDescription && (
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-gray-600">{beforeDescription}</p>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  <span className="text-gray-950 text-sm">Tap to compare</span>
                  <div className="animate-bounce text-red-800">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Back Side */}
              <div 
                className="absolute w-full h-full rounded-2xl border-2 shadow-2xl overflow-hidden transition-all duration-500"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4">
                  <h3 className="text-2xl font-bold text-emerald-950">{afterText}</h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5 rounded-lg overflow-hidden">
                    <img
                      src={afterImage}
                      alt={afterText}
                      className="w-full h-full object-contain transition-transform duration-300"
                    />
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
                {afterDescription && (
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-gray-600">{afterDescription}</p>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  <span className="text-gray-950 text-sm">Tap to flip back</span>
                  <div className="animate-bounce text-red-900">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hover effect */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-blue-200 bg-opacity-20 transform scale-90 transition-all duration-1000 z-0 pointer-events-none ${
                isHovered ? "animate-pulse opacity-50" : "opacity-0"
              }`}
            ></div>
          </div>

          {/* Feature Details */}
          <div className={`lg:w-1/3 space-y-8 transition-all duration-1000 ${fadeInClass} delay-400`}>
            {/* Feature Items */}
            {[
              {
                title: "Full Surface Design",
                desc: "Print your designs across the entire package with no limitations"
              },
              {
                title: "Special Effects",
                desc: "Add natural paper textures, transparent windows, or shimmering highlights"
              },
              {
                title: "No Extra Costs",
                desc: "All customization options included at the standard price"
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-start space-x-3 p-4 rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white">
                  <span className="font-bold">{i + 1}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonFeature;