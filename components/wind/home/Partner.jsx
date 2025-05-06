import { useState, useEffect } from 'react';
import Image from 'next/image';

// Brand logo data with real company names and customizable sizes
const brandLogos = [
  {  src: "/partner/Akira-01.svg", size: "lg" },
  {  src: "/partner/Amalfarm-01.svg", size: "lg" },
  {  src: "/partner/Anavrin-01.svg", size: "lg" },
  {  src: "/partner/Anmol-01.svg", size: "lg" },
  {  src: "/partner/Antu Valley-01.svg", size: "lg" },
  {  src: "/partner/Blue Tea-01.svg", size: "lg" },
  {  src: "/partner/Atosh.svg", size: "lg" },
  {  src: "/partner/Cafoco-01.svg", size: "lg" },
  {  src: "/partner/Devil You-01.svg", size: "lg" },
  {  src: "/partner/Dr. Moreen-01.svg", size: "lg" },
  {  src: "/partner/Ganguram-01.svg", size: "lg" },
  { src: "/partner/Gupta Brothers-01.svg", size: "lg" },
  {  src: "/partner/JayShree tea-01.svg", size: "lg" },
  { src: "/partner/Kamlah Gold-01.svg", size: "lg" },
  {  src: "/partner/Know Your Chai-01.svg", size: "lg" },
  {  src: "/partner/Luxmi Tea-01.svg", size: "lg" },
  {  src: "/partner/Makaibari Tea-01.svg", size: "lg" },
  {  src: "/partner/Manomoy-01.svg", size: "lg" },
  {  src: "/partner/Meri Chai-01.svg", size: "lg" },
  {  src: "/partner/Patri-01.svg", size: "lg" },
  {  src: "/partner/Scooby Chew-01.svg", size: "lg" },
  {  src: "/partner/Tea Box-01.svg", size: "lg" },
  {  src: "/partner/Teavilla-01.svg", size: "lg" },
  {  src: "/partner/Vayu-01.svg", size: "lg" },


];

// Size classes for different logo sizes
const sizeClasses = {
  sm: "w-32 md:w-36",
  md: "w-36 md:w-40",
  lg: "w-40 md:w-48"
};

export default function Partners() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Our Trusted Partners</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with industry-leading brands to deliver exceptional solutions and experiences
          </p>
        </div>
        
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center justify-items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {brandLogos.map((logo, index) => (
            <div 
              key={logo.src}
              className={`hover:border-1 flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${sizeClasses[logo.size]}`}
              style={{ 
                animationDelay: `${index * 150}ms`,
                animation: 'fadeIn 0.5s ease-in-out forwards',
              }}
            >
              <Image
                src={logo.src}
                alt={`logo`}
                width={200}
                height={80}
                className="w-full h-auto object-contain"
                priority={index < 5}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}