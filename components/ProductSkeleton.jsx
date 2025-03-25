import React from 'react'

const ProductSkeleton = () => {
    return (
        <div className=" flex flex-col bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
        {/* Image placeholder */}
        <div className="relative w-full aspect-[3/4] bg-gray-200"></div>
        
        {/* Content placeholder */}
        <div className="flex flex-col p-3 sm:p-4 gap-2">
            {/* Title placeholder */}
            <div className="h-4 sm:h-5 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 sm:h-5 bg-gray-200 rounded-md w-3/4"></div>
            
            {/* Price tag placeholder */}
            <div className="h-8 bg-gray-200 rounded-lg w-1/3 mt-1"></div>
        </div>
        </div>
    );
};
  


export default ProductSkeleton