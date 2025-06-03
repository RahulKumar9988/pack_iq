  import { useEffect } from 'react';
  import Image from 'next/image';

  // Brand logo data with real company names and customizable sizes
  const brandLogos = [  
    { src: "/partner/Wasted-01.svg", size: "lg" },
    { src: "/partner/Meghalaya Collectives-01.svg", size: "lg" },
    { src: "/partner/Chaizup-01.svg", size: "lg" },
    { src: "/partner/Autralian Tea-01.svg", size: "lg" },
    { src: "/partner/Sindharam-01.svg", size: "lg" },
    { src: "/partner/Petbuffet-01.svg", size: "lg" },
    { src: "/partner/PuchkaMan-01.svg", size: "lg" },
    { src: "/partner/Cityflo-01.svg", size: "lg" },
    { src: "/partner/Pakad-01.svg", size: "lg" },
    { src: "/partner/chowman-01.svg", size: "lg" },

    { src: "/partner/Akira-01.svg", size: "lg" },
    { src: "/partner/Amalfarm-01.svg", size: "lg" },
    { src: "/partner/Anavrin-01.svg", size: "lg" },
    { src: "/partner/Anmol-01.svg", size: "lg" },
    { src: "/partner/Antu Valley-01.svg", size: "lg" },
    { src: "/partner/Blue Tea-01.svg", size: "lg" },
    { src: "/partner/Atosh.svg", size: "lg" },
    { src: "/partner/Cafoco-01.svg", size: "lg" },
    { src: "/partner/Devil You-01.svg", size: "lg" },
    { src: "/partner/Dr. Moreen-01.svg", size: "lg" },
    { src: "/partner/Ganguram-01.svg", size: "lg" },
    { src: "/partner/Gupta Brothers-01.svg", size: "lg" },
    { src: "/partner/JayShree tea-01.svg", size: "lg" },
    { src: "/partner/Kamlah Gold-01.svg", size: "lg" },
    { src: "/partner/Know Your Chai-01.svg", size: "lg" },
    { src: "/partner/Luxmi Tea-01.svg", size: "lg" },
    { src: "/partner/Makaibari Tea-01.svg", size: "lg" },
    { src: "/partner/Manomoy-01.svg", size: "lg" },
    { src: "/partner/Meri Chai-01.svg", size: "lg" },
    { src: "/partner/Patri-01.svg", size: "lg" },
    { src: "/partner/Scooby Chew-01.svg", size: "lg" },
    { src: "/partner/Tea Box-01.svg", size: "lg" },
    { src: "/partner/Teavilla-01.svg", size: "lg" },
    { src: "/partner/Vayu-01.svg", size: "lg" },
  ];

  // Size classes for different logo sizes
  const sizeClasses = {
    sm: "w-32",
    md: "w-36",
    lg: "w-40"
  };

  export default function Partners() {
    // Duplicate the logos array to create a seamless infinite scroll effect
    const duplicatedLogos = [...brandLogos, ...brandLogos];
    
    return (
      <section className="overflow-x-clip h-full py-16 px-4 bg-gradient-to-b from-gray-50 to-white ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-6xl font-bold text-blue-950 mb-4">Trusted Choice For</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We collaborate with industry-leading brands to deliver exceptional solutions and experiences
            </p>
          </div>
          
          {/* First row - moving left to right */}
          <div className="relative h-[20vh] ">
            <div className="flex ">
              <div className="flex animate-marquee">
                {brandLogos.map((logo, index) => (
                  <div 
                    key={`row1-${index}`}
                    className={`flex-shrink-0 flex items-center justify-center p-4 mx-4  ${sizeClasses[logo.size]} h-20  transition-shadow duration-300`}
                  >
                    <Image
                      src={logo.src}
                      alt={`Partner logo ${index + 1}`}
                      width={160}
                      height={60}
                      className="w-full h-auto object-contain"
                      priority={index < 5}
                    />
                  </div>
                ))}
              </div>
              
              {/* Duplicate set for seamless looping */}
              <div className="flex animate-marquee">
                {brandLogos.map((logo, index) => (
                  <div 
                    key={`row1-dup-${index}`}
                    className={`flex-shrink-0 flex items-center justify-center p-4 mx-4 ${sizeClasses[logo.size]} h-20  transition-shadow duration-300`}
                  >
                    <Image
                      src={logo.src}
                      alt={`Partner logo ${index + 1}`}
                      width={160}
                      height={60}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Second row - moving right to left (reversed direction) */}
          <div className="relative mt-8 h-20vh">
            <div className="flex ">
              <div className="flex animate-marquee-reverse">
                {[...brandLogos].reverse().map((logo, index) => (
                  <div 
                    key={`row2-${index}`}
                    className={`flex-shrink-0 flex items-center justify-center p-4 mx-4  ${sizeClasses[logo.size]} h-20  transition-shadow duration-300`}
                  >
                    <Image
                      src={logo.src}
                      alt={`Partner logo ${index + 1}`}
                      width={160}
                      height={60}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
              
              {/* Duplicate set for seamless looping */}
              <div className="flex animate-marquee-reverse">
                {[...brandLogos].reverse().map((logo, index) => (
                  <div 
                    key={`row2-dup-${index}`}
                    className={`flex-shrink-0 flex items-center justify-center p-4 mx-4  ${sizeClasses[logo.size]} h-20  transition-shadow duration-300`}
                  >
                    <Image
                      src={logo.src}
                      alt={`Partner logo ${index + 1}`}
                      width={160}
                      height={60}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          @keyframes marquee-reverse {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(0);
            }
          }
          
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          
          .animate-marquee-reverse {
            animation: marquee-reverse 30s linear infinite;
          }
          
          
        `}</style>
      </section>
    );
  }