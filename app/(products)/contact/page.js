"use client";
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 px-2 flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-left text-blue-800 font-medium">{question}</h3>
        {isOpen ? (
          <FaChevronUp className="text-blue-800" />
        ) : (
          <FaChevronDown className="text-blue-800" />
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
  
  // FAQ state
  const [openFAQ, setOpenFAQ] = useState(0);
  
  // FAQ data
  const faqData = [
    {
      question: "What makes printing different?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      question: "What makes printing different?",
      answer: "Our advanced printing technology offers superior quality, faster turnaround times, and more sustainable options compared to traditional methods."
    },
    {
      question: "What makes printing different?",
      answer: "We use eco-friendly materials and processes that reduce environmental impact while maintaining high-quality results."
    },
    {
      question: "What makes printing different?",
      answer: "Our customization options allow for unique designs and finishes that stand out from standard printing services."
    },
    {
      question: "What makes printing different?",
      answer: "We offer specialized solutions for various industries, ensuring your printed materials meet specific requirements and standards."
    },
    {
      question: "What makes printing different?",
      answer: "Our prices are competitive while offering premium quality thanks to our efficient processes and technology investments."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      phone: "",
      email: "",
      query: ""
    });
    alert("Your request has been submitted. You will get a free sample in 7 days!");
  };

  return (
    <div className="w-full min-h-screen">
      {/* Contact Form Section */}
      <div className="max-w-6xl mx-auto p-4 mb-12">
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden">
          {/* Left Column - Sample Info */}
          <div className="p-8 bg-gray-50">
            <h2 className="text-2xl font-semibold text-blue-800 mb-1">Get free sample</h2>
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
            <h2 className="text-2xl font-semibold text-blue-800 mb-1">Get in touch</h2>
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
                />
              </div>
              
              <div className="flex">
                <select className="p-3 border border-gray-300 rounded-l w-20 text-gray-500 bg-white">
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
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-800 text-white p-3 rounded hover:bg-blue-900 transition"
              >
                Get now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto p-4 mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* FAQ Sidebar */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold text-blue-800 mb-1">Do you have any question?</h2>
            <p className="text-gray-500 text-sm mb-6">Frequently asked questions</p>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          
          {/* FAQ Accordion */}
          <div className="md:w-2/3">
            {faqData.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}