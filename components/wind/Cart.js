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
  const discount = 0; // You can calculate actual discount here
  const deliveryFee = 0; // You can calculate actual delivery fee here
  const totalPrice = itemPrice;
  const pricePerItem = cartItem?.quantity ? (itemPrice / parseFloat(cartItem.quantity)).toFixed(2) : 0;
  
  // Fixed handleSave function without using Promise
  async function handleSave() {
    try {
      setLoading(true);
      
      // Make sure we have valid selections
      if (!value.size || !value.quantity) {
        alert("Please select both size and quantity");
        setLoading(false);
        return;
      }
      
      // Create payload with proper structure
      const payload = {
        user_id: userId,
        packaging_id: parseInt(cartItem.packaging_id),
        size_id: parseInt(value.size),
        quantity_id: parseInt(value.quantity),
        material_id: parseInt(cartItem.material_id),
        payment_status_id: 1,
        price: parseFloat(itemPrice),
        additions_id: cartItem.addons ? 
          (Array.isArray(cartItem.addons) ? 
            cartItem.addons.map(addon => addon.id) : 
            [cartItem.addons.id]) : 
          []
      };
      
      const response = await axios.post(
        `${baseUrl}/api/v1/order/create-order`,
        payload
      );
      
      if (response.status === 200 || response.status === 201) {
        // Save order to localStorage
        localStorage.setItem('lastOrder', JSON.stringify(cartItem));
        
        // Keep showing loading state during the transition
        // We'll use a timeout to clear the cart AFTER navigation starts
        // Navigate to the order page first, keeping the cart visible during transition
        router.push("/order");
        
        // Set a delay before clearing the cart to ensure navigation has begun
        // This ensures the cart remains visible during the transition
        setTimeout(() => {
          dispatch(clearCart());
          setLoading(false);
        },2000); // Give the navigation a moment to start
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
    <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-700"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Processing your order...</p>
      </div>
    </div>
  );

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
              <Card className="shadow-md rounded-xl overflow-hidden">
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
                            <p className="text-xl font-bold text-gray-900">₹{itemPrice}</p>
                            {discount > 0 && (
                              <p className="text-sm line-through text-gray-400">₹{itemPrice + discount}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <p>Material: <span className="font-medium">{cartItem.material || "N/A"}</span></p>
                          <p>Size: <span className="font-medium">{cartItem.size || "N/A"}</span></p>
                          <p>Quantity: <span className="font-medium">{cartItem.addons ? (
                  Array.isArray(cartItem.addons) ? 
                    cartItem.addons.map(addon => addon.name).join(', ') || "Not selected" : 
                    typeof cartItem.addons === 'object' ? 
                      cartItem.addons.name || "Not selected" : 
                      cartItem.addons
                ) : "Not selected"}</span></p>
                          <p>Quantity: <span className="font-medium">{cartItem.quantity || "N/A"}</span></p>
                        </div>
                      </div>
                      
                      <Divider className="my-4" />
                      
                      {/* Product Options */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                          <Select
                            aria-label="Select size"
                            name="size"
                            label="Size"
                            placeholder="Select size"
                            className="w-full sm:w-40"
                            selectedKeys={value.size ? [value.size] : []}
                            onChange={handleSelectionChange}
                            isDisabled={loading}
                          >
                            {constants.size.length > 0 ? (
                              constants.size.map((ele) => (
                                <SelectItem key={ele.packaging_type_size_id.toString()}>
                                  {ele.size}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem key="loading">
                                {loading ? "Loading..." : "No sizes available"}
                              </SelectItem>
                            )}
                          </Select>
                          
                          <Select
                            aria-label="Select quantity"
                            name="quantity"
                            label="Quantity"
                            placeholder="Select quantity"
                            className="w-full sm:w-40"
                            selectedKeys={value.quantity ? [value.quantity] : []}
                            onChange={handleSelectionChange}
                            isDisabled={loading || constants.quantity.length === 0}
                          >
                            {constants.quantity.length > 0 ? (
                              constants.quantity.map((ele) => (
                                <SelectItem key={ele.packaging_type_size_quantity_id.toString()}>
                                  {ele.quantity}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem key="loading">
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
            <Card className="shadow-xs flex ">
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
            <Card className="shadow-md rounded-xl">
              <CardBody className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Total MRP</span>
                    <span>₹{itemPrice}</span>
                  </div>
                  
                  {/* <div className="flex justify-between text-gray-700">
                    <span>Price per item</span>
                    <span>₹{pricePerItem}</span>
                  </div> */}
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Discount on MRP</span>
                      <span className="text-green-600">-₹{discount}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery fee</span>
                    <span>{deliveryFee > 0 ? `₹${deliveryFee}` : "Free"}</span>
                  </div>
                  
                  <Divider />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="text-green-600 text-sm text-right">
                      You save ₹{discount} on this order
                    </div>
                  )}
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
      
      {/* Mobile Sticky Checkout Bar
      {Object.keys(cartItem).length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 lg:hidden z-50">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold">₹{totalPrice}</span>
              <span className="text-xs text-gray-500">{Object.keys(cartItem).length} item</span>
            </div>
            {!auth?(
              <div>
                <p>login</p>
              </div>
            ):(
              <Button
                color="primary"
                className="px-6 font-bold bg-gradient-to-r from-blue-700 to-blue-900"
                onClick={handleSave}
                isDisabled={isConfirmDisabled}
                isLoading={loading}
              >
                {loading ? "Processing..." : "Checkout"}
              </Button>
            )}
            
          </div>
        </div>
      )} */}
      
      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}
    </div>
  );
}