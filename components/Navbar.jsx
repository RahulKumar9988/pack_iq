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
  Flash,
  Server,
  TagUser,
  Scale,
} from "lucide-react";
import BagLogo from "@/public/BagLogo.jsx";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/auth/authSlice.js";
import { logout as Logout } from '@/app/action/loginAction.js';
import { getUserDetails } from "@/app/action/getUserDetails.js";
import { FiUser } from "react-icons/fi";
import dynamic from 'next/dynamic';
import NavLinks from "./NavLinks.jsx";

// Dynamically import PackagingSolutions with no SSR to avoid hydration issues
const PackagingSolutions = dynamic(
  () => import('./wind/navbar/PackagingSolutions.jsx'),
  { ssr: false }
);

// Memoize icons using a constant object
const ICONS = {
  chevron: <ChevronDown size={16} />,
  scale: <Scale className="text-warning" size={30} />,
  lock: <Lock className="text-success" size={30} />,
  activity: <Activity className="text-secondary" size={30} />,
  flash: <Flash className="text-primary" size={30} />,
  server: <Server className="text-success" size={30} />,
  user: <TagUser className="text-danger" size={30} />,
};

export default function HomepageNavbar() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const router = useRouter();
  const userDetails = getUserDetails();
  
  // Add state to track if component is mounted to prevent hydration issues
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoize navigation handlers
  const handleProfileClick = useCallback(() => {
    router.push('/auth/signin');
  }, [router]);

  const handleLogout = useCallback(async () => {
    const result = await Logout();
    if(result.success){
      dispatch(logout());
      router.push('/');
    }
  }, [dispatch, router]);

  // Prevent rendering on server-side
  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full shadow-sm">
      <Navbar
        className="bg-white shadow-sm h-20"
        classNames={{
          wrapper: "max-w-full px-4 md:px-8 lg:px-16",
          content: "gap-1",
        }}
        isBlurred={false}
        position="sticky"
        shouldHideOnScroll
      >
        {/* Logo section */}
        <div className="bg-red-100 " justify="start">
          <div onClick={()=> router.push('/')} className=" cursor-pointer gap-3">
            <Image 
              src="/productNavLogo.png" 
              alt="PackIQ Logo" 
              width={140} // increased width
              height={140} // increased height
              className="object-contain scale-125"
            />
          </div>
        </div>

        {/* User actions section */}
        <NavbarContent className=" gap-5 " justify="center">
          <NavbarItem className="hidden lg:flex">
            <NextUILink href="/cart" as={Link} className="flex flex-col items-center justify-center">
              <BagLogo size={40} fontWeight={0.7} color="#00008B" />
            </NextUILink>
          </NavbarItem>
          
          <NavbarItem>
            {auth.isAuthenticated ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <div className="w-15 h-12 rounded-full border-1 border-blue-950 overflow-hidden cursor-pointer">
                    {userDetails?.user?.user_image_url ? (
                      <img 
                        src={userDetails.user.user_image_url} 
                        className="w-full h-full object-cover"
                        alt="Profile"
                      />
                    ) : (
                      <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                        <FiUser className="w-6 h-6 text-indigo-600" />
                      </div>
                    )}
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions">
                  <DropdownItem 
                    key="profile" 
                    as={Link} 
                    href="/profile"
                    className="cursor-pointer w-full "
                  >
                    My Profile
                  </DropdownItem>
                  <DropdownItem 
                    key="orders" 
                    as={Link}
                    href="/orders-history"
                    className="cursor-pointer w-full"
                  >
                    My Orders
                  </DropdownItem>
                  <DropdownItem 
                    key="logout" 
                    color='warning' 
                    onClick={handleLogout}
                    className="cursor-pointer w-full"
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                onClick={handleProfileClick}
                className="bg-[#143761] hover:bg-blue-950 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                size="md"
              >
                Login
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <NavLinks className="hidden md:flex" />

    </div>
  );
}