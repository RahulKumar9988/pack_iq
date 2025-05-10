"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);

  // Set up window height for parallax calculations
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle card selection
  const handleClick = (cardId) => {
    setSelected(cardId === selected ? null : cardId);
  };

  // Function to determine grid classes for each card based on its position
  const getGridClasses = (index) => {
    // Create an uneven grid pattern
    const patterns = [
      // First row: Main content (2/3) + Sidebar (1/3)
      { cols: "col-span-4 md:col-span-3 md:row-span-2", height: "h-96 md:h-[30rem]" }, // Main content
      { cols: "col-span-4 md:col-span-1 md:row-span-2", height: "h-96 md:h-[30rem]" }, // Sidebar
      
      // Second row: Equal twins
      { cols: "col-span-4 md:col-span-2", height: "h-96 md:h-[30rem]" }, // Twin 1
      { cols: "col-span-4 md:col-span-2", height: "h-96 md:h-[30rem]" }, // Twin 2
      
      // Additional items with varying sizes (if there are more cards)
      { cols: "col-span-4 md:col-span-1", height: "h-96 md:h-[30rem]" },
      { cols: "col-span-4 md:col-span-3", height: "h-96 md:h-[30rem]" },
      { cols: "col-span-4 md:col-span-2", height: "h-96 md:h-[30rem]" },
      { cols: "col-span-4 md:col-span-2", height: "h-96 md:h-[30rem]" },
    ];
    
    // Use modulo to cycle through patterns for additional cards
    const patternIndex = index % patterns.length;
    return patterns[patternIndex];
  };
  
  // Determine background colors in a visually pleasing pattern
  const getBgColor = (index) => {
    const colors = [
      "bg-white", 
    ];
    
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };

  return (
    <div 
      ref={containerRef} 
      className="mx-auto grid grid-cols-4 gap-4 md:gap-6 px-2 py-12 relative max-w-7xl"
    >
      {cards.map((card, index) => {
        const { scrollYProgress } = useScroll({
          target: containerRef,
          offset: ["start end", "end start"]
        });
        
        // Create different parallax speeds based on card position
        const yOffset = useTransform(
          scrollYProgress, 
          [0, 1], 
          [0, (index % 0 === 0 ? 0 : 0) * (index % 0)]
        );
        
        const { cols, height } = getGridClasses(index);
        const bgColor = getBgColor(index);
        
        // Determine card label based on index
        

        return (
          <motion.div
            key={card.id}
            className={`${cols} ${height} ${bgColor} relative rounded-xl overflow-hidden`}
            onClick={() => handleClick(card.id)}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            layout
          >
            {/* Parallax background effect */}
            <motion.div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: card.thumbnail ? `url(${card.thumbnail})` : "none",
                y: yOffset,
                
                backgroundSize: 'cover',
                filter: selected === card.id ? "brightness(100%)" : "brightness(90%)",
              }}
            >
              {/* Semi-transparent overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </motion.div>

            {/* Content with parallax effect */}
            <motion.div
            className="absolute inset-0 z-10 flex flex-col justify-end p-6 "
            animate={{
              opacity: selected === null || selected === card.id ? 1 : 0,
            }}
            // transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              className="relative z-20 transform"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}

            >
              {card.content}
            </motion.div>
          </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};