"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
} from "@nextui-org/react";
import BagLogo from "@/public/BagLogo.jsx";
import { IoIosArrowBack } from "react-icons/io";
import { usePathname } from "next/navigation.js";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <Navbar
      classNames={{
        wrapper: "max-w-full px-[30px] py-[10px] h-[52px] bg-[#ead4bf]",
      }}
      // isBlurred={false}
    >
      <NavbarBrand className="mr-4">
        <Link href="/">
          <IoIosArrowBack size={14} color="#405F70" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarContent className="" justify="center">
          <NavbarItem>
            <Image
              src="/productNavLogo.png"
              alt="Logo"
              height={32}
              width={53.87}
            />
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-10">
        <NavbarItem className="flex items-center">
          <Link href="#">
            <BagLogo size={16} fontWeight={0.7} color="black" />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
