"use client";

import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaChevronDown, FaChevronUp } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    query: ""
  });
  
  // Form loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // FAQ state
  const [openFAQ, setOpenFAQ] = useState(0);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Format the data to match the API expectations
      const formPayload = {
        name: formData.name,
        email: formData.email,
        number: formData.phone, 
        query: formData.query,
        flag_type: "get_in_touch"
      };
      
      // Send the form data to your API endpoint
      const response = await fetch(`${baseUrl}/api/v1/contact-us/get-in-touch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Reset the form on success
      setFormData({
        name: "",
        phone: "",
        email: "",
        query: "",
      });
      
      // Show success toast message
      toast.success(data.message || "Your request has been submitted. You will get a free sample in 7 days!");
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen md:mt-10 ">
      {/* Toast Container */}
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#ECFDF5',
              border: '1px solid #10B981',
              color: '#065F46',
            },
            duration: 5000,
          },
          error: {
            style: {
              background: '#FEF2F2',
              border: '1px solid #EF4444',
              color: '#991B1B',
            },
            duration: 5000,
          }
        }}
      />
      
      {/* Contact Form Section */}
      <div className="max-w-6xl mx-auto p-4 mb-12">
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden">
          {/* Left Column - Sample Info */}
          <div className="p-8 bg-gray-50">
            <h2 className="text-2xl font-semibold text-blue-900 mb-1">Get free sample</h2>
            <p className="text-gray-500 text-sm mb-6">Our samples</p>
            
            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            </p>
            
            <div className="flex flex-col sm:flex-row sm:space-x-8 mb-8">
              <div className="flex items-center mb-3 sm:mb-0">
                <FaPhone className="text-blue-600 mr-2 text-sm" />
                <span className="text-gray-700 text-sm">(229) 555-0109</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-2 text-sm" />
                <span className="text-gray-700 text-sm">deanna.curtis@example.com</span>
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
          
          {/* Right Column - Contact Form */}
          <div className="p-8 bg-white">
            <h2 className="text-2xl font-semibold text-blue-900 mb-1">Get in touch</h2>
            <p className="text-gray-500 text-sm mb-6">You will get a free sample in 7 days</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="flex">
                <select 
                  className="p-3 border border-gray-300 rounded-l w-20 text-gray-500 bg-white"
                  disabled={isSubmitting}
                >
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone"
                  className="w-full p-3 border border-gray-300 rounded-r border-l-0"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Any query you have"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded"
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`w-full bg-blue-900 text-white p-3 rounded-3xl hover:bg-blue-900 transition ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get now'}
              </button>
            </form>
          </div>
        </div>
      </div>

     
    </div>
  );
}