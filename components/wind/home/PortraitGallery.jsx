import { useState, useEffect } from 'react';
import { FlipWords } from '@/components/ui/flip-words';

export default function LinkedPortraitGallery() {
  const words = ["Solution", "Standup", "Rounded", "Rollon", "Flat", "Flow"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  
  // Image mapping for each flip word
  const imageMapping = {
    "Solution": "/pack/flat-bottom-pouch-coffee-packaging-robin-zipper-limited-lighthouse-blend-packiro.png",
    "Standup": "/pack/flat-bottom-pouch-coffee-packaging-robin-zipper-monument-blend-packiro.png",
    "Rounded": "/pack/flat-bottom-pouch-coffee-packaging-robin-zipper-limited-lighthouse-blend-packiro.png",
    "Rollon": "/pack/flat-bottom-pouch-coffee-packaging-robin-zipper-monument-blend-packiro.png",
    "Flat": "/pack/flat-bottom-pouch-coffee-packaging-robin-zipper-limited-lighthouse-blend-packiro.png",
    "Flow": "/pack/flat-bottom-pouch-coffee-packaging-robin-zipper-monument-blend-packiro.png"
  };

  // Colors mapping for background circles
  const colorMapping = {
    "Solution": "bg-yellow-400",
    "Standup": "bg-purple-300",
    "Rounded": "bg-blue-300",
    "Rollon": "bg-green-300",
    "Flat": "bg-orange-300",
    "Flow": "bg-pink-300"
  };

  return (
    <div className="relative w-full h-full md:p-8">
      {/* Call to Action Section with FlipWords */}
      <div className=" text-center hidden">
        <h2 className="text-4xl font-bold mb-4">
          Eco-Friendly Packaging <FlipWords 
            words={words} 
            duration={2000} 
            className="text-[#143761]"
            onWordChange={(word) => setCurrentWord(word)}
          />
        </h2>
        <p className="text-lg text-[#03172BB0] mb-6">
          Discover innovative and sustainable packaging options that reduce waste and protect our planet.
        </p>
        <button className="bg-[#143761] text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-[#0f2a4a] transition-colors">
          Explore {currentWord} Packaging
        </button>
      </div>

      {/* Gallery Section */}
      <div className="max-w-3xl mx-auto relative">
        {/* Yellow star decoration */}
        <div className="absolute left-4 top-0">
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-yellow-400 fill-current">
            <path d="M12 1L15.36 8.48L23 9.24L17.5 14.52L19.08 22L12 18.48L4.92 22L6.5 14.52L1 9.24L8.64 8.48L12 1Z" />
          </svg>
        </div>
        
        <div className="flex flex-wrap justify-center gap-10 ">
          {/* Main featured image (changes with flip words) */}
          <div className="relative mt-10">
            <div className={`${colorMapping[currentWord] || "bg-yellow-400"} rounded-full w-64 h-80 flex items-center justify-center transition-colors duration-500`}>
              <img 
                src={imageMapping[currentWord]}
                alt={`${currentWord} packaging`}
                className="h-[380px] w-auto object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
            
            {/* Blue scribble */}
            <div className="absolute -left-8 top-1/3 transform -translate-y-1/2">
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                <path 
                  d="M10,50 Q30,30 50,50 T90,50" 
                  stroke="#3b82f6" 
                  strokeWidth="4" 
                  fill="none" 
                />
              </svg>
            </div>
          </div>
          
          {/* Right column portraits - these will swap positions when word changes */}
          <div className="hidden md:flex md:flex-col md:gap-10">
            {/* Top right portrait */}
            <div className={`${colorMapping[currentWord] || "bg-yellow-400"} rounded-full w-40 h-45 flex items-center justify-center transition-colors duration-500`}>
              <img 
                src={imageMapping[currentWord]}
                alt={`${words[(words.indexOf(currentWord) + 1) % words.length]} packaging`}
                className="h-[250px] w-auto object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
            
            {/* Bottom right portrait */}
            <div className="relative">
              <div className={`${colorMapping[currentWord] || "bg-yellow-400"} rounded-full w-40 h-60 flex items-center justify-center transition-colors duration-500`}>
                <img 
                  src={imageMapping[currentWord]}
                  alt={`${words[(words.indexOf(currentWord) + 1) % words.length]} packaging`}
                  className="h-[260px] w-auto object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              
              {/* Radiating lines decoration */}
              <div className="absolute -right-6 bottom-0">
                <svg viewBox="0 0 24 24" className="w-12 h-12">
                  <g stroke="black" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="4" />
                    <line x1="12" y1="20" x2="12" y2="23" />
                    <line x1="4" y1="12" x2="1" y2="12" />
                    <line x1="23" y1="12" x2="20" y2="12" />
                    <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
                    <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
                    <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
                    <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Yellow star decoration */}
        <div className="absolute left-16 bottom-4">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-yellow-400 fill-current">
            <path d="M12 1L15.36 8.48L23 9.24L17.5 14.52L19.08 22L12 18.48L4.92 22L6.5 14.52L1 9.24L8.64 8.48L12 1Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}