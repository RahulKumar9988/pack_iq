import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Fallback images in case the API data doesn't include images
const fallbackPackagingImages = {
  "Stand-up pouch": "https://images.pexels.com/photos/4464821/pexels-photo-4464821.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Flat bottom pouch": "https://images.pexels.com/photos/6692160/pexels-photo-6692160.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Flat pouch": "https://images.pexels.com/photos/7180795/pexels-photo-7180795.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Flow pack": "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Rollstock": "https://images.pexels.com/photos/4466524/pexels-photo-4466524.jpeg?auto=compress&cs=tinysrgb&w=600"
};

const fallbackMaterialImages = {
  "Transparent Toni": "https://images.pexels.com/photos/3943748/pexels-photo-3943748.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Metallised Martha": "https://images.pexels.com/photos/5871217/pexels-photo-5871217.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Robust Robin": "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Biobased Ben": "https://images.pexels.com/photos/4039606/pexels-photo-4039606.jpeg?auto=compress&cs=tinysrgb&w=600"
};

const PackagingSolutions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [packagingTypes, setPackagingTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Base URL for API calls
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  
  // Get packaging types from API
  const getPackagingTypes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/packaging-type`
      );
      if (response.status === 200) {
        const responseData = response.data.data.map((ele) => ({
          id: ele.packaging_id,
          name: ele.name,
          description: ele.description,
          icon: ele.packaging_image_icon_url,
          imageUrl: ele.packaging_image_url,
          minimumQty: ele.minimum_qty,
          isNew: false, // You can set this conditionally if your API provides this info
          time: "4-7 weeks",
          quantity: ele.minimum_qty
        }));
        setPackagingTypes(responseData);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);
  
  // Get materials from API
  const getMaterials = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/v1/resources/material`);
      if (response.data.status === 200) {
        const responseData = response.data.data.map((ele) => ({
          id: ele.material_id,
          name: ele.name,
          description: ele.description,
          imageUrl: ele.material_image_url || "/Material.png",
          //price: "₹" + ele.price,
          isBestseller: false, // You can set this conditionally if your API provides this info
          createdAt: ele.createdAt,
          updatedAt: ele.updatedAt || "",
          deleteFlag: ele.delete_flag
        }));
        setMaterials(responseData);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);
  
  // Fetch data on component mount
  useEffect(() => {
    getPackagingTypes();
    getMaterials();
    
    // Handle closing dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.packaging-dropdown')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [getPackagingTypes, getMaterials]);
  
  // Handle navigation
  const handleNavigate = (itemId, type) => {
    console.log(`Navigating to ${type} with ID: ${itemId}`);
    setIsOpen(false);
    // Implement actual navigation logic here
    router.push(`/products/${itemId}`);
  };
  
  // Get image from API data or fallback
  const getItemImage = (item, type) => {
    if (type === 'packaging') {
      return item.imageUrl || fallbackPackagingImages[item.name] || fallbackPackagingImages["Stand-up pouch"];
    } else {
      return item.imageUrl || fallbackMaterialImages[item.name] || fallbackMaterialImages["Transparent Toni"];
    }
  };

  return (
    <div className="relative inline-block packaging-dropdown">
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-base font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 focus:outline-none group"
      >
        <span className="pr-1">Packaging Solutions</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Enhanced Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-4 bg-white rounded-xl shadow-xl overflow-hidden w-[900px] border border-gray-100 transition-all duration-200 animate-fadeIn">
          <div className="flex">
            {/* Left Column - Menu Items with flexbox layout */}
            <div className="w-3/5 flex">
              {/* Packaging Types column */}
              <div className="w-1/2 border-r border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="font-bold text-lg text-gray-800">Packaging Types</h3>
                </div>
                <div className="overflow-y-auto max-h-[500px] py-2">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    packagingTypes.map((item) => (
                      <div
                        key={item.id}
                        className="px-6 py-3 hover:bg-blue-50 cursor-pointer group transition-all duration-200 border-l-2 border-transparent hover:border-blue-500"
                        onMouseEnter={() => setActiveItem({ type: 'packaging', item })}
                        onClick={() => handleNavigate(item.id, 'packaging')}
                      >
                        <div className="flex items-center justify-between">
                          <span className="group-hover:text-blue-600 transition-colors duration-200">{item.name}</span>
                          {item.isNew && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Materials column */}
              <div className="w-1/2">
                <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="font-bold text-lg text-gray-800">Materials</h3>
                </div>
                <div className="overflow-y-auto max-h-[500px] py-2">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    materials.map((item) => (
                      <div
                        key={item.id}
                        className="px-6 py-3 hover:bg-blue-50 cursor-pointer group transition-all duration-200 border-l-2 border-transparent hover:border-blue-500"
                        onMouseEnter={() => setActiveItem({ type: 'material', item })}
                        //onClick={() => handleNavigate(item.id, 'material')}
                      >
                        <div className="flex items-center justify-between">
                          <span className="group-hover:text-blue-600 transition-colors duration-200">{item.name}</span>
                          {item.isBestseller && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                              Bestseller
                            </span>
                          )}
                          <span className="text-sm text-gray-500">{item.price}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Preview */}
            <div className="w-2/5 bg-gradient-to-br from-gray-50 to-white p-6 flex items-center justify-center">
              {activeItem ? (
                <div className="text-center transition-opacity duration-300 ease-in-out">
                  <div className="h-56 w-56 mx-auto mb-6 flex items-center justify-center overflow-hidden rounded-lg shadow-md border border-gray-200 bg-white p-4 transition-all duration-300 hover:shadow-lg">
                    <img
                      src={getItemImage(activeItem.item, activeItem.type)}
                      alt={activeItem.item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold text-xl text-gray-800 mb-2" 
                    onClick={() => handleNavigate(activeItem.item.id, activeItem.type)}
                  >{activeItem.item.name}</h3>
                  {activeItem.item.description && (
                    <p className="text-start text-sm text-gray-600 mt-2 max-w-xs mx-auto leading-relaxed">
                      {activeItem.item.description}
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center transition-opacity duration-300 ease-in-out">
                  <div className="h-56 w-56 mx-auto mb-6 flex items-center justify-center overflow-hidden rounded-lg shadow-md border border-gray-200 bg-white p-4">
                    <img
                      src="https://images.pexels.com/photos/1546333/pexels-photo-1546333.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Hover over options to preview"
                      className="max-h-full max-w-full object-contain opacity-50"
                    />
                  </div>
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">Select an option</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                    Hover over an option on the left to preview packaging solutions and materials
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer with links or call to action */}
          <div className="bg-gray-50 border-t border-gray-100 p-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">Explore our complete range of packaging solutions</p>
            <button 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              onClick={() => router.push('/products')}
            >
              
              View All Options →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagingSolutions;