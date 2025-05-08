"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export const EnhancedLayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState({});

  // Initialize all cards as not in view and images as not loaded
  useEffect(() => {
    const initialState = {};
    cards.forEach(card => {
      initialState[card.id] = false;
    });
    setIsInView(initialState);
    setImagesLoaded(initialState);
  }, [cards]);

  // Use Intersection Observer for better performance
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px', // Start loading before cards are fully in view
      threshold: 0.1 // When 10% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const cardId = entry.target.getAttribute('data-card-id');
        if (cardId) {
          setIsInView(prev => ({ 
            ...prev, 
            [cardId]: entry.isIntersecting 
          }));
        }
      });
    }, options);

    // Get all card elements and observe them
    const cardElements = document.querySelectorAll('.card-container');
    cardElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [cards]);

  // Handle card selection
  const handleClick = (cardId) => {
    setLastSelected(selected);
    setSelected(cardId === selected ? null : cardId);
  };

  // Handle image load event
  const handleImageLoad = (cardId) => {
    setImagesLoaded(prev => ({
      ...prev,
      [cardId]: true
    }));
  };

  // Add parallax effect on mouse move
  useEffect(() => {
    let ticking = false;
    
    const onMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const cardElements = document.querySelectorAll('.card-container');
          
          cardElements.forEach((card) => {
            const rect = card.getBoundingClientRect();
            
            // Calculate if mouse is near the card
            if (
              e.clientX > rect.left - 300 && 
              e.clientX < rect.right + 300 && 
              e.clientY > rect.top - 300 && 
              e.clientY < rect.bottom + 300
            ) {
              // Calculate mouse position relative to card center
              const cardCenterX = rect.left + rect.width / 2;
              const cardCenterY = rect.top + rect.height / 2;
              
              const deltaX = (e.clientX - cardCenterX) / (rect.width * 1.5);
              const deltaY = (e.clientY - cardCenterY) / (rect.height * 1.5);
              
              // Apply subtle tilt effect
              const tiltAmount = 2; // degrees
              card.style.transform = `perspective(1000px) rotateY(${deltaX * tiltAmount}deg) rotateX(${-deltaY * tiltAmount}deg) scale(1.02)`;
              
              // Move the background image for parallax effect
              const bg = card.querySelector('.card-bg');
              if (bg) {
                bg.style.transform = `translateX(${deltaX * -10}px) translateY(${deltaY * -10}px)`;
              }
            } else {
              // Reset transforms when mouse is far from card
              card.style.transform = '';
              const bg = card.querySelector('.card-bg');
              if (bg) {
                bg.style.transform = '';
              }
            }
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    // Add event listener
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-5 md:px-28 py-10 relative">
      {cards.map((card, i) => (
        <div
          key={card.id}
          data-card-id={card.id}
          className={`card-container ${card.className || ""} relative h-96 md:h-[40rem] cursor-pointer rounded-xl overflow-hidden transition-all duration-500 hover:z-10 ${
            isInView[card.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`} 
          onClick={() => handleClick(card.id)}
          style={{ 
            transitionDelay: `${i * 0.1}s`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out, opacity 0.5s ease-out, translate 0.5s ease-out'
          }}
        >
          {/* Low-resolution blur placeholder */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-lg scale-105 transition-opacity duration-500"
            style={{
              backgroundImage: `url(${card.thumbnail})`,
              opacity: imagesLoaded[card.id] ? 0 : 1,
              filter: 'blur(20px)',
              transform: 'scale(1.1)',
              zIndex: 1
            }}
          />

          {/* High-resolution image with smooth transition */}
          <div
            className="card-bg absolute inset-0 h-full w-full bg-cover bg-center rounded-xl transition-all duration-700 ease-out z-2"
            style={{ 
              backgroundImage: `url(${card.thumbnail})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              transformOrigin: 'center',
              opacity: imagesLoaded[card.id] ? 1 : 0,
              filter: `brightness(${selected === null || selected === card.id ? 90 : 40}%)`,
              transition: 'transform 0.8s ease-out, filter 0.5s ease-in-out, opacity 0.5s ease-in'
            }}
          >
            {/* Hidden image onLoad handler */}
            <Image 
              src={card.thumbnail} 
              alt="Card image"
              layout="fill"
              objectFit="cover"
              className="opacity-0 absolute"
              onLoad={() => handleImageLoad(card.id)}
              priority={i < 6} // Load first 6 images with priority
            />
          </div>

          {/* Card content overlay with parallax effect */}
          <div
            className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-b from-transparent to-black/60 transition-opacity duration-500"
            style={{
              opacity: selected === null || selected === card.id ? 1 : 0.3,
            }}
          >
            <div
              className="transform transition-all duration-700 ease-out"
              style={{ 
                transform: isInView[card.id] ? 'translateY(0)' : 'translateY(50px)', 
                opacity: isInView[card.id] ? 1 : 0,
                transitionDelay: `${i * 0.1 + 0.2}s`
              }}
            >
              {card.content}
            </div>
          </div>

          {/* Full screen overlay when selected */}
          {selected === card.id && (
            <div
              className="absolute inset-0 z-30 bg-black/40 transition-opacity duration-500"
              style={{
                opacity: 1
              }}
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