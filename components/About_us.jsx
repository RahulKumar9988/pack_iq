"use client";

import React, { useEffect, useState } from 'react';
import { Users, Target, Lightbulb, Award, ArrowRight, Building, Package, Zap, Clock } from 'lucide-react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});
  const [counters, setCounters] = useState({ clients: 0, projects: 0, years: 0 });

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
      animateCounter(5, 'years');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/80 to-gray-100/80"></div>
        <div 
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          id="hero"
          data-animate
        >
          <div className={`transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Redefining 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-800"> Packaging</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              We are a leading flexible packaging company focused on quality, innovation, and simplicity for startups and emerging brands.
            </p>
            <div className="bg-blue-800/10 border border-blue-200 rounded-lg p-4 mb-8 inline-block">
              <p className="text-blue-800 font-semibold text-lg">Inspire. Innovate. Create.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Learn Our Story
                <ArrowRight className="inline ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-blue-400/40 rounded-full animate-pulse delay-500"></div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-20 bg-white/60 backdrop-blur-sm border-y border-gray-200"
        id="stats"
        data-animate
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center group">
              <div className="text-4xl md:text-6xl font-bold text-gray-900 mb-2 transition-transform group-hover:scale-110">
                {counters.clients}+
              </div>
              <div className="text-gray-600 text-lg">Happy Brands</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-6xl font-bold text-gray-900 mb-2 transition-transform group-hover:scale-110">
                {counters.projects}+
              </div>
              <div className="text-gray-600 text-lg">Packages Delivered</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-6xl font-bold text-gray-900 mb-2 transition-transform group-hover:scale-110">
                {counters.years}+
              </div>
              <div className="text-gray-600 text-lg">Years of Innovation</div>
            </div>
          </div>
        </div>
      </section>

      {/* About PackIQ Section */}
      <section className="py-20 px-6" id="story" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 delay-200 ${isVisible.story ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About PackIQ
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                At PackIQ, we are redefining the way startups and emerging brands approach packaging. As a leading flexible packaging company, our focus is on quality, innovation, and simplicity.
              </p>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                We specialize in serving small to mid-sized businesses, providing them with cutting-edge packaging solutions that help their products stand out. We are passionate about helping brands bring their ideas to life through packaging that speaks volumes.
              </p>
              <div className="flex items-center space-x-4">
                <Building className="w-8 h-8 text-blue-800" />
                <span className="text-gray-600">Flexible Packaging Specialists • Customer-First Approach</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-800 rounded-2xl transform rotate-3"></div>
              <img 
                src="https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="PackIQ packaging solutions"
                className="relative z-10 w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-20 px-6 bg-gray-50" id="values" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Sets Us Apart
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Our customer-first approach makes packaging accessible and affordable for businesses of all sizes.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-300 ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="bg-blue-800 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 px-6 bg-white" id="approach" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Approach
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
              We inspire our customers to envision better packaging. We innovate to find the best solutions. We create high-quality, eye-catching packaging that brings your vision to life.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group text-center bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-blue-800 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-700 transition-colors duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-gray-50" id="vision" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-1000 ${isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-800 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To transform the packaging landscape by making every single non-printed pouch printed, no matter how small the quantity—ensuring best-in-class quality, even in the smallest batch sizes.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-800 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To deliver high-quality, innovative, and customizable packaging that empowers brands to focus on growing their business, not on managing packaging hassles. We strive for exceptional customer satisfaction through transparency, simplicity, and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:rounded-full rounded-3xl mx-1 mb-4 px-6 bg-gradient-to-r from-blue-900 to-blue-800" id="cta" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Packaging?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Experience our user-friendly online platform that makes ordering easy, fast, and seamless. Customize, order, and receive your packaging with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white text-blue-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Start Your Order
                <ArrowRight className="inline ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-full font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;