import FAQ from '@/components/wind/home/FAQ';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

function Page() {
  return (
    <div className="w-full flex flex-col items-center px-6 md:px-12 py-12">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Left Section - Heading */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Have questions? <br /> We have the answers.
          </h1>
        </div>

        {/* Right Section - Description & Button */}
        <div className="md:w-1/2 space-y-5">
          <p className="text-gray-700 text-lg md:text-xl">
            Scaleup Finance helps startups and SMEs make smarter strategic decisions by taking their financial management to the next level. The perfect solution when your colleagues don’t speak spreadsheet.
          </p>
          <Button className="bg-gradient-to-r from-[#0A7CFF] to-[#143761] text-white px-6 py-3 rounded-full font-medium text-base transition-all duration-300 hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
            Get in touch
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full flex justify-center my-12">
        <Image
          src="/faq.png"
          alt="FAQ Illustration"
          width={708}
          height={346}
          className="rounded-lg shadow-xl"
        />
      </div>

      {/* FAQ Component */}
      <FAQ />
    </div>
  );
}

export default Page;
