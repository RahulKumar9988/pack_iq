"use client";
import React from "react";
import Productnav from "@/components/ProductNav";
import StoreProvider from "./StoreProvider";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <div className="max-mobile:px-5 h-full w-full mobile:px-5 xs:px-8 xl:px-16">
      <div className="max-mobile:hidden">
        <Productnav />
      </div>
      <StoreProvider>{children}</StoreProvider>
      <Footer/>
    </div>
  );
}
