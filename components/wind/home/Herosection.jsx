import React from "react";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import InfiniteScrollWallpaper from "./InfiniteScrollWallpaper";
import InfiniteScrollWallpaper2 from "./InfiniteScrollWallpaper2";


export default function HeroSection({ inter }) {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-full top-20">
      <div className="h-full">
        {/* Mobile Hero Section */}
        
        <div className="flex flex-col items-center gap-8 xs:hidden px-[30px] pt-0 max-w-[629px] relative overflow-hidden">
          {/* Floating background elements */}
          <div className="absolute inset-0 z-0">
            {/* Floating elements with different sizes and animations */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#143761]/30 to-[#1a4a7a]/30 animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${8 + i * 2}s`,
                  width: `${Math.random() * 16 + 8}px`,
                  height: `${Math.random() * 16 + 8}px`,
                }}
              />
            ))}
            
            {/* Larger floating elements */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i+8}
                className="absolute rounded-lg bg-gradient-to-br from-[#143761]/20 to-[#1a4a7a]/20 backdrop-blur-sm animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 3}s`,
                  animationDuration: `${12 + i * 2}s`,
                  width: `${Math.random() * 40 + 20}px`,
                  height: `${Math.random() * 40 + 20}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-8 xs:hidden px-[30px] pt-0 max-w-[629px]">
              <div className="flex flex-col items-center gap-3 uppercase">
                <div className="font-medium text-[#143761] text-xs">
                  A Sustainable Approach
                </div>
                <div className="text-[51px] text-center max-md:text-2xl max-lg:text-[40px] max-ml:text-[30px] leading-[60px] max-md:leading-7 max-lg:leading-[45px] max-ml:leading-[35px]">
                  <span className="font-bold text-[#143761]">Eco-Friendly </span>
                  <span className="font-medium text-[#03172BB0]">
                    Packaging Solutions
                  </span>
                </div>
                <div className="font-normal text-[#03172BB0] text-base text-center max-md:text-sm">
                  Discover innovative and sustainable packaging options that reduce
                  waste and protect our planet.
                </div>
              </div>
              <div className="flex gap-5">
                <Button
                  className={ `flex justify-center items-center border-[#143761] border-1 bg-transparent rounded-[4px] font-normal text-[#143761] text-sm px-2`}
                  variant="bordered"
                  onClick={()=>router.push('/free-sample')}
                >
                  Get sample products
                </Button>
                <Button
                  className={` flex justify-center items-center border-[#143761] border-1 bg-transparent rounded-[4px] font-normal px-2 text-sm gap-2 bg-[#143761] text-white`}
                  onClick={()=> router.push('/packaging-type')}
                >
                  Customize now <GoArrowUpRight />
                </Button>
              </div>
            </div>
          </div>
        

        {/* Desktop Hero Section */}
        <div
          className="hidden items-center border-[#282828d2] bg-cover bg-center mobile:px-5 xl:px-16 xs:px-8 border-t-1 w-full max-w-full aspect-[1440/713] md:flex"
        >
          <div className="flex flex-col gap-[60px] max-xs:hidden max-w-[629px]">
            <div className="flex flex-col gap-5 max-md:gap-1 max-lg:gap-3 max-ml:gap-2 uppercase">
              <div className="font-medium text-[#143761] text-sm">
                A Sustainable Approach
              </div>
              <div className="text-[51px] max-md:text-2xl max-lg:text-[40px] max-ml:text-[30px] leading-[60px] max-md:leading-7 max-lg:leading-[45px] max-ml:leading-[35px]">
                <div className="font-bold text-[#143761]">Eco-Friendly</div>
                <div className="font-medium text-[#03172BB0]">
                  Packaging Solutions
                </div>
              </div>
              <div className="font-medium text-[#03172BB0] text-base max-md:text-sm">
                Discover innovative and sustainable packaging options that
                reduce waste and protect our planet.
              </div>
            </div>
            <div className="flex gap-5">
              <Button className="flex justify-center items-center gap-2 bg-[#143761] rounded-[4px] font-semibold text-base text-white" onClick={()=> router.push('/packaging-type')}>
                Customize now <GoArrowUpRight />
              </Button>
              <Button
                className="flex justify-center items-center gap-2 border-[#143761] border-1 bg-transparent rounded-[4px] font-semibold text-[#143761] text-base"
                onClick={()=>router.push('/free-sample')}
                variant="bordered"
              >
                Get sample products
              </Button>
            </div>
          </div>
          <div className="gap-10 justify-center hidden lg:flex">
            <InfiniteScrollWallpaper />
            <InfiniteScrollWallpaper2 />
          </div>
        </div>
      </div>
    </div>
  );
}