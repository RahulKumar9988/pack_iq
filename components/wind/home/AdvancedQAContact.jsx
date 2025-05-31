import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { GoArrowUpRight } from 'react-icons/go';

const AdvancedQAContact = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full py-2 px-4 sm:px-6 bg-white flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Header Section */}
          <div className="mb-12">
            <h1 className=" font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4 leading-tight">
              Still Have Some{' '}
              <span className="bg-gradient-to-r from-[#0A7CFF] to-[#00abc9] bg-clip-text text-transparent">
                Questions?
              </span>
            </h1>
          </div>

          {/* Image Section */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A7CFF] to-[#0090a9] rounded-full blur-xl opacity-20 scale-110"></div>
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz73y84uN50C9OQqaB40clMfLK2RZMABIKMZLW_F5aFnxXmV6zJQ5ikwDFPb542bDJhes&usqp=CAU" 
                alt="Customer support representative" 
                className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full object-cover shadow-2xl floating-animation image-hover border-4 border-white"
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            <Button
              className="bg-gradient-to-r from-blue-900 to-blue-950 text-white flex items-center justify-center rounded-full gap-3 px-2 py-4 text-lg font-semibold font-inter border-none hover:shadow-2xl hover:scale-[1.0] transition-all duration-300 w-full sm:w-auto mx-auto min-w-[250px]"
              onClick={() => router.push('/contact')}
            >
              Get In Touch
              <GoArrowUpRight className="text-2xl" />
            </Button>            
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedQAContact;