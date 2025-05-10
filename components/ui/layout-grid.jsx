"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const containerRef = useRef(null);

  // Handle card selection
  const handleClick = (cardId) => {
    setLastSelected(selected);
    setSelected(cardId === selected ? null : cardId);
  };

  return (
    <div ref={containerRef} className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-5 md:px-28 py-10 relative">
      {cards.map((card, i) => (
        <div
          key={card.id}
          className={`card-container ${card.className || ""} relative h-96 md:h-[40rem] cursor-pointer rounded-xl overflow-hidden`}
          onClick={() => handleClick(card.id)}
        >
          <motion.div
            className={`absolute inset-0 h-full w-full bg-cover bg-center rounded-xl ${
              selected === card.id 
                ? "z-50 cursor-default"
                : "z-0"
            }`}
            style={{ 
              backgroundImage: `url(${card.thumbnail} || "")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              transformOrigin: 'center',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              opacity: selected === null || selected === card.id ? 1 : 0.3,
              scale: selected === card.id ? 1 : 1,
              filter: selected === card.id ? "brightness(100%)" : "brightness(80%)",
            }}
            // transition={{ duration: 0.5, ease: "easeInOut" }}
            layout
          >
            {/* Parallax effect for the image */}
            <div
              className=" w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${card.thumbnail})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          </motion.div>

          {/* Card content overlay */}
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
              // transition={{ 
              //   duration: 0.8, 
              //   delay: i * 0.1,
              //   ease: "easeOut"
              // }}
            >
              {card.content}
            </motion.div>
          </motion.div>

          {/* Full screen overlay when selected */}
          
        </div>
      ))}
    </div>
  );
};