import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';

function Innovations() {
  const features = [
    {
      title: "Best Quality Of Packaging",
      description: "Lorem ipsum is a placeholder text commonly used to demonstrate"
    },
    {
      title: "Best Quality Of Packaging",
      description: "Lorem ipsum is a placeholder text commonly used to demonstrate"
    },
    {
      title: "Best Quality Of Packaging",
      description: "Lorem ipsum is a placeholder text commonly used to demonstrate"
    }
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 gap-8 lg:gap-12">
      {/* Left side (Content) */}
      <div className="flex flex-col justify-between w-full md:w-1/2 gap-8">
        {/* Heading and description */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="font-semibold text-[#143761] text-2xl md:text-3xl lg:text-4xl text-center md:text-left">
            Accelerating Innovations In Packaging
          </h2>
          <p className="text-[#143761] text-sm md:text-base text-center md:text-left max-w-[535px]">
            Lorem ipsum is a placeholder text commonly used to demonstrate
            the visual form of a document or a typeface without relying on
            meaningful content.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Image
                  src="/homepagepkg.svg"
                  alt="Package icon"
                  width={55}
                  height={55}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center md:justify-start mt-4">
          <Button className="flex justify-center items-center gap-2 bg-[#143761] rounded-md px-6 py-3 font-semibold text-base text-white">
            Customize now <GoArrowUpRight />
          </Button>
        </div>
      </div>

      {/* Right side (Image) */}
      <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-[3/4] lg:aspect-[706/723]">
        <Image 
          src="/homepage2.svg" 
          alt="Packaging innovation" 
          className="rounded-lg" 
          fill 
          style={{ objectFit: "cover" }}
        />
        <div className="bottom-0 left-0 absolute flex flex-col gap-4 bg-[#143761] p-4 md:p-6 lg:p-10 max-w-[376px] w-full md:w-4/5">
          <div className="font-semibold text-sm md:text-base text-white">
            We produce sustainable packaging for all type of businesses
          </div>
          <div className="text-white/75 text-xs md:text-sm">
            Lorem ipsum may be used as a placeholder before the final copy
            is available.
          </div>
          <div className="flex items-center gap-4 text-[#F47A1F] text-sm cursor-pointer">
            View reviews
            <FaArrowRightLong />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Innovations;