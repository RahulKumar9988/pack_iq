"use client"
import React, { useState } from "react";
import Products from "@/components/wind/products/Products";
import FilterSidebar from "@/components/FilterSidebar";
import { Filter, X } from "lucide-react";

export default function Page() {
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const toggleFilters = () => {
    setShowFiltersMobile(!showFiltersMobile);
  };

  return (
    <div className=" mx-auto relative">
      {/* Mobile Floating Filter Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-30">
        <button
          onClick={toggleFilters}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          aria-label={showFiltersMobile ? "Close filters" : "Open filters"}
        >
          {showFiltersMobile ? <X size={24} /> : <Filter size={24} />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Mobile Filter Sidebar - Absolute positioned overlay when visible */}
        <aside 
          className={`
            md:hidden fixed inset-0 z-20 bg-white overflow-y-auto transition-transform duration-300 transform
            ${showFiltersMobile ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="p-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button 
                onClick={toggleFilters}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </aside>

        {/* Desktop Filter Sidebar - Always visible on desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* Main content - Products */}
        <main className="flex-1">
          <Products />
        </main>
      </div>
    </div>
  );
}