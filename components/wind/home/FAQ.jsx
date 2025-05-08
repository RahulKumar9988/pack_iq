"use client"
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

function FAQ() {
  const router  = useRouter();
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState(5);

  const questions = [
    {
      id: 1,
      question: "What materials do you use for packaging?",
      answer: "We use a variety of sustainable materials including recycled cardboard, biodegradable plastics, and eco-friendly inks. All our packaging solutions are designed with environmental impact in mind."
    },
    {
      id: 2,
      question: "How long does the customization process take?",
      answer: "The customization timeline typically ranges from 2-4 weeks depending on the complexity of your design and material requirements. Rush orders can be accommodated for an additional fee."
    },
    {
      id: 3,
      question: "Do you offer international shipping?",
      answer: "Yes, we ship our packaging solutions worldwide. International shipping rates and delivery times vary by location. Please contact our support team for specific details."
    },
    {
      id: 4,
      question: "What is the minimum order quantity?",
      answer: "Our minimum order quantity starts at 500 units for standard packaging solutions. For custom designs, the minimum may vary based on complexity and materials."
    },
    {
      id: 5,
      question: "Can I request samples before placing a bulk order?",
      answer: "Absolutely! We offer sample kits for all our standard packaging solutions. For custom designs, we provide digital mockups first, followed by physical samples upon approval."
    },
    {
      id: 6,
      question: "What file formats do you accept for custom designs?",
      answer: "We accept AI, EPS, PDF, and high-resolution PSD files. Our design team can also work with you to create custom designs from scratch."
    },
    {
      id: 7,
      question: "Do you offer design services?",
      answer: "Yes, our in-house design team can help create custom packaging solutions tailored to your brand. We offer everything from simple modifications to completely custom designs."
    },
    {
      id: 8,
      question: "What are your payment terms?",
      answer: "We require a 50% deposit to begin production, with the remaining balance due before shipping. We accept credit cards, bank transfers, and PayPal."
    }
  ];

  const toggleQuestion = (id) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const loadMoreQuestions = () => {
    setVisibleQuestions(prev => Math.min(prev + 3, questions.length));
  };

  return (
    <div>
      <div className="relative flex justify-center items-center">
        <div className="flex justify-center items-center bg-gradient-to-b from-white to-[#f8f9ff] py-16 w-full h-auto">
          {/* Enhanced Background Blur */}
          <div className="top-0 left-1/2 absolute blur-[125px] w-full h-full transform -translate-x-1/2 opacity-60 overflow-hidden">
            {/* Gradient Vectors */}
            <div className="top-[20%] right-[35%] bottom-[50%] left-[35%] absolute bg-gradient-to-tr from-[rgba(10,124,255,0.5)] to-[rgba(10,124,255,0.2)]" />
            <div className="top-[35%] right-[20%] bottom-[50%] left-[52%] absolute bg-gradient-to-bl from-[rgba(10,124,255,0.5)] to-[rgba(10,124,255,0.2)]" />
            <div className="top-[32%] right-[48%] bottom-[50%] left-[19%] absolute bg-gradient-to-r from-[#46E3FF] to-[rgba(70,227,255,0.5)]" />
            <div className="top-[50%] right-[48%] bottom-[28%] left-[19%] absolute bg-gradient-to-tr from-[#FF7847] to-[rgba(255,120,71,0.6)]" />
            <div className="top-[50%] right-[19%] bottom-[25%] left-[52%] absolute bg-gradient-to-bl from-[rgba(0,223,223,0.4)] to-[rgba(0,223,223,0.1)]" />
            <div className="top-[50%] right-[47%] bottom-[21%] left-[31%] absolute bg-gradient-to-r from-[rgba(119,51,255,0.6)] to-[rgba(119,51,255,0.3)]" />
          </div>

          {/* FAQ Content */}
          <div className="z-50 flex flex-col items-center gap-8 px-4 w-full max-w-7xl mx-auto">
            {/* Title with Gradient */}
            <h1 className="font-bold text-3xl text-center md:text-4xl lg:text-5xl bg-gradient-to-r from-[#143761] to-[#0A7CFF] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>

            {/* Subtitle */}
            <div className="flex flex-col items-center text-[#676D79] text-base text-center md:text-lg lg:text-xl">
              <div>
                Everything you need to know about our packaging solutions. Can&apos;t find
                the answer you&apos;re
              </div>
              <div>
                looking for? Feel free to{" "}
                <a href="/contact">
                <span  className="text-[#0A7CFF] font-medium cursor-pointer hover:underline transition-all">
                  contact us
                </span>
                </a>
              </div>
            </div>

            {/* Section Title with Gradient Line */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="text-[#676D79] text-lg md:text-xl font-medium">
                General Questions
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0A7CFF] to-[#46E3FF] rounded-full"></div>
            </div>

            {/* Questions List */}
            <div className="relative flex flex-col items-center gap-4 w-full">
              {questions.slice(0, visibleQuestions).map((item) => (
                <div
                  className="flex flex-col bg-white shadow-lg rounded-lg w-full sm:w-3/4 lg:w-3/5 overflow-hidden border border-gray-100 hover:border-blue-100 transition-all"
                  key={item.id}
                >
                  <div
                    className="flex justify-between items-center p-4 md:p-5 cursor-pointer"
                    onClick={() => toggleQuestion(item.id)}
                  >
                    <div className="font-medium text-base md:text-lg text-[#143761]">
                      {item.question}
                    </div>
                    <span className="text-[#0A7CFF] text-xl md:text-2xl">
                      {expandedQuestions[item.id] ? (
                        <FiMinusCircle size={24} />
                      ) : (
                        <FiPlusCircle size={24} />
                      )}
                    </span>
                  </div>
                  
                  {expandedQuestions[item.id] && (
                    <div className="p-4 pt-0 md:p-5 md:pt-0 text-[#676D79] text-sm md:text-base border-t border-gray-100 bg-gradient-to-r from-white to-[#f8f9ff]">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}

              {/* Load More Button */}
              {visibleQuestions < questions.length && (
                <div className="flex justify-center w-full mt-4">
                  <Button
                    onClick={loadMoreQuestions}
                    className="bg-gradient-to-r from-[#0A7CFF] to-[#143761] text-white px-6 py-2 rounded-full font-medium text-sm md:text-base transition-all hover:shadow-lg flex items-center gap-2"
                  >
                    <FiPlusCircle size={20} />
                    Load more questions
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative flex lg:flex-row flex-col justify-between items-center bg-gradient-to-r from-[#0A2D5E] to-[#143761] px-6 md:px-12 lg:px-32 py-12 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#0A7CFF] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#46E3FF] rounded-full blur-3xl"></div>
        </div>

        {/* Left Section - Text & Buttons */}
        <div className="relative z-10 flex flex-col gap-6 font-bold text-white text-xl sm:text-center md:text-3xl lg:text-4xl xl:text-5xl lg:text-left leading-tight md:leading-snug lg:w-1/2">
          <div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A0C2FF] to-[#46E3FF]">Ready to build your</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A0C2FF] to-[#46E3FF]">company&apos;s</span> dream
            packaging?
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row flex-col justify-center lg:justify-start gap-4">
            <Button
              className="bg-gradient-to-r from-[#0A7CFF] to-[#46E3FF] text-white flex items-center rounded-full gap-3 px-6 py-6 text-lg border-none hover:shadow-lg transition-all"
              onClick={()=> router.push('/packaging-type')}
            >
              Customize now
              <GoArrowUpRight />
            </Button>
            <Button
              variant="bordered"
              className="flex items-center gap-3 px-6 py-6 border-2 border-white rounded-full text-lg text-white hover:bg-white/10 transition-all"
              onClick={()=>router.push('/free-sample')}
            >
              Get sample products
            </Button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="relative mt-10 lg:mt-0 w-full lg:w-1/2 transform lg:translate-x-6">
          <div className="relative shadow-xl rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0A7CFF]/20 to-transparent z-10"></div>
            <Image
              src="/homepage10.svg"
              alt="Packaging Design"
              width={708}
              height={346}
              loading='lazy'
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;