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
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-800 mb-4 leading-tight">
              Still Have {' '}
              <span className="bg-gradient-to-r from-[#0A7CFF] to-[#00abc9] bg-clip-text text-transparent">
                Questions?
              </span>
            </h1>
          </div>

          {/* Main Content Container */}
          <div className='flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20'>
            
            {/* Image Section */}
            <div className="flex justify-center flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A7CFF] to-[#0090a9] rounded-full blur-xl opacity-20 scale-110"></div>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz73y84uN50C9OQqaB40clMfLK2RZMABIKMZLW_F5aFnxXmV6zJQ5ikwDFPb542bDJhes&usqp=CAU" 
                  alt="Customer support representative" 
                  className="relative w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full object-cover shadow-2xl floating-animation image-hover border-2 sm:border-4 border-white"
                />
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col items-center lg:items-start max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed text-center lg:text-left px-2 sm:px-0">
                  We&apos;re here to make your experience smooth, simple, and stress-free. 
                  <br className="hidden sm:block" />
                  If you didn&apos;t find what you were looking for, let&apos;s talk.
                </p>
              </div>
              
              <Button
                className="bg-gradient-to-r from-blue-900 to-blue-950 text-white flex items-center justify-center rounded-full gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold font-inter border-none hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto mx-auto lg:mx-0 min-w-[200px] sm:min-w-[250px] max-w-[300px]"
                onClick={() => router.push('/contact')}
              >
                <span>Get In Touch</span>
                <GoArrowUpRight className="text-lg sm:text-xl md:text-2xl flex-shrink-0" />
              </Button>            
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