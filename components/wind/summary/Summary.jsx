"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Image, Divider, Badge, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Package, Box, Tag, Layers, PlusCircle, ChevronLeft, ShoppingCart } from "lucide-react";

const Summary = () => {
  const cartItem = useSelector((state) => state.cart.item) || {};
  const [itemPrice, setItemPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalPricePerQty, settotalPricePerQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pricePerItem, setPricePerItem] = useState(0);
  const router = useRouter();
  
  // Calculate prices based on cart data
  useEffect(() => {
    if (Object.keys(cartItem).length) {
      // Get the item price from the cart data
      const price = cartItem.price || 0;
      setItemPrice(price);
      
      // Calculate price per item first
      let calculatedPricePerItem = 0;
      if (cartItem.quantity && parseFloat(cartItem.quantity) > 0) {
        calculatedPricePerItem = (price / parseFloat(cartItem.quantity)).toFixed(2);
        setPricePerItem(calculatedPricePerItem);
      } else {
        setPricePerItem(0);
      }
      
      // Calculate total price using the same formula as in Cart component
      const calculatedTotalPricePerQuantity = price * (cartItem.quantity || 1);
      settotalPricePerQty(calculatedTotalPricePerQuantity);

      const calculatedDiscount = calculatedTotalPricePerQuantity * 0.18; // GST
      setDiscount(calculatedDiscount);
      setTotalPrice(calculatedTotalPricePerQuantity + calculatedDiscount);
    }
  }, [cartItem]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0b2949] to-indigo-800 bg-clip-text text-transparent">
            Order Summary
          </h1>
        </div>
      </motion.div>
      
      {Object.keys(cartItem).length ? (
        <>
          {/* Cart Item Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden"
          >
            {/* Animated accent */}
            {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <div className="absolute top-0 left-0 w-1  h-full bg-gradient-to-b from-blue-400 to-indigo-500 rounded-tr-md rounded-br-md"></div> */}
            
            <div className="flex gap-5 p-5 shadow-md rounded-lg mb-6 bg-white border border-gray-100">
              <div className="flex justify-center w-full items-start gap-4">
                <div className="w-fit relative group">
                  {/* Image container with hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-lg transform group-hover:scale-105 transition-all duration-300 -z-10"></div>
                  
                  {cartItem.image ? (
                    <>
                      <div className="relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-purple-50 opacity-50"></div>
                        <Image
                          src={cartItem.image}
                          alt="Cart Item"
                          className="max-sm:hidden relative z-10 transform group-hover:scale-105 transition-transform duration-300"
                          radius="md"
                          width={161}
                          height={143}
                          loading="lazy"
                        />
                        <Image
                          src={cartItem.image}
                          alt="Cart Item"
                          className="sm:hidden object-cover relative z-10"
                          radius="md"
                          width={140}
                          height={103}
                          loading="lazy"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="max-sm:hidden flex items-center justify-center bg-gradient-to-tr from-gray-50 to-blue-50 w-[161px] h-[143px] rounded-lg shadow-sm">
                        <Package size={48} className="text-gray-400" />
                      </div>
                      <div className="sm:hidden flex items-center justify-center bg-gradient-to-tr from-gray-50 to-blue-50 w-[100px] h-[80px] rounded-lg shadow-sm">
                        <Package size={32} className="text-gray-400" />
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex-grow flex flex-col gap-3">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-xl mobile:text-lg sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                        {cartItem.name || "Product Name"}
                        <motion.div 
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      </span>
                      
                      {/* Material tag for non-mobile */}
                      <span className="flex mobile:text-sm max-mobile:hidden gap-3 text-gray-600 items-center">
                        <Tag size={14} className="text-blue-500" />
                        <span>Material: <span className="font-medium">{cartItem.material || "N/A"}</span></span>
                      </span>
                      
                      {/* Details row with icons */}
                      <div className="flex flex-wrap text-sm gap-x-3 gap-y-2 text-gray-700">
                        <span className="flex items-center gap-1">
                          <Package size={14} className="text-blue-500" />
                          {cartItem.name || "N/A"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Box size={14} className="text-indigo-500" />
                          {cartItem.size || "N/A"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Layers size={14} className="text-purple-500" />
                          {cartItem.quantity || "N/A"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag size={14} className="text-green-500" />
                          {cartItem.material || "N/A"}
                        </span>
                      </div>
                      
                      {/* Mobile price display */}
                      <span className="sm:hidden flex items-center gap-[6px]">
                        <span className="text-base font-semibold text-blue-700">
                          ₹ {itemPrice}
                        </span>
                        <span className="text-xs line-through text-gray-400">
                          ₹ {(itemPrice * 1.05).toFixed(2)}
                        </span>
                      </span>
                    </div>
                    
                    {/* Desktop price display */}
                    <div className="max-sm:hidden min-w-fit flex flex-col gap-2">
                      <Tooltip content="Price per unit" color="primary">
                        <span className="text-lg font-semibold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                          ₹{itemPrice}/unit
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Details Table */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="border border-gray-100 rounded-lg overflow-hidden mb-6 shadow-sm">
              {/* Table header */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 border-b border-gray-100">
                <h2 className="font-medium text-gray-700 flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-500" />
                  Order Details
                </h2>
              </div>
              
              {/* Packaging Form Row */}
              <div className="flex border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <div className="w-1/3 p-4 font-medium text-gray-700 flex items-center gap-2">
                  <Package size={16} className="text-blue-500" />
                  Packaging form:
                </div>
                <div className="w-2/3 p-4 flex justify-between items-center">
                  <span className="text-gray-800">{cartItem.name || "Not selected"}</span>
                </div>
              </div>

              {/* Material Row */}
              <div className="flex border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <div className="w-1/3 p-4 font-medium text-gray-700 flex items-center gap-2">
                  <Tag size={16} className="text-indigo-500" />
                  Material:
                </div>
                <div className="w-2/3 p-4 flex justify-between items-center">
                  <span className="text-gray-800">{cartItem.material || "Not selected"}</span>
                </div>
              </div>

              {/* Size Row */}
              <div className="flex border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <div className="w-1/3 p-4 font-medium text-gray-700 flex items-center gap-2">
                  <Box size={16} className="text-purple-500" />
                  Size:
                </div>
                <div className="w-2/3 p-4 flex justify-between items-center">
                  <span className="text-gray-800">{cartItem.size || "Not selected"}</span>
                </div>
              </div>

              {/* Quantity Row */}
              <div className="flex border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <div className="w-1/3 p-4 font-medium text-gray-700 flex items-center gap-2">
                  <Layers size={16} className="text-green-500" />
                  Quantity:
                </div>
                <div className="w-2/3 p-4 flex justify-between items-center">
                  <span className="text-gray-800">{cartItem.quantity || "Not selected"}</span>
                </div>
              </div>

              {/* Design Row */}
              <div className="flex border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <div className="w-1/3 p-4 font-medium text-gray-700 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Design:
                </div>
                <div className="w-2/3 p-4 flex justify-between items-center">
                  <span className="text-gray-800">
                    {cartItem.design_number ? (
                      <Badge color="warning" variant="flat" className="ml-0">
                        {cartItem.design_number}
                      </Badge>
                    ) : "Not selected"}
                  </span>
                </div>
              </div>

              {/* Add on section */}
              <div className="flex hover:bg-gray-50 transition-colors duration-200">
                <div className="w-1/3 p-4 font-medium text-gray-700 flex items-center gap-2">
                  <PlusCircle size={16} className="text-blue-600" />
                  Additions:
                </div>
                <div className="w-2/3 p-4 flex justify-between items-center">
                  <span className="text-gray-800">
                    {cartItem.addons ? (
                      Array.isArray(cartItem.addons) ? 
                        cartItem.addons.map((addon, idx) => (
                          <Badge key={idx} color="primary" variant="flat" className="mr-2 mb-1">
                            {addon.name}
                          </Badge>
                        )) : 
                        typeof cartItem.addons === 'object' ? 
                          <Badge color="primary" variant="flat">
                            {cartItem.addons.name || "Not selected"}
                          </Badge> : 
                          cartItem.addons
                    ) : "Not selected"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Price Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-blue-500">₹</span>
                Price Details
              </h2>
              
              <div className="relative overflow-hidden">
                {/* Animated corner accent */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-10"></div>
                
                <div className="flex max-mobile:flex-col gap-5 p-5 shadow-md rounded-lg bg-white border border-gray-100">
                  <div className="flex flex-col justify-between w-full gap-4">
                    <div className="flex justify-between w-full items-center">
                      <span className="text-gray-600">Total MRP:</span>
                      <span className="font-medium">₹ {totalPricePerQty.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between w-full items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Total GST:</span>
                        <Tooltip content="18% GST" color="primary" placement="left">
                          <div className="flex items-center justify-center w-4 h-4 bg-blue-100 rounded-full text-blue-600 text-xs cursor-help">?</div>
                        </Tooltip>
                      </div>
                      <span className="text-green-600">+ ₹{(discount).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between w-full items-center">
                      <span className="text-gray-600">Delivery fee</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    
                    <Divider className="my-1" />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">₹ {totalPrice.toFixed(2)}</span>
                    </div>
                    
                    {/* Savings info */}
                    <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-md flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-sm text-green-800">Free delivery on all orders!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-end gap-4 mt-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 font-medium border border-blue-700 bg-white rounded-lg text-blue-700 hover:bg-blue-50 transition-colors duration-200"
            >
              <ChevronLeft size={16} />
              Back
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/cart')}
              className="flex items-center gap-2 px-4 py-2 font-medium bg-gradient-to-r from-[#0b2949] to-indigo-800 rounded-lg text-white hover:shadow-lg transition-all duration-200"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </motion.button>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="p-8 text-center bg-white shadow-md rounded-lg border border-gray-100"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-blue-50 rounded-full">
              <ShoppingCart size={48} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Your Cart is Empty</h3>
            <p className="text-gray-500 max-w-md">There are no items in your cart. Start shopping to add items!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Continue Shopping
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Summary;