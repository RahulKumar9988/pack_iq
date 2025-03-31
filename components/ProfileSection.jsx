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
  FiLock
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
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector(state => state.auth.isAuthenticated);
  const userDetails = getUserDetails();
  const [order_len, setOrder_len] = useState(0);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
 // Then fetch orders once we have the user details
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

          setOrder_len(orderData.length); // Store only the length
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

  

  const handleLogout = useCallback( async () => {
    const result = await Logout();
    if(result.success){
      dispatch(logout());
      router.push('/');
    }else{
      // console.log(result.error);  
    }
  }, [dispatch, router]);

  // Mock data 

  const NavButton = ({ tab, icon, label }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center p-3 space-x-3 rounded-xl transition-colors ${
        activeTab === tab 
          ? "bg-indigo-100 text-indigo-600"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
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
              className="w-full bg-white border border-indigo-600 text-indigo-600 py-3 px-6 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              <FiArrowRight className="w-5 h-5" />
              <span>Create Account</span>
            </motion.button>
          </Link>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          By signing in, you'll unlock all features and benefits of your account.
        </p>
      </motion.div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full mx-auto py-2 ">
        {!auth ? (
          <NotLoggedInView />
        ) : (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Sidebar */} 
            <div className="lg:col-span-3 space-y-6">
              <div className="md:h-[100vh] h-a bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={userDetails.user.user_image_url} 
                    className="w-12 h-12 rounded-full border-2 border-indigo-500"
                    alt="Avatar"
                  />
                  <div>
                    <h3 className="font-bold dark:text-white">{userDetails.user.user_name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{userDetails.user.user_email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <NavButton 
                    tab="overview" 
                    icon={<FiUser className="w-5 h-5" />} 
                    label="Overview" 
                  />
                  <NavButton 
                    tab="orders" 
                    icon={<FiShoppingBag className="w-5 h-5" />} 
                    label="Orders" 
                  />
                  
                  <NavButton 
                    tab="addresses" 
                    icon={<FiMapPin className="w-5 h-5" />} 
                    label="Addresses" 
                  />

                  
                  <button 
                    className="w-full flex items-center p-3 space-x-3 rounded-xl text-red-600 hover:bg-red-50 transition"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {activeTab === "overview" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-6">
                  <h2 className="text-xl font-bold dark:text-white mb-4">Profile Overview</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                      <div className="flex items-center space-x-4 mb-2">
                        <FiUser className="w-6 h-6 text-indigo-600" />
                        <h3 className="font-semibold dark:text-white">Personal Information</h3>
                      </div>
                      <div className="space-y-2 text-gray-700 dark:text-gray-300">
                        <p><span className="font-medium">Name:</span> {userDetails.user.user_name}</p>
                        <p><span className="font-medium">Email:</span> {userDetails.user.user_email}</p>
                        <p><span className="font-medium">Phone:</span> {userDetails.user.user_phone_number}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                      <div className="flex items-center space-x-4 mb-2">
                        <FiMapPin className="w-6 h-6 text-indigo-600" />
                        <h3 className="font-semibold dark:text-white">Contact Address</h3>
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        <p>{userDetails.user.user_address || 'No address on file'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                    <div className="flex items-center space-x-4 mb-2">
                      <FiShoppingBag className="w-6 h-6 text-indigo-600" />
                      <h3 className="font-semibold dark:text-white">Total order</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                      <p><span className="font-medium">{order_len}</span></p>
                      <p><span className="font-medium">Account Created:</span> {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold dark:text-white">My Addresses</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <p>{userDetails.user.user_address || 'No address on file'}</p>
                  </div>
                </div>
              )}

              {/* Previous Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm py-4 w-full">
                  <div className="flex flex-col items-start justify-between mb-6">
                    <div className="flex justify-end w-full px-10">
                      <Link href='/orders-history' className="font-semibold underline hover:text-blue-950"> View all Orders</Link>
                    </div>
                    <OrderHistory limitOrders={true} maxOrders={2} />
                  </div>
                
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;