"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getGridClasses = (index) => {
    const patterns = [
      { cols: "col-span-4 md:col-span-3 md:row-span-2", height: "h-96 md:h-[30rem]" },
      { cols: "col-span-4 md:col-span-1 md:row-span-2", height: "h-96 md:h-[30rem]" },
      { cols: "col-span-4 md:col-span-2", height: "h-96 md:h-[30rem]" },
      { cols: "col-span-4 md:col-span-2", height: "h-96 md:h-[30rem]" },
      { cols: "col-span-4 md:col-span-1", height: "h-96 md:h-[30rem]" },
      { cols: "col-span-4 md:col-span-3", height: "h-96 md:h-[30rem]" },
      { cols: "col-span-4 md:col-span-2", height: "h-96 md:h-[30rem]" },
      { cols: "col-span-4 md:col-span-2", height: "h-96 md:h-[30rem]" },
    ];
    return patterns[index % patterns.length];
  };

  const getBgColor = (index) => {
    const colors = ["bg-white"];
    return colors[index % colors.length];
  };

  return (
    <div ref={containerRef} className="mx-auto grid grid-cols-4 gap-4 md:gap-6 px-2 py-12 relative max-w-7xl">
      {cards.map((card, index) => {
        const { cols, height } = getGridClasses(index);
        const bgColor = getBgColor(index);
        const isHovered = hoveredCard === card.id;

        return (
          <motion.div
            key={card.id}
            className={`${cols} ${height} ${bgColor} relative rounded-xl overflow-hidden cursor-pointer `}
            style={{
              zIndex: isHovered ? 50 : 1
            }}
            onClick={() => setSelected(card.id === selected ? null : card.id)}
            onHoverStart={() => setHoveredCard(card.id)}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{ 
              y: -5, 
              scale: 1.07,
              transition: { duration: 0.3 }
            }}
            layout
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: card.thumbnail ? `url(${card.thumbnail})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
              animate={{
                filter: selected === null || selected === card.id
                  ? isHovered 
                    ? "brightness(110%)" 
                    : "brightness(80%)"
                  : "brightness(100%)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="absolute inset-0 bg-black transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 0.1 : 0.2
                }}
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 z-40 flex flex-col justify-end p-6"
              animate={{ 
                opacity: selected === null || selected === card.id ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative z-50 transform"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
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