import Image from 'next/image';
import React from 'react';

const PackagingAchievements = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
          <div className="flex justify-between items-center">
            <div className="w-full font-semibold text-[#143761] text-3xl md:text-4xl text-center">
              Why we are best in packaging industry?
            </div>
            {/* <div className="flex gap-2 xs:hidden">
              <HiOutlineArrowLeft className="text-slate-500" />
              <HiOutlineArrowRight />
            </div> */}
          </div>
          <div className="w-full  flex flex-wrap justify-center gap-5 max-sm:gap-2 max-lg:gap-4">
            <div className="flex gap-5 max-md:gap-2 max-xs:hidden">
              <div className="flex flex-col gap-5 max-sm:gap-2 max-lg:gap-4">
                <div className="flex gap-5 max-sm:gap-2 max-lg:gap-4">
                  <div>
                    <Image
                      src="/homepage3.svg"
                      alt="3"
                      width={489}
                      height={259}
                    />
                  </div>
                  <div>
                    <Image
                      src="/homepage4.svg"
                      alt="4"
                      width={290}
                      height={259}
                    />
                  </div>
                </div>
                <div className="flex gap-5 max-sm:gap-2 max-lg:gap-4">
                  <div className="flex flex-col gap-5 max-sm:gap-2 max-lg:gap-4">
                    <Image
                      src="/homepage5.svg"
                      alt="5"
                      width={370}
                      height={204}
                    />
                    <Image
                      src="/homepage6.svg"
                      alt="6"
                      width={370}
                      height={204}
                    />
                  </div>
                  <div>
                    <Image
                      src="/homepage7.svg"
                      alt="7"
                      width={409}
                      height={430}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 max-sm:gap-2 max-lg:gap-4">
                <div>
                  <Image
                    src="/homepage8.svg"
                    alt="8"
                    width={415}
                    height={367}
                  />
                </div>
                <div>
                  <Image
                    src="/homepage9.svg"
                    alt="9"
                    width={415}
                    height={322}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 max-sm:gap-2 max-lg:gap-4 xs:hidden">
              <div className="flex gap-5 max-sm:gap-2 max-lg:gap-4">
                <div className="relative w-1/2 h-full">
                  <Image
                    src="/homepage3.svg"
                    alt="3"
                    className="rounded-[10px]"
                    layout="fill" // Use layout="fill" to make the image fill the parent
                    objectFit="cover" // Optional: to maintain aspect ratio
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/homepage4.svg"
                    alt="4"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
              <div className="relative w-full aspect-[370/235]">
                <Image
                  src="/homepage7.svg"
                  alt="7"
                  fill
                  className="rounded-[10px]"
                  objectFit="cover" // Use "fill" to stretch the image to fit the parent
                />
              </div>
              <div className="flex gap-5 max-sm:gap-2 max-lg:gap-4">
                <div className="relative w-1/2">
                  <Image
                    src="/homepage5.svg"
                    alt="5"
                    className="rounded-[10px]"
                    layout="fill" // Use layout="fill" to make the image fill the parent
                    objectFit="cover" // Optional: to maintain aspect ratio
                  />
                </div>
                <div className="relative w-1/2">
                  <Image
                    src="/homepage6.svg"
                    alt="6"
                    width={370}
                    layout="responsive"
                    height={204}
                  />
                </div>
              </div>
              <div>
                <Image
                  src="/homepage8-1.svg"
                  alt="8"
                  width={370}
                  height={139}
                  layout="responsive"
                />
              </div>
              <div>
                <Image
                  src="/homepage9-1.svg"
                  alt="9"
                  layout="responsive"
                  width={415}
                  height={322}
                />
              </div>
            </div>
          </div>
        </div>
  );
};

export default PackagingAchievements;