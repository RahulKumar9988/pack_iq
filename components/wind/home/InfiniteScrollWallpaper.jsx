import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const InfiniteScrollImages = () => {
  // Sample images (replace with your actual image paths)
  const images = [
    '/pack/all items.png',
    '/pack/all items.png',
    '/pack/all items.png',
    '/pack/all items.png',
];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.div 
        className="flex flex-col space-y-4"
        animate={{
          y: [0, '-50%'],
        }}
        transition={{
          duration: 60,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }}
      >
        {/* Duplicate images to create infinite scroll effect */}
        {images.concat(images).map((src, index) => (
          <motion.div 
            key={index} 
            className="relative w-72 h-96"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1
            }}
          >
            <Image 
              src={src} 
              alt={`Packaging ${index + 1}`} 
              width={200}
              height={150}
              className="w-full h-full object-cover rounded-lg" 
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const InfiniteScrollWallpaper = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="flex">
        <InfiniteScrollImages />
      </div>
    </div>
  );
};

export default InfiniteScrollWallpaper;