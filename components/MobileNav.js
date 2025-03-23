"use client";
import React, { useState, useEffect } from "react";
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
import { usePathname } from "next/navigation.js";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({
    products: false,
    shopBy: false
  });
  const pathname = usePathname();

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

  return (
    <div className="relative">
      <Navbar
        classNames={{
          wrapper: "max-w-full px-[30px] py-[10px] h-[60px] bg-[#ead4bf]",
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
            <Link href="/cart">
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
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-lg font-bold">
                    S
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm">Samuel John.</p>
                    <p className="text-xs text-gray-500">bill.sanders@example.com</p>
                  </div>
                </div>
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
                          <li><Link href="/products" className="block p-4 pl-12">All Products</Link></li>
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
                          <li><Link href="/shop/new" className="block p-4 pl-12">New Arrivals</Link></li>
                          <li><Link href="/shop/bestsellers" className="block p-4 pl-12">Best Sellers</Link></li>
                          <li><Link href="/shop/sale" className="block p-4 pl-12">Sale</Link></li>
                        </ul>
                      </motion.div>
                    )}
                  </li>

                  {/* Contact us */}
                  <li className="border-b">
                    <Link href="/contact" className="w-full p-4 flex items-center">
                      <span className="mr-2">📞</span>
                      <span className="text-black">Contact us</span>
                    </Link>
                  </li>

                  {/* Other links */}
                  <li className="border-b">
                    <Link href="/blog" className="w-full p-4 flex items-center">
                      <span className="mr-2">📝</span>
                      <span className="text-black">Blog</span>
                    </Link>
                  </li>
                  <li className="border-b">
                    <Link href="/profile" className="w-full p-4 flex items-center">
                      <span className="mr-2">👤</span>
                      <span className="text-black">Account</span>
                    </Link>
                  </li>
                  <li className="border-b">
                    <Link href="/cart" className="w-full p-4 flex items-center">
                      <span className="mr-2">🛒</span>
                      <span className="text-black">Cart</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}