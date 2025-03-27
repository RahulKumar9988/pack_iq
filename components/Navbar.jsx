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
} from "./Icons.jsx";
import BagLogo from "@/public/BagLogo.jsx";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/auth/authSlice.js";
import {logout as Logout} from '@/app/action/loginAction.js';
import { getUserDetails } from "@/app/action/getUserDetails.js";

// Memoize icons using a constant object instead of a function
const ICONS = {
  chevron: <ChevronDown fill="currentColor" size={16} />,
  scale: <Scale className="text-warning" fill="currentColor" size={30} />,
  lock: <Lock className="text-success" fill="currentColor" size={30} />,
  activity: (
    <Activity className="text-secondary" fill="currentColor" size={30} />
  ),
  flash: <Flash className="text-primary" fill="currentColor" size={30} />,
  server: <Server className="text-success" fill="currentColor" size={30} />,
  user: <TagUser className="text-danger" fill="currentColor" size={30} />,
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

  // Memoize navigation handlers to prevent unnecessary re-creation
  const handleProfileClick = useCallback(() => {
    router.push('/auth/signin');
  }, [router]);


  const handleLogout = useCallback( async () => {
    const result = await Logout();
    if(result.success){
      dispatch(logout());
      router.push('/');
    }else{
      // console.log(result.error);  
    }
  }, [dispatch, router]);

  // Prevent rendering on server-side to avoid hydration mismatches
  if (!isMounted) {
    return null;
  }

  return (
    <Navbar
      className="bg-transparent"
      classNames={{
        wrapper: "max-w-full bg-transparent px-16 max-xs:gap-2",
      }}
      isBlurred={false}
      position="sticky"
      shouldHideOnScroll
    >
      <NavbarBrand className="sm:min-w-[87.5px] max-sm:min-w-[60px]">
        <NextUILink href="/" as={Link} prefetch>
          <Image src="/productNavLogo.png" alt="Logo" height={52} width={87.5} />
        </NextUILink>
      </NavbarBrand>
      <NavbarContent
        className="flex gap-0 sm:gap-10 xs:gap-2 max-sm:text-sm"
        justify="center"
      >
        <NavbarItem>
          <NextUILink href="/" as={Link} color="foreground" className="max-sm:text-sm">
            Home
          </NextUILink>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="max-sm:gap-0 bg-transparent data-[hover=true]:bg-transparent p-0 text-medium max-sm:text-sm"
                endContent={ICONS.chevron}
                radius="sm"
                variant="light"
              >
                Products
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Product features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem key="all-products" startContent={ICONS.scale}>
              <NextUILink href="/products" as={Link}>All Product</NextUILink>
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues."
              startContent={ICONS.activity}
            >
              Usage Metrics
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="max-sm:gap-0 bg-transparent data-[hover=true]:bg-transparent p-0 text-medium max-sm:text-sm"
                endContent={ICONS.chevron}
                radius="sm"
                variant="light"
              >
                Shop By
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Shop By features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem key="packaging-type" startContent={ICONS.scale}>
              <NextUILink href="/packaging-type" as={Link}>Packaging Type</NextUILink>
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues."
              startContent={ICONS.activity}
            >
              Usage Metrics
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        <NavbarItem>
          <NextUILink href="/contact" as={Link} color="foreground" className="max-sm:text-sm">
            Contact Us
          </NextUILink>
        </NavbarItem>
        <NavbarItem>
          <NextUILink href="/blog" as={Link} color="foreground" className="max-sm:text-sm">
            Blogs
          </NextUILink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="flex-grow-0 sm:gap-10">
        <NavbarItem className="lg:flex hidden">
          <NextUILink href="/cart" as={Link} className="flex flex-col pt-4 text-[12px] text-slate-500">
            <BagLogo size={24} fontWeight={0.7} color="black" />
            Bag
          </NextUILink>
        </NavbarItem>
        
        <NavbarItem className="flex-col gap-2 text-[12px]">
          {auth.isAuthenticated ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="flex flex-col items-center cursor-pointer mt-2">
                <Avatar 
                  color="default"
                  className="border-[#yourCustomColor]"  // Custom border color
                  style={{ backgroundColor: '#d7d9db' }}  // Custom background
                />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions">
                <DropdownItem key="profile" onClick={() => router.push('/profile')}>
                  My Profile
                </DropdownItem>
                <DropdownItem key="orders" onClick={() => router.push('/orders-history')}>
                  My Orders
                </DropdownItem>
                <DropdownItem key="logout" color='warning' onClick={handleLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              onClick={handleProfileClick}
              className="bg-[#2f4158] hover:bg-blue-800 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              size="sm"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}