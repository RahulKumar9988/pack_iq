"use client";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Image, Link } from "@nextui-org/react";
import axios from "axios";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Material() {
  const [selectedMaterial, setSelectedMaterial] = useState(null); // State to track selected material
  const [materials, setMaterials] = useState([]);
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state?.cart?.item);
  const router = useRouter();
  useEffect(() => {
    if (!cartItem.quantity_id) {
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
            updatedAt: "2024-09-10T09:39:19.000Z",
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

  return (
    <>
      <div
        className={`${poppins.className} flex max-mobile:flex-col h-full justify-between max-mobile:max-w-screen-mobile gap-5 mb-[72px]`}
      >
        <div className="grid max-mobile:grid-cols-1 ml:grid-cols-2 w-full ml:w-4/5 gap-5 flex-col h-fit">
          {materials.map((ele, i) => {
            return (
              <div
                className={`text-black h-fit p-3 cursor-pointer transition-all duration-300 hover:bg-slate-100 ${
                  selectedMaterial === ele.material_id
                    ? "bg-[#ebeeef] shadow-lg border-2"
                    : "bg-white"
                }`}
                key={i}
              >
                <div
                  className="flex gap-4"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        ...cartItem,
                        material: ele.name,
                        material_id: ele.material_id,
                      })
                    );
                    handleSelect(ele.material_id);
                  }} // On click, select this material
                >
                  <Image
                    src={ele.img}
                    alt={ele.name}
                    objectfit="cover"
                    width={61}
                    height={61}
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-sm mobile:text-lg font-semibold leading-none">
                      {ele.name}
                    </span>
                    <span className="text-xs sm:text-sm">{ele.type}</span>
                    <span className="text-xs sm:text-base p-1 text-center w-fit rounded-full px-2 align-middle bg-[#2F46931A] font-semibold">
                      {ele.price}
                    </span>
                    <span className="text-xs sm:text-base p-1 align-middle">
                      View detail
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="max-ml:hidden w-1/4 flex flex-col gap-5">
          <div className="flex flex-col gap-3 p-4 pr-1 min-w-[250px] text-sm border-2 rounded-xl">
            <div>Your packaging</div>
            <div className="flex items-center gap-2">
              <LuCheck />
              <span> Type :</span>
              <span className="font-semibold"> {cartItem.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <LuCheck />
              <span> Size :</span>
              <span className="font-semibold">{cartItem.size}</span>
              <span className="">{`(${cartItem.dimension})`}</span>
            </div>
            <div className="flex items-center gap-2">
              <LuCheck />
              <span> Quantity :</span>
              <span className="font-semibold">{cartItem.quantity}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 min-w-[250px] p-4 bg-[#FDD40A1A] text-sm border-2 rounded-xl">
            <span>Note</span>
            <span>
              When making your purchase, opting for a higher quantity can
              significantly increase your savings. By buying in bulk, you often
              get a better deal per unit, allowing you to save more in the long
              run.
            </span>
          </div>
          <Link
            isDisabled={!selectedMaterial}
            href={`/cart`}
            className="w-full min-w-[250px] flex justify-center items-center rounded-lg text-lg font-bold bg-[#253670] text-white h-14"
          >
            <Button className="text-lg w-full font-bold bg-[#253670] text-white h-14">
              Confirm
            </Button>
          </Link>
        </div>
      </div>
      <div className="ml:hidden z-50 fixed bg-white left-0 bottom-0 border flex items-center md:justify-end justify-between w-full px-[30px] py-[14px]">
        <div className="flex flex-col md:hidden text-xs items-start leading-[16px] justify-start">
          <div className="text-[#03172B80]">Price</div>
          <div className="font-semibold">₹ {cartItem.price || 0}</div>
        </div>
        <Link isDisabled={!selectedMaterial} href={`/cart`}>
          <Button className="text-xs w-[88px] font-medium bg-[#143761] rounded-md text-white h-[38px]">
            Confirm
          </Button>
        </Link>
      </div>
    </>
  );
}
