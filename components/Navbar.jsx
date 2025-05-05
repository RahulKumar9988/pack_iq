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

// Industries dropdown component
const IndustriesDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="bg-transparent data-[hover=true]:bg-transparent p-0 text-base font-medium flex items-center gap-1"
            endContent={ICONS.chevron}
            radius="sm"
            variant="light"
          >
            Industrys Solution
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="Industries"
        className="w-64"
        itemClasses={{
          base: "gap-4",
        }}
      >
        {[
          { key: "coffee", label: "Coffee" },
          { key: "sweets", label: "Sweets" },
          { key: "cbd", label: "CBD" },
          { key: "cosmetics", label: "Cosmetics" },
          { key: "supplements", label: "Supplements" },
          { key: "tobacco", label: "Tobacco & Filters" },
          { key: "food", label: "Food" },
          { key: "fashion", label: "Fashion" },
          { key: "tea", label: "Tea" },
          { key: "spices", label: "Spices" },
          { key: "petfood", label: "Petfood" },
        ].map(item => (
          <DropdownItem 
            key={item.key} 
            as={Link}
            href={`/industries/${item.key}`}
            className="cursor-pointer w-full"
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

// Products dropdown component
const ProductsDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="bg-transparent data-[hover=true]:bg-transparent p-0 text-base font-medium flex items-center gap-1"
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
        className="w-64"
        itemClasses={{
          base: "gap-4",
        }}
      >
        <DropdownItem 
          key="all-products" 
          startContent={ICONS.scale}
          as={Link}
          href="/products"
          className="cursor-pointer w-full"
        >
          
          All Products
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

// Shop By dropdown component
const ShopByDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="bg-transparent data-[hover=true]:bg-transparent p-0 text-base font-medium flex items-center gap-1"
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
        className="w-64"
        itemClasses={{
          base: "gap-4",
        }}
      >
        <DropdownItem 
          key="packaging-type" 
          startContent={ICONS.scale}
          as={Link}
          href="/packaging-type"
          className="cursor-pointer w-full"
        >
          Packaging Type
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
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
    <Navbar
      className="bg-white shadow-sm h-20"
      classNames={{
        wrapper: "max-w-full px-4 md:px-8 lg:px-16",
        content: "gap-4",
      }}
      isBlurred={false}
      position="sticky"
      shouldHideOnScroll
    >
      {/* Logo section */}
      <NavbarContent className="basis-1/5 sm:basis-1/6" justify="start">
        <NavbarBrand as={Link} href="/" className="gap-3">
          <Image 
            src="/productNavLogo.png" 
            alt="PackIQ Logo" 
            width={87.5} 
            height={52} 
            className="object-contain"
          />
        </NavbarBrand>
      </NavbarContent>

      {/* Navigation links */}
      <NavbarContent className="hidden md:flex basis-3/5 justify-center gap-8" justify="center">
        <NavbarItem>
          <PackagingSolutions />
        </NavbarItem>
        <NavbarItem>
          <IndustriesDropdown />
        </NavbarItem>
        <NavbarItem>
          <ProductsDropdown />
        </NavbarItem>
        <NavbarItem>
          <ShopByDropdown />
        </NavbarItem>
        <NavbarItem>
          <NextUILink href="/blog" as={Link} color="foreground" className="text-base font-medium">
            Blogs
          </NextUILink>
        </NavbarItem>
      </NavbarContent>

      {/* User actions section */}
      <NavbarContent className="basis-1/5 sm:basis-1/6" justify="end">
        <NavbarItem className="hidden lg:flex">
          <NextUILink href="/cart" as={Link} className="flex flex-col items-center justify-center">
            <BagLogo size={24} fontWeight={0.7} color="black" />
            <span className="text-xs text-slate-500">Bag</span>
          </NextUILink>
        </NavbarItem>
        
        <NavbarItem>
          {auth.isAuthenticated ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-white overflow-hidden cursor-pointer">
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
                  className="cursor-pointer w-full"
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