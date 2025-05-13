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
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EditIcon } from "lucide-react"; // Import EditIcon from lucide-react

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  

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
  
  // Handle form submission in the modal
  const handleSaveChanges = () => {
    onClose(); // Close the modal
    // Additional logic if needed after saving changes
  };

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
      
      // Create payload with proper structure
      const payload = {
        user_id: userId,
        packaging_id: parseInt(cartItem.packaging_id),
        size_id: parseInt(value.size),
        quantity_id: parseInt(value.quantity),
        material_id: parseInt(cartItem.material_id),
        payment_status_id: 1,
        price: parseFloat(totalPrice),
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
          ...cartItem
        };
        localStorage.setItem('lastOrder', JSON.stringify(orderWithDate));
        
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
    localStorage.removeItem('lastOrder');
  };

  const isCartEmpty =
  !cartItem ||
  (
    !cartItem.packagingType &&
    !cartItem.size &&
    !cartItem.weight &&
    !cartItem.material &&
    Array.isArray(cartItem.addons) &&
    cartItem.addons.length === 0
  );

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-blue-50 bg-opacity-80 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-700"></div>
        <p className="mt-4 text-lg font-medium text-gray-100">Processing your order...</p>
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

  console.log(cartItem, "cartItem");
  return (
    <div className="container mx-auto mb-20">
      {/* Product Details Section */}
      <div className="w-full flex flex-col md:flex-row gap-5">
        <div className="w-full lg:w-3/5">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
            
          </div>
          
          {!isCartEmpty ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-100 relative">
                {/* Animated corner accent */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-300 to-purple-100 rounded-full opacity-20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                />
                
                <CardBody className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image with animation */}
                    <div className="sm:w-36 md:w-40 lg:w-48 flex-shrink-0 relative">
                      <motion.div 
                        className="absolute -z-10 top-2 left-2 w-full h-full bg-gradient-to-tr from-blue-100 to-purple-100 rounded-lg"
                        animate={{ rotate: [-1, 1, -1] }}
                        transition={{ repeat: Infinity, duration: 6 }}
                      />
                      {cartItem.image ? (
                        <Image
                          src={cartItem.image}
                          alt={cartItem.name || "Product"}
                          className="w-full h-auto object-contain rounded-lg shadow-sm"
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
                            <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
                              {cartItem.name || "Product Name"}
                              <motion.span
                                className="inline-block w-2 h-2 bg-green-500 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              />
                            </h2>
                            
                            Design: {cartItem.design_number || "N/A"}
                          </div>
                          <div className="text-right" >
                            <p className="text-sm font-bold bg-gradient-to-r from-blue-800 to-purple-900 bg-clip-text text-transparent">₹{itemPrice}/unit</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <motion.div 
                              className="w-2 h-2 bg-blue-400 rounded-sm"
                              animate={{ rotate: [0, 90, 0] }}
                              transition={{ repeat: Infinity, duration: 3 }}
                            />
                            Material:  
                            <span className="font-medium ml-1">{cartItem.material || "N/A"}</span>
                          </div>
                          <p className="flex items-center gap-1">
                            <motion.div 
                              className="w-2 h-2 bg-purple-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            />
                            Size: <span className="font-medium">
                              {constants.size.find(s => s.packaging_type_size_id.toString() === value.size)?.size?.replace('Size: ', '') || "Not selected"}
                            </span>
                          </p>
                          <p className="flex items-center gap-1">
                            <motion.div 
                              className="w-2 h-2 bg-green-400 rounded-sm"
                              animate={{ rotate: [0, -90, 0] }}
                              transition={{ repeat: Infinity, duration: 3 }}
                            />
                            Quantity: <span className="font-medium">
                              {constants.quantity.find(q => q.packaging_type_size_quantity_id.toString() === value.quantity)?.quantity?.replace('Quantity: ', '') || "Not selected"}
                            </span>
                          </p>
                          <p className="flex items-center gap-1">
                            <motion.div 
                              className="w-2 h-2 bg-amber-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ repeat: Infinity, duration: 2.5 }}
                            />
                            Additions: <span className="font-medium">{cartItem.addons ? (
                              Array.isArray(cartItem.addons) ? 
                                cartItem.addons.map(addon => addon.additionsId?.additions_title || addon.name).join(', ') || "Not selected" : 
                                typeof cartItem.addons === 'object' ? 
                                  cartItem.addons.additionsId?.additions_title || cartItem.addons.name || "Not selected" : 
                                  cartItem.addons
                            ) : "Not selected"}</span>
                          </p>
                        </div>
                      </div>
                      
                      <Divider className="my-4" />
                      
                      {/* Edit button and Remove button with animation */}
                      <div className="flex justify-between items-center">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            color="primary"
                            variant="flat"
                            startContent={<EditIcon size={18} />}
                            onClick={onOpen}
                            className=" bg-gradient-to-r from-blue-300 to-blue-400"
                          >
                            Edit
                          </Button>
                        </motion.div>
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Tooltip content="Remove from cart" color="primary">
                            <Button
                              color="danger"
                              variant="light"
                              startContent={<DeleteIcon />}
                              onClick={handleDelete}
                              className="hover:bg-red-50"
                            >
                              <span className="sm:inline hidden">Remove</span>
                            </Button>
                          </Tooltip>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-sm rounded-2xl p-6 overflow-hidden relative">
                {/* Animated background elements for empty cart */}
                <motion.div 
                  className="absolute top-5 left-5 w-6 h-6 bg-blue-200 rounded-full"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                <motion.div 
                  className="absolute bottom-5 right-12 w-4 h-4 bg-purple-200 rounded-sm"
                  animate={{ 
                    rotate: [0, 180, 360],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                />
                <motion.div 
                  className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-200 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                />
                
                <CardBody>
                  <div className="flex flex-col items-center justify-center gap-6 py-4">
                    <motion.div 
                      className="text-7xl text-indigo-400 drop-shadow-lg"
                      animate={{ 
                        y: [0, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      🛒
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-gray-700">Your cart is empty</h3>
                    <p className="text-gray-500 text-center max-w-xs">
                      Looks like you haven not added anything yet. Start exploring our store to fill your cart!
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                        onClick={() => router.push('/')}
                      >
                        Continue Shopping
                      </Button>
                    </motion.div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Order Summary Section with enhanced styling */}
        {!isCartEmpty  ? (
          <div className="w-full lg:w-2/5 lg:sticky lg:top-24 self-start">
            <div className="flex items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Order Summary</h1>
              <motion.div 
                className="ml-auto flex items-center gap-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="w-2 h-2 bg-purple-500 rounded-sm" />
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="shadow-md rounded-xl overflow-hidden relative">
                {/* Decorative corner element */}
                <div className="absolute -top-1 -right-1 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl opacity-20" />
                
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
                    
                    <Divider />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">₹{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {!auth ? (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        color="primary"
                        className="w-full flex items-center gap-2 px-4 py-2 font-bold bg-gradient-to-r from-[#0b2949] to-indigo-800 rounded-lg text-white hover:shadow-lg transition-all duration-200"
                        onClick={()=>router.push('/auth/signin')}
                      >
                        Please login to checkout
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        color="primary"
                        className="w-full mt-6 px-6 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                        onClick={handleSave}
                        isDisabled={isConfirmDisabled}
                        isLoading={loading}
                      >
                        {loading ? "Processing..." : "Checkout & place order"}
                      </Button>
                    </motion.div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        ) : null}
      </div>

      {/* Edit Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="lg" // Changed from "md" to "lg" to accommodate the table
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn"
              }
            }
          }
        }}
        backdrop="blur"
        className="bg-gradient-to-br from-white to-blue-50"
      >
        <ModalContent className="relative overflow-hidden">
          {/* Decorative elements remain the same */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-100 rounded-full blur-xl opacity-40 animate-pulse" style={{ animationDelay: "1s" }}></div>
          
          <ModalHeader className="flex flex-col gap-1 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Edit Item Details
              </h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">Customize your product options</p>
          </ModalHeader>
          
          <ModalBody className="z-10">
            <div className="flex flex-col gap-4">
              {/* Size selector remains the same */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl transform group-hover:scale-105 transition-transform duration-300 -z-10"></div>
                <Select
                  label="Size"
                  name="size"
                  placeholder="Select size"
                  selectedKeys={value.size ? [value.size] : []}
                  onChange={handleSelectionChange}
                  isDisabled={loading}
                  classNames={{
                    trigger: "bg-white shadow-sm hover:shadow-md transition-shadow duration-200",
                    label: "text-blue-700 font-medium"
                  }}
                  fullWidth
                >
                  {constants.size.length > 0 ? (
                    constants.size.map((ele) => (
                      <SelectItem 
                        key={ele.packaging_type_size_id.toString()}
                        className="data-[hover=true]:bg-blue-50"
                      >
                        {ele.size}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key="loading">
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <span className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></span>
                          <span>Loading sizes...</span>
                        </div>
                      ) : "No sizes available"}
                    </SelectItem>
                  )}
                </Select>
              </div>
              
              {/* Quantities Table - New Section */}
              {value.size && constants.quantity.length > 0 && (
                <div className="w-full">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Select Quantity</h4>
                  <div className="border-1 rounded-xl overflow-hidden">
                    {/* Header Row */}
                    <div className="bg-blue-50 relative tap-highlight-transparent inline-flex h-[50px] w-full rounded-t-xl items-center justify-between px-4 border-b-1">
                      <div className="grid grid-cols-5 w-full text-[#808b98] text-xs">
                        <div className="flex justify-center items-center font-normal">
                          Quantity
                        </div>
                        <div className="flex justify-center items-center font-normal">
                          Discount
                        </div>
                        <div className="flex justify-center items-center font-normal">
                          Price/unit
                        </div>
                        <div className="flex justify-center items-center font-normal">
                          Total Price
                        </div>
                        <div className="flex justify-center text-center items-center font-normal">
                          No of Design
                        </div>
                      </div>
                    </div>
                    
                    {/* Quantity Items */}
                    <div className="max-h-[300px] overflow-y-auto">
                      {constants.quantity.map((ele, i) => {
                        // Parse the quantity from the string (e.g., "Quantity: 100" -> 100)
                        const quantityValue = parseInt(ele.quantity.replace('Quantity: ', ''));
                        const discount = i === 0 ? 0 : ((constants.quantity[0]?.price - ele.price) / constants.quantity[0]?.price * 100).toFixed(0);
                        
                        return (
                          <div
                            key={i}
                            className={`inline-flex h-auto min-h-16 w-full m-0 cursor-pointer border-b last:border-b-0 px-4 py-2 ${
                              value.quantity === ele.packaging_type_size_quantity_id.toString() ? 'bg-blue-50' : 'hover:bg-blue-50'
                            }`}
                            onClick={() => handleSelectionChange({
                              target: { name: 'quantity', value: ele.packaging_type_size_quantity_id.toString() }
                            })}
                          >
                            <div className="grid grid-cols-5 w-full gap-2">
                              {/* Size Column with Checkbox */}
                              <div className="flex flex-col justify-center">
                                <div className="flex justify-center flex-wrap items-center gap-2">
                                  <div className="w-5 h-5 border rounded-full flex items-center justify-center">
                                    {value.quantity === ele.packaging_type_size_quantity_id.toString() && (
                                      <div className="w-3 h-3 bg-[#253670] rounded-full"></div>
                                    )}
                                  </div>
                                  <span className="text-sm font-medium">
                                    {quantityValue}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Discount Column */}
                              <div className="flex justify-center items-center">
                                {parseInt(discount) > 0 ? (
                                  <span className="px-2 py-0.5 bg-[#1CC6181A] text-xs text-[#1CC618] rounded-full whitespace-nowrap">
                                    {discount}% off
                                  </span>
                                ) : (
                                  <span className="text-xs text-[#03172B80]">-</span>
                                )}
                              </div>

                              {/* Price/unit Column */}
                              <div className="flex flex-col justify-center items-center">
                                <div className="flex flex-col items-center">
                                  <span className="text-sm font-medium">
                                    ₹{parseFloat(ele.price).toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              {/* Total Price Column */}
                              <div className="flex flex-col justify-center items-center">
                                <div className="flex flex-col items-center">
                                  <span className="text-sm font-medium">
                                    ₹{(parseFloat(ele.price) * quantityValue).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              
                              {/* No of Design Column - This is placeholder data since we don't have design_number in our quantity object */}
                              <div className="flex justify-center items-center">
                                <span className="text-sm">
                                  {Math.max(1, Math.floor(quantityValue / 1000))}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {value.size && constants.quantity.length === 0 && (
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></span>
                      <p>Loading quantities...</p>
                    </div>
                  ) : (
                    <p>No quantities available for this size</p>
                  )}
                </div>
              )}
            </div>
          </ModalBody>
          
          <ModalFooter className="z-10">
            <Button 
              color="danger" 
              variant="light"
              onPress={onClose}
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">Cancel</span>
              <div className="absolute inset-0 bg-red-100 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
            </Button>
            <Button 
              color="primary" 
              onPress={handleSaveChanges}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Save Changes
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-white opacity-20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 

      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}
    </div>
  );
}