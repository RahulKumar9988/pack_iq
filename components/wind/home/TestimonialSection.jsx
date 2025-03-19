import React, { useState, useEffect } from 'react';
import { Avatar, Button } from "@nextui-org/react";

const TestimonialSection = () => {
  const [displayedCount, setDisplayedCount] = useState(6);
  
  const testimonials = [
    {
      id: 1,
      name: "Alexander Akers",
      role: "Senior iOS Engineer, Apple",
      message: "I get worried when I use a computer without @paste_app. What if there's something important on the clipboard? It's like how you can \"hold\" a piece in Tetris but you have to remember what it is."
    },
    {
      id: 2,
      name: "Chris Messina",
      role: "Banking Hunter",
      message: "This is a must-have Mac app for me. I use it dozens if not hundreds of times a day. So useful!"
    },
    {
      id: 3,
      name: "Sammy Schuckert",
      role: "UX Designer",
      message: "I'm a heavy @paste_app user for 3 years. Paste is core to my everyday workflows. Even while writing this tweet I'm using it. It provides me with superpowers and makes me crazy efficient. Every time someone sees me using it they go like \"Oh hey, what was that? I want that!\""
    },
    {
      id: 4,
      name: "João Cunha",
      role: "Senior Product Manager, Nubank",
      message: "Few things have had as much impact on my Mac workflow as @paste_app. It may look indulgent, but think of how many times you copy/paste things over the course of a day — Paste makes this process a gazillion times better."
    },
    {
      id: 5,
      name: "Kristen Wright",
      role: "Day One Journal",
      message: "Finally bought @paste_app and I'm really digging it. Great for code snippets, hex colors & links you frequently use."
    },
    {
      id: 6,
      name: "Diego Freniche Brito",
      role: "Developer Advocate",
      message: "Using a clipboard manager has become second nature for me (and a necessity as developer). Have tried a bunch. @paste_app is the best by far. #adayday"
    },
    {
      id: 7,
      name: "Jonathan Z. White",
      role: "Designer & Developer, Airbnb",
      message: "I've been using an app called @paste_app and it's almost hilarious how much of a work flow improvement"
    },
    {
      id: 8,
      name: "Matthias Feit",
      role: "Pakistan UX Designer, Dell",
      message: "Thanks to @paste_app I was able to cut the time I would have spent on copying and pasting today by about 75%."
    },
    {
      id: 9,
      name: "Simon Stürmer",
      role: "Software Engineer, Google",
      message: "@paste_app is my new favorite Mac App! I didn't know how I went so long without it!"
    }
  ];

  const loadMore = () => {
    setDisplayedCount(prevCount => Math.min(prevCount + 3, testimonials.length));
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#F5F5F7] py-16">
      <h2 className="text-center font-semibold text-[#143761] text-3xl mb-12">
        Accelerating Innovations In<br />Packaging
      </h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, displayedCount).map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col bg-white rounded-xl shadow p-6"
            >
              <div className="flex items-center mb-4">
                <Avatar 
                  className="w-12 h-12 mr-4" 
                  src={`https://i.pravatar.cc/150?u=${testimonial.id}`} 
                />
                <div>
                  <h3 className="font-medium text-base">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm flex-grow">{testimonial.message}</p>
            </div>
          ))}
        </div>
        
        {displayedCount < testimonials.length && (
          <div className="flex justify-center mt-8">
            <Button 
              onClick={loadMore} 
              className="bg-transparent border border-[#143761] text-[#143761] rounded-full px-6 py-2"
              startContent={<span className="mr-1">+</span>}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialSection;