"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import Link from "next/link";

export default function TabBar({ content }) {
  const pathName = usePathname();

  const tabList = Object.keys(content).map((ele) =>
    ele.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );

  const keyIndex = Object.keys(content).findIndex((ele) =>
    pathName.includes(ele)
  );

  return (
    <div className="flex flex-col items-center w-full">
      <Tabs
        aria-label="Options"
        color="default"
        variant="underlined"
        classNames={{
          base: "w-full",
          tabList:
            "w-full justify-center relative rounded-none gap-0 p-0 border-divider",
          cursor: "w-full bg-transparent",
          tab: "max-w-fit px-0 h-4 mobile:h-12",
          tabContent: "group-data-[selected=true]:text-[#2CB041]",
        }}
      >
        {tabList.map((item, i) => {
          const isSelectedOrBefore = i <= keyIndex;
          return (
            <Tab
              key={item}
              title={
                <div>
                  <div
                  className="flex max-mobile:justify-between items-center gap-2"
                  style={{ pointerEvents: "none" }}
                >
                  <span
                    className={`relative max-w-fit min-w-min box-border whitespace-nowrap border-medium sm:px-1 max-mobile:h-3 mobile:h-4 lg:h-7 font-medium max-mobile:text-[9px] max-xs:text-[10px] max-sm:text-[11px] max-md:text-xs max-ml:text-sm rounded-full bg-transparent aspect-square flex justify-center items-center ${
                      isSelectedOrBefore
                        ? "border-[#2CB041] text-[#2CB041]"
                        : "border-default text-black"
                    }`}
                  >
                    {isSelectedOrBefore ? <FaCheck size={25} /> : i + 1}
                  </span>
                  <span className="flex items-center">
                    <span
                      className={`max-mobile:text-xs max-xs:text-[11px] max-sm:text-[11px] max-md:text-[15px] max-ml:text-sm font-medium ${
                        isSelectedOrBefore ? "text-[#2CB041]" : "text-black font-semibold"
                      }`}
                    >
                      {item}
                    </span>
                    {i + 1 !== tabList.length && (
                      <div
                        className={`border-t-medium lg:border-t-large border-dashed ${
                          isSelectedOrBefore
                            ? "border-[#2CB041]"
                            : "border-[#240812]"
                        }  max-mobile:w-[14px] max-xs:w-[32px] max-sm:w-[42px] max-lg:w-16 lg:w-20 mx-auto`}
                      ></div>
                    )}
                  </span>
                </div>
                </div>

                
              }
            />
          );
        })}
      </Tabs>
    </div>
  );
}
