"use client";
import React, { useCallback, useEffect, useState } from "react";
import { 
  FiUser, 
  FiShoppingBag, 
  FiHeart, 
  FiMapPin, 
  FiArrowRight,
  FiPackage,
  FiLogOut
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getorder, getOrderLength, getUserDetails } from "@/app/action/getUserDetails";
import { logout } from "@/redux/auth/authSlice.js";
import {logout as Logout} from '@/app/action/loginAction.js';
import { useRouter } from "next/navigation";
import Order_history from "./wind/Order/Order_history";

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector(state => state.auth.isAuthenticated);
  const userDetails = getUserDetails();
  const [len,setLen] = useState(0);
  const fetchOrderLength = async () => {
    const order_len = await getOrderLength();
    // console.log("Order Length:", order_len);
    setLen(order_len);
  };
  fetchOrderLength();
  
  const address = userDetails.user.user_address;

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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full mx-auto py-2 ">
        {!auth ? (
          <>
            {router.push('/')}
          </>
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
                      <h3 className="font-semibold dark:text-white">Account Summary</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                      <p><span className="font-medium">{len}</span></p>
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
                    <button className="text-indigo-600 hover:text-indigo-700 flex items-center space-x-2">
                      <span>Add New Address</span>
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {address}
                  </div>
                </div>
              )}

              {/* Previous Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                  <div className="flex flex-col items-start justify-between mb-6">
                    <h2 className="text-xl font-bold dark:text-white">Order History</h2>
                    <Order_history/>
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