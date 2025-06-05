"use client"
import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { FiPlusCircle, FiMinusCircle, FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

function FAQ() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [allQuestions, setAllQuestions] = useState({
    'Product Questions': [],
    'Artwork Questions': [],
    'Order Process Questions': [],
    
  });
  const [loading, setLoading] = useState({
    'Artwork Questions': false,
    'Order Process Questions': false,
    'Product Questions': false
  });
  const [error, setError] = useState({
    'Artwork Questions': null,
    'Order Process Questions': null,
    'Product Questions': null
  });
  const [openDropdowns, setOpenDropdowns] = useState({
    'Artwork Questions': false,
    'Order Process Questions': false,
    'Product Questions': false
  });
  const [hasMoreQuestions, setHasMoreQuestions] = useState({
    'Artwork Questions': true,
    'Order Process Questions': true,
    'Product Questions': true
  });
  const [currentOffsets, setCurrentOffsets] = useState({
    'Artwork Questions': 0,
    'Order Process Questions': 0,
    'Product Questions': 0
  });

  const questionTypes = [
    {
      key: 'Product Questions',
      title: 'Product Questions',
      description: 'Questions about product specifications, materials, and customization options',
      icon: '🎁'
    },
    {
      key: 'Artwork Questions',
      title: 'Artwork Questions',
      description: 'Questions about artwork requirements, file formats, and design specifications',
      icon: '🎨'
    },
    {
      key: 'Order Process Questions',
      title: 'Order Process Questions', 
      description: 'Questions about ordering, payment, shipping, and delivery process',
      icon: '📦'
    },
    
  ];

  // Load initial questions for all sections when component mounts
  useEffect(() => {
    questionTypes.forEach(type => {
      fetchFAQs(type.key, 0, 10);
    });
  }, []);

  const fetchFAQs = async (questionType, offset = 0, limit = 10, isLoadMore = false) => {
    try {
      setLoading(prev => ({ ...prev, [questionType]: true }));
      
      const params = new URLSearchParams({
        offset: offset.toString(),
        limit: limit.toString(),
        question_type: questionType
      });
      
      const response = await fetch(`${baseUrl}/api/v1/faqs?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      
      const result = await response.json();
      
      if (result.status === 200 && result.data) {
        const formattedQuestions = result.data.map(faq => ({
          id: faq.faq_id,
          question: faq.question,
          answer: faq.answer,
          question_type: faq.question_type
        }));
        
        setAllQuestions(prev => ({
          ...prev,
          [questionType]: isLoadMore 
            ? [...prev[questionType], ...formattedQuestions]
            : formattedQuestions
        }));
        
        setHasMoreQuestions(prev => ({
          ...prev,
          [questionType]: formattedQuestions.length === limit
        }));
        
        setError(prev => ({ ...prev, [questionType]: null }));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error(`Error fetching ${questionType}:`, err);
      setError(prev => ({ ...prev, [questionType]: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, [questionType]: false }));
    }
  };

  const toggleDropdown = (questionType) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [questionType]: !prev[questionType]
    }));
  };

  const toggleQuestion = (id) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const loadMoreQuestions = (questionType) => {
    const newOffset = currentOffsets[questionType] + 10;
    setCurrentOffsets(prev => ({
      ...prev,
      [questionType]: newOffset
    }));
    
    fetchFAQs(questionType, newOffset, 10, true);
  };

  return (
    <div className='h-full w-full md:mt-8'>
      <div className="relative flex justify-center items-center min-h-screen w-full">
        <div className="flex justify-center items-center bg-gradient-to-br from-white via-[#f8f9ff] to-[#f0f4ff] py-20 w-full h-auto">
          {/* Enhanced Background Effects */}
          <div className="top-0 left-1/2 absolute blur-[150px] w-full h-full transform -translate-x-1/2 opacity-40 overflow-hidden">
            <div className="top-[10%] right-[30%] bottom-[60%] left-[30%] absolute bg-gradient-to-br from-[rgba(10,124,255,0.6)] to-[rgba(10,124,255,0.1)] rounded-full" />
            <div className="top-[30%] right-[15%] bottom-[40%] left-[55%] absolute bg-gradient-to-bl from-[rgba(70,227,255,0.5)] to-[rgba(70,227,255,0.1)] rounded-full" />
            <div className="top-[25%] right-[50%] bottom-[45%] left-[15%] absolute bg-gradient-to-r from-[rgba(255,120,71,0.4)] to-[rgba(255,120,71,0.1)] rounded-full" />
            <div className="top-[60%] right-[40%] bottom-[15%] left-[25%] absolute bg-gradient-to-tr from-[rgba(119,51,255,0.5)] to-[rgba(119,51,255,0.2)] rounded-full" />
          </div>

          {/* FAQ Content */}
          <div className="z-40 flex flex-col items-center gap-12 px-6 w-full max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center space-y-6">
              {/* <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100">
                <div className="w-2 h-2 bg-gradient-to-r from-[#0A7CFF] to-[#46E3FF] rounded-full animate-pulse"></div>
                <span className="text-[#143761] text-sm font-medium">FAQ Section</span>
              </div> */}
              
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-center bg-gradient-to-r from-[#0d2643] via-[#003067] to-[#00284b] bg-clip-text text-transparent leading-tight">
                Frequently Asked Questions
              </h1>

              <div className="max-w-2xl mx-auto text-[#676D79] text-lg text-center leading-relaxed">
                Everything you need to know about our packaging solutions. Can&apos;t find the answer you&apos;re looking for?{" "}
                <a href="/contact" className="text-[#0A7CFF] font-semibold hover:underline transition-all">
                  Contact our support team
                </a>
              </div>
            </div>

            {/* Question Type Sections */}
            <div className="w-full space-y-20">
              {questionTypes.map((type) => (
                <div key={type.key} className="w-full">
                  {/* Section Header */}
                  <div
                    className="flex items-center justify-between bg-blue-900 backdrop-blur-sm border border-gray-200 rounded-b-3xl p-6 cursor-pointer hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                    onClick={() => toggleDropdown(type.key)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{type.icon}</div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#ffffff] transition-colors">
                          {type.title}
                        </h3>
                        <p className="text-[#dcdcdc] text-sm md:text-base mt-1">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* {allQuestions[type.key].length > 0 && (
                        <div className="bg-gradient-to-r from-[#112f51] to-[#004653] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {allQuestions[type.key].length} questions
                        </div>
                      )} */}
                      <FiChevronDown 
                        className={`text-[#ffffff] transition-transform duration-300 ${
                          openDropdowns[type.key] ? 'rotate-180' : ''
                        }`}
                        size={24}
                      />
                    </div>
                  </div>

                  {/* Questions Dropdown */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    openDropdowns[type.key] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="mt-4 space-y-3">
                      {loading[type.key] ? (
                        <div className="flex justify-center items-center py-12 bg-white/70 backdrop-blur-sm rounded-xl">
                          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0d3665]"></div>
                        </div>
                      ) : error[type.key] ? (
                        <div className="text-red-500 text-center py-8 bg-red-50 rounded-xl border border-red-200">
                          <div className="text-lg font-medium">Error loading questions</div>
                          <div className="text-sm mt-1">{error[type.key]}</div>
                        </div>
                      ) : allQuestions[type.key].length === 0 ? (
                        <div className="text-[#676D79] text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="text-lg">No questions available</div>
                          <div className="text-sm mt-1">Check back later for updates</div>
                        </div>
                      ) : (
                        <>
                          {allQuestions[type.key].map((item, index) => (
                            <div
                              key={item.id}
                              className="bg-white/80 backdrop-blur-sm shadow-md rounded-xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                              style={{
                                animationDelay: `${index * 50}ms`,
                                animation: openDropdowns[type.key] ? 'fadeInUp 0.5s ease-out forwards' : 'none'
                              }}
                            >
                              <div
                                className="flex justify-between items-center p-5 cursor-pointer group"
                                onClick={() => toggleQuestion(item.id)}
                              >
                                <div className="font-semibold text-base md:text-lg text-[#143761] group-hover:text-[#0A7CFF] transition-colors pr-4">
                                  {item.question}
                                </div>
                                <div className="text-[#0c3360] transition-transform duration-200 flex-shrink-0">
                                  {expandedQuestions[item.id] ? (
                                    <FiMinusCircle size={24} />
                                  ) : (
                                    <FiPlusCircle size={24} />
                                  )}
                                </div>
                              </div>
                              
                              {expandedQuestions[item.id] && (
                                <div className="px-5 pb-5 text-[#676D79] text-sm md:text-base border-t border-gray-100 bg-gradient-to-r from-white/90 to-[#f8f9ff]/90">
                                  <div className="pt-4 leading-relaxed">
                                    {item.answer}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}

                          {/* Load More Button
                          {hasMoreQuestions[type.key] && (
                            <div className="flex justify-center mt-6">
                              <Button
                                onClick={() => loadMoreQuestions(type.key)}
                                disabled={loading[type.key]}
                                className="bg-gradient-to-r from-[#0A7CFF] to-[#143761] text-white px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-all hover:shadow-xl hover:scale-105 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {loading[type.key] ? (
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                  <FiPlusCircle size={20} />
                                )}
                                {loading[type.key] ? 'Loading...' : 'Load more questions'}
                              </Button>
                            </div>
                          )} */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="text-center backdrop-blur-sm rounded-2xl p-8">
              <h3 className="md:text-4xl text-2xl font-bold text-[#0b2d57] mb-2 uppercase">Still have questions?</h3>
              <p className="text-[#676D79] mb-4">Our support team is here to help you with any additional questions.</p>
              <Button
                onClick={() => router.push('/contact')}
                className="bg-blue-900 text-white font-bold py-7 px-10 rounded-full text-xl hover:bg-blue-900 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}

              >
                Contact Us
                <GoArrowUpRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default FAQ;