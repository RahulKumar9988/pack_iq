"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { getUserDetails } from '@/app/action/getUserDetails';
import { useAppSelector } from '@/redux/hooks';

const OrderHistory = ({ limitOrders = false, maxOrders = 2 }) => {  // Changed default from 3 to 2
  // State to manage orders, loading, and error
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const cartItem = useAppSelector((state) => state?.cart?.item) || {};
  
  // First, get user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await getUserDetails();
        setUserDetails(details);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to fetch user details');
        setIsLoading(false);
      }
    };
    
    fetchUserDetails();
  }, []);
  
  // Then fetch orders once we have the user details
  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!userDetails || !userDetails.user || !userDetails.user.user_id) {
        return; // Don't proceed if we don't have user ID
      }
      
      const userId = userDetails.user.user_id;
      console.log('Fetching orders for user ID:', userId);

      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}/api/v1/order/my-order/${userId}`);
        console.log(response);
        
        
        // Check if the response has data and process accordingly
        if (response.data && response.data.data) {
          // Check if data is an array or a single object
           const orderData = Array.isArray(response.data.data) 
            ? response.data.data 
            : [response.data.data];
            
          console.log('Orders loaded:', orderData.length);
          // Only take the first maxOrders (2) orders
          setOrders(orderData.slice(0, maxOrders));
        } else {
          console.log('No orders found in response');
          setOrders([]);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.response?.data?.message || 'Failed to fetch order history');
        setIsLoading(false);
      }
    };

    if (userDetails) {
      fetchOrderHistory();
    }
  }, [userDetails, baseUrl, maxOrders]); // Added maxOrders as a dependency

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className=" shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Order History</h2>
          {/* Only show 2 loading skeletons instead of 3 */}
          {[1, 2].map((item) => (
            <div 
              key={`loading-skeleton-${item}`} 
              className="h-20 bg-gray-200 animate-pulse mb-4 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  // No orders state
  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto">
        <div className=" shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Order History</h2>
          <p className="text-gray-500">No orders found.</p>
        </div>
      </div>
    );
  }

  // Render orders
  return (
    <div className="container mx-auto">
      <div className="shadow-md rounded-lg overflow-hidden">
        <div className="py-4 border-b">
          <h2 className="text-2xl font-bold">Order History</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div 
              key={order.order_id || `order-${Math.random()}`} 
              className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 items-center"
            >
              {/* Packaging Image - Responsive Placement */}
              <div className="flex justify-center md:justify-start">
                {order.packagingId?.packaging_image_url && (
                  <div className="w-24 h-24 relative">
                    <Image
                      src={order.packagingId.packaging_image_url}
                      alt="Packaging Image"
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100px, 96px"
                    />
                  </div>
                )}
              </div>

              {/* Order Details - Responsive Layout */}
              <div className="flex justify-around md:items-center items-end gap-4">
                {/* Additional Order Details - Responsive Grid */}
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  {/* Order Identification and Date */}
                  <div>
                    <p className="text-sm text-gray-500 mb-2">
                      Placed on {order.order_date || 'Unknown Date'}
                    </p>
                  </div>
                  <p className="truncate">
                    <span className="font-medium block sm:inline">Packaging:</span> 
                    {order.packagingId?.name || 'N/A'}
                  </p>
                  <p className="truncate">
                    <span className="font-medium block sm:inline">Material:</span> 
                    {order.materialId?.name || 'N/A'}
                  </p>
                  <p className="truncate">
                    <span className="font-medium block sm:inline">Size:</span> 
                    {order.sizeId?.name || 'N/A'}
                  </p>
                  <p className="truncate">
                    <span className="font-medium block sm:inline">Quantity:</span> 
                    {order.quantityId?.quantity || 'N/A'}
                  </p>
                  <p className="truncate">
                    <span className="font-medium block sm:inline">Additions:</span> 
                    {order.order_additions?.length > 0
                    ? order.order_additions.map(addition => addition.additionsId.additions_title).join(", ")
                    : "N/A"}

                  </p>
                </div>
                {/* Price and Payment Status */}
                <div className="text-right sm:text-left">
                  <p className="font-semibold text-green-600 text-lg">
                    ₹{order.price?.toFixed(2) || 'N/A'}
                  </p>
                  <p className={`text-sm font-medium ${
                    order.paymentStatusId?.payment_status === 'pending' 
                      ? 'text-yellow-600' 
                      : 'text-green-600'
                  }`}>
                    {order.paymentStatusId?.payment_status || 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;