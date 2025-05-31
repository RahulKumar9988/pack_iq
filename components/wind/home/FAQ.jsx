"use client"
import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function FAQ() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/v1/faqs`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }
        
        const result = await response.json();
        
        if (result.status === 200 && result.data) {
          // Map the API response to match our component's expected format
          const formattedQuestions = result.data.map(faq => ({
            id: faq.faq_id,
            question: faq.question,
            answer: faq.answer
          }));
          
          setQuestions(formattedQuestions);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

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
          <div className="z-40 flex flex-col items-center gap-8 px-4 w-full max-w-7xl mx-auto">
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
                <span className="text-[#0A7CFF] font-medium cursor-pointer hover:underline transition-all">
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
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A7CFF]"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-4">
                  Error loading FAQs: {error}
                </div>
              ) : questions.length === 0 ? (
                <div className="text-[#676D79] text-center py-4">
                  No FAQs available at the moment.
                </div>
              ) : (
                questions.slice(0, visibleQuestions).map((item) => (
                  <div
                    className="flex flex-col bg-white shadow-lg rounded-lg w-full sm:w-3/4 lg:w-3/5 overflow-hidden border border-gray-100 hover:border-blue-100 transition-all"
                    key={item.id}
                  >
                    <div
                      className="flex justify-between items-center p-4 md:py-2 md:px-3 cursor-pointer"
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
                      <div className="p-4 pt-0  md:pt-0 text-[#676D79] text-sm md:text-base border-t border-gray-100 bg-gradient-to-r from-white to-[#f8f9ff]">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* Load More Button */}
              {!loading && !error && visibleQuestions < questions.length && (
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
      
    </div>
  );
}

export default FAQ;