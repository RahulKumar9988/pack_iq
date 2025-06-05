"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
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

        return (
          <motion.div
            key={card.id}
            className={`${cols} ${height} ${bgColor} relative rounded-xl overflow-hidden`}
            onClick={() => setSelected(card.id === selected ? null : card.id)}
            whileHover={{ y: -5, transition: { duration: 0.2 }, scale: 1.02,filter: "brightness(120%)",
                transition: { duration: 0.3 }, }}
            layout
          >
            <motion.div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: card.thumbnail ? `url(${card.thumbnail})` : "none",
                backgroundSize: "cover",
              }}
              animate={{
                filter:
                  selected === null || selected === card.id
                    ? "brightness(80%)"
                    : "brightness(100%)",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </motion.div>

            <motion.div
              className="absolute inset-0 z-10 flex flex-col justify-end p-6"
              animate={{ opacity: selected === null || selected === card.id ? 1 : 0 }}
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
