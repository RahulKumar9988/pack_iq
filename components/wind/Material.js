"use client";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Image, Link, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import axios from "axios";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuArrowLeft, LuCheck } from "react-icons/lu";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Material() {
  const [selectedMaterial, setSelectedMaterial] = useState(null); // State to track selected material
  const [materials, setMaterials] = useState([]);
  const [showWarning, setShowWarning] = useState(false); // State for warning popup
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state?.cart?.item);
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };
  
  useEffect(() => {
    if (!cartItem.packaging_id) {
      router.back();
    }
    getSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getSizes() {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/resources/material`);
      if (response.data.status === 200) {
        const responseData = response.data.data.map((ele) => {
          return {
            createdAt: ele.createdAt,
            delete_flag: ele.delete_flag,
            img: ele.material_image_url || "/Material.png",
            name: ele.name,
            type: ele.description,
            price: "₹" + ele.price,
            material_id: ele.material_id,
            updatedAt: "",
          };
        });
        setMaterials(responseData);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }

  const handleSelect = (index) => {
    setSelectedMaterial(index); // Update the selected material
  };

  // Function to handle material selection and add to cart
  const handleMaterialSelect = (material) => {
    dispatch(
      addToCart({
        ...cartItem,
        material: material.name,
        material_id: material.material_id,
        material_img: material.img,
      })
    );
    handleSelect(material.material_id);
  };

  // Function to handle next button click
  const handleNextClick = (e) => {
    if (!selectedMaterial) {
      e.preventDefault(); // Prevent navigation
      setShowWarning(true); // Show warning popup
    }
  };

  // Function to truncate text to specific number of words
  const truncateText = (text, wordCount) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.slice(0, 20).join(" ") + "...";
  };

  // Create the URL for size route with packaging name in the format you specified
  const sizeRouteUrl = cartItem.name ? 
    `/${cartItem.name.toLowerCase().replace(" ", "-")}/size` : 
    '/size';

  return (
    <>
      <div
        className={`${poppins.className} flex max-mobile:flex-col h-full justify-between max-mobile:max-w-screen-mobile gap-5 mb-[72px]  bg-[#]`}
      >
        <div className="grid max-mobile:grid-cols-1 ml:grid-cols-2 w-full ml:w-4/5 gap-5 flex-col h-fit">
          {materials.map((ele, i) => {
            return (
              <div
                className={`text-black h-fit p-3 cursor-pointer transition-all duration-300 hover:bg-blue-50 rounded-xl group ${
                  selectedMaterial === ele.material_id
                    ? "bg-gradient-to-t from-blue-100 to-[#f4f7ff] shadow-lg border-1 rounded-lg"
                    : " bg-[#]"
                }`}
                key={i}
                onClick={() => handleMaterialSelect(ele)}
              >
                <div className="flex gap-4 min-h-[150px] group-hover:min-h-fit transition-all duration-300">
                  <div>
                    <Image
                      src={ele.img}
                      alt={ele.name}
                      objectfit="cover"
                      width={200}
                      height={150}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-sm mobile:text-lg font-semibold leading-none">
                      {ele.name}
                    </span>
                    <div className="relative">
                      {/* Truncated version (visible by default) */}
                      <span className="text-xs sm:text-sm block group-hover:hidden">
                        {truncateText(ele.type, 10)}
                      </span>
                      
                      {/* Full version (visible on hover) */}
                      <span className="hidden group-hover:block text-xs sm:text-sm break-words w-full">
                        {ele.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="max-ml:hidden w-1/4 flex flex-col gap-5">
          <div className="flex justify-around">
            <div>
              <Button 
                onClick={handleBack}
                className="bg-blue-50 hover:bg-gray-100 text-[#253670] px-2 border-1 border-[#143761]"
                startContent={<LuArrowLeft size={20} />}
              >
                Back
              </Button>
            </div>
            <Link
              href={sizeRouteUrl}
              onClick={handleNextClick}
              className='flex items-center gap-2 px-5 py-2 font-bold bg-gradient-to-r from-[#0b2949] to-indigo-800 rounded-lg text-white hover:shadow-lg transition-all duration-200'
            >
                Next
            </Link>
          </div>
          <div className="flex flex-col gap-3 p-4 pr-1 min-w-[250px] text-sm border-2 rounded-xl">
            <div>Your Selected Packaging</div>
            <div className="flex items-center gap-2">
              <LuCheck />
              <span> Type :</span>
              <span className="font-semibold"> {cartItem.name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 min-w-[250px] p-4 bg-[#FDD40A1A] text-sm border-2 rounded-xl">
            <span>Note</span>
            <ul className="list-disc text-[13px] text-gray-700 px-3">
              <li>Matt Finish window will have a frosty window.</li>
              <li>Any pouch with window will reduce the shelf life of the product as metalized layer is removed.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ml:hidden z-50 fixed bg-white left-0 bottom-0 border flex items-center md:justify-end justify-between w-full px-[30px] py-[14px]">
        {/* <div className="flex flex-col md:hidden text-xs items-start leading-[16px] justify-start">
          <div className="text-[#03172B80]">Price</div>
          <div className="font-semibold"> {cartItem.price || 0}</div>
        </div> */}
        <Button 
          onClick={handleBack}
          className="bg-blue-50 hover:bg-gray-100 text-[#253670] px-2 border-1 border-[#143761]"
          startContent={<LuArrowLeft size={20} />}
        >
          Back
        </Button>
        
        <Link href={sizeRouteUrl} onClick={handleNextClick} className='flex items-center gap-2 px-5 py-2 font-bold bg-gradient-to-r from-[#0b2949] to-indigo-800 rounded-lg text-white hover:shadow-lg transition-all duration-200'>
          Next
        </Link>
        
      </div>

      {/* Warning Modal */}
      <Modal isOpen={showWarning} onClose={() => setShowWarning(false)}>
        <ModalContent>
          <ModalHeader>Selection Required</ModalHeader>
          <ModalBody className="pb-6">
            <p>Please select a material before proceeding.</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}