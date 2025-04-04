"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  cn,
  Image,
  Link,
} from "@nextui-org/react";
import { LuCheck } from "react-icons/lu";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const DEFAULT_IMAGE = "/size.png"; // Define default image constant
const ALL_SIZE_IMAGES = '/pack/all size.png';

export default function Size() {
  const [groupSelected, setGroupSelected] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null); 
  const [isImageChanging, setIsImageChanging] = useState(false);
  const [defaultImage, setDefaultImage] = useState(ALL_SIZE_IMAGES); // Changed to use all sizes image as default

  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state?.cart?.item);
  const router = useRouter();
  
  useEffect(() => {
    if (!cartItem.material_id) {
      router.back();
    }
    getSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getSizes() {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/list-packaging-type-size/${cartItem.packaging_id}`
      );

      if (response.data.status === 200) {
        const responseData = response.data.data.map((ele) => {
          // Use default image if no image is available
          const imageUrl = ele.sizeId.size_image_link || DEFAULT_IMAGE;
          
          return {
            size: ele.sizeId.name,
            dimension: ele.sizeId.dimensions,
            product: "coffee",
            image: imageUrl,
            weight: ele.sizeId.filling_volume,
            packaging_type_size_id: ele.packaging_type_size_id,
            size_id: ele.sizeId.size_id,
          };
        });
        setSizes(responseData);
        
        // Keep using the all sizes image as default
        setDefaultImage(ALL_SIZE_IMAGES);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      // Ensure all sizes image is used on error
      setDefaultImage(ALL_SIZE_IMAGES);
    }
  }

  const handleSizeSelection = (lastSelected) => {
    // Add a brief blur effect during image change
    setIsImageChanging(true);
    
    dispatch(
      addToCart({
        ...cartItem,
        dimension: lastSelected.dimension,
        size:lastSelected.size,
        size_id: lastSelected.size_id,
        image: lastSelected.image || DEFAULT_IMAGE, // Ensure image has a fallback
        packaging_type_size_id: lastSelected.packaging_type_size_id,
        weight: lastSelected.weight,
      })
    );
    setGroupSelected([lastSelected]);
    
    // Remove blur effect after a short transition
    setTimeout(() => {
      setIsImageChanging(false);
    }, 300);
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  // Get current image to display with proper fallback
  const getCurrentImage = () => {
    if (groupSelected.length > 0) {
      return groupSelected[0].image || DEFAULT_IMAGE;
    } else {
      return ALL_SIZE_IMAGES; // Show all sizes image when no item is selected
    }
  };

  return (
    <div className="flex max-lg:flex-col max-md:w-full mb-[100px] gap-5">
      <div className="lg:w-4/5 max-ml:w-full flex max-md:flex-col gap-4">
      <div className="sm:hidden md:w-auto h-full border-2 flex flex-col justify-center items-center rounded-xl overflow-hidden p-4 gap-3">
        <Image
          src={getCurrentImage() || defaultImage} // Fallback handled here
          width={250} // Increased size
          height={250} // Increased size
          alt="product size"
          className={`w-full max-w-[400px] h-auto transition-all duration-300 ease-in-out ${
            isImageChanging ? "blur-sm scale-105" : "blur-0 scale-100"
          }`}
        />
        {groupSelected.length === 0 && (
          <p className="text-center text-red-600 text-sm md:text-base">
            No size selected..
          </p>
        )}
      </div>


        <div className="grid sm:grid-cols-2 w-full h-fit gap-4">
          <div className="xs:border-2 border-b-0 h-fit rounded-xl">
            <div className="flex flex-col w-full rounded-b-xl rounded-t-xl gap-0">
              <CheckboxGroup
                value={groupSelected}
                onChange={(e) => {
                  const lastSelected = e[e.length - 1];
                  handleSizeSelection(lastSelected);
                }}
                classNames={{
                  base: "w-full w-max-full",
                  wrapper: "xs:gap-0 gap-3 rounded-t-xl rounded-b-xl",
                }}
              >
                <label
                  className="max-xs:hidden inline-flex rounded-t-xl max-w-full w-full bg-[#f2f2f2] items-center justify-start gap-2 p-2 border-b-2 max-md:first:rounded-t-xl last:rounded-xl"
                  aria-label="XS"
                >
                  <span
                    aria-hidden="true"
                    className="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden before:content-[''] before:absolute before:inset-0 before:border-solid before:border-2 before:box-border before:border-transparent after:content-[''] after:absolute after:inset-0 after:scale-50 after:opacity-0 after:origin-center group-data-[selected=true]:after:scale-100 group-data-[selected=true]:after:opacity-100 group-data-[hover=true]:before: bg-[#fffef7]outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background after:bg-primary after:text-primary-foreground text-primary-foreground w-5 h-5 mr-6 rtl:ml-2 rtl:mr-[unset] rounded-[calc(theme(borderRadius.medium)*0.6)] before:rounded-[calc(theme(borderRadius.medium)*0.6)] after:rounded-[calc(theme(borderRadius.medium)*0.6)] before:transition-colors group-data-[pressed=true]:scale-95 transition-transform after:transition-transform-opacity after:!ease-linear after:!duration-200 motion-reduce:transition-none"
                  >
                    <svg
                      aria-hidden="true"
                      role="presentation"
                      viewBox="0 0 17 18"
                      className="z-10 opacity-0 group-data-[selected=true]:opacity-100 w-4 h-3 transition-opacity motion-reduce:transition-none rounded-full"
                    >
                      <polyline
                        fill="none"
                        points="1 9 7 14 15 4"
                        stroke="white"
                        strokeDasharray="22"
                        strokeDashoffset="66"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></polyline>
                    </svg>
                  </span>
                  <span
                    className="relative text-foreground select-none text-medium transition-colors-opacity before:transition-width motion-reduce:transition-none w-full"
                  >
                    <div className="w-full flex justify-between text-[#808b98] gap-2">
                      <div className="flex ml:justify-start w-full justify-between items-center gap-4">
                        <div className="items-center relative max-w-fit min-w-min box-border whitespace-nowrap rounded-full w-12 flex justify-center items-center`">
                          <span className="flex-1 text-inherit font-normal px-2">
                            <span className="text-xs font-normal">Size</span>
                          </span>
                        </div>
                        <span className="text-xs font-normal">
                          Width x Height x Depth
                        </span>
                      </div>
                      <div className="max-ml:hidden flex items-center">
                        <span className="text-xs font-normal whitespace-nowrap">
                          Filling volume (approx.)
                        </span>
                      </div>
                    </div>
                  </span>
                </label>
                {sizes.length ? (
                  sizes.map((ele, i) => {
                    return (
                      <Checkbox
                        key={i}
                        aria-label={ele.size}
                        classNames={{
                          base: cn(
                            "inline-flex h-[80px] max-w-full w-full  bg-[#fffef7] m-0",
                            "hover:bg-content2 items-center justify-start",
                            "cursor-pointer gap-2 p-5 max-xs:rounded-xl max-xs:border-2 xs:last:border-none border-b-2 max-md:first:rounded-t-xl last:rounded-b-xl"
                          ),
                          icon: "rounded-full",
                          label: "max-xs:rounded-xl w-full",
                        }}
                        value={ele}
                        onMouseEnter={() => handleMouseEnter(ele)}
                      >
                        <div className="w-full flex justify-between text-[#03172B] gap-2">
                          <div className="flex justify-evenly items-center gap-4">
                            <Chip
                              size="lg"
                              className="relative max-w-fit min-w-min box-border whitespace-nowrap px-2 h-10 rounded-full bg-default aspect-square w-10 flex justify-center text-xl font-semibold text-[#2F4693] items-center`"
                            >
                              <span className="">{ele.size}</span>
                            </Chip>
                            <span className="max-ml:hidden">
                              {ele.dimension}
                            </span>
                          </div>
                          <div className="flex flex-col max-ml:items-end justify-center">
                            <span className="ml:hidden max-md: text-sm">
                              {ele.dimension}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="md:text-base text-xs text-[#03172B80] font-normal">
                                {ele.weight}
                              </span>
                              <span className="md:text-base text-xs text-[#03172B80] font-normal">
                                {`(${ele.product})`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Checkbox>
                    );
                  })
                ) : (
                  <label className="group relative tap-highlight-transparent select-none flex max-w-full w-full m-0 hover:bg-content2 items-baseline justify-start cursor-pointer gap-2 p-2 sm:p-5 last:border-none border-b-2 last:rounded-b-xl">
                    <div className="w-full flex justify-center text-[#03172B] gap-2">
                      No Quantity Found
                    </div>
                  </label>
                )}
              </CheckboxGroup>
            </div>
          </div>
          <div className="w-full max-sm:hidden border-2 flex flex-col justify-center items-center rounded-xl">
            <Image
              src={getCurrentImage() || ALL_SIZE_IMAGES} // Fallback handled here
              alt="product size"
              width={350}
              height={350}
              className={`object-contain transition-all duration-300 ease-in-out ${
                isImageChanging ? "blur-sm scale-105" : "blur-0 scale-100"
              }`}
            />
            {groupSelected.length === 0 && (
              <p className="text-center text-red-600">No size selected..</p>
            )}
          </div>

        </div>
      </div>
      <div className="max-ml:hidden flex flex-col gap-5">
        <div className="flex flex-col max-w-[300px] min-w-[250px] gap-3 p-4 sm:p-3 md:p-4 pr-1 h-auto text-xs sm:text-sm md:text-base border-2 rounded-xl">
          <div className="text-sm sm:text-base">Your packaging</div>
          <div className="flex flex-wrap min-w-fit items-center gap-2 text-xs sm:text-sm md:text-base">
            <LuCheck className="text-sm" />
            <span>Type :</span>
            <span className="font-semibold">{cartItem.name}</span>
          </div>
        </div>

        <div className="flex flex-col max-w-[300px] min-w-[250px] gap-3 p-4 bg-[#FDD40A1A] text-sm border-2 rounded-xl">
          <span>Note</span>
          <span>
            When making your purchase, opting for a higher quantity can
            significantly increase your savings. By buying in bulk, you often
            get a better deal per unit, allowing you to save more in the long
            run.
          </span>
        </div>
        <Link
          isDisabled={groupSelected.length === 0}
          href={`quantity?size_id=${groupSelected[0]?.packaging_type_size_id}`}
          className="w-full min-w-[250px] flex justify-center items-center rounded-lg text-lg font-bold bg-[#253670] text-white h-14"
        >
          Confirm
        </Link>
      </div>
      <div className="ml:hidden z-50 fixed left-0 bottom-0 border flex items-center md:justify-end justify-between w-full px-[30px] py-[14px]">
        <div className="flex flex-col md:hidden text-xs items-start leading-[16px] justify-start">
          <div className="text-[#03172B80]">Price</div>
          <div className="font-semibold">{cartItem.price}</div>
        </div>
        <Link
          isDisabled={groupSelected.length === 0}
          href={`quantity?size_id=${groupSelected[0]?.packaging_type_size_id}`}
        >
          <Button className="text-xs w-[88px] font-medium bg-[#143761] rounded-md text-white h-[38px]">
            Confirm
          </Button>
        </Link>
      </div>
    </div>
  );
}