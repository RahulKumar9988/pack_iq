"use client";
import DeleteIcon from "@/components/DeleteIcon";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Button,
  Divider,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Cart() {
  const [value, setValue] = useState({
    quantity: "",
    size: "",
  });

  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state?.cart?.item);

  const router = useRouter();
  const handleSelectionChange = (e) => {
    const { name, value } = e.target;
    setValue((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const [constants, setConstant] = useState({
    quantity: "",
    size: "",
  });

  useEffect(() => {
    getSizes();

  }, []);

  useEffect(() => {
    setValue({
      quantity: cartItem?.packaging_type_size_quantity_id?.toString(),
      size: cartItem?.packaging_type_size_id?.toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem]);

  useEffect(() => {
    if (value?.size) {
      getQuantities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.size]);

  async function getSizes() {
    try {
      const sizeResponse = await axios.get(
        `${baseUrl}/api/v1/resources/list-packaging-type-size/${cartItem.packaging_id}`
      );
      if (sizeResponse.data.status === 200) {
        const sizeArray = sizeResponse.data.data.map((ele) => {
          return {
            packaging_type_size_id: ele.packaging_type_size_id,
            size: `Size : ${ele.sizeId.name}`,
          };
        });
        setConstant((prevData) => ({
          ...prevData,
          size: sizeArray,
        }));
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }

  async function getQuantities() {
    try {
      const quantityResponse = await axios.get(
        `${baseUrl}/api/v1/resources/list-packaging-type-size-quantity/${value.size}`
      );
      if (quantityResponse.data.status === 200) {
        const quantityArray = quantityResponse.data.data.map((ele) => {
          return {
            quantity: `Quantity:${ele.quantityId.quantity}`,
            price: ele.quantityId.price,
            packaging_type_size_quantity_id:
              ele.packaging_type_size_quantity_id,
          };
        });
        setConstant((prevData) => ({
          ...prevData,
          quantity: quantityArray,
        }));
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }

  async function hanleSave() {
    const payload = {
      user_id: "c0a6b80a-7a24-431b-99b7-793d71af4b4b-1725961556841",
      packaging_id: cartItem.packaging_id,
      size_id: cartItem.size_id,
      quantity_id: cartItem.quantity_id,
      material_id: cartItem.material_id,
      payment_status_id: 1,
      price: cartItem.price,
    };
    const response = await axios.post(
      `${baseUrl}/api/v1/order/create-order`,
      payload
    );
    if (response.status === 200) {
      router.push("/order");
    }
  }

  return (
    <>
      <div className="mb-[66px] flex max-lg:flex-col gap-6 mobile:mt-10">
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          <h1 className="font-bold text-xl">Your Cart</h1>
          {Object.keys(cartItem).length ? (
            <div className="flex gap-5 p-3 mobile:p-3 sm:p-5 shadow rounded-lg">
              <div className="flex w-full items-start gap-3">
                <div className="w-[161.17px] max-sm:w-[71px]">
                  <Image
                    src={cartItem.image || "/cart.png"}
                    alt="Cart Item"
                    className="max-sm:hidden"
                    objectfit="cover"
                    width={161.17}
                    height={143}
                  />
                  <Image
                    src={cartItem.image || "/cart.png"}
                    alt="Cart Item"
                    className="sm:hidden w-[71px]"
                    objectfit="cover"
                    width={71}
                    height={63}
                  />
                </div>
                <div className="mobile:flex-grow max-mobile:max-w-[240px] gap-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs mobile:text-sm sm:text-lg font-medium">
                        {cartItem.name}
                      </span>
                      <span className="flex mobile:text-sm max-mobile:hidden gap-3 text-[#9FA9B3]">
                        {/* <span>Design file : Boxdesign.pdf |</span> */}
                        <span>Material : {cartItem.material}</span>
                      </span>
                      <span className="flex text-xs mobile:hidden gap-3 text-[#9FA9B3]">
                        Packing : {cartItem.name} | Size : {cartItem.size} |
                        Quantity : {cartItem.quantity} | Design : 2 | Material :{" "}
                        {cartItem.material}
                      </span>
                      <span className="sm:hidden flex items-center gap-[6px]">
                        <span className="text-base font-semibold">
                          ₹{" "}
                          {(constants?.quantity &&
                            constants?.quantity?.find(
                              (ele) =>
                                ele.packaging_type_size_quantity_id.toString() ===
                                value.quantity.toString()
                            )?.price) ||
                            0}
                        </span>
                        <span className="text-xs line-through">
                          ₹{" "}
                          {(constants?.quantity &&
                            constants?.quantity?.find(
                              (ele) =>
                                ele.packaging_type_size_quantity_id.toString() ===
                                value.quantity.toString()
                            )?.price) ||
                            0}
                        </span>
                      </span>
                    </div>
                    <div className="max-sm:hidden min-w-fit flex flex-col gap-2">
                      <span className="text-lg font-medium">
                        ₹{" "}
                        {(constants?.quantity &&
                          constants?.quantity?.find(
                            (ele) =>
                              ele.packaging_type_size_quantity_id.toString() ===
                              value.quantity.toString()
                          )?.price) ||
                          0}
                      </span>
                      <span className="flex gap-3 line-through text-[#9FA9B3]">
                        ₹{" "}
                        {(constants?.quantity &&
                          constants?.quantity?.find(
                            (ele) =>
                              ele.packaging_type_size_quantity_id.toString() ===
                              value.quantity.toString()
                          )?.price) ||
                          0}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex flex-wrap md:flex-nowrap gap-4">
                        <Select
                          aria-label="Number of orders"
                          name="quantity"
                          className="min-w-[116px] text-xs w-fit mobile:max-w-xs -xs:h-8 mobile:h-10"
                          classNames={{
                            mainWrapper: "w-fit min-w-[80px]",
                            innerWrapper: "w-fit min-w-[80px]",
                            base: "text-xs",
                            trigger: "min-h-9 rounded-md h-9 gap-1 px-1",
                            selectedIcon: "static",
                            value: "max-mobile:text-xs flex justify-center",
                            selectorIcon: "static p-0",
                            listboxWrapper: "w-fit",
                            listbox: "p-0 w-fit",
                            popoverContent: "text-[8px]",
                          }}
                          selectedKeys={[value.quantity]}
                          onChange={handleSelectionChange}
                        >
                          <SelectItem className="text-[8px] roun" key="">
                            Select
                          </SelectItem>
                          {constants.quantity.length &&
                            constants?.quantity?.map((ele) => (
                              <SelectItem
                                classNames={{
                                  listboxWrapper: "text-xs max-w-fit",
                                  base: "text-xs",
                                  title: "text-xs p-0",
                                  selectedIcon: "hidden",
                                  value: "text-xs p-0",
                                }}
                                key={ele.packaging_type_size_quantity_id}
                              >
                                {ele.quantity}
                              </SelectItem>
                            ))}
                        </Select>
                      </div>
                      <div className="flex w-28 flex-wrap md:flex-nowrap gap-4">
                        <Select
                          aria-label="Sizes"
                          name="size"
                          className="min-w-fit text-xs w-fit mobile:max-w-xs -xs:h-8 mobile:h-10"
                          classNames={{
                            mainWrapper: "w-fit min-w-[40px]",
                            innerWrapper: "w-fit min-w-[40px]",
                            base: "text-xs",
                            trigger: "min-h-9 rounded-md h-9 gap-1 px-1",
                            selectedIcon: "static",
                            value: "max-mobile:text-xs flex justify-center",
                            selectorIcon: "static p-0",
                            listboxWrapper: "w-fit",
                            content: "rounded-md",
                            listbox: "p-0 w-fit",
                            popoverContent: "text-[8px]",
                          }}
                          selectedKeys={[value.size]}
                          onChange={handleSelectionChange}
                        >
                          <SelectItem key={""}>Select</SelectItem>
                          {constants.size.length &&
                            constants.size?.map((ele) => (
                              <SelectItem
                                classNames={{
                                  content: "rounded-md",
                                  listboxWrapper: "text-xs max-w-fit",
                                  base: "text-xs",
                                  title: "text-xs p-0",
                                  selectedIcon: "hidden",
                                  value: "text-xs p-0",
                                }}
                                key={ele.packaging_type_size_id}
                              >
                                {ele.size}
                              </SelectItem>
                            ))}
                        </Select>
                      </div>
                    </div>
                    <div
                      onClick={() => dispatch(clearCart())}
                      className="cursor-pointer max-sm:hidden flex items-center gap-2"
                    >
                      <DeleteIcon /> Delete
                    </div>
                  </div>
                  <Divider className="sm:hidden" />
                  <div
                    onClick={() => dispatch(clearCart())}
                    className="cursor-pointer sm:hidden text-[#9FA9B3] flex justify-end items-center gap-2"
                  >
                    <DeleteIcon /> Delete
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "No Item in Cart"
          )}
        </div>
        {Object.keys(cartItem).length ? (
          <div className="w-full lg:w-2/5 flex flex-col gap-4">
            <h1 className="text-base font-semibold mobile:font-bold mobile:text-xl">
              Price details
            </h1>
            <div className="flex max-mobile:flex-col gap-5 p-5 shadow rounded-lg">
              <div className="flex flex-col justify-between w-full gap-5">
                <span className="flex justify-between w-full">
                  <span className="text-[#03172B96]">Total MRP</span>
                  <span>
                    ₹{" "}
                    {(constants?.quantity &&
                      constants?.quantity?.find(
                        (ele) =>
                          ele.packaging_type_size_quantity_id.toString() ===
                          value.quantity.toString()
                      )?.price) ||
                      0}
                  </span>
                </span>
                <span className="flex justify-between w-full">
                  <span className="text-[#03172B96]">Price per item</span>
                  <span>
                    ₹{" "}
                    {(
                      parseFloat(
                        constants?.quantity &&
                          (constants?.quantity?.find(
                            (ele) =>
                              ele.packaging_type_size_quantity_id?.toString() ===
                              value?.quantity?.toString()
                          )?.price ??
                            0) // Wrap the nullish coalescing in parentheses
                      ) / parseFloat(cartItem?.quantity ?? 1)
                    ) // Default quantity to 1 if it's undefined
                      .toFixed(2)}
                  </span>
                </span>
                <span className="flex justify-between w-full">
                  <span className="text-[#03172B96]">Discount on MRP</span>
                  <span className="text-[#1CC618]">
                    - ₹{" "}
                    {constants?.quantity &&
                    constants?.quantity?.find(
                      (ele) =>
                        ele.packaging_type_size_quantity_id.toString() ===
                        value.quantity.toString()
                    )?.price
                      ? 549
                      : 0}
                  </span>
                </span>
                <span className="flex justify-between w-full">
                  <span className="text-[#03172B96]">Delivery fee</span>
                  <span>
                    ₹{" "}
                    {constants?.quantity &&
                    constants?.quantity?.find(
                      (ele) =>
                        ele.packaging_type_size_quantity_id.toString() ===
                        value.quantity.toString()
                    )?.price
                      ? 50
                      : 0}
                  </span>
                </span>
                <Divider />
                <span className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    ₹{" "}
                    {((constants?.quantity &&
                      constants?.quantity?.find(
                        (ele) =>
                          ele.packaging_type_size_quantity_id.toString() ===
                          value.quantity.toString()
                      )?.price) ||
                      0) -
                      (constants?.quantity &&
                      constants?.quantity?.find(
                        (ele) =>
                          ele.packaging_type_size_quantity_id.toString() ===
                          value.quantity.toString()
                      )?.price
                        ? 549
                        : 0) +
                      (constants?.quantity &&
                      constants?.quantity?.find(
                        (ele) =>
                          ele.packaging_type_size_quantity_id.toString() ===
                          value.quantity.toString()
                      )?.price
                        ? 50
                        : 0)}
                  </span>
                </span>
              </div>
            </div>
            <Button
              onClick={() => hanleSave()}
              isDisabled={
                !cartItem.packaging_id ||
                !cartItem.design_number ||
                !cartItem.name ||
                !cartItem.material_id ||
                !cartItem.size_id ||
                !cartItem.quantity_id
              }
              className="text-lg w-full font-bold bg-[#253670] text-white max-mobile:hidden h-14"
            >
              Confirm
            </Button>
          </div>
        ) : null}
      </div>
      <div className="mobile:hidden fixed bg-white left-0 bottom-0 flex items-center justify-between w-full px-[30px] py-[14px]">
        <div>Price</div>
        <Button
          onClick={() => hanleSave()}
          isDisabled={
            !cartItem.packaging_id ||
            !cartItem.design_number ||
            !cartItem.name ||
            !cartItem.material_id ||
            !cartItem.size_id ||
            !cartItem.quantity_id
          }
          className="text-xs w-[88px] font-medium bg-[#143761] rounded-md text-white h-[38px]"
        >
          Confirm
        </Button>
      </div>
    </>
  );
}
