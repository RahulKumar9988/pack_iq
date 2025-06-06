"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function About_us() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="md:mt-16 w-full flex flex-col items-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="w-full relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-blue-400/5 to-cyan-600/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-lg opacity-10 animate-bounce delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-lg opacity-15 animate-bounce delay-500"></div>
        </div>

        <div className={`relative z-10 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-900 via-blue-500 to-cyan-600 bg-clip-text text-transparent leading-tight mb-6 animate-fade-in-up">
              We Simplify Your
              <br />
              <span className="text-gray-800 animate-fade-in-up delay-300">Company Packaging</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up delay-500">
              Redefining packaging for startups and emerging brands with quality, innovation, and simplicity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-700">
              <Button
                onClick={() => router.push("/contact")}
                className="bg-gradient-to-r from-blue-900 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform hover:from-blue-700 hover:to-blue-900 animate-bounce-subtle"
              >
                Get Started Today
              </Button>
              <Button
                onClick={() => scrollToSection('what-sets-us-apart')}
                variant="bordered"
                className="border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-900 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full flex justify-center animate-fade-in-up delay-1000">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-900 to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
              <img
                src="/about-us.png"
                alt="PackIQ Team and Facility"
                className="relative rounded-xl shadow-2xl w-full max-w-5xl h-64 sm:h-80 md:h-[60vh] object-cover transition-transform duration-500 group-hover:scale-105 hover:rotate-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About PackIQ Section */}
      <div className="w-full px-4 sm:px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 animate-slide-in-left">About PackIQ</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-cyan-600 mx-auto rounded-full animate-expand-width"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left delay-300">
              <p className="text-lg text-gray-700 leading-relaxed transform transition-all duration-500 hover:translate-x-2">
                At <span className="font-bold text-blue-900">PackIQ</span>, we are redefining the way startups and emerging brands approach packaging. As a leading flexible packaging company, our focus is on <span className="font-semibold text-blue-500">quality, innovation, and simplicity</span>.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed transform transition-all duration-500 hover:translate-x-2">
                We specialize in serving <span className="font-semibold text-blue-900">small to mid-sized businesses</span>, providing them with cutting-edge packaging solutions that help their products stand out in today's competitive market.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed transform transition-all duration-500 hover:translate-x-2">
                We are passionate about helping brands bring their ideas to life through packaging that speaks volumes and creates lasting impressions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl animate-slide-in-right delay-500 transform transition-all duration-500 hover:scale-105 hover:rotate-1">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Our Tagline</h3>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-cyan-600 bg-clip-text text-transparent mb-4 animate-pulse">
                  Inspire. Innovate. Create.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We inspire our customers to envision better packaging. We innovate to find the best solutions. We create high-quality, eye-catching packaging that brings your vision to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart Section */}
      <div id="what-sets-us-apart" className="w-full px-4 sm:px-6 md:px-12 py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600 mb-8">Our customer-first approach makes all the difference</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-cyan-600 mx-auto rounded-full animate-expand-width delay-300"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 animate-slide-in-up delay-100">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-bounce-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-900 mx-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-4 text-center text-gray-800 group-hover:text-blue-900 transition-colors duration-300">Low Minimum Order Quantities</h3>
              <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Perfect for startups and test runs. No need to order thousands to get started with professional packaging.</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 animate-slide-in-up delay-300">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-200 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-bounce-in delay-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-900 mx-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-4 text-center text-gray-800 group-hover:text-blue-900 transition-colors duration-300">No Plates or Cylinders</h3>
              <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Eliminate expensive setup costs. Our digital printing technology means no traditional printing plates required.</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 animate-slide-in-up delay-500">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-200 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-bounce-in delay-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-600 mx-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-4 text-center text-gray-800 group-hover:text-cyan-600 transition-colors duration-300">Fast Turnaround Times</h3>
              <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Get your packaging delivered quickly without compromising on quality. Speed meets excellence.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="w-full px-4 sm:px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 md:p-12 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 animate-slide-in-left">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-6 animate-fade-in-up">Our Vision</h3>
              <div className="w-16 h-1 bg-white rounded-full mb-6 animate-expand-width delay-300"></div>
            </div>
            <p className="text-lg leading-relaxed opacity-95 animate-fade-in-up delay-500">
              To transform the packaging landscape by making every single non-printed pouch printed, no matter how small the quantity—ensuring best-in-class quality, even in the smallest batch sizes.
            </p>
            <div className="mt-8 flex items-center animate-slide-in-right delay-700">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="ml-3 font-semibold">Transforming Packaging</span>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-100 p-8 md:p-12 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 animate-slide-in-right">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-6 text-gray-800 animate-fade-in-up">Our Mission</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-900 to-cyan-600 rounded-full mb-6 animate-expand-width delay-300"></div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 animate-fade-in-up delay-500">
              To deliver high-quality, innovative, and customizable packaging that empowers brands to focus on growing their business, not on managing packaging hassles. We strive for exceptional customer satisfaction through transparency, simplicity, and excellence.
            </p>
            <div className="flex items-center text-blue-900 animate-slide-in-left delay-700">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="ml-3 font-semibold">Empowering Brands</span>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Edge Section */}
      <div className="w-full px-4 sm:px-6 md:px-12 py-16 bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 transform transition-all duration-500 hover:scale-105 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white animate-slide-in-left">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Digital Edge</h2>
                <div className="w-16 h-1 bg-white rounded-full mb-8 animate-expand-width delay-300"></div>
                <p className="text-lg leading-relaxed mb-8 opacity-90 animate-fade-in-up delay-500">
                  We have launched a user-friendly online platform that simplifies the ordering process—making it easy, fast, and seamless for customers to customize, order, and receive their packaging with just a few clicks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-700">
                  <Button
                    onClick={() => router.push("/services")}
                    className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-110 transform hover:rotate-1"
                  >
                    Explore Platform
                  </Button>
                  <Button
                    onClick={() => router.push("/contact")}
                    variant="bordered"
                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-110"
                  >
                    Start Order
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-slide-in-right delay-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-30 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                  <div className="grid grid-cols-2 gap-6 text-white text-center">
                    <div className="bg-white/10 p-6 rounded-xl transform transition-all duration-300 hover:scale-110 hover:bg-white/20 animate-bounce-in delay-100">
                      <div className="text-3xl font-bold mb-2 animate-count-up">24/7</div>
                      <div className="text-sm opacity-80">Platform Access</div>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl transform transition-all duration-300 hover:scale-110 hover:bg-white/20 animate-bounce-in delay-300">
                      <div className="text-3xl font-bold mb-2 animate-count-up">3-Click</div>
                      <div className="text-sm opacity-80">Order Process</div>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl transform transition-all duration-300 hover:scale-110 hover:bg-white/20 animate-bounce-in delay-500">
                      <div className="text-3xl font-bold mb-2">Real-time</div>
                      <div className="text-sm opacity-80">Order Tracking</div>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl transform transition-all duration-300 hover:scale-110 hover:bg-white/20 animate-bounce-in delay-700">
                      <div className="text-3xl font-bold mb-2">Instant</div>
                      <div className="text-sm opacity-80">Quotes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full px-4 sm:px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            We're a Team of Passionate Builders and Innovators
          </h2>
          <p className="text-xl text-gray-600 mb-4">Across the US, Europe, and India</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-cyan-600 mx-auto rounded-full animate-expand-width delay-300"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3].map((index) => (
            <div key={index} className={`group relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-110 hover:-rotate-2 animate-slide-in-up delay-${index * 200}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5"></div>
              <img
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-125"
                src={`about-us${index}.png`}
                alt={`Team ${index}`}
                onError={(e) => {
                  e.target.src = "/api/placeholder/400/320";
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 text-white transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="font-semibold text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  {index === 1 ? "Design Team" : index === 2 ? "Production Team" : "Innovation Team"}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl text-center transform transition-all duration-500 hover:scale-105 animate-fade-in-up delay-1000">
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            We are passionate about helping brands bring their ideas to life through packaging that speaks volumes. Our team combines expertise in design, materials science, and customer service to deliver exceptional packaging solutions that exceed expectations.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="w-full px-4 sm:px-6 md:px-12 py-16 bg-gradient-to-r from-blue-900 to-blue-800 animate-gradient-shift">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 animate-fade-in-up">Ready to Transform Your Packaging?</h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in-up delay-300">
            Join hundreds of brands who trust PackIQ for their packaging needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <Button
              onClick={() => router.push("/contact")}
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-110 transform hover:rotate-1 animate-bounce-subtle"
            >
              Start Your Project
            </Button>
            <Button
              onClick={() => router.push("/services")}
              variant="bordered"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-110 transform hover:-rotate-1"
            >
              View Services
            </Button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
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

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expand-width {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out forwards;
        }

        .animate-slide-in-up {
          animation: slide-in-up 1s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounce-in 1s ease-out forwards;
        }

        .animate-expand-width {
          animation: expand-width 1s ease-out forwards;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

export default About_us;