import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { GoArrowUpRight } from 'react-icons/go';

const AdvancedQAContact = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Header Section */}
          

          {/* Main Content Container */}
          <div className='flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20'>
            
            {/* Image Section */}
            <div className="flex justify-center flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A7CFF] to-[#0090a9] rounded-full blur-xl opacity-20 scale-110"></div>
                <img 
                  src="/pack/still have questions V1.png" 
                  alt="Customer support representative" 
                  className="relative w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-[45%] object-contain shadow-2xl floating-animation image-hover"
                />
              </div>
            </div>

            {/* CTA Section */}
            <div className="w-full flex flex-col md:text-start text-center items-center lg:items-start max-w-xl">
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl  text-gray-800 mb-4 ">
              Still Have {' '}
              <span className="bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
                Questions?
              </span>
            </h1>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed text-center lg:text-left px-2 sm:px-0">

                  We want to make your experience easy and stress-free.
                  If you didn&apos;t find what you&apos;re looking for, please contact us—we&apos;re happy to help.
                </p>
              </div>
              
              <div className="flex justify-center items-center mt-8">
                <a
                  href='/contact'
                  className="bg-gradient-to-r from-[#0f3765] to-[#143761] text-white px-10 py-4 rounded-full font-semibold text-base md:text-lg transition-all hover:shadow-xl hover:scale-105 flex items-center gap-3"
                >
                  Contact Us
                  <GoArrowUpRight size={20} />
                </a>
              </div>           
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .floating-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        .image-hover {
          transition: transform 0.3s ease;
        }
        
        .image-hover:hover {
          transform: scale(1.05);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @media (max-width: 475px) {
          .floating-animation {
            animation: float 2s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-5px);
            }
          }
        }
      `}</style>
    </>
  );
};

export default AdvancedQAContact;