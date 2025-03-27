import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { getUserDetails } from '@/app/action/getUserDetails';

const OrderHistory = () => {
  // State to manage orders, loading, and error
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  const user_details = getUserDetails();
  
  useEffect(() => {
    const fetchOrderHistory = async () => {
      const get_id = user_details.user.user_id;
      // console.log(user_details.user.user_address)
      const userId = get_id;

      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}/api/v1/order/my-order/${userId}`);
        // Check if the response has data and process accordingly
        const orderData = response.data.data ? [response.data.data] : [];
        console.log(orderData.length);
        setOrders(orderData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.response?.data?.message || 'Failed to fetch order history');
        setIsLoading(false);
      }
    };

    fetchOrderHistory();
  }, []); // Empty dependency array means this runs once on component mount

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Order History</h2>
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
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
      <div className="container mx-auto px-4 py-6">
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
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Order History</h2>
          <p className="text-gray-500">No orders found.</p>
        </div>
      </div>
    );
  }

  // Render orders
  return (
    <div className="container mx-auto px-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-2xl font-bold">Order History</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div 
              key={order.order_id} 
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
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100px, 96px"
                    />
                  </div>
                )}
              </div>

              {/* Order Details - Responsive Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>
                {/* Price and Payment Status */}
                <div className="text-right sm:text-left">
                  <p className="font-semibold text-green-600 text-lg">
                    ${order.price?.toFixed(2) || 'N/A'}
                  </p>
                  <p className={`text-sm font-medium ${
                    order.paymentStatusId?.payment_status === 'pedding' 
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