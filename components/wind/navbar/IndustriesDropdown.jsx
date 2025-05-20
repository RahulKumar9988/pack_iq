"use client";
import React, { useMemo, useCallback, useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUILink,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import {
  ChevronDown,
  Lock,
  Activity,
  Zap,
  Server,
  Tag,
  Scale,
} from "./Icons.jsx";
import BagLogo from "@/public/BagLogo.jsx";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/auth/authSlice.js";
import {logout as Logout} from '@/app/action/loginAction.js';
import { getUserDetails } from "@/app/action/getUserDetails.js";
import { FiUser } from "react-icons/fi";
import PackagingSolutions from "./PackagingSolutions";

// Memoize icons using a constant object instead of a function
const ICONS = {
  chevron: <ChevronDown fill="currentColor" size={16} />,
  scale: <Scale className="text-warning" fill="currentColor" size={30} />,
  lock: <Lock className="text-success" fill="currentColor" size={30} />,
  activity: (
    <Activity className="text-secondary" fill="currentColor" size={30} />
  ),
  flash: <Zap className="text-primary" fill="currentColor" size={30} />,
  server: <Server className="text-success" fill="currentColor" size={30} />,
  user: <Tag className="text-danger" fill="currentColor" size={30} />,
};

// Create a dropdown for Industries
const IndustriesDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem className="w-full">
        <DropdownTrigger className="w-full">
          <Button
            disableRipple
            className="w-full max-sm:gap-0 bg-transparent data-[hover=true]:bg-transparent p-0 text-medium max-sm:text-sm flex justify-center"
            endContent={ICONS.chevron}
            radius="sm"
            variant="light"
          >
            Industries
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="Industries"
        className=""
        itemClasses={{
          base: "gap-4",
        }}
      >
        <DropdownItem 
          key="coffee" 
          as={Link}
          href="/industries/coffee"
          className="cursor-pointer w-full"
        >
          Coffee
        </DropdownItem>
        <DropdownItem 
          key="sweets" 
          as={Link}
          href="/industries/sweets"
          className="cursor-pointer w-full"
        >
          Sweets
        </DropdownItem>
        <DropdownItem 
          key="cbd" 
          as={Link}
          href="/industries/cbd"
          className="cursor-pointer w-full"
        >
          CBD
        </DropdownItem>
        <DropdownItem 
          key="cosmetics" 
          as={Link}
          href="/industries/cosmetics"
          className="cursor-pointer w-full"
        >
          Cosmetics
        </DropdownItem>
        <DropdownItem 
          key="supplements" 
          as={Link}
          href="/industries/supplements"
          className="cursor-pointer w-full"
        >
          Supplements
        </DropdownItem>
        <DropdownItem 
          key="tobacco" 
          as={Link}
          href="/industries/tobacco-filters"
          className="cursor-pointer w-full"
        >
          Tobacco & Filters
        </DropdownItem>
        <DropdownItem 
          key="food" 
          as={Link}
          href="/industries/food"
          className="cursor-pointer w-full"
        >
          Food
        </DropdownItem>
        <DropdownItem 
          key="fashion" 
          as={Link}
          href="/industries/fashion"
          className="cursor-pointer w-full"
        >
          Fashion
        </DropdownItem>
        <DropdownItem 
          key="tea" 
          as={Link}
          href="/industries/tea"
          className="cursor-pointer w-full"
        >
          Tea
        </DropdownItem>
        <DropdownItem 
          key="spices" 
          as={Link}
          href="/industries/spices"
          className="cursor-pointer w-full"
        >
          Spices
        </DropdownItem>
        <DropdownItem 
          key="petfood" 
          as={Link}
          href="/industries/petfood"
          className="cursor-pointer w-full"
        >
          Petfood
          
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};