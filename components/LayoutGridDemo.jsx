"use client";
import React, { useEffect, useState } from "react";
import { LayoutGrid } from "../components/ui/layout-grid";

export default function LayoutGridDemo() {
  const [inspirations, setInspirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch inspirations from the backend
  useEffect(() => {
    const fetchInspirations = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/v1/inspiration`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch inspirations: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.status === 200 && Array.isArray(result.data)) {
          setInspirations(result.data);
        } else {
          throw new Error("Invalid data format received from API");
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

  // Add a scroll listener to enable parallax effect
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
        const parallaxOffset = (cardCenter - viewportHeight / 2) * 0.15;
        
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

  // Convert backend data to card format
  const inspirationCards = inspirations.map((inspiration, index) => {
    return {
      id: inspiration.inspiration_id,
      content: <InspirationCard inspiration={inspiration} />,
      className: index % 3 === 0 ? "md:col-span-2" : "col-span-1",
      thumbnail: inspiration.inspiration_image_url,
    };
  });

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-red-500">Error loading inspirations: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full"> 
      <div className="h-full flex items-center justify-center text-start">
        <div className="">
          <div className="animate-bounce mt-16 font-bold text-black text-5xl">↓</div>
        </div>
      </div>
      {inspirationCards.length > 0 ? (
        <LayoutGrid cards={inspirationCards} />
      ) : (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="text-gray-500">No inspirations found</div>
        </div>
      )}
    </div>
  );
}

const InspirationCard = ({ inspiration }) => {
  // Extract date for display
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(inspiration.inspiration_date_time).toLocaleDateString(undefined, dateOptions);
  
  // Function to safely render HTML from the backend
  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        {inspiration.inspiration_title}
      </p>
      <p className="font-normal text-base text-white opacity-80 mt-2">
        {formattedDate}
      </p>
      <div className="font-normal text-base my-4 max-w-lg text-neutral-100"
           dangerouslySetInnerHTML={createMarkup(inspiration.inspiration_description)}>
      </div>
    </div>
  );
};