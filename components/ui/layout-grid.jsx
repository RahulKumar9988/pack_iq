"use client";
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const breakpointColumnsObj = {
    default: 3, // Default to 3 columns
    1024: 2,    // 2 columns on medium screens
    768: 1,     // 1 column on small screens
  };

  return (
    <div className="w-full mx-auto px-8 py-16">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-6"
        columnClassName="flex flex-col gap-6"
      >
        {cards.map((card) => {
          const isHovered = hoveredCard === card.id;

          return (
            <motion.div
              key={card.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer shadow-xl"
              onClick={() => setSelected(card.id === selected ? null : card.id)}
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{
                y: -8,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              layout
            >
              {/* Image */}
              <img
                src={card.thumbnail}
                alt={card.id}
                className="w-full h-auto object-cover rounded-2xl transition duration-300"
                style={{
                  maxHeight: "1000px",
                  filter:
                    selected === null || selected === card.id
                      ? isHovered
                        ? "brightness(110%)"
                        : "brightness(80%)"
                      : "brightness(100%)",
                }}
              />

              {/* Text Overlay */}
              <motion.div
                className="absolute inset-0 z-10 p-6 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent"
                animate={{
                  opacity: selected === null || selected === card.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-white text-lg font-semibold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* {card.content} */}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </Masonry>
    </div>
  );
};
