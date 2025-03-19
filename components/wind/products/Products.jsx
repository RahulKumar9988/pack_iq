"use client";
import React, { useEffect, useState } from "react";
import { Link } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export default function Products() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getPackagingType();
  }, []);

  async function getPackagingType() {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/packaging-type`
      );
      if (response.status === 200) {
        const responseData = response.data.data.map((ele) => {
          return {
            packaging_id: ele.packaging_id,
            icon: ele.packaging_image_icon_url,
            description: ele.description,
            name: ele.name,
            time: "4-7 weeks",
            minimum_qty: ele.minimum_qty,
            price: "₹ 0.930",
            packaging_image_url: ele.packaging_image_url,
            quantity: ele.minimum_qty,
          };
        });
        setProductList(responseData);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }
  return (
    <div className="flex flex-col items-center gap-4 md:gap-8 lg:gap-[60px] mb-4 max-mobile:px-[30px] max-w-[1,291px]">
      <div className="flex flex-col sm:justify-start xs:items-center w-full">
        <div className="xs:hidden text-[#081F3866] text-[10px] mobile:text-xs xs:text-sm">
          All Products
        </div>
        <h1 className="font-medium mobile:font-bold text-3xl lg:text-5xl max-mobile:text-xs">
          Packaging type
        </h1>
      </div>
      <div className="gap-5 mobile:gap-8 grid grid-cols-4 max-md:grid-cols-3 max-xs:grid-cols-2">
        {productList.map((ele, i) => {
          return (
            <Link
              href={`${ele.name
                .toLocaleLowerCase()
                .replace(" ", "-")}/packaging-type`}
              key={i}
              className="flex flex-col gap-2 ml:gap-5"
            >
              <Image
                className="w-full max-w-full aspect-[296/314]"
                src={ele.packaging_image_url}
                alt={ele.name}
                height={395}
                width={296}
                layout="responsive"
              />
              <div className="flex flex-col gap-1 max-mobile:gap-3 w-full text-left">
                <div className="font-medium max-mobile:font-medium max-lg:text-sm">
                  {ele.name}
                </div>
                <div className="flex justify-center items-center gap-0 bg-gray-200 px-[10px] max-ml:px-[5px] py-[5px] max-ml:py-[2px] rounded-lg lg:w-[170px] max-ml:w-[130px] font-semibold text-[#143761] max-lg:text-sm max-mobile:text-xs">
                  {ele.price}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
