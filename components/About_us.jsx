"use client";
import FAQ from "@/components/wind/home/FAQ";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import Blog_list from "./wind/blogs/Blog_list";

function About_us() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 md:px-12 py-12 overflow-hidden">
      {/* Header Section */}
      <div className="max-w-screen-xl w-full flex flex-col md:flex-row items-center justify-between gap-16 md:gap-32">
        {/* Left Section - Heading */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
            We simplify your company packaging
          </h1>
        </div>

        {/* Right Section - Description & Button */}
        <div className="md:w-1/2 space-y-5 text-center md:text-left flex flex-col items-center md:items-start">
          <p className="text-gray-700 text-base sm:text-lg md:text-xl">
            Scaleup Finance helps startups and SMEs make smarter strategic
            decisions by taking their financial management to the next level.
            The perfect solution when your colleagues don't speak spreadsheet.
          </p>
          <Button
            onClick={() => router.push("/contact")}
            className="bg-gradient-to-r from-[#0A7CFF] to-[#143761] text-white px-6 py-3 rounded-full font-medium text-base transition-all duration-300 hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
          >
            Get in touch
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full flex justify-center my-12">
        <img
          src="/about-us.png"
          alt="About Us"
          className="rounded-lg shadow-xl w-full max-w-4xl h-64 sm:h-80 md:h-[70vh] object-cover"
        />
      </div>

      {/* Statistics Section */}
      <p className="text-3xl sm:text-4xl font-bold mb-10 text-center">
        Packiq helps you grow
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full text-center text-lg sm:text-xl md:text-2xl py-8">
        <div className="flex flex-col items-center">
          <p className="font-bold text-3xl md:text-4xl">90</p>
          <p>Employees globally</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-3xl md:text-4xl">2</p>
          <p>Global offices</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-3xl md:text-4xl">198,834</p>
          <p>Orders completed</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-3xl md:text-4xl">200</p>
          <p>Customers Scaleup</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full text-center">
        <p className="font-bold text-2xl sm:text-3xl mt-20">
          We're a team of passionate builders and <br /> innovators across the
          US, Europe, and India
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-10">
          <img
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
            src="about-us1.png"
            alt="Team 1"
          />
          <img
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
            src="about-us2.png"
            alt="Team 2"
          />
          <img
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
            src="about-us3.png"
            alt="Team 3"
          />
        </div>
      </div>

      {/* Blog Section */}
      <div className="w-full mt-20"> 
        <p className="text-3xl font-bold text-start">Packiq Blogs</p>
        <Blog_list limit={4}/>
      </div>

      
    </div>
  );
}

export default About_us;