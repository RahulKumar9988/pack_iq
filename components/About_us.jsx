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
      {/* Image Section */}
      <div className="w-full flex justify-center my-12">
        <img
          src="/about-us.png"
          alt="About Us"
          className="rounded-lg shadow-xl w-full max-w-4xl h-64 sm:h-80 md:h-[70vh] object-cover"
        />
      </div>
      
      <div className="w-full flex flex-col md:flex-col items-center justify-between gap-16">
        
        {/* Left Section - Heading */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
            We simplify your company packaging
          </h1>
        </div>

        {/* Right Section - Description & Button */}
        <div className="md:w-1/2 space-y-5 text-center md:text-left flex flex-col items-center md:items-start">
          <p className="text-gray-700 text-base sm:text-lg md:text-xl">
            At <span className="font-semibold">PackIQ</span>, we are redefining the way startups and emerging brands approach packaging. As a leading flexible packaging company, our focus is on <span className="font-semibold">quality, innovation, and simplicity</span>. We specialize in serving <span className="font-semibold">small to mid-sized businesses</span>, providing them with
            cutting-edge packaging solutions that help their products stand out.
          </p>
          <Button
            onClick={() => router.push("/contact")}
            className="bg-gradient-to-r from-[#0A7CFF] to-[#143761] text-white px-6 py-3 rounded-full font-medium text-base transition-all duration-300 hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
          >
            Get in touch
          </Button>
        </div>
      </div>

      {/* Customer-first approach Section */}
      <div className="w-full mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">What Sets Us Apart</h2>
        <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
          <p className="text-lg text-center mb-8">
            What sets us apart is our customer-first approach:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Low Minimum Order Quantities (MOQ)</h3>
              <p className="text-gray-700">Ideal for startups and test runs.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">No Plates or Cylinders Needed</h3>
              <p className="text-gray-700">Say goodbye to expensive setup costs.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Fast Turnaround Times</h3>
              <p className="text-gray-700">Get your packaging delivered quickly without compromising quality.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tagline, Vision, Mission Section */}
      <div className="w-full mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center">Our Tagline</h3>
          <p className="text-xl font-medium text-center text-blue-600 mb-4">Inspire. Innovate. Create.</p>
          <p className="text-gray-700">
            We inspire our customers to envision better packaging. We innovate to find the best solutions. We create high-quality, eye-catching packaging that brings your vision to life.
          </p>
        </div>
        
        <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center">Our Vision</h3>
          <p className="text-gray-700">
            To transform the packaging landscape by making every single non-printed pouch printed, no matter how small the quantity—ensuring best-in-class quality, even in the smallest batch sizes.
          </p>
        </div>
        
        <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center">Our Mission</h3>
          <p className="text-gray-700">
            To deliver high-quality, innovative, and customizable packaging that empowers brands to focus on growing their business, not on managing packaging hassles. We strive for exceptional customer satisfaction through transparency, simplicity, and excellence.
          </p>
        </div>
      </div>

      {/* Digital Edge Section */}
      <div className="w-full mt-20 bg-blue-600 text-white rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold mb-6">Our Digital Edge</h2>
            <p className="text-lg">
              We have launched a user-friendly online platform that simplifies the ordering process—making it easy, fast, and seamless for customers to customize, order, and receive their packaging with just a few clicks.
            </p>
            <Button
              onClick={() => router.push("/services")}
              className="mt-6 bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium text-base transition-all duration-300"
            >
              Explore Our Platform
            </Button>
          </div>
          <div className="md:w-1/3">
            <img 
              src="/digital-platform.svg" 
              alt="Digital Platform" 
              className="w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/digital-platform.png";
              }} 
            />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <p className="text-3xl sm:text-4xl font-bold mb-10 text-center mt-20">
        PackIQ helps you grow
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
          We&apos;re a team of passionate builders and <br /> innovators across the
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
        <p className="text-gray-700 text-lg mt-8 max-w-3xl mx-auto">
          We are passionate about helping brands bring their ideas to life through packaging that speaks volumes. Our team combines expertise in design, materials science, and customer service to deliver exceptional packaging solutions.
        </p>
      </div>
    </div>
  );
}

export default About_us;