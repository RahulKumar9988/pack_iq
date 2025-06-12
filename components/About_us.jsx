"use client";

import React, { useEffect, useState } from 'react';
import { Users, Target, Lightbulb, Award, ArrowRight, Building, Package, Zap, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});
  const [counters, setCounters] = useState({ clients: 0, projects: 0, years: 0 });
  const router = useRouter(); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    if (isVisible.stats) {
      const animateCounter = (target, key) => {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 30);
      };

      animateCounter(250, 'clients');
      animateCounter(500, 'projects');
      animateCounter(3, 'years');
    }
  }, [isVisible.stats]);

  const values = [
    {
      icon: Package,
      title: "Low MOQ",
      description: "Perfect for startups and test runs with our low minimum order quantities. No need to commit to large quantities when you're just getting started."
    },
    {
      icon: Target,
      title: "No Setup Costs",
      description: "Say goodbye to expensive plates and cylinders. Our innovative approach eliminates traditional setup costs that burden small businesses."
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Get your packaging delivered quickly without compromising quality. We understand that time is crucial for growing businesses."
    },
    {
      icon: Clock,
      title: "Digital First",
      description: "Our user-friendly online platform makes ordering easy, fast, and seamless with just a few clicks. Technology that works for you."
    }
  ];

  const features = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We innovate to find the best solutions for your packaging needs."
    },
    {
      icon: Users,
      title: "Inspire",
      description: "We inspire our customers to envision better packaging possibilities."
    },
    {
      icon: Award,
      title: "Create",
      description: "We create high-quality, eye-catching packaging that brings your vision to life."
    }
  ];

  return (
    <div className="md:mt-10 md:min-h-screen">
      {/* Hero Section */}
      <section className="relative  flex items-center justify-center overflow-hidden px-2 sm:px-4 md:px-6 lg:px-8">
        <div 
          className="relative z-10 w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-6xl lg:max-w-7xl xl:max-w-8xl"
          id="hero"
          data-animate
        >
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl">
            <img 
              src="/PackIQ_HD_Image.jpg"
              loading="lazy"
              alt="Pack IQ Packaging Showcase"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-10 sm:py-16 md:py-20 bg-white/60 backdrop-blur-sm border-y border-gray-200"
        id="stats"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 delay-300 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-2 transition-transform group-hover:scale-110">
                {counters.clients}+
              </div>
              <div className="text-gray-600 text-base sm:text-lg md:text-xl">Happy Brands</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-2 transition-transform group-hover:scale-110">
                {counters.projects}mn+
              </div>
              <div className="text-gray-600 text-base sm:text-lg md:text-xl">Packages Delivered</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-2 transition-transform group-hover:scale-110">
                {counters.years}+
              </div>
              <div className="text-gray-600 text-base sm:text-lg md:text-xl">Years of Innovation</div>
            </div>
          </div>
        </div>
      </section>

      {/* About PackIQ Section */}
      <section className="py-10 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8" id="story" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center transition-all duration-1000 delay-200 ${isVisible.story ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:text-start text-center">
                About PackIQ
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 leading-relaxed">
                At PackIQ, we are redefining the way startups and emerging brands approach packaging.
                As a leading flexible packaging company, our focus is on <span className='font-bold'>quality</span>, <span className='font-bold'>innovation</span>, and
                <span className='font-bold'> simplicity</span>. We specialize in serving <span className='font-bold'>small to mid-sized businesses</span>, providing them with
                cutting-edge packaging solutions that help their products stand out.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Building className="w-6 h-6 sm:w-8 sm:h-8 text-blue-800 flex-shrink-0" />
                <span className="text-gray-600 text-sm sm:text-base md:text-lg">Flexible Packaging Specialists • Customer-First Approach</span>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-200 rounded-xl sm:rounded-2xl transform rotate-2 sm:rotate-3"></div>
              <img 
                src="/PackIQ_HD_Image.jpg"
                loading='lazy'
                alt="PackIQ About Image"
                className="relative z-10 w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-10 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-gray-50" id="values" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              What Sets Us Apart
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto">
              Our customer-first approach makes packaging accessible and affordable for businesses of all sizes.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 transition-all duration-1000 delay-300 ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group flex flex-col justify-center items-center bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="bg-blue-800 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                  <value.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-800 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-10 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-white" id="approach" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Approach
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-4 sm:mb-8">
              We inspire our customers to envision better packaging. We innovate to find the best solutions. We create high-quality, eye-catching packaging that brings your vision to life.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 delay-300 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group text-center bg-gray-50 rounded-xl p-6 sm:p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-blue-800 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:bg-blue-700 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-10 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-gray-50" id="vision" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 transition-all duration-1000 ${isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-xl flex flex-col justify-center items-center sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-800 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                To transform the packaging landscape by making every single non-printed pouch printed, no matter how small the quantity—ensuring best-in-class quality, even in the smallest batch sizes.
              </p>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl flex flex-col justify-center items-center transition-shadow duration-300">
              <div className="bg-blue-800 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                To deliver high-quality, innovative, and customizable packaging that empowers brands to focus on growing their business, not on managing packaging hassles. We strive for exceptional customer satisfaction through transparency, simplicity, and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-10 sm:py-16 md:py-20 rounded-2xl sm:rounded-3xl md:rounded-full mx-2 sm:mx-3 md:mx-1 mb-2 sm:mb-4 px-4 sm:px-6 bg-gradient-to-r from-blue-900 to-blue-800" id="cta" data-animate>
        <div className="max-w-5xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
              Ready to Transform Your Packaging?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto">
              Experience our user-friendly online platform that makes ordering easy, fast, and seamless. Customize, order, and receive your packaging with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={()=> router.push('/packaging-type')} 
                className="group bg-white text-blue-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Start Your Order
                <ArrowRight className="inline ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;