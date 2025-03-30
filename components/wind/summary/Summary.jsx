"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Image, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Summary = () => {
  const cartItem = useSelector((state) => state.cart.item) || {};
  const [itemPrice, setItemPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pricePerItem, setPricePerItem] = useState(0);
  const router = useRouter();

  console.log(cartItem);
  

  // Calculate prices based on cart data
  useEffect(() => {
    if (Object.keys(cartItem).length) {
      // Get the item price from the cart data
      const price = cartItem.price || 0;
      setItemPrice(price);
      
      // Set discount and delivery fee like in Cart component
      const calculatedDiscount = price > 0 ? 0 : 0;
      const calculatedDeliveryFee = price > 0 ? 0 : 0;
      setDiscount(calculatedDiscount);
      setDeliveryFee(calculatedDeliveryFee);
      
      // Calculate price per item first
      let calculatedPricePerItem = 0;
      if (cartItem.quantity && parseFloat(cartItem.quantity) > 0) {
        calculatedPricePerItem = (price / parseFloat(cartItem.quantity)).toFixed(2);
        setPricePerItem(calculatedPricePerItem);
      } else {
        setPricePerItem(0);
      }
      
      // Calculate total price using the same formula as in Cart component
      const calculatedTotalPrice = price - calculatedDiscount + calculatedDeliveryFee;
      setTotalPrice(calculatedTotalPrice);
    }
  }, [cartItem]);

  return (
    <div className="max-w-4xl mx-auto p-4 mb-[66px]">
      <h1 className="text-xl font-bold mb-4">Summary</h1>
      
      {Object.keys(cartItem).length ? (
        <>
          {/* Cart Item Details */}
          <div className="flex gap-5 p-3 mobile:p-3 sm:p-5 shadow rounded-lg mb-6">
            <div className="flex justify-center w-full items-start gap-3">
              <div className="w-fit">
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
                      className="sm:hidden object-cover"
                      radius="sm"
                      width={200}
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
              <div className="mobile:flex-grow max-mobile:max-w-[240px] gap-4 flex flex-col">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-xl mobile:text-sm sm:text-lg font-medium">
                      {cartItem.name || "Product Name"}
                    </span>
                    <span className="flex mobile:text-sm max-mobile:hidden gap-3 text-[#7a8188]">
                      <span>Material : {cartItem.material || "N/A"}</span>
                    </span>
                    <span className="flex text-xs  gap-3 text-[#7a8188]">
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
              </div>
            </div>
          </div>

          {/* Order Details Table */}
          <div className="border rounded-md overflow-hidden mb-6">
            {/* Packaging Form Row */}
            <div className="flex border-b">
              <div className="w-1/3 p-4 bg-gray-50 font-medium">Packaging form:</div>
              <div className="w-2/3 p-4 flex justify-between items-center">
                <span>{cartItem.name || "Not selected"}</span>
                <button className="text-[#253670]" onClick={()=>router.push('/packaging-type')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Material Row */}
            <div className="flex border-b">
              <div className="w-1/3 p-4 bg-gray-50 font-medium">Material:</div>
              <div className="w-2/3 p-4 flex justify-between items-center">
                <span>{cartItem.material || "Not selected"}</span>
                <button className="text-[#253670]" onClick={()=>router.push('/packaging-type')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Size Row */}
            <div className="flex border-b">
              <div className="w-1/3 p-4 bg-gray-50 font-medium">Size:</div>
              <div className="w-2/3 p-4 flex justify-between items-center">
                <span>{cartItem.size || "Not selected"}</span>
                <button className="text-[#253670]" onClick={()=>router.push('/packaging-type')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Quantity Row */}
            <div className="flex border-b">
              <div className="w-1/3 p-4 bg-gray-50 font-medium">Quantity:</div>
              <div className="w-2/3 p-4 flex justify-between items-center">
                <span>{cartItem.quantity || "Not selected"}</span>
                <div className="flex items-center">
                  {/* <span className="font-medium">
                    ₹ {itemPrice}
                  </span> */}
                  <button className="text-[#253670] ml-4" onClick={()=>router.push('/packaging-type')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Design Row */}
            <div className="flex border-b">
              <div className="w-1/3 p-4 bg-gray-50 font-medium">Design:</div>
              <div className="w-2/3 p-4 flex justify-between items-center">
                <span>{cartItem.design_number || "Not selected"}</span>
                <button className="text-[#253670]" onClick={()=>router.push('/packaging-type')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Add on section */}
            <div className="flex border-b">
              <div className="w-1/3 p-4 bg-gray-50 font-medium">Additions:</div>
              <div className="w-2/3 p-4 flex justify-between items-center">
              <span>
                {cartItem.addons ? (
                  Array.isArray(cartItem.addons) ? 
                    cartItem.addons.map(addon => addon.name).join(', ') || "Not selected" : 
                    typeof cartItem.addons === 'object' ? 
                      cartItem.addons.name || "Not selected" : 
                      cartItem.addons
                ) : "Not selected"}
              </span>
                <button className="text-[#253670]" onClick={()=>router.push('/packaging-type')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="flex flex-col gap-4">
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
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button onClick={()=>router.push('/')} className="text-xs w-[88px] font-medium border-1 border-[#143761] bg-white rounded-md text-[#143761] h-[38px]">
              exit
            </button>
            <button onClick={()=>router.push('/cart')} className="text-xs w-[88px] font-medium bg-[#143761] rounded-md text-white h-[38px]">
              Add to Cart
            </button>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-gray-500 shadow rounded-lg">No Item in Cart</div>
      )}

      {/* Mobile Fixed Bottom Bar - Same as in Cart */}
      <div className="mobile:hidden fixed bg-white left-0 bottom-0 flex items-center justify-between w-full px-[30px] py-[14px]">
        <div>
          <span className="font-medium">₹ {totalPrice}</span>
        </div>
        <button onClick={()=>router.push('/cart')} className="text-xs w-[88px] font-medium bg-[#143761] rounded-md text-white h-[38px]">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Summary;