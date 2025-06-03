import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
// import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';

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
        <div className="relative z-10 flex flex-col gap-6 font-bold text-white text-xl sm:text-center md:text-5xl lg:text-5xl xl:text-5xl lg:text-left leading-tight md:leading-snug lg:w-1/2">
          <div>
            <p className=' font-bold  '>
                Ready to build your <br /> <span className='text-6xl'> Brand&apos;s Dream Pouch. </span> <br /> 
            </p>
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row flex-col justify-center lg:justify-start gap-4">
            <Button
              className="bg-gradient-to-r from-[#0A7CFF] to-[#46E3FF] text-white flex items-center rounded-full gap-3 px-6 py-6 text-lg border-none hover:shadow-lg transition-all"
              onClick={()=> router.push('/packaging-type')}
            >
              Customize Now
              <GoArrowUpRight />
            </Button>
            <Button
              variant="bordered"
              className="flex items-center gap-3 px-6 py-6 border-2 border-white rounded-full text-lg text-white hover:bg-white/10 transition-all"
              onClick={()=>router.push('/free-sample')}
            >
              Get Free Sample 
            </Button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="relative mt-10 lg:mt-0 w-full lg:w-1/2 transform lg:translate-x-6">
  <div className="relative shadow-2xl rounded-2xl overflow-hidden">
    {/* Multiple gradient overlays for better blending */}
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/20 via-blue-200/10 to-transparent z-10 pointer-events-none rounded-2xl"></div>
    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-200/10 to-blue-200/25 z-10 pointer-events-none rounded-2xl"></div>
    
    {/* Image with blurred borders */}
    <img
      src="/test.png"
      alt="Packaging Design"
      className="rounded-2xl w-full h-96 object-cover mix-blend-multiply"
      style={{
        maskImage: `
          radial-gradient(ellipse at center, 
            black 60%, 
            rgba(0,0,0,0.8) 75%, 
            rgba(0,0,0,0.4) 85%, 
            transparent 95%
          )
        `,
        WebkitMaskImage: `
          radial-gradient(ellipse at center, 
            black 60%, 
            rgba(0,0,0,0.8) 75%, 
            rgba(0,0,0,0.4) 85%, 
            transparent 95%
          )
        `
      }}
    />
  </div>
</div>

      </div>
    </div>
  )
}

export default CTA
