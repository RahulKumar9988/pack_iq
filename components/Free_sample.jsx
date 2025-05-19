"use client"
import React, { useState } from "react";
import { Package, ArrowRight, CheckCircle, Gift, Mail, Phone, User, X } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function EnhancedFreeSample() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    query: "",
  });
  const [hovered, setHovered] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        query: "",
      });
      // Show success popup instead of alert
      setShowSuccessPopup(true);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const benefits = [
    "High-quality packaging samples customized for your brand",
    "Consultation with professional packaging designers",
    "Material options suited for your product type",
    "No commitment required - see before you decide"
  ];

  return (
    <div className="relative w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="top-0 left-1/2 absolute blur-[125px] w-full h-full transform -translate-x-1/2 opacity-60 overflow-hidden">
            {/* Gradient Vectors */}
            <div className="top-[20%] right-[35%] bottom-[50%] left-[35%] absolute bg-gradient-to-tr from-[rgba(10,124,255,0.5)] to-[rgba(10,124,255,0.2)]" />
            <div className="top-[35%] right-[20%] bottom-[50%] left-[52%] absolute bg-gradient-to-bl from-[rgba(10,124,255,0.5)] to-[rgba(10,124,255,0.2)]" />
            <div className="top-[32%] right-[48%] bottom-[50%] left-[19%] absolute bg-gradient-to-r from-[#46E3FF] to-[rgba(70,227,255,0.5)]" />
            <div className="top-[50%] right-[48%] bottom-[28%] left-[19%] absolute bg-gradient-to-tr from-[#FF7847] to-[rgba(255,120,71,0.6)]" />
            <div className="top-[50%] right-[19%] bottom-[25%] left-[52%] absolute bg-gradient-to-bl from-[rgba(0,223,223,0.4)] to-[rgba(0,223,223,0.1)]" />
            <div className="top-[50%] right-[47%] bottom-[21%] left-[31%] absolute bg-gradient-to-r from-[rgba(119,51,255,0.6)] to-[rgba(119,51,255,0.3)]" />
          </div>
          
            <div className="inline-flex items-center py-1 px-3 bg-indigo-800 bg-opacity-90 rounded-full border border-indigo-400 mb-4">
              <span className="text-xs font-medium text-indigo-100">Free Sample Program</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
              Experience our premium <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-600">
                packaging designs
              </span>
            </h1>
            
            <p className="text-indigo-900 text-lg max-w-lg">
              Professional packaging samples customized for your brand. See and feel the quality before you commit.
            </p>
            
            <div className="space-y-4 pt-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle size={18} className="text-green-500" />
                  </div>
                  <p className="text-indigo-900 text-sm sm:text-base">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Package className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Request Your Free Sample
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Delivered in 7 days, no obligations
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Tell us about your product
                  </label>
                  <textarea
                    name="query"
                    placeholder="Describe your product and packaging needs..."
                    value={formData.query}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? "bg-gray-400" 
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  } text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg`}
                  disabled={isSubmitting}
                  onMouseEnter={() => setHovered('submit')}
                  onMouseLeave={() => setHovered(null)}
                >
                  {isSubmitting ? "Processing..." : "Request Sample Now"}
                  {!isSubmitting && (
                    <ArrowRight 
                      size={18} 
                      className={`transition-transform duration-300 ${hovered === 'submit' ? 'transform translate-x-1' : ''}`} 
                    />
                  )}
                </button>
                
                <p className="text-gray-500 text-xs text-center pt-2">
                  By submitting, you agree to our Terms and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Popup - Improved for better positioning on all devices */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto flex justify-center">
          <div 
            className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full animate-fadeIn m-4"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              maxHeight: '90vh',
              marginTop: 'auto',
              marginBottom: 'auto'
            }}
          >
            <button 
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X size={20} />
            </button>
            
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-green-100 p-3 rounded-full inline-flex">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800">
                Success!
              </h3>
              
              <p className="text-gray-600">
                Your request has been submitted. You will get a free sample in 7 days!
              </p>
              
              <div className="pt-4">
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-medium transition-all duration-300"
                >
                  Great, thanks!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}