"use client"
import FAQ from '@/components/wind/home/FAQ';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

function Page() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 md:px-12 py-12">
      <div className="max-w-screen-xl w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-16 md:gap-32">
        {/* Left Section - Heading */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
            Have questions? <br /> We have the answers.
          </h1>
        </div>

        {/* Right Section - Description & Button */}
        <div className="md:w-1/2 space-y-5 text-center md:text-left flex flex-col md:items-start items-center">
          <p className="text-gray-700 text-base sm:text-lg md:text-xl">
            Scaleup Finance helps startups and SMEs make smarter strategic decisions by taking their financial management to the next level. The perfect solution when your colleagues don’t speak spreadsheet.
          </p>
          <Button onClick={()=>router.push('/contact')} className="bg-gradient-to-r from-[#0A7CFF] to-[#143761] text-white px-6 py-3 rounded-full font-medium text-base transition-all duration-300 hover:shadow-xl transform hover:scale-105 flex items-center justify-center md:justify-start gap-2">
            Get in touch
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full flex justify-center my-12">
        <img
          src="/faq.png"
          alt="FAQ"
          className="rounded-lg shadow-xl w-full h-64 sm:h-80 md:h-[80vh] object-cover"
        />
      </div>

      {/* FAQ Component */}
      <FAQ />
    </div>
  );
}

export default Page;
