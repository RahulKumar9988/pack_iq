"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ArrowRight, CheckCircle, Mail, Phone, User, AlertCircle, X } from "lucide-react";

export default function EnhancedFreeSample() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    city: "",
    query:"",
    state: "",
    country: "",
    phone: "",
    email: "",
    company: "",
    productType: "",
    pouchType: "",
  });
  
  const [errors, setErrors] = useState({});
  const [hovered, setHovered] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };
  

  const formAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validatePincode = (pincode) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please provide a complete address";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pin code is required";
    } else if (!validatePincode(formData.pincode)) {
      newErrors.pincode = "Please enter a valid pin code";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (formData.city.trim().length < 2) {
      newErrors.city = "City name must be at least 2 characters long";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    } else if (formData.state.trim().length < 2) {
      newErrors.state = "State name must be at least 2 characters long";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    } else if (formData.country.trim().length < 2) {
      newErrors.country = "Country name must be at least 2 characters long";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.productType) {
      newErrors.productType = "Please select a product type";
    }

    if (!formData.pouchType) {
      newErrors.pouchType = "Please select a pouch type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setErrorMessage("Please fix the errors below and try again.");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setShowError(false);
    
    try {
      // Format the data to match the API expectations based on your screenshot
      const formPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        number: formData.phone.trim(), 
        address: formData.address.trim(),
        pincode: formData.pincode.trim(),
        city: formData.city.trim(),
        query:formData.query.trim(),
        state: formData.state.trim(),
        country: formData.country.trim(),
        company: formData.company.trim() || "", // Optional field
        product_type: formData.productType,
        pouch_type: formData.pouchType,
        flag_type: "sample_product" // This identifies it as a sample request
      };
      
      console.log('Submitting form data:', formPayload);
      
      // Send the form data to your API endpoint
      const response = await fetch(`${baseUrl}/api/v1/contact-us/get-in-touch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });
      
      console.log('Response status:', response.status);
      
      // Try to parse the response
      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        // Handle different types of API errors
        let errorMsg = "Something went wrong. Please try again.";
        
        if (response.status === 400) {
          errorMsg = data.message || data.error || "Please check your information and try again.";
        } else if (response.status === 422) {
          errorMsg = data.message || "Validation error. Please check your input.";
        } else if (response.status === 429) {
          errorMsg = "Too many requests. Please wait a moment and try again.";
        } else if (response.status >= 500) {
          errorMsg = "Server error. Please try again later.";
        } else if (data.message) {
          errorMsg = data.message;
        } else if (data.error) {
          errorMsg = data.error;
        }
        
        setErrorMessage(errorMsg);
        throw new Error(errorMsg);
      }
      
      // Check if the response indicates success
      if (data.status === 200 || data.message === "contact details created") {
        // Reset the form on success
        setFormData({
          name: "",
          address: "",
          pincode: "",
          city: "",
          state: "",
          country: "",
          query: "",
          phone: "",
          email: "",
          company: "",
          productType: "",
          pouchType: "",
        });
        
        // Show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 7000);
        
        console.log('Form submitted successfully');
      } else {
        // Handle unexpected response format
        throw new Error(data.message || "Unexpected response from server");
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle different types of errors
      let errorMsg = "Failed to submit your request. Please try again.";
      
      if (!navigator.onLine) {
        errorMsg = "No internet connection. Please check your connection and try again.";
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMsg = "Network error. Please check your connection and try again.";
      } else if (error.message && !error.message.includes('Failed to fetch')) {
        errorMsg = error.message;
      }
      
      setErrorMessage(errorMsg);
      setShowError(true);
      setTimeout(() => setShowError(false), 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const productOptions = [
    "Tea",
    "Coffee", 
    "Snacks",
    "Spices",
    "Sweets",
    "Chocolate",
    "Fitness & Health",
    "Dry Fruits",
    "Pet Food",
    "Cosmetics",
    "House & Garden",
    "Accessories",
    "Others"
  ];
  
  const whatYouGet = [
    "A mix of our most popular pouch styles — stand-up, flat bottom, and 3-side seal",
    "Printed samples to showcase our material quality, finishes, and print precision",
    "A hands-on feel for sizes, closures, and textures",
    "Inspiration and ideas to guide your own packaging design"
  ];
  
  const pouchTypes = [
    "Stand Up",
    "Flat Bottom",
    "3-Side Seal",
    "Spouted Pouch",
    "Gusseted Pouch"
  ];

  const whoIsItFor = [
    { title: "Startups", description: "testing packaging options before going to market" },
    { title: "Creative teams", description: "designers, brand managers, and product developers needing hands-on material to visualize concepts" },
    { title: "Growing businesses", description: "ready to upgrade or switch to smarter, more flexible packaging" },
    { title: "D2C brands", description: "looking for standout, custom-printed pouch solutions" },
    { title: "Manufacturers and resellers", description: "exploring reliable, high-quality packaging partners" }
  ];

  return (
    <div className="relative w-full min-h-screen">
      {/* Success Toast with animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full"
          >
            <div className="bg-white shadow-lg rounded-lg pointer-events-auto flex items-center border-l-4 border-green-500">
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Success! 🎉</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Your request has been submitted. You will get a free sample in 7 days!
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Toast with animation */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full"
          >
            <div className="bg-white shadow-lg rounded-lg pointer-events-auto flex items-center border-l-4 border-red-500">
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertCircle className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Error ⚠️</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => setShowError(false)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-6 text-center lg:text-left md:mt-3"
          >
            <div className="top-0 left-1/2 absolute blur-[125px] w-full h-full transform -translate-x-1/2 opacity-60 overflow-hidden -z-40">
              {/* Gradient Vectors */}
              <div className="top-[20%] right-[35%] bottom-[50%] left-[35%] absolute bg-gradient-to-tr from-[rgb(188,219,255)] to-[rgb(212,232,255)]" />
              <div className="top-[35%] right-[20%] bottom-[50%] left-[52%] absolute bg-gradient-to-bl from-[rgb(145,196,255)] to-[rgba(152,200,255,0.2)]" />
              <div className="top-[32%] right-[48%] bottom-[50%] left-[19%] absolute bg-gradient-to-r from-[#46E3FF] to-[rgb(219,250,255)]" />
              <div className="top-[50%] right-[48%] bottom-[28%] left-[19%] absolute bg-gradient-to-tr from-[#cddbff] to-[rgba(255,178,150,0.6)]" />
              <div className="top-[50%] right-[19%] bottom-[25%] left-[52%] absolute bg-gradient-to-bl from-[rgba(201,255,255,0.4)] to-[rgba(181,255,255,0.1)]" />
              <div className="top-[50%] right-[47%] bottom-[21%] left-[31%] absolute bg-gradient-to-r from-[rgba(210,187,255,0.6)] to-[rgba(119,51,255,0.3)]" />
            </div>
            {/* Main Heading */}
            <motion.div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-950 leading-tight">
                Get Your Free Sample
              </h1>
              <p className="text-lg text-indigo-900 font-medium">
                Experience PackIQ Quality Before You Order ✨
              </p>
            </motion.div>
            
            {/* What You'll Get Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="space-y-3 border-1 border-gray-300 rounded-xl p-2 bg-white/80 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-blue-950 underline">What You&apos;ll Get 🎯</h2>
              <div className="space-y-2">
                {whatYouGet.map((item, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemAnimation}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <span className="text-xl">
                        {index === 0 ? "📦" : 
                         index === 1 ? "🎨" : 
                         index === 2 ? "✋" : 
                         "💡"}
                      </span>
                    </div>
                    <p className="text-blue-950 text-lg leading-relaxed">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Who Is It For Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="space-y-3 border-1 border-gray-300 rounded-xl p-2 bg-white/80 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-blue-950 underline">Who is it for? 👥</h2>
              <div className="space-y-2">
                {whoIsItFor.map((item, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemAnimation}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <span className="text-xl">
                        {index === 0 ? "🚀" : 
                         index === 1 ? "🎨" : 
                         index === 2 ? "📈" : 
                         index === 3 ? "🛒" : 
                         "🏭"}
                      </span>
                    </div>
                    <p className="text-blue-950 text-lg leading-relaxed">
                      <span className="font-semibold">{item.title}</span> {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formAnimation}
            className="bg-white rounded-2xl shadow-xl p-5 backdrop-blur-sm border border-blue-100 md:mt-14"
          >
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 border-b border-gray-100 pb-3"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 1.5, repeat: Infinity }
                  }}
                  className="bg-indigo-100 p-2 rounded-lg"
                >
                  <Package className="h-5 w-5 text-blue-600" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Sample Kit Request 📝
                  </h2>
                </div>
              </motion.div>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Product Type Dropdown */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      What would you like to Pack? *
                    </label>
                    <select
                      name="productType"
                      value={formData.productType}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                        errors.productType ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      required
                    >
                      <option value="" disabled hidden className="text-gray-200">
                        Select Product Type
                      </option>
                      {productOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.productType && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.productType}
                      </p>
                    )}
                  </div>

                  {/* Pouch Type Dropdown */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      Type of pouch you want *
                    </label>
                    <select
                      name="pouchType"
                      value={formData.pouchType}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                        errors.pouchType ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      required
                    >
                      <option value="">Select Pouch Type</option>
                      {pouchTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.pouchType && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.pouchType}
                      </p>
                    )}
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                    <User size={14} className="text-gray-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    placeholder="Your complete address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                      errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    required
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Pin Code and City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      Pin Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pin code"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                        errors.pincode ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      required
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                        errors.city ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      required
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                {/* State and Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                        errors.state ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      required
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.state}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                        errors.country ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      required
                    />
                    {errors.country && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      Email ID *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company/Brand */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company or brand name (optional)"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Query */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Write your query 
                  </label>
                  <input
                    type="text"
                    name="query"
                    placeholder="Write your query here."
                    value={formData.query}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  variants={pulseAnimation}
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-950 hover:to-blue-950"
                  } text-white py-2.5 px-4 rounded-3xl font-medium shadow-md hover:shadow-lg text-lg`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      Processing 
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="ml-2"
                      >
                        ⏳
                      </motion.span>
                    </>
                  ) : (
                    <>
                      Request Sample Kit 🚚
                    </>
                  )}
                </motion.button>
                
                <p className="text-gray-500 text-xs text-center pt-1">
                  By submitting, you agree to our Terms and Privacy Policy
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}