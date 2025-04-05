"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { getUserDetails } from '@/app/action/getUserDetails';
import { useAppSelector } from '@/redux/hooks';

const OrderHistory = ({ limitOrders = false, maxOrders = 2 }) => {
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
          
          // Sort orders by date (newest first) before limiting
          const sortedOrders = [...orderData].sort((a, b) => {
            const dateA = new Date(a.order_date || 0);
            const dateB = new Date(b.order_date || 0);
            return dateB - dateA; // Newest first
          });
          
          // Then limit to maxOrders if needed
          setOrders(sortedOrders.slice(0, maxOrders));
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
  }, [userDetails, baseUrl, maxOrders]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900">Order History</h2>
          {[1, 2].map((item) => (
            <div key={`loading-skeleton-${item}`} className="mb-6">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mb-3"></div>
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-2/5 mb-2"></div>
                </div>
                <div className="w-24">
                  <div className="h-6 bg-gray-200 animate-pulse rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                </div>
              </div>
              <div className="border-b border-gray-200 mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">Order History</h2>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  // No orders state
  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-950">Order History</h2>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <p className="text-lg text-gray-600">No orders found.</p>
            <p className="text-sm text-gray-500 mt-1">Your order history will appear here once you make a purchase.</p>
          </div>
        </div>
      </div>
    );
  }

  // Render orders
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-900">Order History</h2>
        </div>
        <div className="divide-y-large divide-gray-200">
          {orders.map((order) => (
            <div 
              key={order.order_id || `order-${Math.random()}`} 
              className="p-6 transition-colors duration-200 hover:bg-[#fdfeff]"
            >
              {/* Order Header with Date and Status */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order placed on <span className="font-medium">{formatDate(order.order_date)}</span>
                  </p>
                  <p className="text-xs text-gray-400">Order #{order.order_id || 'Unknown'}</p>
                </div>
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    order.paymentStatusId?.payment_status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {order.paymentStatusId?.payment_status || 'Unknown'}
                  </span>
                </div>
              </div>

              {/* Order Content */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Packaging Image */}
                <div className="flex justify-center md:justify-start">
                  {order.packagingId?.packaging_image_url ? (
                    <div className="w-28 h-28 relative rounded-lg border border-gray-200 overflow-hidden bg-white p-2">
                      <Image
                        src={order.packagingId.packaging_image_url}
                        alt="Packaging Image"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 112px, 112px"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Order Details */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div className="col-span-2 md:col-span-1">
                    <h3 className="font-medium text-lg text-indigo-800 mb-1">
                      {order.packagingId?.name || 'Custom Packaging'}
                    </h3>
                  </div>
                  
                  <div className="md:text-right md:col-span-1">
                    <p className="font-semibold text-lg text-indigo-800">
                      ₹{order.price?.toFixed(2) || 'N/A'}
                    </p>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mt-2 text-sm">
                      <div>
                        <span className="text-gray-500">Material:</span> 
                        <span className="font-medium ml-1 text-gray-700">{order.materialId?.name || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Size:</span> 
                        <span className="font-medium ml-1 text-gray-700">{order.sizeId?.name || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Quantity:</span> 
                        <span className="font-medium ml-1 text-gray-700">{order.quantityId?.quantity || 'N/A'} units</span>
                      </div>
                      <div className="col-span-2 md:col-span-3">
                        <span className="text-gray-500">Additions:</span> 
                        <span className="font-medium ml-1 text-gray-700">
                          {order.order_additions?.length > 0
                            ? order.order_additions.map(addition => addition.additionsId.additions_title).join(", ")
                            : "None"}
                        </span>
                      </div>
                    </div>
                  </div>
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