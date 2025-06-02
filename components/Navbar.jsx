"use client";
import React, { useCallback, useState, useEffect } from "react";
import {
  Navbar,
  NavbarItem,
  Link as NextUILink,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { ChevronDown, Zap } from "lucide-react";
import BagLogo from "@/public/BagLogo.jsx";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/auth/authSlice.js";
import { logout as Logout } from '@/app/action/loginAction.js';
import { getUserDetails } from "@/app/action/getUserDetails.js";
import dynamic from 'next/dynamic';

// Dynamically import with loading fallback
const NavLinks = dynamic(() => import("./NavLinks.jsx"), {
  ssr: false,
  loading: () => <div className="h-10"></div>,
});

export default function HomepageNavbar() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Fetch user details only when needed
  useEffect(() => {
    if (auth.isAuthenticated) {
      const details = getUserDetails();
      setUserDetails(details);
    }
    setIsMounted(true);
  }, [auth.isAuthenticated]);

  // Memoize navigation handlers
  const handleProfileClick = useCallback(() => {
    router.push('/auth/signin');
  }, [router]);

  const handleLogout = useCallback(async () => {
    try {
      const result = await Logout();
      if(result.success){
        dispatch(logout());
        router.push('/');
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [dispatch, router]);

  // Handle logo click with useCallback
  const handleLogoClick = useCallback(() => {
    router.push('/');
  }, [router]);

  // Prevent rendering on server-side
  if (!isMounted) {
    return <div className="h-15"></div>; // Return empty placeholder with height
  }

  return (
    <div className="w-full z-20">
      <Navbar
        className=" h-24 px-10"
        classNames={{
          wrapper: "max-w-full",
        }}
        isBlurred={false}
        position="sticky"
        shouldHideOnScroll // Enable hide on scroll
      >
        {/* Logo section */}
        <div className="flex items-center h-24"> {/* h-24 or match your Navbar height */}
          <div onClick={handleLogoClick} className="cursor-pointer">
            <Image 
              src="/productNavLogo.png" 
              alt="PackIQ Logo" 
              width={190}
              height={100}
              className="object-cover mb-2"
              loading="eager"
            />
          </div>
        </div>


        {/* User actions section */}
        <div className="gap-5 flex">
          <NavbarItem className="hidden lg:flex">
            <NextUILink href="/cart" as={Link} className="flex items-center justify-center">
              <BagLogo size={40} fontWeight={0.7} color="#00008B" />
            </NextUILink>
          </NavbarItem>
          
          <NavbarItem>
            {auth.isAuthenticated ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <div className="w-12 h-12 rounded-full border border-blue-950 overflow-hidden cursor-pointer">
                    {userDetails?.user?.user_image_url ? (
                      <img 
                        src={userDetails.user.user_image_url} 
                        className="w-full h-full object-cover"
                        alt="Profile"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-indigo-600" />
                      </div>
                    )}
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions">
                  <DropdownItem key="profile" as={Link} href="/profile">
                    My Profile
                  </DropdownItem>
                  <DropdownItem key="orders" as={Link} href="/orders-history">
                    My Orders
                  </DropdownItem>
                  <DropdownItem key="logout" color="warning" onClick={handleLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                onClick={handleProfileClick}
                className="bg-[#143761] hover:bg-blue-950 text-white text-md p-5 rounded-lg transition-all duration-300 focus:outline-none font-semibold focus:ring-2 focus:ring-blue-400"
              >
                Login
              </Button>
            )}
          </NavbarItem>
        </div>
      </Navbar>
      
      <NavLinks className="hidden md:flex" />
    </div>
  );
}