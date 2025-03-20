"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

const FilterSidebar = () => {
  const [expanded, setExpanded] = useState({
    all: true,
    industries: true,
    sustainability: true,
    function: true
  });
  
  const [selected, setSelected] = useState({});

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const toggleItem = (category, item) => {
    setSelected(prev => {
      const key = `${category}-${item}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };
  
  const resetFilters = () => {
    setSelected({});
  };
  
  const FilterItem = ({ category, item }) => {
    const isSelected = selected[`${category}-${item}`];
    return (
      <button 
        className={`w-full text-left py-1 flex items-center justify-between group transition-colors duration-200 ${isSelected ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
        onClick={() => toggleItem(category, item)}
      >
        <span className="flex-1">{item}</span>
        {isSelected && <Check size={16} className="text-blue-600" />}
        <span className={`ml-2 text-xs text-gray-400 group-hover:opacity-100 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
          {isSelected ? '' : 'Add'}
        </span>
      </button>
    );
  };

  return (
    <div className="w-64 bg-white shadow rounded-lg p-4 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
        
        <div className="mb-5">
          <button 
            className="w-full text-left font-medium text-gray-800 py-2 hover:text-blue-600 flex justify-between items-center border-b border-gray-100 pb-1"
            onClick={() => toggleSection('all')}
          >
            <span className="text-gray-800 hover:text-blue-600">All</span>
            {expanded.all ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expanded.all && (
            <div className="pl-2 space-y-3 mt-3">
              <FilterItem category="all" item="Boxes" />
              <FilterItem category="all" item="Mailers" />
              <FilterItem category="all" item="Accessories" />
              <FilterItem category="all" item="Flexible packaging" />
              <FilterItem category="all" item="Packaging bag" />
            </div>
          )}
        </div>

        <div className="mb-5">
          <button 
            className="w-full text-left font-medium text-gray-800 py-2 hover:text-blue-600 flex justify-between items-center border-b border-gray-100 pb-1"
            onClick={() => toggleSection('industries')}
          >
            <span className="text-gray-800 hover:text-blue-600">Industries</span>
            {expanded.industries ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expanded.industries && (
            <div className="pl-2 space-y-3 mt-3">
              <FilterItem category="industries" item="Tea & coffee" />
              <FilterItem category="industries" item="Pet food" />
              <FilterItem category="industries" item="Spices and seasoning" />
              <FilterItem category="industries" item="Protein and supplements" />
              <FilterItem category="industries" item="Fertilizers and seed" />
              <FilterItem category="industries" item="Cosmetics" />
            </div>
          )}
        </div>

        <div className="mb-5">
          <button 
            className="w-full text-left font-medium text-gray-800 py-2 hover:text-blue-600 flex justify-between items-center border-b border-gray-100 pb-1"
            onClick={() => toggleSection('sustainability')}
          >
            <span className="text-gray-800 hover:text-blue-600">Sustainability</span>
            {expanded.sustainability ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expanded.sustainability && (
            <div className="pl-2 space-y-3 mt-3">
              <FilterItem category="sustainability" item="Eco-friendly" />
              <FilterItem category="sustainability" item="Reusable" />
              <FilterItem category="sustainability" item="Bio degradable" />
              <FilterItem category="sustainability" item="Recyclable content" />
              <FilterItem category="sustainability" item="Recyclable" />
            </div>
          )}
        </div>

        <div className="mb-5">
          <button 
            className="w-full text-left font-medium text-gray-800 py-2 hover:text-blue-600 flex justify-between items-center border-b border-gray-100 pb-1"
            onClick={() => toggleSection('function')}
          >
            <span className="text-gray-800 hover:text-blue-600">Function</span>
            {expanded.function ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expanded.function && (
            <div className="pl-2 space-y-3 mt-3">
              <FilterItem category="function" item="Events" />
              <FilterItem category="function" item="Retail" />
              <FilterItem category="function" item="Ship large items" />
              <FilterItem category="function" item="Subscription box" />
              <FilterItem category="function" item="Luxury" />
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
          <button 
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
            onClick={resetFilters}
          >
            Reset
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;