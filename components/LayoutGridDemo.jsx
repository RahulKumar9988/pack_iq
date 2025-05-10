"use client";
import React, { useEffect, useState } from "react";
import { LayoutGrid } from "../components/ui/layout-grid";

export default function LayoutGridDemo() {
  const [inspirations, setInspirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // Fetch inspirations from the API
  useEffect(() => {
    const fetchInspirations = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/v1/inspiration`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch inspirations. Status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.status === 200 && data.data) {
          setInspirations(data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching inspirations:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInspirations();
  }, []);

  // Add a scroll listener for parallax effect
  useEffect(() => {
    // Function to handle parallax scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Select all image backgrounds for parallax effect
      document.querySelectorAll('.card-container').forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardCenter = cardTop + (card.offsetHeight / 2);
        
        // Calculate parallax offset (move slower than scroll)
        const parallaxOffset = (cardCenter - viewportHeight / 2) * 0;
        
        // Apply parallax effect to the background image
        const bgImage = card.querySelector('.bg-cover');
        if (bgImage) {
          bgImage.style.transform = `translateY(${parallaxOffset}px)`;
        }
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set positions
    handleScroll();
    
    // Clean up event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate cards from API data
  const generateCards = () => {
    if (!inspirations || inspirations.length === 0) {
      return [];
    }

    return inspirations.map((inspiration, index) => {
      // Determine column span based on index (similar to your original pattern)
      const className = index % 3 === 0 ? "md:col-span-2" : "col-span-1";
      
      return {
        id: inspiration.inspiration_id,
        content: (
          <div>
            <p className="font-bold md:text-4xl text-xl text-white">
              {inspiration.inspiration_title}
            </p>
            <p className="font-normal text-base text-white"></p>
            <div className="font-normal text-base my-4 max-w-lg text-neutral-200">
              {inspiration.inspiration_description ? (
                <div dangerouslySetInnerHTML={{ __html: inspiration.inspiration_description }} />
              ) : (
                <p>No description available</p>
              )}
            </div>
          </div>
        ),
        className: className,
        thumbnail: inspiration.inspiration_image_url,
      };
    });
  };

  // Display loading, error, or content
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-2xl">Loading inspirations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full"> 
      <LayoutGrid cards={generateCards()} />
    </div>
  );
}