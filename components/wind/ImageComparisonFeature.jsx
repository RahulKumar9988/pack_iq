import React, { useState, useEffect } from "react";

const ImageComparisonFeature = ({
  beforeImage = "/api/placeholder/400/400",
  afterImage = "/api/placeholder/400/400",
  beforeText = "Bye, labels...",
  afterText = "Hello, unique design!",
  beforeDescription = "",
  afterDescription = "",
  theme = "light-blue"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set visibility after component mounts for animation
    setIsVisible(true);
  }, []);

  // Theme color mapping
  const themeColors = {
    "light-blue": "bg-blue-100",
    "green": "bg-green-50",
    "gray": "bg-gray-50",
    "beige": "bg-amber-50"
  };
  
  const bgColor = themeColors[theme] || themeColors["light-blue"];
  
  // Animation classes
  const fadeInClass = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  
  return (
    <div className=" bg-gray-50 text-center text-3xl font-bold pt-10">
        <h1>Printable to match your brand</h1>
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 transition-all duration-700 md:px-20 px-10">
        
        {/* First Image with Text - "Before" */}
        
        <div className={`relative w-full lg:w-1/2 flex flex-col items-center ${fadeInClass} transition-all duration-700 delay-100 mb-10`}>
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            {/* Hexagon Background */}
            <div className={`${bgColor} w-full h-full clip-hexagon absolute top-0 left-0 transition-all duration-200 hover:shadow-lg`}></div>
            
            {/* Image Container */}
            <div className="relative w-5/5 h-4/5 z-10">
            <img 
                src={beforeImage} 
                alt={beforeText} 
                className="w-full h-full object-contain"
            />
            </div>
        </div>
        <div className="mt-6 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-teal-800">
            {beforeText}
            </h3>
            {beforeDescription && (
            <p className="text-gray-600 mt-2">{beforeDescription}</p>
            )}
        </div>
        </div>
        
        {/* Arrow for Desktop */}
        <div className={`hidden lg:flex flex-col items-center justify-center ${fadeInClass} transition-all duration-700 delay-300`}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-700">
            <path d="M10 30H50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M35 15L50 30L35 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </div>
        
        {/* Arrow for Mobile */}
        <div className={` flex lg:hidden ${fadeInClass} transition-all duration-700 delay-300`}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-700 transform md:-rotate-45 rotate-90">
            <path d="M10 30H50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M35 15L50 30L35 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </div>
        
        {/* Second Image with Text - "After" */}
        <div className={`md:mt-64 mt-0 relative w-full lg:w-1/2 flex flex-col items-center ${fadeInClass} transition-all duration-700 delay-200`}>
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            {/* Hexagon Background */}
            <div className={`${bgColor} w-full h-full clip-hexagon absolute top-0 left-0 transition-all duration-500 hover:shadow-lg`}></div>
            
            {/* Image Container */}
            <div className="relative w-5/5 h-4/5 z-10 flex items-center justify-center">
            <img 
                src={afterImage} 
                alt={afterText} 
                className="w-full h-full object-cover"
            />
            </div>
        </div>
        <div className="mt-6 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-teal-800">
            {afterText}
            </h3>
            {afterDescription && (
            <p className="text-gray-600 mt-2">{afterDescription}</p>
            )}
        </div>
        </div>
        
        {/* CSS for hexagon clip path */}
        <style jsx>{`
        .clip-hexagon {
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            transition: transform 0.3s ease-in-out;
        }
        
        .clip-hexagon:hover {
            transform: scale(1.02);
        }
        `}</style>
        </div>
        <div className="text-center mt-10 text-sm font-light md:px-48 px-0 mb-10">
            Labelled 08/15 packaging is a thing of the past! Print your designs on the entire surface of the stand-up pouches and optionally with unique special effects: Choose a natural paper look or go for transparent windows to visibly put your product in focus. Other wishes such as shimmering highlights are no problem. And all that without extra costs.
        </div>
    </div>
  );
};

export default ImageComparisonFeature;