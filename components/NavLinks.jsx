"use client";
import React, { useMemo, useCallback, useState, useEffect } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link as NextUILink,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/auth/authSlice.js";
import { logout as Logout } from '@/app/action/loginAction.js';
import { getUserDetails } from "@/app/action/getUserDetails.js";
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
  flash: <Zap className="text-primary" size={30} />,
  server: <Server className="text-success" size={30} />,
  user: <Tag className="text-danger" size={30} />,
};

// Industries dropdown component
const IndustriesDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="bg-transparent data-[hover=true]:bg-transparent p-0 text-base font-medium flex items-center gap-1 text-blue-900"
            endContent={ICONS.chevron}
            radius="sm"
            variant="light"
          >
            Industry Solutions
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
            // as={Link}
            // href={`/industries/${item.key}`}
            className="cursor-pointer w-full"
          >
            {item.label}
          </DropdownItem>
        ))}
       <DropdownItem
        key="view-more"
        href={'/Industry-page'}
        className="text-blue-600 hover:underline font-medium"
      >
        View more
      </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

// // Products dropdown component
// const ProductsDropdown = () => {
//   return (
//     <Dropdown>
//       <NavbarItem>
//         <DropdownTrigger>
//           <Button
//             disableRipple
//             className="bg-transparent data-[hover=true]:bg-transparent p-0 text-base font-medium flex items-center gap-1"
//             endContent={ICONS.chevron}
//             radius="sm"
//             variant="light"
//           >
//             Products
//           </Button>
//         </DropdownTrigger>
//       </NavbarItem>
//       <DropdownMenu
//         aria-label="Product features"
//         className="w-64"
//         itemClasses={{
//           base: "gap-4",
//         }}
//       >
//         <DropdownItem 
//           key="all-products" 
//           startContent={ICONS.scale}
//           as={Link}
//           href="/products"
//           className="cursor-pointer w-full"
//         >
//           All Products
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// // Shop By dropdown component
// const ShopByDropdown = () => {
//   return (
//     <Dropdown>
//       <NavbarItem>
//         <DropdownTrigger>
//           <Button
//             disableRipple
//             className="bg-transparent data-[hover=true]:bg-transparent p-0 text-base font-medium flex items-center gap-1"
//             endContent={ICONS.chevron}
//             radius="sm"
//             variant="light"
//           >
//             Shop By
//           </Button>
//         </DropdownTrigger>
//       </NavbarItem>
//       <DropdownMenu
//         aria-label="Shop By features"
//         className="w-64"
//         itemClasses={{
//           base: "gap-4",
//         }}
//       >
//         <DropdownItem 
//           key="packaging-type" 
//           startContent={ICONS.scale}
//           as={Link}
//           href="/packaging-type"
//           className="cursor-pointer w-full"
//         >
//           Packaging Type
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

export default function NavLinks() {
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
  // const handleProfileClick = useCallback(() => {
  //   router.push('/auth/signin');
  // }, [router]);

  // const handleLogout = useCallback(async () => {
  //   const result = await Logout();
  //   if(result.success){
  //     dispatch(logout());
  //     router.push('/');
  //   }
  // }, [dispatch, router]);

  // Prevent rendering on server-side
  if (!isMounted) {
    return null;
  }

  return (
    <Navbar
      className=" shadow-sm h-24 -z-30 mt-[-20px] px-10 "
      classNames={{
        wrapper: "max-w-full ",
        content: "gap-4",
      }}
      isBlurred={false}
      position="sticky"
      shouldHideOnScroll
    >
      

      {/* Navigation links */}
      <NavbarContent className=" mt-5 hidden md:flex basis-3/5 justify-center gap-8 " justify="start">
        <NavbarItem>
          <PackagingSolutions />
        </NavbarItem>
        <NavbarItem>
          <NextUILink href="/how-to-order" as={Link} color="foreground" className="text-base font-medium text-blue-900">
            How To Order
          </NextUILink>
        </NavbarItem>
        <NavbarItem>
          <IndustriesDropdown />
        </NavbarItem>
        <NavbarItem>
          <NextUILink href="/inspirations" as={Link} color="foreground" className="text-blue-900 text-base font-medium">
            Inspirations
          </NextUILink>
        </NavbarItem>
        <NavbarItem>
          <NextUILink href="/design-help" as={Link} color="foreground" className="text-blue-900 text-base font-medium">
            Design help
          </NextUILink>
        </NavbarItem>
        <NavbarItem>
          <NextUILink href="/free-sample" as={Link} color="foreground" className=" text-blue-900 text-base font-medium">
            Free Sample
          </NextUILink>
        </NavbarItem>
        <NavbarItem>
          <NextUILink href="/products" as={Link} color="foreground" className=" text-blue-900 text-base font-medium">
            Products
          </NextUILink>
        </NavbarItem>

        {/* <NavbarItem>
          <ProductsDropdown />
        </NavbarItem> */}
        {/* <NavbarItem>
          <ShopByDropdown />
        </NavbarItem> */}
        {/* <NavbarItem>
          <NextUILink href="/blog" as={Link} color="foreground" className="text-base font-medium">
            Blogs
          </NextUILink>
        </NavbarItem> */}
      </NavbarContent>
      <button className="mt-5 border-1 shadow-md px-5 py-2 rounded-2xl border-blue-900 text-blue-900" onClick={()=>router.push('/packaging-type')}>Configure Packaging</button>
    </Navbar>
  );
}