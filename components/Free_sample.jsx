"use client";
import React, { useState } from "react";
import { Package } from "lucide-react";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 px-2 flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-left text-blue-800 font-medium text-sm md:text-base">
          {question}
        </h3>
        {isOpen ? (
          <FaChevronUp className="text-blue-800" />
        ) : (
          <FaChevronDown className="text-blue-800" />
        )}
      </button>
      {isOpen && (
        <div className="py-3 px-2 text-gray-600 text-xs md:text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const FreeSample = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    query: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const faqData = [
    {
      question: "What makes printing different?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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

  const questions = [
    "I need a quote",
    "Something’s wrong with my order",
    "I have a question",
    "Other"
  ];
  

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center"
        style={{
          backgroundImage: 'url("/free-sample.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
          height: '100vh'
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-16 md:pt-24 pb-12">
        {/* Heading Section */}
        <div className="flex flex-col lg:flex-row lg:justify-around lg:items-start gap-6 md:gap-8 lg:gap-12 w-full mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 lg:mb-0 text-center lg:text-left">
            Get a taste of our <br className="hidden sm:block" /> products
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            Scaleup Finance helps startups and SMEs make smarter strategic decisions by taking their financial management to the next level.
          </p>
        </div>

        <Button
          onClick={() => router.push("/contact")}
          className="bg-transparent border-b-1 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mt-8 lg:mt-12"
        >
          Get in touch
          <GoArrowUpRight />
        </Button>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 max-w-3xl w-full mt-8 sm:mt-10">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 ml-2">
              Unlock your free product
            </h2>
          </div>
          <p className="text-gray-600 text-center mb-4 sm:mb-6 text-sm md:text-base">
            You will get a free sample in 7 days
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-start">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Eg: Sharmistha Halder"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 | Your phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="query"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Query
              </label>
              <textarea
                id="query"
                name="query"
                placeholder="Any query you have"
                value={formData.query}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
              <div className="flex justify-center sm:justify-start">
                <button
                  type="submit"
                  className="bg-[#143761] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 w-full sm:w-auto"
                >
                  Request now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 bg-white py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* FAQ Sidebar */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User 1" 
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white" />
                {/* Other images */}
              </div>
              <span className="text-xs md:text-sm text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span>
                We are live now
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-blue-900 mb-2">
              Do you have any question?
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mb-6">
              Frequently asked questions
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
              {questions.map((question, index) => (
                <button 
                  key={index} 
                  className="px-3 py-2 text-xs md:text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 whitespace-nowrap"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="md:w-2/3 lg:w-3/4">
            <div className="bg-gray-50 rounded-2xl p-4 md:p-6 lg:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-6 text-center md:text-left">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2 md:space-y-4">
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
      </div>
    </div>
  );
};

export default FreeSample;