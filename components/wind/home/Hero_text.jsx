import React from "react";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";
// import { FlipWords } from "../../../components/ui/flip-words";
// import { NumberTickerDemo } from "./NumberTickerDemo";

function Hero_text() {
  const router = useRouter();
  // const words = ["Solution", "Standup", "Rounded", "Rollon", "Flat", "Flow"];

  return (
    <div className="w-full sm:pt-8 md:px-6 md:mt-20">
      {/* Unified Hero Section for All Devices */}
      <div className="flex flex-col justify-center items-center w-full">
        {/* Hero Content */}
        <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 w-full max-w-5xl">
          {/* Top Text Section */}
          <div className="flex flex-col items-center text-start gap-2 sm:gap-3 md:gap-5 uppercase w-full">
            
            <div className="w-full">
              <div className="font-bold bg-gradient-to-r from-[#143761] via-[#1e4a73] to-[#143761] bg-clip-text text-transparent text-2xl sm:text-4xl md:text-[40px] lg:text-[50px] leading-tight sm:leading-snug md:leading-[45px] lg:leading-[60px]">
                Turning Your Product Ideas Into{" "}
                <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">
                  Shelf-Stopping Packs
                </span>
              </div>
              
              {/* <div className="font-medium text-[#000000] text-xl sm:text-3xl md:text-[30px] lg:text-[51px] leading-tight sm:leading-snug md:leading-[35px] lg:leading-[60px]">
                Packaging <FlipWords words={words} />
              </div> */}
            </div>
            
            <div className="hidden md:block font-normal text-[#000000] text-sm sm:text-base w-full max-w-4xl mt-2 sm:mt-0 normal-case text-start opacity-80">

              <ul className="space-y-3 sm:space-y-4 list-none">
                <li className="leading-relaxed">
                  At Packiq, we inspire bold ideas, innovate smarter packaging solutions, and create designs that bring your brand to life.
                </li>

                <li className="leading-relaxed">
                  With low MOQs, no cylinder costs, fast digital printing, and complete design freedom, we eliminate the barriers that hold small businesses back.
                </li>

                <li className="leading-relaxed">
                  Packiq is your one-stop packaging partner — fast, affordable, and refreshingly unique.
                </li>
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6 sm:mt-8 md:mt-10 w-full sm:w-auto justify-center">
            <Button 
              className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#143761] to-[#1e4a73] hover:from-[#1e4a73] hover:to-[#143761] rounded-full font-normal sm:font-semibold text-sm sm:text-base text-white px-4 py-2 w-full sm:w-auto transition-all duration-300"
              onClick={() => router.push('/packaging-type')}
            >
              Customize now <GoArrowUpRight />
            </Button>
            
            <Button
              className="flex justify-center items-center gap-2 border-[#143761] border-1 bg-transparent hover:bg-gradient-to-r hover:from-[#143761] hover:to-[#1e4a73] rounded-full font-normal sm:font-semibold text-[#143761] hover:text-white text-sm sm:text-base px-4 py-2 w-full sm:w-auto transition-all duration-300"
              onClick={() => router.push('/free-sample')}
              variant="bordered"
            >
              Get sample products
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero_text;