'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import RecommendedProducts from './Recomended_product';

const HowtoDesign = () => {
  const timelineData = [
    {
      id: 1,
      title: "Choose Your Pouch Style",
      description:
        "We offer a full range of packaging solutions — from pouches for snacks and coffee to packaging for pet treats and cosmetics.",
      color: "bg-blue-200",
      icon: "/How_to_Order/icons 2-01.png",
      showRecommendation: true,
    },
    {
      id: 2,
      title: "Select Your Pouch Features",
      description:
        "Select the features that suit your product — glossy or matte finish, resealable zippers, window and more. The choice is yours.",
      color: "bg-white",
      icon: "/How_to_Order/icons 2-02.png",
    },
    {
      id: 3,
      title: "Review Your Pouch Details",
      description:
        "Confirm your pouch details before moving on. Pricing will update real time according to your selections.",
      color: "bg-blue-200",
      icon: "/How_to_Order/icons 2-03.png",
    },
    {
      id: 4,
      title: "Login To Place Order",
      description:
        "To complete your order securely, please log in or create an account. This lets you track orders and manage artwork files effortlessly.",
      color: "bg-white",
      icon: "/How_to_Order/icons 2-04.png",
    },
    {
      id: 5,
      title: "Create Your Pouch Design",
      description:
        "Have a design ready? Upload it now — or reach out to us if you need help creating one",
      color: "bg-blue-200",
      icon: "/How_to_Order/icons 2-05.png",
    },
    {
      id: 6,
      title: "Our Customer Success Manager Will Contact You",
      description:
        "After your order is placed, a dedicated Customer Success Manager will reach out to confirm details, answer any questions, and guide you through the next steps.",
      color: "bg-white",
      icon: "/How_to_Order/icons 2-06.png",
    },
    {
      id: 7,
      title: "Verify And Approve The Digital Proof",
      description:
        "We will send a mockup for your final approval. Please confirm the design layout, print placement, and pouch specifications to proceed with production.",
      color: "bg-blue-200",
      icon: "/How_to_Order/icons 2-07.png",
    },
    {
      id: 8,
      title: "Efficient And Timely Production And Delivery",
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

  // Create individual step progress transforms for each step
  const step1Progress = useTransform(smoothProgress, [0/8, 1/8], [0, 1]);
  const step2Progress = useTransform(smoothProgress, [1/8, 2/8], [0, 1]);
  const step3Progress = useTransform(smoothProgress, [2/8, 3/8], [0, 1]);
  const step4Progress = useTransform(smoothProgress, [3/8, 4/8], [0, 1]);
  const step5Progress = useTransform(smoothProgress, [4/8, 5/8], [0, 1]);
  const step6Progress = useTransform(smoothProgress, [5/8, 6/8], [0, 1]);
  const step7Progress = useTransform(smoothProgress, [6/8, 7/8], [0, 1]);
  const step8Progress = useTransform(smoothProgress, [7/8, 8/8], [0, 1]);

  // Create step animations for each step
  const stepProgressArray = [
    step1Progress, step2Progress, step3Progress, step4Progress,
    step5Progress, step6Progress, step7Progress, step8Progress
  ];

  // Step 1 animations
  const step1Opacity = useTransform(step1Progress, [0, 0.3], [0.3, 1]);
  const step1Y = useTransform(step1Progress, [0, 0.3], [20, 0]);
  const step1Scale = useTransform(step1Progress, [0, 0.3], [0.98, 1]);
  const step1BorderColor = useTransform(step1Progress, [0, 0.3], ["#D1D5DB", "#012d75"]);
  const step1TextColor = useTransform(step1Progress, [0, 0.3], ["#6B7280", "#1E3A8A"]);
  const step1Rotation = useTransform(step1Progress, [0, 1], [0, 45]);
  const step1NumberRotation = useTransform(step1Progress, [0, 1], [0, -45]);
  const step1NumberScale = useTransform(step1Progress, [0, 0.3], [0.9, 1]);
  const step1BoxShadow = useTransform(step1Progress, [0, 0.3], ["0 4px 6px rgba(0,0,0,0.05)", "0 10px 25px rgba(0,0,0,0.1)"]);
  const step1IconOpacity = useTransform(step1Progress, [0, 0.3], [0.5, 1]);
  const step1IconScale = useTransform(step1Progress, [0, 0.3], [0.9, 1]);

  // Step 2 animations
  const step2Opacity = useTransform(step2Progress, [0, 0.3], [0.3, 1]);
  const step2Y = useTransform(step2Progress, [0, 0.3], [20, 0]);
  const step2Scale = useTransform(step2Progress, [0, 0.3], [0.98, 1]);
  const step2BorderColor = useTransform(step2Progress, [0, 0.3], ["#D1D5DB", "#012d75"]);
  const step2TextColor = useTransform(step2Progress, [0, 0.3], ["#6B7280", "#1E3A8A"]);
  const step2Rotation = useTransform(step2Progress, [0, 1], [0, 45]);
  const step2NumberRotation = useTransform(step2Progress, [0, 1], [0, -45]);
  const step2NumberScale = useTransform(step2Progress, [0, 0.3], [0.9, 1]);
  const step2BoxShadow = useTransform(step2Progress, [0, 0.3], ["0 4px 6px rgba(0,0,0,0.05)", "0 10px 25px rgba(0,0,0,0.1)"]);
  const step2IconOpacity = useTransform(step2Progress, [0, 0.3], [0.5, 1]);
  const step2IconScale = useTransform(step2Progress, [0, 0.3], [0.9, 1]);

  // Step 3 animations
  const step3Opacity = useTransform(step3Progress, [0, 0.3], [0.3, 1]);
  const step3Y = useTransform(step3Progress, [0, 0.3], [20, 0]);
  const step3Scale = useTransform(step3Progress, [0, 0.3], [0.98, 1]);
  const step3BorderColor = useTransform(step3Progress, [0, 0.3], ["#D1D5DB", "#012d75"]);
  const step3TextColor = useTransform(step3Progress, [0, 0.3], ["#6B7280", "#1E3A8A"]);
  const step3Rotation = useTransform(step3Progress, [0, 1], [0, 45]);
  const step3NumberRotation = useTransform(step3Progress, [0, 1], [0, -45]);
  const step3NumberScale = useTransform(step3Progress, [0, 0.3], [0.9, 1]);
  const step3BoxShadow = useTransform(step3Progress, [0, 0.3], ["0 4px 6px rgba(0,0,0,0.05)", "0 10px 25px rgba(0,0,0,0.1)"]);
  const step3IconOpacity = useTransform(step3Progress, [0, 0.3], [0.5, 1]);
  const step3IconScale = useTransform(step3Progress, [0, 0.3], [0.9, 1]);

  // Step 4 animations
  const step4Opacity = useTransform(step4Progress, [0, 0.3], [0.3, 1]);
  const step4Y = useTransform(step4Progress, [0, 0.3], [20, 0]);
  const step4Scale = useTransform(step4Progress, [0, 0.3], [0.98, 1]);
  const step4BorderColor = useTransform(step4Progress, [0, 0.3], ["#D1D5DB", "#012d75"]);
  const step4TextColor = useTransform(step4Progress, [0, 0.3], ["#6B7280", "#1E3A8A"]);
  const step4Rotation = useTransform(step4Progress, [0, 1], [0, 45]);
  const step4NumberRotation = useTransform(step4Progress, [0, 1], [0, -45]);
  const step4NumberScale = useTransform(step4Progress, [0, 0.3], [0.9, 1]);
  const step4BoxShadow = useTransform(step4Progress, [0, 0.3], ["0 4px 6px rgba(0,0,0,0.05)", "0 10px 25px rgba(0,0,0,0.1)"]);
  const step4IconOpacity = useTransform(step4Progress, [0, 0.3], [0.5, 1]);
  const step4IconScale = useTransform(step4Progress, [0, 0.3], [0.9, 1]);

  // Step 5 animations
  const step5Opacity = useTransform(step5Progress, [0, 0.3], [0.3, 1]);
  const step5Y = useTransform(step5Progress, [0, 0.3], [20, 0]);
  const step5Scale = useTransform(step5Progress, [0, 0.3], [0.98, 1]);
  const step5BorderColor = useTransform(step5Progress, [0, 0.3], ["#D1D5DB", "#012d75"]);
  const step5TextColor = useTransform(step5Progress, [0, 0.3], ["#6B7280", "#1E3A8A"]);
  const step5Rotation = useTransform(step5Progress, [0, 1], [0, 45]);
  const step5NumberRotation = useTransform(step5Progress, [0, 1], [0, -45]);
  const step5NumberScale = useTransform(step5Progress, [0, 0.3], [0.9, 1]);
  const step5BoxShadow = useTransform(step5Progress, [0, 0.3], ["0 4px 6px rgba(0,0,0,0.05)", "0 10px 25px rgba(0,0,0,0.1)"]);
  const step5IconOpacity = useTransform(step5Progress, [0, 0.3], [0.5, 1]);
  const step5IconScale = useTransform(step5Progress, [0, 0.3], [0.9, 1]);

  // Step 6 animations
  const step6Opacity = useTransform(step6Progress, [0, 0.3], [0.3, 1]);
  const step6Y = useTransform(step6Progress, [0, 0.3], [20, 0]);
  const step6Scale = useTransform(step6Progress, [0, 0.3], [0.98, 1]);
  const step6BorderColor = useTransform(step6Progress, [0, 0.3], ["#D1D5DB", "#012d75"]);
  const step6TextColor = useTransform(step6Progress, [0, 0.3], ["#6B7280", "#1E3A8A"]);
  const step6Rotation = useTransform(step6Progress, [0, 1], [0, 45]);
  const step6NumberRotation = useTransform(step6Progress, [0, 1], [0, -45]);
  const step6NumberScale = useTransform(step6Progress, [0, 0.3], [0.9, 1]);
  const step6BoxShadow = useTransform(step6Progress, [0, 0.3], ["0 4px 6px rgba(0,0,0,0.05)", "0 10px 25px rgba(0,0,0,0.1)"]);
  const step6IconOpacity = useTransform(step6Progress, [0, 0.3], [0.5, 1]);
  const step6IconScale = useTransform(step6Progress, [0, 0.3], [0.9, 1]);

  // Step 7 animations
  const step7Opacity = useTransform(step7Progress, [0, 0.3], [0.3, 1]);
  const step7Y = useTransform(step7Progress, [0, 0.3], [20, 0]);
  const step7Scale = useTransform(step7Progress, [0, 0.3], [0.98, 1]);
  const step7BorderColor = useTransform(step7Progress, [0, 0.3], ["#D1D5DB", "#012d75"]);
  const step7TextColor = useTransform(step7Progress, [0, 0.3], ["#6B7280", "#1E3A8A"]);
  const step7Rotation = useTransform(step7Progress, [0, 1], [0, 45]);
  const step7NumberRotation = useTransform(step7Progress, [0, 1], [0, -45]);
  const step7NumberScale = useTransform(step7Progress, [0, 0.3], [0.9, 1]);
  const step7BoxShadow = useTransform(step7Progress, [0, 0.3], ["0 4px 6px rgba(0,0,0,0.05)", "0 10px 25px rgba(0,0,0,0.1)"]);
  const step7IconOpacity = useTransform(step7Progress, [0, 0.3], [0.5, 1]);
  const step7IconScale = useTransform(step7Progress, [0, 0.3], [0.9, 1]);

  // Step 8 animations
  const step8Opacity = useTransform(step8Progress, [0, 0.3], [0.3, 1]);
  const step8Y = useTransform(step8Progress, [0, 0.3], [20, 0]);
  const step8Scale = useTransform(step8Progress, [0, 0.3], [0.98, 1]);
  const step8BorderColor = useTransform(step8Progress, [0, 0.3], ["#D1D5DB", "#012d75"]);
  const step8TextColor = useTransform(step8Progress, [0, 0.3], ["#6B7280", "#1E3A8A"]);
  const step8Rotation = useTransform(step8Progress, [0, 1], [0, 45]);
  const step8NumberRotation = useTransform(step8Progress, [0, 1], [0, -45]);
  const step8NumberScale = useTransform(step8Progress, [0, 0.3], [0.9, 1]);
  const step8BoxShadow = useTransform(step8Progress, [0, 0.3], ["0 4px 6px rgba(0,0,0,0.05)", "0 10px 25px rgba(0,0,0,0.1)"]);
  const step8IconOpacity = useTransform(step8Progress, [0, 0.3], [0.5, 1]);
  const step8IconScale = useTransform(step8Progress, [0, 0.3], [0.9, 1]);

  // Create arrays to organize the animations
  const stepAnimations = [
    {
      stepOpacity: step1Opacity, stepY: step1Y, stepScale: step1Scale,
      borderColor: step1BorderColor, textColor: step1TextColor,
      stepRotation: step1Rotation, numberRotation: step1NumberRotation,
      numberScale: step1NumberScale, boxShadow: step1BoxShadow,
      iconOpacity: step1IconOpacity, iconScale: step1IconScale
    },
    {
      stepOpacity: step2Opacity, stepY: step2Y, stepScale: step2Scale,
      borderColor: step2BorderColor, textColor: step2TextColor,
      stepRotation: step2Rotation, numberRotation: step2NumberRotation,
      numberScale: step2NumberScale, boxShadow: step2BoxShadow,
      iconOpacity: step2IconOpacity, iconScale: step2IconScale
    },
    {
      stepOpacity: step3Opacity, stepY: step3Y, stepScale: step3Scale,
      borderColor: step3BorderColor, textColor: step3TextColor,
      stepRotation: step3Rotation, numberRotation: step3NumberRotation,
      numberScale: step3NumberScale, boxShadow: step3BoxShadow,
      iconOpacity: step3IconOpacity, iconScale: step3IconScale
    },
    {
      stepOpacity: step4Opacity, stepY: step4Y, stepScale: step4Scale,
      borderColor: step4BorderColor, textColor: step4TextColor,
      stepRotation: step4Rotation, numberRotation: step4NumberRotation,
      numberScale: step4NumberScale, boxShadow: step4BoxShadow,
      iconOpacity: step4IconOpacity, iconScale: step4IconScale
    },
    {
      stepOpacity: step5Opacity, stepY: step5Y, stepScale: step5Scale,
      borderColor: step5BorderColor, textColor: step5TextColor,
      stepRotation: step5Rotation, numberRotation: step5NumberRotation,
      numberScale: step5NumberScale, boxShadow: step5BoxShadow,
      iconOpacity: step5IconOpacity, iconScale: step5IconScale
    },
    {
      stepOpacity: step6Opacity, stepY: step6Y, stepScale: step6Scale,
      borderColor: step6BorderColor, textColor: step6TextColor,
      stepRotation: step6Rotation, numberRotation: step6NumberRotation,
      numberScale: step6NumberScale, boxShadow: step6BoxShadow,
      iconOpacity: step6IconOpacity, iconScale: step6IconScale
    },
    {
      stepOpacity: step7Opacity, stepY: step7Y, stepScale: step7Scale,
      borderColor: step7BorderColor, textColor: step7TextColor,
      stepRotation: step7Rotation, numberRotation: step7NumberRotation,
      numberScale: step7NumberScale, boxShadow: step7BoxShadow,
      iconOpacity: step7IconOpacity, iconScale: step7IconScale
    },
    {
      stepOpacity: step8Opacity, stepY: step8Y, stepScale: step8Scale,
      borderColor: step8BorderColor, textColor: step8TextColor,
      stepRotation: step8Rotation, numberRotation: step8NumberRotation,
      numberScale: step8NumberScale, boxShadow: step8BoxShadow,
      iconOpacity: step8IconOpacity, iconScale: step8IconScale
    }
  ];

  // Footer animations
  const footerOpacity = useTransform(smoothProgress, [0.8, 0.9], [0, 1]);
  const footerY = useTransform(smoothProgress, [0.8, 0.9], [20, 0]);

  // Recommendation animations
  const recommendationOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);
  const recommendationY = useTransform(smoothProgress, [0.1, 0.2], [30, 0]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 md:mt-5 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-[4rem] font-extrabold text-blue-950 mb-6 md:mt-10">
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
                            className="text-2xl md:text-4xl font-black text-black mb-4  tracking-tighter drop-shadow-md"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                          >
                            {item.title}
                          </motion.h3>
                          <motion.p 
                            className="text-gray-700 text-base md:text-xl leading-relaxed max-w-xl"
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
{/* 
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
                  )} */}
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
          <h3 className="md:text-4xl text-2xl uppercase font-bold text-blue-950 mb-4">Ready to get started?</h3>
          <motion.button 
            className="bg-blue-900 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-blue-900 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={()=>router.push('/packaging-type')}
          >
            Customize Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowtoDesign;