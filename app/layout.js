
import { DM_Sans } from "next/font/google";
import "./globals.css";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import HomepageNavbar from "@/components/Navbar";
import StoreProvider from "./(products)/StoreProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import TopLoader from '../components/TopLoader';


const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Packiq Ecommerce - Home",
  description: "An Ecommerce Website for Packaging",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} scrollbar-hide w-full flex flex-col h-screen bg-[#]`}>
        <SmoothScrollProvider>
        <TopLoader />

          <StoreProvider>
            {/* 🔹 Navbar for Desktop */}
          <div className="flex flex-col flex-grow w-full items-center">
            <div className="hidden sm:block w-full fixed z-50">
              <HomepageNavbar/>    
            </div>
            {/* 🔹 Mobile Navigation (Only for Small Screens) */}
            <div className="block sm:hidden w-full">
              <MobileNav />
            </div>
              {/* 🔹 Main Content */}
              <div className=" scrollbar-hide flex justify-center flex-grow w-full md:mt-28 ">
                {children}
              </div>

          </div>

          {/* 🔹 Footer */} 
          <Footer />
          </StoreProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
