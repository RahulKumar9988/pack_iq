"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import axios from "axios";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, clearCart } from "@/redux/features/cart/cartSlice";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export default function PackagingType() {
  const [productList, setProductList] = useState([]);

  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state?.cart?.item);

  if (!cartItem.packaging_id) <div>Loading....</div>;

  useEffect(() => {
    getPackagingType();
    dispatch(clearCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  console.log(cartItem);
  return (
    <div
      className={`grid max-sm:grid-cols-1 scrollbar-hide max-ml:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 mb-[72px] gap-4 ${poppins.className}`}
    >
      {productList.map((item, index) => {
        return (
          <Link
            key={index}
            className="max-h-[394px]"
            href={`/${item.name.toLocaleLowerCase().replace(" ", "-")}/size`}
            onClick={() => {
              dispatch(
                addToCart({
                  packaging_id: item.packaging_id,
                  name: item.name,
                  image: item.packaging_image_url,
                  price: item.price,
                })
              );
            }}
          >
            <Card
              shadow="sm"
              className="broder-[#E45971] p-4 h-full w-full max-h-[394px] scrollbar-hide overflow-y-scroll"
            >
              <CardBody className="p-0">
                <div className="flex gap-5 items-start pt-2 mobile:items-center mobile:flex-col overflow-y-scroll scrollbar-hide">
                  <Image
                    src={item.icon || "/Frame40.png"}
                    className="min-w-20"
                    alt="size"
                    width={80}
                    height={80}
                  />

                  <div className="flex flex-col gap-5 max-mobile:gap-[6px]">
                    <div className="mobile:text-xl text-base font-semibold mobile:text-center">
                      {item.name}
                    </div>
                    <span className="mobile:text-center text-xs mobile:text-sm max-mobile:line-clamp-3">
                      {item.description}
                    </span>
                    <span className="mobile:hidden text-xs font-semibold line-clamp-3">
                      See More
                    </span>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="text-small p-0 flex-col justify-between border rounded-lg mt-5">
                <div className="flex justify-between w-full p-3">
                  <span className="text-sm font-normal">Minimum Quantity:</span>
                  <span className="font-medium">{item.quantity}</span>
                </div>
                <Divider />
                <div className="flex justify-between w-full p-3">
                  <span className="text-sm font-normal">Price:</span>
                  <span className="font-medium">{item.price}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
