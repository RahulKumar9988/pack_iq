import React from 'react';

const Recomend_Scleton = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Image Gallery Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex flex-row sm:flex-col md:flex-col gap-2 sm:gap-3 order-2 sm:order-1">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="min-w-16 w-16 h-24 sm:w-20 sm:h-28 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
          {/* Main image */}
          <div className="relative w-full aspect-square h-80 order-1 sm:order-2 bg-gray-200 animate-pulse rounded-md"></div>
        </div>

        {/* Product Form Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="h-7 w-3/4 bg-gray-200 animate-pulse rounded-md"></div>
          
          <div className="space-y-5">
            {/* Form fields skeletons */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col gap-2">
                <div className="h-5 w-24 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            ))}
          </div>
          
          <div className="h-12 w-full bg-gray-300 animate-pulse rounded-md mt-4"></div>
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className="mt-20 w-full">
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded-md mb-6"></div>
        
        {/* Grid of product skeletons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recomend_Scleton;