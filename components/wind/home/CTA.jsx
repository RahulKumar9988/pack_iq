import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function CTA() {
    const router = useRouter();
  return (
    <div>
        {/* CTA Section */}
      <div className="relative flex lg:flex-row flex-col justify-between items-center bg-gradient-to-r from-[#0A2D5E] to-[#143761] px-6 md:px-12 lg:px-32 py-12 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#0A7CFF] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#46E3FF] rounded-full blur-3xl"></div>
        </div>

        {/* Left Section - Text & Buttons */}
        <div className="relative z-10 flex flex-col gap-6 font-bold text-white text-xl sm:text-center md:text-3xl lg:text-4xl xl:text-4xl lg:text-left leading-tight md:leading-snug lg:w-1/2">
          <div>
            <p className=' font-bold '>
                Ready to build your Brand&apos;s Dream Pouch. <br /> 
            </p>
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row flex-col justify-center lg:justify-start gap-4">
            <Button
              className="bg-gradient-to-r from-[#0A7CFF] to-[#46E3FF] text-white flex items-center rounded-full gap-3 px-6 py-6 text-lg border-none hover:shadow-lg transition-all"
              onClick={()=> router.push('/packaging-type')}
            >
              Customize now
              <GoArrowUpRight />
            </Button>
            <Button
              variant="bordered"
              className="flex items-center gap-3 px-6 py-6 border-2 border-white rounded-full text-lg text-white hover:bg-white/10 transition-all"
              onClick={()=>router.push('/free-sample')}
            >
              Get sample products
            </Button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="relative mt-10 lg:mt-0 w-full lg:w-1/2 transform lg:translate-x-6">
          <div className="relative shadow-xl rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0A7CFF]/20 to-transparent z-10"></div>
            <Image
              src="/test.png"
              alt="Packaging Design"
              width={708}
              height={346}
              loading='lazy'
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTA
