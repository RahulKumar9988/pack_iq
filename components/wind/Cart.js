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
  Card,
  CardBody,
  Tooltip,
  Badge
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function Cart() {
  const [value, setValue] = useState({
    quantity: "",
    size: "",
  });
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalPricePerQty, settotalPricePerQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [constants, setConstant] = useState({
    quantity: [],
    size: [],
  });
  const auth = useAppSelector(state => state.auth.isAuthenticated);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state?.cart?.item) || {};
  const router = useRouter();
  

  // Enhanced selection change handler that also updates the cartItem via Redux if needed
  const handleSelectionChange = (e) => {
    const { name, value } = e.target;
    setValue((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

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
      setLoading(true);
      const sizeResponse = await axios.get(
        `${baseUrl}/api/v1/resources/list-packaging-type-size/${cartItem.packaging_id}`
      );
      if (sizeResponse.data.status === 200) {
        const sizeArray = sizeResponse.data.data.map((ele) => {
          return {
            packaging_type_size_id: ele.packaging_type_size_id,
            size_id: ele.sizeId.id, // Store the actual size_id for the API
            size: `Size: ${ele.sizeId.name}`,
          };
        });
        setConstant((prevData) => ({
          ...prevData,
          size: sizeArray,
        }));
      }
    } catch (error) {
      console.error("Error fetching sizes:", error?.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getQuantities() {
    try {
      setLoading(true);
      const quantityResponse = await axios.get(
        `${baseUrl}/api/v1/resources/list-packaging-type-size-quantity/${value.size}`
      );
      if (quantityResponse.data.status === 200) {
        const quantityArray = quantityResponse.data.data.map((ele) => {
          return {
            quantity: `Quantity: ${ele.quantityId.quantity}`,
            quantity_id: ele.quantityId.id, // Store the actual quantity_id for the API
            price: ele.quantityId.price,
            packaging_type_size_quantity_id: ele.packaging_type_size_quantity_id,
          };
        });
        setConstant((prevData) => ({
          ...prevData,
          quantity: quantityArray,
        }));
      }
    } catch (error) {
      console.error("Error fetching quantities:", error?.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
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
  const pricePerItem = cartItem?.quantity ? (itemPrice / parseFloat(cartItem.quantity)).toFixed(2) : 0;
  
  // Fixed handleSave function with order date
  async function handleSave() {
    try {
      setLoading(true);
      
      // Make sure we have valid selections
      if (!value.size || !value.quantity) {
        alert("Please select both size and quantity");
        setLoading(false);
        return;
      }
      
      // Get current date
      // const orderDate = getCurrentDate();
      
      // Create payload with proper structure and add order date
      const payload = {
        user_id: userId,
        packaging_id: parseInt(cartItem.packaging_id),
        size_id: parseInt(value.size),
        quantity_id: parseInt(value.quantity),
        material_id: parseInt(cartItem.material_id),
        payment_status_id: 1,
        price: parseFloat(totalPrice),
        // order_date: orderDate, // Add order date to payload
        additions_id: Array.isArray(cartItem.addons) ? 
          cartItem.addons.map(addon => addon.additionsId?.additions_id || addon.id) : 
          cartItem.addons ? [cartItem.addons.additionsId?.additions_id || cartItem.addons.id] : 
          []
      };
      
      const response = await axios.post(
        `${baseUrl}/api/v1/order/create-order`,
        payload
      );
      
      if (response.status === 200 || response.status === 201) {
        // Save order to localStorage with date
        const orderWithDate = {
          ...cartItem,
          // order_date: orderDate
        };
        localStorage.setItem('lastOrder', JSON.stringify(orderWithDate));
        
        // Keep showing loading state during the transition
        // We'll use a timeout to clear the cart AFTER navigation starts
        // Navigate to the order page first, keeping the cart visible during transition
        router.push("/order");
        
        // Set a delay before clearing the cart to ensure navigation has begun
        // This ensures the cart remains visible during the transition
        setTimeout(() => {
          dispatch(clearCart());
          setLoading(false);
        }, 2000); // Give the navigation a moment to start
      }
    } catch (error) {
      console.error("Order creation failed:", 
        error?.response?.data || error.message
      );
      alert("Failed to create order. Please try again or contact support.");
      setLoading(false);
    }
  }

  // Modify the disabled logic to check the selection values instead of cart properties
  const isConfirmDisabled = !cartItem.packaging_id ||
    !cartItem.material_id ||
    !value.size ||
    !value.quantity ||
    loading;

  const handleDelete = () => {
    dispatch(clearCart());
  };

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="fixed inset-0  bg-opacity-80 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-700"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Processing your order...</p>
      </div>
    </div>
  );

  useEffect(() => {
    // Calculate total price when itemPrice or cartItem changes
    const calculatedTotalPricePerQuantity = itemPrice * (cartItem.quantity || 1);
    settotalPricePerQty(calculatedTotalPricePerQuantity);
    
    // GST is 18% of the total price
    const calculatedGST = calculatedTotalPricePerQuantity * 0.18;
    setDiscount(calculatedGST); // This should actually be GST, not discount
    
    // Total price is base price + GST
    setTotalPrice(calculatedTotalPricePerQuantity + calculatedGST);
  }, [itemPrice, cartItem.quantity]);

  return (
    <div className="container mx-auto mb-20">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="w-full lg:w-3/5">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
          
          {Object.keys(cartItem).length ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-md rounded-xl overflow-hidden bg-[#fffef7]">
                <CardBody className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="sm:w-36 md:w-40 lg:w-48 flex-shrink-0">
                      {cartItem.image ? (
                        <Image
                          src={cartItem.image}
                          alt={cartItem.name || "Product"}
                          className="w-full h-auto object-contain rounded-lg"
                          radius="md"
                          width="100%"
                          height={180}
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center bg-gray-100 w-full h-40 rounded-lg">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                              {cartItem.name || "Product Name"}
                            </h2>
                            <Badge color="primary" variant="flat" className="mt-1">
                              Design: {cartItem.design_number || "N/A"}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">₹{itemPrice}/unit</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <p>Material: <span className="font-medium">{cartItem.material || "N/A"}</span></p>
                          {/* <p>Size: <span className="font-medium">{cartItem.size || "N/A"}</span></p> */}
                          <p>Additions: <span className="font-medium">{cartItem.addons ? (
                            Array.isArray(cartItem.addons) ? 
                              cartItem.addons.map(addon => addon.additionsId?.additions_title || addon.name).join(', ') || "Not selected" : 
                              typeof cartItem.addons === 'object' ? 
                                cartItem.addons.additionsId?.additions_title || cartItem.addons.name || "Not selected" : 
                                cartItem.addons
                          ) : "Not selected"}</span>
                          </p>
                          <p>Quantity: <span className="font-medium">{cartItem.quantity || "N/A"}</span></p>
                          {/* <p>Order Date: <span className="font-medium">{getCurrentDate()}</span></p> */}
                        </div>
                      </div>
                      
                      <Divider className="my-4" />
                      
                      {/* Product Options */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#fffef7]">
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto bg-[#fffef7]">
                          <Select
                            aria-label="Select size"
                            name="size"
                            placeholder="Select size"
                            className="w-full sm:w-40 bg-[#fffef7]"
                            selectedKeys={value.size ? [value.size] : []}
                            onChange={handleSelectionChange}
                            isDisabled={loading}
                          >
                            {constants.size.length > 0 ? (
                              constants.size.map((ele) => (
                                <SelectItem className="bg-[#fffef7]" key={ele.packaging_type_size_id.toString()}>
                                  {ele.size}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem className="bg-[#fffef7]" key="loading">
                                {loading ? "Loading..." : "No sizes available"}
                              </SelectItem>
                            )}
                          </Select>
                          
                          <Select
                            aria-label="Select quantity"
                            name="quantity"
                            placeholder="Select quantity"
                            className="w-full sm:w-40 bg-[#fffef7]"
                            selectedKeys={value.quantity ? [value.quantity] : []}
                            onChange={handleSelectionChange}
                            isDisabled={loading || constants.quantity.length === 0}
                          >
                            {constants.quantity.length > 0 ? (
                              constants.quantity.map((ele) => (
                                <SelectItem className="bg-[#fffef7]" key={ele.packaging_type_size_quantity_id.toString()}>
                                  {ele.quantity}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem className="bg-[#fffef7]" key="loading">
                                {loading ? "Loading..." : "Select size first"}
                              </SelectItem>
                            )}
                          </Select>
                        </div>
                        
                        <Tooltip content="Remove from cart" color="primary">
                          <Button
                            color=''
                            variant="light"
                            startContent={<DeleteIcon />}
                            onClick={handleDelete}
                            className="self-end"
                          >
                            <span className="sm:inline hidden">Remove</span>
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ) : (
            <Card className="shadow-xs flex bg-[#fffef7]">
              <CardBody className="py-12">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-6xl text-gray-300">🛒</div>
                  <h3 className="text-xl font-medium text-gray-600">Your cart is empty</h3>
                  <Button 
                    color="primary" 
                    variant="flat" 
                    onClick={() => router.push('/')}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
        
        {/* Order Summary Section */}
        {Object.keys(cartItem).length ? (
          <div className="w-full lg:w-2/5 lg:sticky lg:top-24 self-start">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h1>
            <Card className="shadow-md rounded-xl bg-[#fffef7]">
              <CardBody className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Price:</span>
                    <span>₹{totalPricePerQty.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total GST:</span>
                      <span className="text-green-600 text-sm">+ ₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery fee</span>
                    <span>{deliveryFee > 0 ? `₹${deliveryFee}` : "Free"}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Order Date</span>
                    {/* <span>{getCurrentDate()}</span> */}
                  </div>
                  
                  <Divider />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
                
                {!auth?(
                  <Button
                    color="primary"
                    className="px-6 font-bold bg-gradient-to-r from-blue-700 to-blue-900"
                    onClick={()=>router.push('/auth/signin')}
                  >
                    Please login
                  </Button>
                ):(
                  <Button
                    color="primary"
                    className="px-6 font-bold bg-gradient-to-r from-blue-700 to-blue-900"
                    onClick={handleSave}
                    isDisabled={isConfirmDisabled}
                    isLoading={loading}
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                )}
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardBody>
            </Card>
          </div>
        ) : null}
      </div>
      
      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}
    </div>
  );
}