import React, { useState, useEffect, useCallback, useMemo } from 'react';

const PackagingAchievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Use requestAnimationFrame for smoother initial animation
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Memoize achievements data to prevent re-creation on each render
  const achievements = useMemo(() => [
    {
      id: 1,
      icon: "📦",
      title: "Low MOQ Hassles",
      image: "/why_us/Low MOQ-01.png",
      alt: "Low MOQ Icon",
      description: "Order exactly what you need, no minimum quantity required.",
    },
    {
      id: 2,
      icon: "⚡",
      title: "Lightning-Fast Turnaround",
      image: "/why_us/Fast Turnaround-01.png",
      alt: "Fast Turnaround Icon",
      description: "Get your packaging ready quickly, so you never miss a deadline.",
    },
    {
      id: 3,
      icon: "💡",
      title: "Expert Packaging Advice",
      image: "/why_us/Smart packaging-01.png",
      alt: "Expert Advice Icon",
      description: "Guidance to optimize packaging for market success.",
    },
    {
      id: 4,
      icon: "🚚",
      title: "Door-to-Door Delivery",
      image: "/why_us/Door to Door deliver-01.png",
      alt: "Delivery Icon",
      description: "Fast, reliable delivery right to your doorstep.",
    },
    {
      id: 5,
      icon: "🛒",
      title: "Easy Online Ordering",
      image: "/why_us/online order-01.png",
      alt: "Online Ordering Icon",
      description: "Customize and order your pouches directly through our user-friendly platform.",
    },
    {
      id: 6,
      icon: "🖨️",
      title: "High-Quality Digital Printing",
      image: "/why_us/Digital printing-01.png",
      alt: "Digital Printing Icon",
      description: "Sharp, vibrant, and flexible designs with fast digital print technology.",
    }
  ], []);

  // Optimize hover handlers with useCallback
  const handleMouseEnter = useCallback((id) => {
    setHoveredCard(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-white to-indigo-100 py-10 px-4">
      {/* Simplified background elements - removed expensive animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
      </div>

      <div className={`relative z-10 flex flex-col gap-16 w-full max-w-7xl mx-auto transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl text-blue-950 font-semibold mb-4 leading-tight">
              The Packiq Advantage 
            </h2>
            <div className="text-xl md:text-2xl font-medium text-gray-600">
              What Sets Us Apart ✨
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
        </div>
        
        {/* Cards Grid - Optimized for performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="group relative rounded-3xl border border-blue-200 bg-white/80 backdrop-blur-sm w-full max-w-80 h-72 mx-auto
                         transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-1
                         will-change-transform"
              onMouseEnter={() => handleMouseEnter(achievement.id)}
              onMouseLeave={handleMouseLeave}
            > 
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-2 h-full">
                {/* Image container with optimized loading */}
                <div className={`flex-shrink-0 transition-transform duration-300 ease-out ${
                  hoveredCard === achievement.id ? 'scale-105' : 'scale-100'
                }`}>
                  <img 
                    src={achievement.image} 
                    alt={achievement.alt} 
                    className="w-32 h-32 object-cover"
                    loading="lazy"
                    decoding="async"
                  /> 
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent leading-tight">
                  {achievement.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 text-base leading-relaxed flex-grow flex items-center">
                  {achievement.description}
                </p>
              </div>
              
              {/* Simplified sparkle effect - only show on hover */}
              {hoveredCard === achievement.id && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-300 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagingAchievements;