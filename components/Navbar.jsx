"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";
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
import { useRouter } from "next/navigation.js";

export default function HomepageNavbar() {
  const router = useRouter();
  const icons = {
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

  return (
    <Navbar
      className="bg-transparent"
      classNames={{
        wrapper: "max-w-full bg-transparent px-0 max-xs:gap-2",
      }}
      isBlurred={false}
      position="sticky"
      shouldHideOnScroll
    >
  {/* Your Navbar content here */}
      <NavbarBrand className="sm:min-w-[87.5px] max-sm:min-w-[60px]">
        <Link href="/">
          <Image src="/productNavLogo.png" alt="Logo" height={52} width={87.5} />
        </Link>
      </NavbarBrand>
      <NavbarContent
        className="flex gap-0 sm:gap-10 xs:gap-2 max-sm:text-sm"
        justify="center"
      >
        <NavbarItem>
          <Link className="max-sm:text-sm" color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="max-sm:gap-0 bg-transparent data-[hover=true]:bg-transparent p-0 text-medium max-sm:text-sm"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Products
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem key="autoscaling" startContent={icons.scale}>
              <Link href="/products">All Product</Link>
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We'll show you exactly where."
              startContent={icons.activity}
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
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Shop By
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem key="autoscaling" startContent={icons.scale}>
              <Link href="/packaging-type">Packaging Type</Link>
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We'll show you exactly where."
              startContent={icons.activity}
            >
              Usage Metrics
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        <NavbarItem>
          <Link className="max-sm:text-sm" color="foreground" href="/contact">
            Contact Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="max-sm:text-sm" color="foreground" href="/blog">
            Blogs
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="flex-grow-0 sm:gap-10">
        <NavbarItem className="lg:flex hidden">
          <Link
            href="/cart"
            className="flex flex-col pt-4 text-[12px] text-slate-500"
          >
            <BagLogo size={24} fontWeight={0.7} color="black" />
            Bag
          </Link>
        </NavbarItem>
        <NavbarItem className="flex-col gap-2 pt-4 text-[12px]">
          <Avatar
            onClick={()=>router.push('/profile')}
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          Profile
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
