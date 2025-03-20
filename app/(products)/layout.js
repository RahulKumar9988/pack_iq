"use client";
import React from "react";
import StoreProvider from "./StoreProvider";

export default function Layout({ children }) {
  return (
    <div className="max-mobile:px-5 h-full w-full mobile:px-5 xs:px-8 xl:px-16">
      <StoreProvider>{children}</StoreProvider>
    </div>
  );
}
