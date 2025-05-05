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
import {logout as Logout} from '@/app/action/loginAction.js';
import { getUserDetails } from "@/app/action/getUserDetails.js";
import { FiUser } from "react-icons/fi";
import dynamic from 'next/dynamic';

// Dynamically import PackagingSolutions with no SSR to avoid hydration issues
const PackagingSolutions = dynamic(
  () => import('./wind/navbar/PackagingSolutions.jsx'),
  { ssr: false }
);

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
        
        {/* Packaging Solutions dropdown */}
        <PackagingSolutions />
        
        {/* Industries dropdown */}
        <IndustriesDropdown />

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
                Products
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Product features"
            className=""
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
              All Product
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

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
                Shop By
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Shop By features"
            className=""
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
              <div className="w-14 h-14 rounded-full border-4 border-white bg-white overflow-hidden">
                {userDetails?.user?.user_image_url ? (
                  <img 
                    src={userDetails.user.user_image_url} 
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                    <FiUser className="w-8 h-8 text-indigo-600" />
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