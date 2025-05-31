
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const AdvancedQAContact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState('questions');
  const [animateText, setAnimateText] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setAnimateText(true), 500);
  }, []);

  const questions = [
    {
      id: 1,
      icon: "🎯",
      question: "Special Requirements?",
      answer: "Custom orders, bulk pricing, and flexible framework agreements available",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: "📦",
      question: "Large Volume Orders?",
      answer: "Need more than 20,000 pouches? We offer competitive bulk pricing",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      icon: "⚡",
      question: "Quick Turnaround?",
      answer: "Rush orders and expedited delivery options available",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      icon: "💼",
      question: "Business Partnerships?",
      answer: "Flexible framework agreements for ongoing business relationships",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const contactMethods = [
    {
      id: 1,
      icon: "💬",
      method: "Live Chat",
      description: "Instant support available",
      action: "Chat Now",
      gradient: "from-green-500 to-emerald-500",
      links: "/contact"
    },
    {
      id: 2,
      icon: "📞",
      method: "Phone Call",
      description: "Speak with our experts",
      action: "Call Us",
      gradient: "from-blue-500 to-cyan-500",
      links: "/contact"
    },
    {
      id: 3,
      icon: "📧",
      method: "Email",
      description: "Detailed inquiries welcome",
      action: "Send Email",
      gradient: "from-purple-500 to-pink-500",
      links: "/contact"
    },
    {
      id: 4,
      icon: "📅",
      method: "Schedule Meeting",
      description: "Book a consultation",
      action: "Book Now",
      gradient: "from-orange-500 to-red-500",
      links: "/contact"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-white py-20 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-4000"></div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Illustration/Character */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Character Container */}
              <div className="relative w-80 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-2xl overflow-hidden">
                {/* Character Illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {/* Animated Character */}
                    <div className={`text-8xl mb-4 transition-all duration-1000 ${
                      animateText ? 'scale-100 rotate-0' : 'scale-50 rotate-12'
                    }`}>
                      🤔
                    </div>
                    
                    {/* Thinking Bubbles */}
                    <div className="absolute -top-2 -right-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-4 h-4 bg-white rounded-full animate-bounce animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Icons */}
                <div className="absolute top-8 left-8 text-2xl animate-float">💡</div>
                <div className="absolute top-12 right-12 text-2xl animate-float animation-delay-1000">❓</div>
                <div className="absolute bottom-16 left-12 text-2xl animate-float animation-delay-2000">📞</div>
                <div className="absolute bottom-8 right-8 text-2xl animate-float animation-delay-3000">💬</div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-xl opacity-20 -z-10"></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className={`transition-all duration-1000 delay-300 ${
              animateText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Our team is here to help with special requests, bulk orders, and custom solutions tailored just for you! 🚀
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-white/50 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
              <button
                onClick={() => setActiveTab('questions')}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'questions'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Common Questions
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'contact'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Get In Touch
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'questions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions.map((q, index) => (
                  <div
                    key={q.id}
                    className={`group bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl animate-fade-in-up`}
                    style={{ animationDelay: `${index * 150}ms` }}
                    onMouseEnter={() => setHoveredCard(q.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`text-2xl transition-all duration-300 ${
                        hoveredCard === q.id ? 'scale-110 rotate-12' : ''
                      }`}>
                        {q.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg bg-gradient-to-r ${q.gradient} bg-clip-text text-transparent mb-2`}>
                          {q.question}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {q.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={method.id}
                    className={`group bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl animate-fade-in-up`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="text-center space-y-3">
                      <div className="text-3xl">{method.icon}</div>
                      <h3 className={`font-bold text-lg bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent`}>
                        {method.method}
                      </h3>
                      <p className="text-gray-600 text-sm">{method.description}</p>
                      <button onClick={(e)=> router.push(method.links)} className={`w-full py-2 px-4 bg-gradient-to-r ${method.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                        {method.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AdvancedQAContact;