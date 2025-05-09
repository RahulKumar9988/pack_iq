import React from "react";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import { FlipWords } from "../../../components/ui/flip-words";
function Hero_text() {
  const router = useRouter();
  const words = ["Solution", "Standup", "Rounded", "Rollon","Flat","Flow"]
  
  return (
    <div className="h-full w-full">
        <div className="flex flex-col items-center gap-8 xs:hidden max-w-[629px] relative overflow-hidden">
          {/* Floating background elements */}
          <div className="flex flex-col items-center gap-8 xs:hidden  pt-0 max-w-[629px]">
              <div className="flex flex-col items-center gap-3 uppercase">
                <div className="font-medium text-[#143761] text-xs">
                  A Sustainable Approach
                </div>
                <div className="text-[51px] text-center max-md:text-2xl max-lg:text-[40px] max-ml:text-[30px] leading-[60px] max-md:leading-7 max-lg:leading-[45px] max-ml:leading-[35px]">
                  <span className="font-bold text-[#143761]">Eco-Friendly </span>
                  <span className="font-medium text-[#000000]">
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
                  className={ `flex justify-center rounded-full items-center border-[#143761] border-1 bg-transparent font-normal text-[#143761] text-sm px-2`}
                  variant="bordered"
                  onClick={()=>router.push('/free-sample')}
                >
                  Get sample products
                </Button>
                <Button
                  className={` flex justify-center items-center border-[#143761] border-1 bg-transparent rounded-full font-normal px-2 text-sm gap-2 bg-[#143761] text-white`}
                  onClick={()=> router.push('/packaging-type')}
                >
                  Customize now <GoArrowUpRight />
                </Button>
              </div>
            </div>
          </div>
        

        {/* Desktop Hero Section */}
        <div className="hidden items-center  bg-cover bg-center mobile:px-5 xs:px-8 w-full md:flex h-full"
        >
          <div className="flex flex-col gap-[60px] max-xs:hidden w-full px-10">
            <div className="flex flex-col gap-5 max-md:gap-1 max-lg:gap-3 max-ml:gap-2 uppercase">
              <div className="font-medium text-[#143761] text-xl">
                A Sustainable Approach
              </div>
              <div className="text-[51px] max-md:text-2xl max-lg:text-[40px] max-ml:text-[30px] leading-[60px] max-md:leading-7 max-lg:leading-[45px] max-ml:leading-[35px]">
                <div className="font-bold text-[60px] text-[#143761]">Eco-Friendly</div>
                <div className="font-medium text-[#000000]">
                  Packaging <FlipWords words={words} /> <br />
                </div>
              </div>
              <div className="font-medium text-[#03172BB0] text-base max-md:text-sm">
                Discover innovative and sustainable packaging options that
                reduce waste and protect our planet.
              </div>
            </div>
            <div className="flex gap-5">
              <Button className="flex justify-center items-center gap-2 bg-[#143761] rounded-full font-semibold text-base text-white" onClick={()=> router.push('/packaging-type')}>
                Customize now <GoArrowUpRight />
              </Button>
              <Button
                className="flex justify-center items-center gap-2 border-[#143761] border-1 bg-transparent rounded-full font-semibold text-[#143761] text-base"
                onClick={()=>router.push('/free-sample')}
                variant="bordered"
              >
                Get sample products
              </Button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Hero_text
