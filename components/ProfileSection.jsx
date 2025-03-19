"use client";
import React, { useState } from "react";
import { 
  FiUser, 
  FiLock, 
  FiShoppingBag, 
  FiHeart, 
  FiMapPin, 
  FiCreditCard, 
  FiLogOut,
  FiEye,
  FiEyeOff,
  FiEdit,
  FiArrowRight,
  FiPackage,
  FiCalendar,
  FiDollarSign,
  FiCheckCircle
} from "react-icons/fi";
import { motion } from "framer-motion";

const ProfileSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [activeTab, setActiveTab] = useState("overview");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const userData = {
    name: "Michael Anderson",
    email: "michael.anderson@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 15, 2023",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  };

  const orderHistory = [/*...*/];

  // Modern tab navigation with animations
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
      <div className="max-w-7xl mx-auto p-6 lg:p-8">

        {!isLoggedIn ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Auth Tabs */}
            <div className="p-8 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
              <div className="max-w-sm mx-auto space-y-8">
                <h2 className="text-3xl font-bold">Welcome Back</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FiCheckCircle className="w-5 h-5 text-green-300" />
                    <span>Order tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiCheckCircle className="w-5 h-5 text-green-300" />
                    <span>Personalized recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiCheckCircle className="w-5 h-5 text-green-300" />
                    <span>Exclusive member deals</span>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-6">
                  <button className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition">
                    <span>Create Account</span>
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="p-8 dark:bg-gray-800">
              <div className="max-w-sm mx-auto space-y-6">
                <h2 className="text-2xl font-bold dark:text-white">Sign In</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition">
                    Sign In
                  </button>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 py-2.5 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <img src="/google.svg" className="w-5 h-5" alt="Google" />
                    <span>Google</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-2.5 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <img src="/apple.svg" className="w-5 h-5" alt="Apple" />
                    <span>Apple</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={userData.avatar} 
                    className="w-12 h-12 rounded-full border-2 border-indigo-500"
                    alt="Avatar"
                  />
                  <div>
                    <h3 className="font-bold dark:text-white">{userData.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</p>
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
                    tab="wishlist" 
                    icon={<FiHeart className="w-5 h-5" />} 
                    label="Wishlist" 
                  />
                  <NavButton 
                    tab="addresses" 
                    icon={<FiMapPin className="w-5 h-5" />} 
                    label="Addresses" 
                  />
                  <NavButton 
                    tab="payment" 
                    icon={<FiCreditCard className="w-5 h-5" />} 
                    label="Payment" 
                  />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                          <FiPackage className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Orders</p>
                          <p className="text-2xl font-bold dark:text-white">12</p>
                        </div>
                      </div>
                    </div>
                    {/* Add similar cards for other stats */}
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4 dark:text-white">Recent Activity</h3>
                    <div className="space-y-4">
                      {orderHistory.slice(0, 3).map(order => (
                        <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                              <FiCalendar className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                              <p className="font-medium dark:text-white">{order.id}</p>
                              <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              order.status === "Delivered" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            }`}>
                              {order.status}
                            </span>
                            <FiArrowRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold dark:text-white">Order History</h2>
                    <div className="flex items-center space-x-4">
                      <select className="bg-gray-50 dark:bg-gray-700 border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500">
                        <option>All Orders</option>
                        <option>Last 30 Days</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {orderHistory.map(order => (
                      <div key={order.id} className="p-4 border dark:border-gray-700 rounded-xl hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium dark:text-white">{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium dark:text-white">{order.total}</p>
                            <span className={`text-sm ${
                              order.status === "Delivered" 
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FiPackage className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{order.items} items</span>
                          </div>
                          <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center space-x-2">
                            <span>View Details</span>
                            <FiArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Tabs... */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;