import React from "react";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import { FlipWords } from "../../../components/ui/flip-words";
import { NumberTickerDemo } from "./NumberTickerDemo";

function Hero_text() {
  const router = useRouter();
  const words = ["Solution", "Standup", "Rounded", "Rollon", "Flat", "Flow"];
  
  return (
    <div className="w-full pt-20">
      {/* Unified Hero Section for All Devices */}
      <div className="flex flex-col justify-center items-center w-full">
        {/* Hero Content */}
        <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 w-full max-w-5xl">
          {/* Top Text Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 md:gap-5 uppercase w-full">
            <div className="font-medium text-[#143761] text-xs sm:text-sm md:text-xl">
              A Sustainable Approach
            </div>
            
            <div className="w-full">
              <div className="font-bold text-[#143761] text-2xl sm:text-4xl md:text-[40px] lg:text-[60px] leading-tight sm:leading-snug md:leading-[45px] lg:leading-[60px]">
                Eco-Friendly
              </div>
              
              <div className="font-medium text-[#000000] text-xl sm:text-3xl md:text-[30px] lg:text-[51px] leading-tight sm:leading-snug md:leading-[35px] lg:leading-[60px]">
                Packaging <FlipWords words={words} />
              </div>
            </div>
            
            <div className="font-normal text-[#03172BB0] text-sm sm:text-base w-full max-w-lg mt-2 sm:mt-0 normal-case">
              Discover innovative and sustainable packaging options that
              reduce waste and protect our planet.
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6 sm:mt-8 md:mt-10 w-full sm:w-auto">
            <Button 
              className="flex justify-center items-center gap-2 bg-[#143761] rounded-full font-normal sm:font-semibold text-sm sm:text-base text-white px-4 py-2 w-full sm:w-auto"
              onClick={() => router.push('/packaging-type')}
            >
              Customize now <GoArrowUpRight />
            </Button>
            
            <Button
              className="flex justify-center items-center gap-2 border-[#143761] border-1 bg-transparent rounded-full font-normal sm:font-semibold text-[#143761] text-sm sm:text-base px-4 py-2 w-full sm:w-auto"
              onClick={() => router.push('/free-sample')}
              variant="bordered"
            >
              Get sample products
            </Button>
          </div>
        </div>

        {/* Number Ticker Section */}
        <div className="flex flex-row justify-around w-full items-center text-center mt-8 sm:mt-12 md:mt-16 gap-6 sm:gap-4">
          <NumberTickerDemo text={"Our Partners"} />
          <NumberTickerDemo text={"Quantities"} />
          <NumberTickerDemo text={"Customers"} />
        </div>
      </div>
    </div>
  );
}

export default Hero_text;