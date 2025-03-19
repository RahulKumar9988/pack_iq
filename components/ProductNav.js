"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Avatar,
  Image,
} from "@nextui-org/react";
import BagLogo from "@/public/BagLogo.jsx";
import { IoIosArrowRoundBack } from "react-icons/io";
import { usePathname } from "next/navigation.js";

export default function Productnav() {
  const pathname = usePathname();

  return (
    <Navbar classNames={{ wrapper: "max-w-full px-0" }}>
      <NavbarBrand className="mr-4">
        <Link href="/">
          <IoIosArrowRoundBack size={30} color="#405F70" />
        </Link>
        {pathname === "/order" ? "Home" : "Exit configuration"}
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          <NavbarItem>
            <Image
              src="/productNavLogo.png"
              alt="Logo"
              height={52}
              width={87.54}
            />
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-10">
        <NavbarItem className="hidden lg:flex">
          <Link
            href="#"
            className="flex flex-col text-[12px] text-slate-500 pt-4"
          >
            <BagLogo size={24} fontWeight={0.7} color="black" />
            Bag
          </Link>
        </NavbarItem>
        <NavbarItem className="flex-col pt-4 gap-2 text-[12px]">
          <Avatar
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
