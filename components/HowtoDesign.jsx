'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import RecommendedProducts from './Recomended_product';

const HowtoDesign = () => {
  const timelineData = [
    {
      id: 1,
      title: "CHOOSE YOUR POUCH STYLE",
      description:
        "We offer a full range of packaging solutions — from pouches for snacks and coffee to packaging for pet treats and cosmetics.",
      color: "bg-blue-200",
      icon: "/How_to_Order/icons 2-01.png",
      showRecommendation: true,
    },
    {
      id: 2,
      title: "SELECT YOUR POUCH FEATURES",
      description:
        "Select the features that suit your product — glossy or matte finish, resealable zippers, window and more. The choice is yours.",
      color: "bg-white",
      icon: "/How_to_Order/icons 2-02.png",
    },
    {
      id: 3,
      title: "Review your pouch details",
      description:
        "Confirm your pouch details before moving on. Pricing will update real time according to your selections.",
      color: "bg-blue-200",
      icon: "/How_to_Order/icons 2-03.png",
    },
    {
      id: 4,
      title: "Login to Place Order",
      description:
        "To complete your order securely, please log in or create an account. This lets you track orders and manage artwork files effortlessly.",
      color: "bg-white",
      icon: "/How_to_Order/icons 2-04.png",
    },
    {
      id: 5,
      title: "Create your POUCH DESIGN",
      description:
        "Have a design ready? Upload it now — or reach out if you need help creating one.",
      color: "bg-blue-200",
      icon: "/How_to_Order/icons 2-05.png",
    },
    {
      id: 6,
      title: "Our customer success manager will contact you",
      description:
        "After your order is placed, a dedicated Customer Success Manager will reach out to confirm details, answer any questions, and guide you through the next steps.",
      color: "bg-white",
      icon: "/How_to_Order/icons 2-06.png",
    },
    {
      id: 7,
      title: "Verify and approve the digital proof",
      description:
        "We will send a mockup for your final approval. Please confirm the design layout, print placement, and pouch specifications to proceed with production.",
      color: "bg-blue-200",
      icon: "/How_to_Order/icons 2-07.png",
    },
    {
      id: 8,
      title: "Efficient and timely production and delivery",
      description:
        "Once approved, your order proceeds to production and is delivered with efficiency and precision. Your custom pouch is on its way.",
      color: "bg-white",
      icon: "/How_to_Order/icons 2-08.png",
    },
  ];

  const containerRef = useRef(null);
  
  // Use Framer Motion's useScroll hook for smooth scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  // Create smooth spring animations for all scroll-based values
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress to height percentage
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const dotPosition = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const dotOpacity = useTransform(smoothProgress, [0, 0.01], [0, 1]);

  // Pre-calculate all step animations at the top level
  const stepAnimations = timelineData.map((_, index) => {
    const stepProgress = useTransform(
      smoothProgress, 
      [index / timelineData.length, (index + 1) / timelineData.length], 
      [0, 1]
    );
    
    return {
      stepOpacity: useTransform(stepProgress, [0, 0.3], [0.3, 1]),
      stepY: useTransform(stepProgress, [0, 0.3], [20, 0]),
      stepScale: useTransform(stepProgress, [0, 0.3], [0.98, 1]),
      borderColor: useTransform(stepProgress, [0, 0.3], ["#D1D5DB", "#012d75"]),
      textColor: useTransform(stepProgress, [0, 0.3], ["#6B7280", "#1E3A8A"]),
      stepRotation: useTransform(stepProgress, [0, 1], [0, 45]),
      numberRotation: useTransform(stepProgress, [0, 1], [0, -45]),
      numberScale: useTransform(stepProgress, [0, 0.3], [0.9, 1]),
      boxShadow: useTransform(
        stepProgress, 
        [0, 0.3], 
        ["0 4px 6px rgba(0,0,0,0.05)", "0 10px 25px rgba(0,0,0,0.1)"]
      ),
      iconOpacity: useTransform(stepProgress, [0, 0.3], [0.5, 1]),
      iconScale: useTransform(stepProgress, [0, 0.3], [0.9, 1])
    };
  });

  // Footer animations
  const footerOpacity = useTransform(smoothProgress, [0.8, 0.9], [0, 1]);
  const footerY = useTransform(smoothProgress, [0.8, 0.9], [20, 0]);

  // Recommendation animations
  const recommendationOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);
  const recommendationY = useTransform(smoothProgress, [0.1, 0.2], [30, 0]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-blue-950 mb-6 tracking-tight">
            How to order online at PACKIQ
          </h1>
          <h2 className="text-lg md:text-2xl font-bold text-blue-950 tracking-wide mb-4">
            Ordering custom-printed pouches is now super easy. At PackIQ, we have
            created a simple step-by-step process that saves time, removes the
            hassle, and gives you full control—from design to delivery.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={containerRef}>
          {/* Timeline lines */}
          <div className="absolute left-8 top-0 bottom-0 w-1 z-0">
            {/* Background line */}
            <div className="w-full h-full bg-gray-300 absolute top-0 left-0 rounded" />
            
            {/* Animated Progress line */}
            <motion.div
              className="w-full bg-blue-900 absolute top-0 left-0 rounded origin-top"
              style={{ height: lineHeight }}
            />
            
            {/* Moving dot */}
            <motion.div
              className="absolute w-3 h-3 bg-indigo-700 rounded-full -left-1"
              style={{ 
                top: dotPosition,
                opacity: dotOpacity,
                y: "-50%"
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 relative z-10">
            {timelineData.map((item, index) => {
              const animations = stepAnimations[index];
              
              return (
                <React.Fragment key={item.id}>
                  <motion.div 
                    className="relative flex items-center"
                    style={{
                      opacity: animations.stepOpacity,
                      y: animations.stepY
                    }}
                  >
                    {/* Step number */}
                    <motion.div 
                      className="font-bold text-lg w-20 h-20 bg-white border-4 z-10 flex-shrink-0 flex justify-center items-center"
                      style={{
                        borderColor: animations.borderColor,
                        rotate: animations.stepRotation,
                        scale: animations.numberScale
                      }}
                    >
                      <motion.span 
                        className="transform text-4xl"
                        style={{ 
                          rotate: animations.numberRotation,
                          color: animations.textColor
                        }}
                      >
                        {item.id}
                      </motion.span>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className={`ml-12 flex-1 ${item.color} rounded-r-full border border-gray-200 px-8 md:px-12 py-20 shadow-sm`}
                      style={{
                        scale: animations.stepScale,
                        boxShadow: animations.boxShadow
                      }}
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1">
                          <motion.h3 
                            className="text-xl md:text-2xl font-bold text-gray-800 mb-4 uppercase"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                          >
                            {item.title}
                          </motion.h3>
                          <motion.p 
                            className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            viewport={{ once: true, margin: "-100px" }}
                          >
                            {item.description}
                          </motion.p>
                        </div>
                        <motion.div 
                          className="ml-0 md:ml-8 flex-shrink-0 hidden md:block"
                          style={{
                            opacity: animations.iconOpacity,
                            scale: animations.iconScale
                          }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Image
                            src={item.icon}
                            alt={`Step ${item.id} icon`}
                            width={120}
                            height={120}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {item.id === 1 && item.showRecommendation && (
                    <motion.div 
                      className="mt-8 ml-20"
                      style={{
                        opacity: recommendationOpacity,
                        y: recommendationY
                      }}
                    >
                      <RecommendedProducts />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-16"
          style={{
            opacity: footerOpacity,
            y: footerY
          }}
        >
          <h3 className="text-2xl font-bold text-blue-950 mb-4">Ready to get started?</h3>
          <motion.button 
            className="bg-blue-900 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-900 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Start Your Order
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowtoDesign;