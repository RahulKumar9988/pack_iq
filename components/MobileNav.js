"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
} from "@nextui-org/react";
import BagLogo from "@/public/BagLogo.jsx";
import { IoMdClose } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation.js";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserDetails } from "@/app/action/getUserDetails";

export default function MobileNav() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useAppSelector(state => state.auth.isAuthenticated, (a, b) => a === b);
  const userDetails = getUserDetails();
  

  const [expandedItems, setExpandedItems] = useState({
    products: false,
    shopBy: false
  });
  const pathname = usePathname();
  const router = useRouter();

  // Check if user is logged in when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      // In a real app, you might want to decode the token or fetch user info from API
    }
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleExpand = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleLoginClick = useCallback(() => {
    setIsOpen(false); // Close the menu
    router.push('/auth/signin');
  }, [router]);

  const handleProfileClick = () => {
    setIsOpen(false); // Close the menu
    router.push('/profile');
  };

  const handleLogout = useCallback(() => {
    setIsOpen(false); // Close the menu
    dispatch(logout());
    router.push('/');
  }, [dispatch, router]);

  // New function to handle navigation and close menu
  const handleNavigation = (path) => {
    setIsOpen(false); // Close the menu
    router.push(path);
  };

  return (
    <div className="relative">
      <Navbar
        classNames={{
          wrapper: "max-w-full px-[30px] py-[10px] h-[60px]",
        }}
      >
        {/* Center Logo */}
        <NavbarContent justify="center">
          <NavbarItem>
            <Link href="/">
              <Image
                src="/productNavLogo.png"
                alt="Logo"
                height={32}
                width={53.87}
              />
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Right Side */}
        <NavbarContent justify="end" className="gap-4">
          {/* Bag Icon */}
          <NavbarItem>
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              <BagLogo size={20} fontWeight={0.7} color="black" />
            </Link>
          </NavbarItem>

          {/* Menu Icon */}
          <NavbarItem>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              <FiMenu size={24} color="black" />
            </button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b">
                {auth ? (
                  // Show user info if logged in
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-lg font-bold">
                      {userDetails.user.user_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-sm">{userDetails.user.user_name}</p>
                      <p className="text-xs text-gray-500">{userDetails.user.user_email}</p>
                    </div>
                  </div>
                ) : (
                  // Show login button if not logged in
                  <div className="flex items-center">
                    <p className="ml-2 text-sm text-gray-500">Please Sign-in to your account</p>
                  </div>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2"
                >
                  <IoMdClose size={24} />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                <ul>
                  {/* Products */}
                  <li className="border-b">
                    <button 
                      className="w-full p-4 flex justify-between items-center"
                      onClick={() => handleNavigation('/how-to-order')}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">🤔</span>
                        <span>How to Order</span>
                      </div>
                    </button>

                  </li>
                
                  <li className="border-b">
                    <button 
                      className="w-full p-4 flex justify-between items-center"
                      onClick={() => handleNavigation('/inspirations')}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">💡</span>
                        <span> Inspirations</span>
                      </div>
                    </button>

                  </li>

                  <li className="border-b">
                  <button 
                    className="w-full p-4 flex justify-between items-center"
                    onClick={() => handleNavigation('/design-help')}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">💁‍♂️</span>
                      <span> Design help</span>
                    </div>
                  </button>
                  </li>

                  <li className="border-b">
                  <button 
                    className="w-full p-4 flex justify-between items-center"
                    onClick={() => handleNavigation('/free-sample')}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">💁‍♂️</span>
                      <span> Free Sample</span>
                    </div>
                  </button>
                  </li>
                  
                  <li className="border-b">
                    <button 
                      className="w-full p-4 flex justify-between items-center"
                      onClick={() => toggleExpand('products')}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">🛍️</span>
                        <span>Products</span>
                      </div>
                      <BsChevronDown 
                        size={16} 
                        className={`transition-transform ${expandedItems.products ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expandedItems.products && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50"
                      >
                        <ul>
                          <li>
                            <button 
                              onClick={() => handleNavigation('/products')} 
                              className="block w-full text-left p-4 pl-12"
                            >
                              All Products
                            </button>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </li>

                  {/* Shop by */}
                  <li className="border-b">
                    <button 
                      className="w-full p-4 flex justify-between items-center"
                      onClick={() => toggleExpand('shopBy')}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">🔍</span>
                        <span>Shop by</span>
                      </div>
                      <BsChevronDown 
                        size={16} 
                        className={`transition-transform ${expandedItems.shopBy ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expandedItems.shopBy && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50"
                      >
                        <ul>
                          <li>
                            <button 
                              onClick={() => handleNavigation('/packaging-type')} 
                              className="block w-full text-left p-4 pl-12"
                            >
                              Packaging Type
                            </button>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </li>

                  {/* Contact us */}
                  <li className="border-b">
                    <button 
                      onClick={() => handleNavigation('/contact')} 
                      className="w-full p-4 flex items-center text-left"
                    >
                      <span className="mr-2">📞</span>
                      <span className="text-black">Contact us</span>
                    </button>
                  </li>

                  {/* Other links */}
                  <li className="border-b">
                    <button 
                      onClick={() => handleNavigation('/blog')} 
                      className="w-full p-4 flex items-center text-left"
                    >
                      <span className="mr-2">📝</span>
                      <span className="text-black">Blog</span>
                    </button>
                  </li>
                  
                  {/* Conditional rendering for Account/Login */}
                  <li className="border-b">
                    {auth ? (
                      <button onClick={handleProfileClick} className="w-full p-4 flex items-center">
                        <span className="mr-2">👤</span>
                        <span className="text-black">My Account</span>
                      </button>
                    ) : (
                      <button onClick={handleLoginClick} className="w-full p-4 flex items-center">
                        <span className="mr-2">👤</span>
                        <span className="text-black">Sign In</span>
                      </button>
                    )}
                  </li>
                  
                  <li className="border-b">
                    <button 
                      onClick={() => handleNavigation('/cart')} 
                      className="w-full p-4 flex items-center text-left"
                    >
                      <span className="mr-2">🛒</span>
                      <span className="text-black">Cart</span>
                    </button>
                  </li>
                  
                  {/* Logout option for logged in users */}
                  {isLoggedIn && (
                    <li className="border-b">
                      <button onClick={handleLogout} className="w-full p-4 flex items-center text-red-500">
                        <span className="mr-2">🚪</span>
                        <span>Logout</span>
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}