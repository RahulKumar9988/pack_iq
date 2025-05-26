"use client";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Image, Link, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuArrowLeft, LuCheck, LuSparkles } from "react-icons/lu";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Material() {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [allMaterials, setAllMaterials] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredMaterial, setHoveredMaterial] = useState(null);
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state?.cart?.item);
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };
  
  useEffect(() => {
    if (!cartItem.packaging_id) {
      router.back();
      return;
    }
    getMaterials();
  }, [cartItem.packaging_id]);

  // Format material data from API response
  const formatMaterialData = (materialData) => {
    return {
      material_id: materialData.materialId.material_id,
      name: materialData.materialId.name,
      description: materialData.materialId.description,
      img: materialData.materialId.material_image_url || "/Material.png",
      checked: materialData.checked,
      packaging_type_material_id: materialData.packaging_type_material_id,
      isDefault: materialData.checked === 1
    };
  };

  async function getMaterials() {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/v1/resources/list-materials/${cartItem.packaging_id}`);
      
      if (response.data.status === 200) {
        // Process all materials and sort by default first
        const processedMaterials = response.data.data
          .map(formatMaterialData)
          .sort((a, b) => b.isDefault - a.isDefault); // Default materials first
        
        setAllMaterials(processedMaterials);
        
        // Auto-select first default material if available
        const firstDefault = processedMaterials.find(material => material.isDefault);
        if (firstDefault) {
          setSelectedMaterial(firstDefault.material_id);
          dispatch(
            addToCart({
              ...cartItem,
              material: firstDefault.name,
              material_id: firstDefault.material_id,
              material_img: firstDefault.img,
            })
          );
        }
      } else {
        setError('Failed to fetch materials');
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  }

  const handleMaterialSelect = (material) => {
    dispatch(
      addToCart({
        ...cartItem,
        material: material.name,
        material_id: material.material_id,
        material_img: material.img,
      })
    );
    setSelectedMaterial(material.material_id);
  };

  const handleNextClick = (e) => {
    if (!selectedMaterial) {
      e.preventDefault();
      setShowWarning(true);
    }
  };

  const truncateText = (text, wordCount) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.slice(0, wordCount).join(" ") + (words.length > wordCount ? "..." : "");
  };

  const sizeRouteUrl = cartItem.name ? 
    `/${cartItem.name.toLowerCase().replace(" ", "-")}/size` : 
    '/size';

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-blue-900 font-medium">Loading materials...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto p-6 rounded-xl border border-red-200 bg-red-50">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen text-blue-900 relative">
        {/* Main container with responsive layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
          
          {/* Main content area */}
          <div className="flex-1 lg:pr-8">
            {/* Materials Grid */}
            <div className="space-y-6 mb-24 lg:mb-8">
              {allMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {allMaterials.map((material, i) => {
                    const isHovered = hoveredMaterial === material.material_id;
                    const isSelected = selectedMaterial === material.material_id;
                    
                    return (
                      <div
                        key={i}
                        onMouseEnter={() => setHoveredMaterial(material.material_id)}
                        onMouseLeave={() => setHoveredMaterial(null)}
                        onClick={() => handleMaterialSelect(material)}
                        className={`relative shadow-sm rounded-xl transition-all duration-300 transform cursor-pointer ${
                          isSelected 
                            ? 'border-2 border-blue-400 scale-[1.02] bg-gradient-to-t from-blue-50 to-[#f4f7ff] shadow-lg' 
                            : isHovered
                              ? 'border-2 border-blue-300 hover:bg-blue-50 shadow-md scale-[1.01]'
                              : 'border-2 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {/* Default material indicator
                        {material.isDefault && (
                          <div className="absolute -top-2 -right-2 z-10">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                              <LuSparkles className="w-3 h-3" />
                              Default
                            </div>
                          </div>
                        )} */}

                        <div className="p-4 lg:p-6">
                          {/* Mobile/Tablet Layout */}
                          <div className="flex gap-4 sm:hidden">
                            <div className="flex-shrink-0">
                              <Image
                                src={material.img}
                                alt={material.name}
                                width={80}
                                height={80}
                                className="rounded-lg object-cover w-20 h-20"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2 mb-2">
                                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all mt-0.5 ${
                                  isSelected
                                    ? 'bg-blue-500 border-blue-500 shadow-md shadow-blue-500/30'
                                    : 'bg-white border-gray-300'
                                }`}>
                                  {isSelected && (
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-base font-semibold text-[#143761] leading-tight truncate">
                                    {material.name}
                                  </h3>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                    {truncateText(material.description, 8)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Layout */}
                          <div className="hidden sm:block">
                            <div className="mb-4">
                              <Image
                                src={material.img}
                                alt={material.name}
                                width={300}
                                height={200}
                                className="rounded-lg object-cover w-full h-40 lg:h-48"
                                loading="lazy"
                              />
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 transition-all ${
                                  isSelected
                                    ? 'bg-blue-500 border-blue-500 shadow-md shadow-blue-500/30'
                                    : 'bg-white border-gray-300'
                                }`}>
                                  {isSelected && (
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold text-[#143761] leading-tight">
                                  {material.name}
                                </h3>
                              </div>
                              
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {isHovered || isSelected ? material.description : truncateText(material.description, 15)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 border-2 border-gray-200 rounded-xl bg-gray-50">
                  <p className="text-lg">No materials available for this packaging type</p>
                </div>
              )}
            </div>
          </div>
          
          
          {/* Sidebar - Desktop only */}
          <div className="hidden lg:block lg:w-80 xl:w-64">
            {/* Desktop navigation */}
            <div className="flex justify-around">
              <div className="mb-4">
                  <Button 
                    onClick={handleBack}
                    className="bg-blue-50 hover:bg-blue-100 text-[#253670] px-2 border-1 border-[#253670] rounded-md"
                    startContent={<LuArrowLeft size={20} />}
                  >
                    Back
                  </Button>
                </div>
                <Link
                    href={sizeRouteUrl}
                    onClick={handleNextClick}
                    className='px-5 py-2 mb-4 rounded-lg text-white transition-all font-bold bg-gradient-to-r from-[#0b2949] to-indigo-800 cursor-pointer'
                  >
                  Next
                </Link>
            </div>
            
            <div className="sticky top-8 space-y-6">
              <div className="p-6 border-2 border-gray-200 rounded-xl bg-white shadow-sm">
                <h3 className="font-semibold text-[#143761] mb-4">Your Selected Packaging</h3>
                <div className="flex items-center gap-3 text-sm">
                  <LuCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-[#143761]">{cartItem.name}</span>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl">
                <h4 className="font-semibold text-[#143761] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Important Notes
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    Matt Finish window will have a frosty window.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    Any pouch with window will reduce the shelf life of the product as metalized layer is removed.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed bottom navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg p-4 z-50 lg:hidden">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-sm text-gray-600">
              Material selected: <span className="font-semibold">{selectedMaterial ? 1 : 0}</span>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-lg font-medium text-[#143761] border-2 border-[#143761] transition-all hover:bg-blue-50 flex items-center gap-2"
              >
                <LuArrowLeft className="w-4 h-4" />
                Back
              </button>
              <Link
                href={sizeRouteUrl}
                onClick={handleNextClick}
                className="px-6 py-2 rounded-lg font-medium text-white transition-all bg-gradient-to-r from-[#0b2949] to-indigo-800 flex items-center gap-2"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        
      </div>

      {/* Warning Modal */}
      <Modal isOpen={showWarning} onClose={() => setShowWarning(false)}>
        <ModalContent>
          <ModalHeader className="text-[#143761]">Selection Required</ModalHeader>
          <ModalBody className="pb-6">
            <p className="text-gray-700">Please select a material before proceeding to the next step.</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}