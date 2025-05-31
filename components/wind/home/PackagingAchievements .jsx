import { image } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

const PackagingAchievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const achievements = [
    {
      id: 1,
      icon: "📦",
      title: "Low MOQ Hassles",
      image: "/why_us/Low MOQ-01.png",
      alt: "Low MOQ Icon",
      description: "Order exactly what you need, no minimum quantity required.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      shadowColor: "shadow-purple-200"
    },
    {
      id: 2,
      icon: "⚡",
      title: "Lightning-Fast Turnaround",
      image: "/why_us/Fast Turnaround-01.png",
      alt: "Fast Turnaround Icon",
      description: "Get your packaging ready quickly, so you never miss a deadline.",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      shadowColor: "shadow-yellow-200"
    },
    {
      id: 3,
      icon: "💡",
      title: "Expert Packaging Advice",
      image: "/why_us/Smart packaging-01.png",
      alt: "Expert Advice Icon",
      description: "Guidance to optimize packaging for market success.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      shadowColor: "shadow-green-200"
    },
    {
      id: 4,
      icon: "🚚",
      title: "Door-to-Door Delivery",
      image: "/why_us/Door to Door deliver-01.png",
      alt: "Delivery Icon",
      description: "Fast, reliable delivery right to your doorstep.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      shadowColor: "shadow-blue-200"
    },
    {
      id: 5,
      icon: "🛒",
      title: "Easy Online Ordering",
      image: "/why_us/online order-01.png",
      alt: "Online Ordering Icon",
      description: "Customize and order your pouches directly through our user-friendly platform.",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      shadowColor: "shadow-indigo-200"
    },
    {
      id: 6,
      icon: "🖨️",
      title: "High-Quality Digital Printing",
      image: "/why_us/Digital printing-01.png",
      alt: "Digital Printing Icon",
      description: "Sharp, vibrant, and flexible designs with fast digital print technology.",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      shadowColor: "shadow-pink-200"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className={`relative z-10 flex flex-col gap-16 w-full max-w-7xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-950 via-blue-700 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
              The Packiq Advantage 
            </h2>
            <div className="text-xl md:text-2xl font-medium text-gray-600">
              What Sets Us Apart ✨
            </div>
          </div>
          
          {/* Animated underline */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`group relative bg-gradient-to-br ${achievement.bgGradient} p-8 rounded-3xl border border-white/20 backdrop-blur-sm 
                         hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer
                         shadow-xl hover:shadow-2xl ${achievement.shadowColor} hover:shadow-lg
                         ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(achievement.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glowing border effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${achievement.gradient} p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${achievement.bgGradient}`}></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Icon with animation */}
                <div className={`text-6xl mb-4 transform transition-all duration-300 ${
                  hoveredCard === achievement.id ? 'scale-110' : ''
                }`}>
                  <img src={achievement.image} alt={achievement.alt} className="w-40 h-40" /> 
                </div>
                
                {/* Animated icon background */}
                <div className={`absolute top-0 w-20 h-20 bg-gradient-to-r ${achievement.gradient} rounded-full opacity-20 blur-xl 
                               transition-all duration-300 ${hoveredCard === achievement.id ? 'scale-150' : 'scale-100'}`}></div>
                
                {/* Title */}
                <h3 className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent leading-tight`}>
                  {achievement.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 text-base leading-relaxed">
                  {achievement.description}
                </p>
                
                {/* Hover indicator */}
                <div className={`w-8 h-1 bg-gradient-to-r ${achievement.gradient} rounded-full transition-all duration-300 ${
                  hoveredCard === achievement.id ? 'w-16' : 'w-8'
                }`}></div>
              </div>
              
              {/* Sparkle effect */}
              {hoveredCard === achievement.id && (
                <>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 left-2 w-1 h-1 bg-white rounded-full animate-bounce"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default PackagingAchievements;