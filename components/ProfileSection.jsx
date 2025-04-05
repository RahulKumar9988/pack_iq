"use client";
import React, { useCallback, useEffect, useState } from "react";
import { 
  FiUser, 
  FiShoppingBag, 
  FiHeart, 
  FiMapPin, 
  FiArrowRight,
  FiPackage,
  FiLogOut,
  FiLock,
  FiCalendar,
  FiMail,
  FiPhone,
  FiHome
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getorder, getOrderLength, getUserDetails } from "@/app/action/getUserDetails";
import { logout } from "@/redux/auth/authSlice.js";
import {logout as Logout} from '@/app/action/loginAction.js';
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import OrderHistory from "./wind/Order/Order_history";

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector(state => state.auth.isAuthenticated);
  const [userDetails, setUserDetails] = useState(null);
  const [order_len, setOrder_len] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  // Fetch user details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const details = await getUserDetails();
        setUserDetails(details);
      } catch (err) {
        console.error('Error fetching user details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (auth) {
      fetchUserData();
    }
  }, [auth]);
  
  // Fetch orders count
  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!userDetails?.user?.user_id) return;

      const userId = userDetails.user.user_id;
      try {
        const response = await axios.get(`${baseUrl}/api/v1/order/my-order/${userId}`);

        if (response.data?.data) {
          const orderData = Array.isArray(response.data.data) 
            ? response.data.data 
            : [response.data.data];

          setOrder_len(orderData.length);
          console.log("Orders loaded:", orderData.length);
        } else {
          setOrder_len(0);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (userDetails) {
      fetchOrderHistory();
    }
  }, [userDetails, baseUrl]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleLogout = useCallback(async () => {
    const result = await Logout();
    if(result.success){
      dispatch(logout());
      router.push('/');
    }else{
      // console.log(result.error);  
    }
  }, [dispatch, router]);

  const NavButton = ({ tab, icon, label, count }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
        activeTab === tab 
          ? "bg-indigo-100 text-indigo-600 shadow-sm"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {count !== undefined && (
        <span className={`text-xs px-2 py-1 rounded-full ${
          activeTab === tab 
            ? "bg-indigo-200 text-indigo-700" 
            : "bg-gray-200 text-gray-700"
        }`}>
          {count}
        </span>
      )}
    </motion.button>
  );

  // Loading state
  const LoadingView = () => (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading your profile...</p>
      </div>
    </div>
  );

  // Not logged in component
  const NotLoggedInView = () => (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
            <FiLock className="w-10 h-10 text-indigo-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Access Your Profile</h2>
        <p className="text-gray-600 mb-8">
          Please sign in to view your profile, track your orders, and manage your shipping addresses.
        </p>
        
        <div className="flex flex-col gap-5">
          <Link href="/auth/signin">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              <FiUser className="w-5 h-5" />
              <span>Sign In</span>
            </motion.button>
          </Link>
          
          <Link href="/auth/signup">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border border-indigo-600 text-indigo-600 py-3 px-6 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              <FiArrowRight className="w-5 h-5" />
              <span>Create Account</span>
            </motion.button>
          </Link>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          By signing in you all unlock all features and benefits of your account.
        </p>
      </motion.div>
    </div>
  );

  if (!auth) {
    return <NotLoggedInView />;
  }

  if (isLoading || !userDetails) {
    return <LoadingView />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-2 px-4">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */} 
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* User profile header */}
              <div className="relative">
                <div className="h-24 bg-gradient-to-r from-indigo-600 to-indigo-400"></div>
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden">
                    {userDetails.user.user_image_url ? (
                      <img 
                        src={userDetails.user.user_image_url} 
                        className="w-full h-full object-cover"
                        alt="Profile"
                      />
                    ) : (
                      <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                        <FiUser className="w-8 h-8 text-indigo-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-12 px-6 pb-6">
                <h3 className="font-bold text-lg">{userDetails.user.user_name}</h3>
                <p className="text-sm text-gray-500 truncate">{userDetails.user.user_email}</p>
              </div>
              
              <div className="px-4 pb-6">
                <div className="space-y-1">
                  <NavButton 
                    tab="overview" 
                    icon={<FiUser className="w-5 h-5" />} 
                    label="Overview" 
                  />
                  <NavButton 
                    tab="orders" 
                    icon={<FiShoppingBag className="w-5 h-5" />} 
                    label="Orders" 
                    count={order_len}
                  />
                  {/* <NavButton 
                    tab="addresses" 
                    icon={<FiMapPin className="w-5 h-5" />} 
                    label="Addresses" 
                  /> */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center p-3 space-x-3 rounded-xl text-red-600 hover:bg-red-50 transition mt-4"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {activeTab === "overview" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Profile Overview</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* User stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FiShoppingBag className="w-5 h-5 text-indigo-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-indigo-600">{order_len}</p>
                      <p className="text-xs text-gray-500 mt-1">Total Orders</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <FiCalendar className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{formatDate(userDetails.user.createdAt || new Date())}</p>
                      <p className="text-xs text-gray-500 mt-1">Member Since</p>
                    </div>
                  </div>
                  
                  {/* Personal Information */}
                  <div className="bg-white border border-gray-100 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-lg">Personal Information</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Full Name</p>
                          <div className="flex items-center">
                            <FiUser className="w-4 h-4 text-gray-400 mr-2" />
                            <p className="font-medium">{userDetails.user.user_name || 'Not provided'}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Email Address</p>
                          <div className="flex items-center">
                            <FiMail className="w-4 h-4 text-gray-400 mr-2" />
                            <p className="font-medium">{userDetails.user.user_email || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                          <div className="flex items-center">
                            <FiPhone className="w-4 h-4 text-gray-400 mr-2" />
                            <p className="font-medium">{userDetails.user.user_phone_number || 'Not provided'}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Address</p>
                          <div className="flex items-start">
                            <FiHome className="w-4 h-4 text-gray-400 mr-2 mt-1" />
                            <p className="font-medium">{userDetails.user.user_address || 'No address on file'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent Orders Preview */}
                  <div className="bg-white border border-gray-100 rounded-xl">
                    <div className="flex items-center justify-between p-6 border-b">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FiShoppingBag className="w-4 h-4 text-indigo-600" />
                        </div>
                        <h3 className="font-semibold text-lg">Recent Orders</h3>
                      </div>
                      <Link href="/orders-history" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        View All
                      </Link>
                    </div>
                    
                    <OrderHistory limitOrders={true} maxOrders={1} />
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab
            {activeTab === "addresses" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">My Addresses</h2>
                </div>
                
                <div className="p-6">
                  {userDetails.user.user_address ? (
                    <div className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">Default Address</h3>
                        <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full">Default</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                        <FiMapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                        <div>
                          <p className="font-medium mb-1">{userDetails.user.user_name}</p>
                          <p className="text-gray-600">{userDetails.user.user_address}</p>
                          {userDetails.user.user_phone_number && (
                            <p className="text-gray-600 mt-1">Phone: {userDetails.user.user_phone_number}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiMapPin className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="font-medium text-lg text-gray-700 mb-2">No Address Found</h3>
                      <p className="text-gray-500 text-center mb-6">You haven't added any address to your profile yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )} */}

            {/* Previous Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold">Order History</h2>
                  <Link href="/orders-history" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View All Orders
                  </Link>
                </div>
                
                <OrderHistory limitOrders={true} maxOrders={5} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;