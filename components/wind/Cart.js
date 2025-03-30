"use client";
import { getUserDetails, userId } from "@/app/action/getUserDetails";
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
  console.log(userId);
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state?.cart?.item) || {};

  const router = useRouter();
  const handleSelectionChange = (e) => {
    const { name, value } = e.target;
    setValue((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const [constants, setConstant] = useState({
    quantity: [],
    size: [],
  });

  useEffect(() => {
    if (cartItem?.packaging_id) {
      getSizes();
    }
  }, [cartItem?.packaging_id]);

  useEffect(() => {
    if (cartItem?.packaging_type_size_id && cartItem?.packaging_type_size_quantity_id) {
      setValue({
        quantity: cartItem?.packaging_type_size_quantity_id?.toString(),
        size: cartItem?.packaging_type_size_id?.toString(),
      });
    }
  }, [cartItem]);

  useEffect(() => {
    if (value?.size) {
      getQuantities();
    }
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
      console.error(error?.response ? error.response.data : error.message);
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
      console.error(error?.response ? error.response.data : error.message);
    }
  }

  const getItemPrice = () => {
    if (!constants?.quantity || !value?.quantity) return 0;
    
    const selectedItem = constants.quantity.find(
      (ele) => ele.packaging_type_size_quantity_id.toString() === value.quantity.toString()
    );
    
    return selectedItem?.price || 0;
  };

  const itemPrice = getItemPrice();
  const discount = itemPrice > 0 ? 0 : 0;
  const deliveryFee = itemPrice > 0 ? 0 : 0;
  const totalPrice = itemPrice * pricePerItem;
  const pricePerItem = cartItem?.quantity ? (itemPrice / parseFloat(cartItem.quantity)).toFixed(2) : 0;
  
  async function handleSave() {
    try {
      const payload = {
        user_id: userId,
        packaging_id: cartItem.packaging_id,
        size_id: cartItem.size_id,
        quantity_id: cartItem.quantity_id,
        material_id: cartItem.material_id,
        payment_status_id: 1,
        price: itemPrice,
      };
      
      const response = await axios.post(
        `${baseUrl}/api/v1/order/create-order`,
        payload
      );
      
      if (response.status === 200) {
        router.push("/order");
      }
    } catch (error) {
      console.error("Order creation failed:", error?.response?.data || error.message);
    }
  }

  const isConfirmDisabled = !cartItem.packaging_id ||
    !cartItem.design_number ||
    !cartItem.name ||
    !cartItem.material_id ||
    !cartItem.size_id ||
    !cartItem.quantity_id;

  return (
    <>
      <div className="mb-[66px] w-full gap-6 mobile:mt-10">
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          <h1 className="font-bold text-xl">Your Cart</h1>
          {Object.keys(cartItem).length ? (
            <div className="flex gap-5 p-3 mobile:p-3 sm:p-5 shadow rounded-lg">
              <div className="flex w-full items-start gap-3">
                <div className="w-[161.17px] max-sm:w-[71px]">
                  {cartItem.image ? (
                    <>
                      <Image
                        src={cartItem.image}
                        alt="Cart Item"
                        className="max-sm:hidden"
                        radius="sm"
                        width={161}
                        height={143}
                      />
                      <Image
                        src={cartItem.image}
                        alt="Cart Item"
                        className="sm:hidden"
                        radius="sm"
                        width={101}
                        height={103}
                      />
                    </>
                  ) : (
                    <>
                      <div className="max-sm:hidden flex items-center justify-center bg-gray-100 w-[161px] h-[143px] rounded-md">
                        <span className="text-gray-500">No Image</span>
                      </div>
                      <div className="sm:hidden flex items-center justify-center bg-gray-100 w-[71px] h-[63px] rounded-md">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="mobile:flex-grow max-mobile:max-w-[240px] gap-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs mobile:text-sm sm:text-lg font-medium">
                        {cartItem.name || "Product Name"}
                      </span>
                      <span className="flex mobile:text-sm max-mobile:hidden gap-3 text-[#9FA9B3]">
                        <span>Material : {cartItem.material || "N/A"}</span>
                      </span>
                      <span className="flex text-xs mobile:hidden gap-3 text-[#9FA9B3]">
                        Packing : {cartItem.name || "N/A"} | Size : {cartItem.size || "N/A"} |
                        Quantity : {cartItem.quantity || "N/A"} | Design : {cartItem.design_number || "N/A"} | Material :{" "}
                        {cartItem.material || "N/A"}
                      </span>
                      <span className="sm:hidden flex items-center gap-[6px]">
                        <span className="text-base font-semibold">
                          ₹ {itemPrice}
                        </span>
                        <span className="text-xs line-through">
                          ₹ {itemPrice}
                        </span>
                      </span>
                    </div>
                    <div className="max-sm:hidden min-w-fit flex flex-col gap-2">
                      <span className="text-lg font-medium">
                        ₹ {itemPrice}
                      </span>
                      <span className="flex gap-3 line-through text-[#9FA9B3]">
                        ₹ {itemPrice}
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
                          selectedKeys={value.quantity ? [value.quantity] : []}
                          onChange={handleSelectionChange}
                        >
                          <SelectItem className="text-[8px]" key="">
                            Select
                          </SelectItem>
                          {constants.quantity.length > 0 &&
                            constants.quantity.map((ele) => (
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
                          selectedKeys={value.size ? [value.size] : []}
                          onChange={handleSelectionChange}
                        >
                          <SelectItem key="">Select</SelectItem>
                          {constants.size.length > 0 &&
                            constants.size.map((ele) => (
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
            <div className="p-8 text-center text-gray-500 shadow rounded-lg">No Item in Cart</div>
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
                  <span>₹ {itemPrice}</span>
                </span>
                <span className="flex justify-between w-full">
                  <span className="text-[#03172B96]">Price per item</span>
                  <span>₹ {pricePerItem}</span>
                </span>
                <span className="flex justify-between w-full">
                  <span className="text-[#03172B96]">Discount on MRP</span>
                  <span className="text-[#1CC618]">- ₹ {discount}</span>
                </span>
                <span className="flex justify-between w-full">
                  <span className="text-[#03172B96]">Delivery fee</span>
                  <span>₹ {deliveryFee}</span>
                </span>
                <Divider />
                <span className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹ {totalPrice}</span>
                </span>
              </div>
            </div>
            <Button
              onClick={handleSave}
              isDisabled={isConfirmDisabled}
              className="text-lg w-full font-bold bg-[#253670] text-white max-mobile:hidden h-14"
            >
              Confirm
            </Button>
          </div>
        ) : null}
      </div>
      <div className="mobile:hidden fixed bg-white left-0 bottom-0 flex items-center justify-between w-full px-[30px] py-[14px]">
        <div>
          <span className="font-medium">₹ {totalPrice}</span>
        </div>
        <Button
          onClick={handleSave}
          isDisabled={isConfirmDisabled}
          className="text-xs w-[88px] font-medium bg-[#143761] rounded-md text-white h-[38px]"
        >
          Confirm
        </Button>
      </div>
    </>
  );
}