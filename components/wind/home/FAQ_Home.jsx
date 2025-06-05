"use client"
import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

function FAQ_Home() {
  const router = useRouter();
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const faqList = [
    {
      id: 1,
      question: "Are the pouches food-grade?",
      answer: "Yes, all our pouches are made using food-safe materials and meet relevant safety standards.",
    },
    {
      id: 2,
      question: "Can I customize the pouch size?",
      answer: "Through our website we offer a range of standard pouch sizes and quantities to help reduce MOQs, production costs, and simplify the process. We also offer custom sizes tailored to your product and brand needs — note it may take a little longer to produce. To get started, contact us at (612) 383-1960 or sales@thepkglab.com to discuss your project.",
    },
    {
      id: 3,
      question: "Can you help with design if I don't have artwork ready?",
      answer: "Yes, our design team can assist you with creating or finalizing your packaging artwork. We offer pre-print services to ensure accurate and precise finishing of the product requirement.",
    },
    {
      id: 4,
      question: "How long does production take?",
      answer: "Typically, production takes 2–4 weeks after artwork approval. Timelines may vary based on order size and complexity.",
    },
    {
      id: 5,
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide with reliable logistics partners.",
    },
  ];

  const toggleQuestion = (id) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className='w-full'>
      <div className="relative flex justify-center items-center w-full">
        <div className="flex justify-center items-center bg-gradient-to-br from-white via-[#f8f9ff] to-[#f0f4ff] py-16 w-full h-auto">
          {/* Enhanced Background Effects */}
          <div className="top-0 left-1/2 absolute blur-[150px] w-full h-full transform -translate-x-1/2 opacity-30 overflow-hidden">
            <div className="top-[20%] right-[30%] bottom-[60%] left-[30%] absolute bg-gradient-to-br from-[rgba(10,124,255,0.4)] to-[rgba(10,124,255,0.1)] rounded-full" />
            <div className="top-[40%] right-[15%] bottom-[30%] left-[55%] absolute bg-gradient-to-bl from-[rgba(70,227,255,0.3)] to-[rgba(70,227,255,0.1)] rounded-full" />
          </div>

          {/* FAQ Content */}
          <div className="z-40 flex flex-col items-center gap-10 px-6 w-full max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center bg-gradient-to-r from-[#143761] via-[#00336e] to-[#004f5d] bg-clip-text text-transparent leading-tight">
                Frequently Asked Questions
              </h2>
              <div className="max-w-xl mx-auto text-[#676D79] text-base md:text-lg text-center leading-relaxed">
                Quick answers to the most common questions about our services
              </div>
            </div>

            {/* FAQ Questions */}
            <div className="w-full space-y-4">
              {faqList.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                > 
                  <div className="px-6 py-4 flex justify-between" onClick={() => toggleQuestion(item.id)}>
                    <div className="font-semibold text-lg md:text-xl text-[#143761] group-hover:text-[#0A7CFF] transition-colors leading-relaxed">
                      {item.question}
                    </div>
                    <div className="text-[#0A7CFF] transition-transform duration-200 flex-shrink-0 ml-4">
                      {expandedQuestions[item.id] ? (
                        <FiMinusCircle size={24} />
                      ) : (
                        <FiPlusCircle size={24} />
                      )}
                    </div>
                  </div>

                  {expandedQuestions[item.id] && (
                    <div className="px-6 pb-6 text-[#676D79] text-sm md:text-base border-t border-gray-100 bg-gradient-to-r from-white/90 to-[#f8f9ff]/90 mt-4">
                      <div className="pt-4 leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* See All FAQs Button */}
            <div className="flex justify-center mt-8">
              <a
                href='/faq'
                className="bg-gradient-to-r from-[#0f3765] to-[#143761] text-white px-10 py-4 rounded-full font-semibold text-base md:text-lg transition-all hover:shadow-xl hover:scale-105 flex items-center gap-3"
              >
                See All FAQs
                <GoArrowUpRight size={20} />
              </a>
            </div>

            {/* Footer Note */}
            <div className="text-center">
              <p className="text-[#676D79] text-sm">
                Need more help?{" "}
                <a href="/contact" className="text-[#0A7CFF] font-semibold hover:underline transition-all">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default FAQ_Home;
