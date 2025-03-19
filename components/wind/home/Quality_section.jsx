import Image from 'next/image'
import React from 'react'

function Quality_section() {
  return (
    <div>
         <div className="flex flex-col justify-center items-center gap-10 bg-[#FFEADB] ml:px-[100px] ml:py-[70px] max-sm:p-4 sm:p-10">
          <div className="max-w-full font-semibold text-[#143761] text-[32px] text-center leading-[43px]">
            Here you will find much more than just packaging
          </div>
          <div className="w-full overflow-hidden">
            <div className="max-sm:flex gap-5 sm:gap-[30px] grid grid-cols-2 ml:grid-cols-3 overflow-x-scroll scrollbar-hide">
              <div className="flex flex-col gap-8 bg-white p-4 md:p-10 rounded-[10px] max-sm:min-w-[300px]">
                <Image
                  src="/fxemoji_star.svg"
                  alt="star emoji"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col gap-4">
                  <div className="font-medium text-xl">
                    Best Quality Of Packaging
                  </div>
                  <div className="">
                    Best quality packaging combines durability, functionality,
                    and aesthetics to protect products while leaving a lasting
                    impression. It reflects the brand&apos;s commitment to
                    excellence and elevates the customer experience
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 bg-white p-4 md:p-10 rounded-[10px] max-sm:min-w-[300px]">
                <Image
                  src="/fxemoji_star.svg"
                  alt="star emoji"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col gap-4">
                  <div className="font-medium text-xl">
                    Best Quality Of Packaging
                  </div>
                  <div className="">
                    Best quality packaging combines durability, functionality,
                    and aesthetics to protect products while leaving a lasting
                    impression. It reflects the brand&apos;s commitment to
                    excellence and elevates the customer experience
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 bg-white p-4 md:p-10 rounded-[10px] max-sm:min-w-[300px]">
                <Image
                  src="/fxemoji_star.svg"
                  alt="star emoji"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col gap-4">
                  <div className="font-medium text-xl">
                    Best Quality Of Packaging
                  </div>
                  <div className="">
                    Best quality packaging combines durability, functionality,
                    and aesthetics to protect products while leaving a lasting
                    impression. It reflects the brand&apos;s commitment to
                    excellence and elevates the customer experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Quality_section