"use client";
import React, { useEffect, useState } from "react";
import {
  Link,
  Button,
} from "@nextui-org/react";
import { LuArrowLeft } from "react-icons/lu";
import { LuCheck, LuInfo } from "react-icons/lu";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const ITEMS_PER_PAGE = 8;

export default function Quantity() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantities, setQuantities] = useState([]);
  const [displayedQuantities, setDisplayedQuantities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [firstItemPrice, setFirstItemPrice] = useState(0);
  
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state?.cart?.item);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!cartItem.size_id) {
      router.back();
    }
    getSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update displayed quantities when quantities change
    loadMoreQuantities();
  }, [quantities, currentPage]);

  const getAddonRouteUrl = () => {
    if (!cartItem.name) return '/additions'; // Changed from '/addon'
    
    // Format the package name for URL: lowercase, replace spaces with hyphens
    const formattedName = cartItem.name.toLowerCase().replace(/\s+/g, '-');
    return `/${formattedName}/additions`; // Changed from '/${formattedName}/addon'
  };
  
  async function getSizes() {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/list-packaging-type-size-quantity/${cartItem.packaging_type_size_id}`
      );
      if (response.data.status === 200) {
        // Store the first item's price to calculate discounts
        let firstPrice = 0;
        if (response.data.data.length > 0) {
          firstPrice = response.data.data[0].quantityId.price;
          setFirstItemPrice(firstPrice);
        }
        
        const responseData = response.data.data.map((ele, index) => {
          // Calculate discount percentage based on first item price
          let discountPercentage = 0;
          if (index > 0 && firstPrice > 0) {
            discountPercentage = ((firstPrice - ele.quantityId.price) / firstPrice) * 100;
            // Handle negative discounts (price increases)
            if (discountPercentage < 0) discountPercentage = 0;
          }
          
          return {
            size: ele.quantityId.quantity,
            price: ele.quantityId.price,
            originalPrice: index === 0 ? ele.quantityId.price : firstPrice,
            number: ele.quantityId.design_number,
            packaging_type_size_quantity_id: ele.packaging_type_size_quantity_id,
            quantity_id: ele.quantityId.quantity_id,
            discount: index === 0 ? 0 : discountPercentage.toFixed(0),
          };
        });
        
        // Sort quantities in ascending order by quantity value
        const sortedData = responseData.sort((a, b) => parseInt(a.size) - parseInt(b.size));
        setQuantities(sortedData);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }

  const loadMoreQuantities = () => {
    const startIndex = 0;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const newDisplayedQuantities = quantities.slice(startIndex, endIndex);
    setDisplayedQuantities(newDisplayedQuantities);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleQuantitySelection = (item) => {
    setSelectedItem(item);
    dispatch(
      addToCart({
        ...cartItem,
        quantity_id: item?.quantity_id || "",
        packaging_type_size_quantity_id: item?.packaging_type_size_quantity_id || "",
        quantity: item?.size || "",
        design_number: item?.number || "",
        price: item?.price || "",
        discount: item?.discount || "",
      })
    );
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
    setIsImageHovered(true);

    setTimeout(() => {
      setIsImageHovered(false);
    }, 500);
  };

  // Get the image to display
  const getDisplayImage = () => {
    return cartItem.image || "/size.png";
  };

  const hasMoreItems = currentPage * ITEMS_PER_PAGE < quantities.length;

  // Generate discount tiers based on actual data
  const generateDiscountTiersTable = () => {
    if (quantities.length <= 1) return null;
    
    // Group quantities by discount to create tiers
    const discountGroups = {};
    quantities.forEach(item => {
      if (!discountGroups[item.discount]) {
        discountGroups[item.discount] = [];
      }
      discountGroups[item.discount].push(parseInt(item.size));
    });
    
    // Create tiers based on unique discounts
    const tiers = Object.keys(discountGroups)
      .map(discount => parseInt(discount))
      .filter(discount => discount > 0)
      .sort((a, b) => a - b)
      .map(discount => {
        const minQuantity = Math.min(...discountGroups[discount]);
        return { minQuantity, discount: `${discount}%` };
      });
    
    return tiers;
  };
  
  const discountTiers = generateDiscountTiersTable();

  return (
    <div className="flex flex-col lg:flex-row w-full mb-[100px] lg:mb-[72px] gap-4 max-w-[1200px] mx-auto">
      <div className="w-full lg:w-3/4 h-fit">        
        <div className="border-1 h-fit rounded-xl overflow-hidden">
          <div className="flex flex-col w-full h-fit">
            {/* Header Row */}
            <div className="group bg-blue-50 relative tap-highlight-transparent inline-flex h-[50px] w-full rounded-t-xl items-center justify-between px-4 sm:px-8 border-b-1">
              <div className="grid grid-cols-5 w-full text-[#808b98]">
                <div className="flex justify-center items-center text-xs sm:text-sm font-normal">
                  Quantity
                </div>
                <div className="flex justify-center items-center text-xs sm:text-sm font-normal">
                  Discount
                </div>
                <div className="flex justify-center items-center text-xs sm:text-sm font-normal">
                  Price/unit
                </div>
                <div className="flex justify-center items-center text-xs sm:text-sm font-normal">
                  Total Price
                </div>
                <div className="flex justify-center items-center text-xs sm:text-sm font-normal">
                  No of Design
                </div>
              </div>
            </div>
              
            {/* Quantity Items */}
            {displayedQuantities.length ? (
              displayedQuantities.map((ele, i) => (
                <div
                  key={i}
                  className={`inline-flex h-auto min-h-16 w-full m-0 cursor-pointer border-b last:border-b-0 px-4 sm:px-6 py-2 ${selectedItem?.size === ele.size ? 'bg-blue-0' : 'hover:bg-blue-50'}`}
                  onClick={() => handleQuantitySelection(ele)}
                  onMouseEnter={() => handleMouseEnter(ele)}
                >
                  <div className="grid grid-cols-5 w-full gap-2">
                    {/* Size Column with Checkbox */}
                    <div className="flex flex-col justify-center">
                      <div className="flex justify-center flex-wrap items-center gap-2">
                        <div className="w-5 h-5 border rounded-full flex items-center justify-center">
                          {selectedItem?.size === ele.size && (
                            <div className="w-3 h-3 bg-[#253670] rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm sm:text-base font-medium">
                          {ele.size}
                        </span>
                      </div>
                    </div>
                    
                    {/* Discount Column */}
                    <div className="flex justify-center items-center">
                      {parseInt(ele.discount) > 0 ? (
                        <span className="px-2 py-0.5 bg-[#1CC6181A] text-xs text-[#1CC618] rounded-full whitespace-nowrap">
                          {ele.discount}% off
                        </span>
                      ) : (
                        <span className="text-xs text-[#03172B80]">-</span>
                      )}
                    </div>

                    {/* Price/unit Column */}
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-base font-medium">
                          ₹{parseFloat(ele.price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Total Price Column */}
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm sm:text-base font-medium">
                          ₹{(parseFloat(ele.price) * ele.size).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    {/* No of Design Column */}
                    <div className="flex justify-center items-center">
                      <span className="text-sm sm:text-base">{ele.number}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center p-6 text-[#03172B] border-b">
                No Quantity Found
              </div>
            )}
            
            {/* Load More Button */}
            {hasMoreItems && (
              <div className="w-full flex justify-center p-4">
                <Button 
                  onClick={handleLoadMore}
                  className="bg-[#253670] text-white text-sm px-4 py-2"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Right Sidebar - Desktop */}
      <div className="hidden lg:flex w-1/4 flex-col gap-5">
      <div className="flex justify-around">
          <div className="mb-4">
            <Button 
              onClick={handleBack}
              className="bg-transparent hover:bg-gray-100 text-[#253670] px-2"
              startContent={<LuArrowLeft size={20} />}
            >
              Back
            </Button>
          </div>

          <Link isDisabled={!selectedItem} href={getAddonRouteUrl()}>
            <Button className='px-3 py-2 mb-4 rounded-lg font-medium text-white transition-all bg-[#143761] hover:bg-[#0f2a4d] cursor-pointer'>
              Confirm
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-3 p-4 text-sm border-1 rounded-xl min-w-[250px]">          
          <div className="text-sm sm:text-base">Your packaging</div>
          <div className="flex flex-wrap min-w-fit items-center gap-2 text-xs sm:text-sm">
            <LuCheck className="text-sm" />
            <span>Type :</span>
            <span className="font-semibold">{cartItem.name}</span>
          </div>
          <div className="flex flex-wrap min-w-fit items-center gap-2 text-xs sm:text-sm">
            <LuCheck className="text-sm" />
            <span>Material :</span>
            <span className="font-semibold">{cartItem.material}</span>
          </div>
          <div className="flex flex-wrap min-w-fit items-center gap-2 text-xs sm:text-sm">
            <LuCheck className="text-sm" />
            <span>Size :</span>
            <span className="font-semibold">{cartItem.size}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 p-4 bg-[#FDD40A1A] min-w-[250px] text-sm border-1 rounded-xl">
          <span className="font-medium">Note</span>
          <ul className="list-disc list-inside text-xs text-gray-700">
            <li>All Prices Attract 18% GST.</li>
            <li>Possible Designs indicate how many designs is possible in the selected quantity.</li>
          </ul>
        </div>
      </div>
      
      {/* Mobile Information Card */}
      <div className="lg:hidden w-full flex flex-col gap-4 mt-2 mb-20">
        {selectedItem && (
          <div className="border-1 rounded-xl p-4">
            <div className="font-medium mb-2">Selected Package</div>
            <div className="grid grid-cols-2 gap-y-2">
              <div className="flex items-center gap-1">
                <LuCheck className="text-sm text-[#253670]" />
                <span className="text-sm">Type:</span>
              </div>
              <span className="text-sm">{cartItem.name}</span>
              
              <div className="flex items-center gap-1">
                <LuCheck className="text-sm text-[#253670]" />
                <span className="text-sm">Size:</span>
              </div>
              <span className="text-sm">{cartItem.size}</span>
              
              <div className="flex items-center gap-1">
                <LuCheck className="text-sm text-[#253670]" />
                <span className="text-sm">Quantity:</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">{selectedItem?.size || ""}</span>
                {parseInt(selectedItem.discount) > 0 && (
                  <span className="px-2 py-0.5 bg-[#1CC6181A] text-xs text-[#1CC618] rounded-full">
                    {selectedItem.discount}% off
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Sticky Bar - Mobile & Tablet */}
      <div className="lg:hidden z-50 fixed bg-white left-0 bottom-0 border-t shadow-md flex items-center justify-between w-full px-4 sm:px-6 py-3">
        <div className="flex flex-col text-xs items-start">
          <div className="text-[#03172B80]">Price</div>
          <div className="flex items-center gap-2">
            <div className="font-medium">₹{selectedItem?.price || "0"}</div>
            {selectedItem && parseInt(selectedItem.discount) > 0 && (
              <>
                <span className="text-xs text-[#03172B80] line-through">
                  ₹{parseFloat(selectedItem?.originalPrice || 0).toFixed(2)}
                </span>
                <span className="px-2 py-0.5 bg-[#1CC6181A] text-xs text-[#1CC618] rounded-full">
                  {selectedItem.discount}% off
                </span>
              </>
            )}
          </div>
        </div>
        <Link isDisabled={!selectedItem} href={getAddonRouteUrl()}>
          <Button className="text-sm font-medium bg-[#143761] rounded-md text-white h-10 px-4">
            Confirm
          </Button>
        </Link>
      </div>
    </div>
  );
}