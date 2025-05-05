"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState({});

  // Initialize all cards as not in view
  useEffect(() => {
    const initialInViewState = {};
    cards.forEach(card => {
      initialInViewState[card.id] = false;
    });
    setIsInView(initialInViewState);
  }, [cards]);

  // Handle scroll to reveal cards
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Get all card elements
      const cardElements = document.querySelectorAll('.card-container');
      
      cardElements.forEach((element, index) => {
        const card = cards[index];
        const rect = element.getBoundingClientRect();
        
        // Check if card is in viewport
        if (rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.25) {
          setIsInView(prev => ({ ...prev, [card.id]: true }));
        } else {
          setIsInView(prev => ({ ...prev, [card.id]: false }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cards]);

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
          className={`card-container ${card.className || ""} relative h-96 md:h-[40rem] cursor-pointer rounded-xl overflow-hidden transition-all duration-500 ${
            isInView[card.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
          onClick={() => handleClick(card.id)}
          style={{ 
            transitionDelay: `${i * 0.01}s`,
          }}
        >
          <motion.div
            className={`absolute inset-0 h-full w-full bg-cover bg-center rounded-xl ${
              selected === card.id 
                ? "z-50 cursor-default"
                : "z-0"
            }`}
            style={{ 
              backgroundImage: `url(${card.thumbnail})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              transformOrigin: 'center',
              transformStyle: 'preserve-3d',
              transform: isInView[card.id] ? 'translateZ(0)' : 'translateZ(-50px)',
              transition: 'transform 1s ease-out, opacity 1s ease-out'
            }}
            animate={{
              opacity: selected === null || selected === card.id ? 1 : 0.3,
              scale: selected === card.id ? 1 : 1,
              filter: selected === card.id ? "brightness(100%)" : "brightness(80%)",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            layout
          >
            {/* Parallax effect for the image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${card.thumbnail})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                transform: isInView[card.id] ? 'translateY(0)' : 'translateY(50px)',
                transition: 'transform 1.2s ease-out',
                opacity: isInView[card.id] ? 1 : 0,
              }}
            />
          </motion.div>

          {/* Card content overlay */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-b from-transparent to-black/60"
            animate={{
              opacity: selected === null || selected === card.id ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              className="relative z-20 transform"
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: isInView[card.id] ? 0 : 50, 
                opacity: isInView[card.id] ? 1 : 0,
              }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              {card.content}
            </motion.div>
          </motion.div>

          {/* Full screen overlay when selected */}
          {selected === card.id && (
            <motion.div
              className="absolute inset-0 z-30 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};