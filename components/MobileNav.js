"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import BagLogo from "@/public/BagLogo.jsx";
import { IoIosArrowBack } from "react-icons/io";
import { FiMenu } from "react-icons/fi"; // Menu Icon
import { usePathname } from "next/navigation.js";
import { motion } from "framer-motion";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <Navbar
        classNames={{
          wrapper: "max-w-full px-[30px] py-[10px] h-[52px] bg-[#ead4bf]",
        }}
      >
       
        {/* Center Logo */}
        <NavbarContent justify="center">
          <NavbarItem>
            <Image
              src="/productNavLogo.png"
              alt="Logo"
              height={32}
              width={53.87}
            />
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

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-5 top-14 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50"
        >
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/products">Products</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/profile">Account Settings</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/orders">Orders</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
