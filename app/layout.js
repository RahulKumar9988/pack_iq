// Updated RootLayout.js file

import { DM_Sans } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import StoreProvider from "./(products)/StoreProvider";
import { ScrollToTopOnNavigate } from "@/components/ScrollToTopOnNavigate";
import { FaWhatsapp } from "react-icons/fa";

// Simple loading placeholders
const NavbarPlaceholder = () => <div className="h-16 bg-white shadow-sm w-full"></div>;
const LoadingSpinner = () => <div className="w-full h-6 bg-gray-100"></div>;

// Dynamic imports with loading fallbacks
const TopLoader = dynamic(() => import('../components/TopLoader'), { 
  ssr: false,
  loading: () => <LoadingSpinner />
});

const HomepageNavbar = dynamic(() => import("@/components/Navbar"), {
  ssr: true,
  loading: () => <NavbarPlaceholder />
});

const MobileNav = dynamic(() => import("@/components/MobileNav"), {
  ssr: false,
  loading: () => <NavbarPlaceholder />
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-20 bg-gray-100 w-full"></div>
});

const SmoothScrollProvider = dynamic(() => import("@/components/SmoothScrollProvider"), {
  ssr: false
});

// Optimize font loading
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '700'],
  adjustFontFallback: true
});

// Separated metadata and viewport exports
export const metadata = {
  title: "Packiq Ecommerce Home",
  description: "An Ecommerce Website for Packaging",
};

// Move viewport config to its own export as recommended by Next.js
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.className} w-full flex flex-col h-screen`}>
        <Suspense fallback={<LoadingSpinner />}>
          <TopLoader />
        </Suspense>
        <ScrollToTopOnNavigate/>

        <StoreProvider>
          <div className="flex flex-col flex-grow w-full items-center">
            {/* Desktop Navigation */}
            <div className="hidden sm:block w-full fixed z-50">
              <HomepageNavbar />
            </div>
            
            {/* Mobile Navigation */}
            <div className="block sm:hidden w-full">
              <MobileNav />
            </div>
            
            <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">
              <div className="animate-pulse h-10 w-10 bg-blue-200 rounded-full"></div>
            </div>}>
              {/* <SmoothScrollProvider> */}

                {/* Main Content with proper padding/margin to account for fixed header */}
                <div className="w-full flex justify-center flex-grow md:mt-28 sm:mt-16 mt-2">
                  {children}
                  {/* 🟢 Global WhatsApp Button */}
                  <a
                    href="https://wa.me/916289043085"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                    aria-label="Chat on WhatsApp"
                  >
                    <FaWhatsapp size={28} />
                  </a>
                </div>
                
                <Footer />
              {/* </SmoothScrollProvider> */}
            </Suspense>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}