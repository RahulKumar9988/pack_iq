"use client";

import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Package, ArrowRight, CheckCircle, Mail, Phone, User, AlertCircle, X } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 px-2 flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-left text-blue-900 font-medium">{question}</h3>
        {isOpen ? (
          <FaChevronUp className="text-blue-900" />
        ) : (
          <FaChevronDown className="text-blue-900" />
        )}
      </button>
      {isOpen && (
        <div className="py-3 px-2 text-gray-600 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [hovered, setHovered] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    query:"",
  });

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

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      // Format the data to match the API expectations
      const formPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        number: formData.phone.trim(), 
        query:formData.query.trim(),
        company: formData.company.trim() || "", // Optional field
        flag_type: "get_in_touch" // This identifies it as a sample request
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
      
      if (data.status === 200 || data.message === "contact details created") {
        // Reset the form on success
        setFormData({
          name: "",
          query: "",
          phone: "",
          email: "",
          company: "",
          
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

  return (
    <div className="w-full min-h-screen md:mt-12 ">
      {/* Toast Container */}
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
      
      <div className="max-w-6xl mx-auto p-4 mb-12">
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden">
          <div className="p-8 bg-gray-50">
          <h2 className="text-2xl md:text-5xl font-semibold text-blue-950 mb-1">Contact Us</h2>
          
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            <span className="font-semibold"> Have a question or need custom packaging support? </span> <br />
            We are here to help. You can call us, email us, or simply fill out the form — and our team will get back to you shortly.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:justify-around gap-4 sm:gap-8 mb-8">

            {/* Phone Section */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <FaPhone className="text-blue-900 mr-2 text-sm rotate-90" />
                <span className="text-gray-700 text-sm">+91 90077 78338</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <FaPhone className="text-blue-900 mr-2 text-sm rotate-90" />
                <span className="text-gray-700 text-sm">+91 62890 43085</span>
              </div>
            </div>

            {/* Email Section */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <FaEnvelope className="text-blue-900 mr-2 text-sm" />
                <span className="text-gray-700 text-sm">Sales@packiq.co.in</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <FaEnvelope className="text-blue-900 mr-2 text-sm" />
                <span className="text-gray-700 text-sm">Preeti@packiq.co.in</span>
              </div>
            </div>

          </div>

          
          <div className="flex justify-center">
            <img 
              src="/contact-us.png" 
              alt="Coffee Packaging Samples" 
              className="object-contain w-[388.95px] h-[361.72px]" 
            />
          </div>
        </div>
        
        {/* Right Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formAnimation}
          className="bg-white rounded-2xl shadow-xl p-5 backdrop-blur-sm border border-blue-100"
        >
          <div className="space-y-4">
            <motion.div 
              className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-10"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 ">
                 Send Us a message 
                </h2>
              </div>
            </motion.div>
            
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
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

              {/* Phone and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
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
                  <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
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
                <label className="text-lg font-medium text-gray-700">
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
                <label className="text-lg font-medium text-gray-700">
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
                    Request Sample Kit 
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