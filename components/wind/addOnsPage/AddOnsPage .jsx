"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const AddOnsPage = () => {
  const [selectedAddOns, setSelectedAddOns] = useState({
    eurohole: true,
    sustainabilitySeal: true
  });

  const toggleAddOn = (addOn) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [addOn]: !prev[addOn]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add-Ons</h1>
      
      <div className="space-y-4">
        {/* Eurohole Add-on */}
        <div 
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            selectedAddOns.eurohole 
              ? 'border-teal-500 bg-blue-50' 
              : 'border-gray-300'
          }`}
          onClick={() => toggleAddOn('eurohole')}
        >
          <input 
            type="checkbox" 
            checked={selectedAddOns.eurohole}
            onChange={() => toggleAddOn('eurohole')}
            className="mr-4"
          />
          <div className="flex-grow">
            <div className="flex items-center">
              <img 
                src="/eurohole-icon.svg" 
                alt="Eurohole" 
                className="w-6 h-6 mr-2"
              />
              <span className="font-semibold">Eurohole</span>
              <span className="ml-2 text-gray-500 text-sm">Recommended</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              The Eurohole is a slit-shaped cutout at the top of packaging. 
              A great choice if you want to present your products hanging at the point of sale.
            </p>
            <div className="text-sm text-gray-500 mt-1">
              + 0,01 € / Piece
            </div>
          </div>
        </div>

        {/* Sustainability Seal Add-on */}
        <div 
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            selectedAddOns.sustainabilitySeal 
              ? 'border-teal-500 bg-blue-50' 
              : 'border-gray-300'
          }`}
          onClick={() => toggleAddOn('sustainabilitySeal')}
        >
          <input 
            type="checkbox" 
            checked={selectedAddOns.sustainabilitySeal}
            onChange={() => toggleAddOn('sustainabilitySeal')}
            className="mr-4"
          />
          <div className="flex-grow">
            <div className="flex items-center">
              <img 
                src="/sustainability-icon.svg" 
                alt="Sustainability Seal" 
                className="w-6 h-6 mr-2"
              />
              <span className="font-semibold">"Made For Recycling"-Certification</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Sustainability certification for your packaging.
            </p>
            <div className="text-sm text-gray-500 mt-1">
              + 0,02 € / Piece
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button 
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Back
        </button>
        <button 
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default AddOnsPage;