import React, { useEffect, useState } from "react";
import {
  Carousel as UICarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Carousel({ 
  images, 
  altPrefix = "Image", 
  title = "Gallery",
  selectedImage = 0,
  setSelectedImage
}) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(selectedImage);
  const count = images ? images.length : 0;

  // Update internal state when selectedImage prop changes
  useEffect(() => {
    if (api && selectedImage !== current) {
      api.scrollTo(selectedImage);
    }
  }, [selectedImage, api]);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const currentSlide = api.selectedScrollSnap();
      setCurrent(currentSlide);
      if (setSelectedImage) {
        setSelectedImage(currentSlide);
      }
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, setSelectedImage]);

  // Handle direct navigation to specific slides
  const goToSlide = (index) => {
    api?.scrollTo(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="py-5 px-2">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{title}</h2>
      
      {/* Main Carousel */}
      <UICarousel
        setApi={setApi}
        className="w-full max-w-4xl mx-auto"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((imageUrl, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 basis-full  ">
              <div className="p-1">
                <div className="overflow-hidden">
                  <div className="relative aspect-square w-full h-[50vh] group">
                    <Image
                      src={imageUrl}
                      alt={`${altPrefix} ${index + 1}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      objectFit="contain"
                      className={`
                        p-2
                        transition-transform duration-700 ease-in-out
                        ${current === index ? 'scale-125' : 'scale-95'}
                      `}
                      style={{
                        transformOrigin: 'center',
                      }}
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </UICarousel>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}