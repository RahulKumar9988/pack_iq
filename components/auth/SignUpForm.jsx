"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export function SignUpForm() {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fileInputRef = useRef(null);
  
  const [user, setUser] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_address: "",
    user_phone_number: "",
    user_image_url: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      setError("Please select an image file");
      return;
    }

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      setUser({ ...user, user_image_url: base64String });
      setPreviewImage(base64String);
    };
    reader.onerror = () => {
      setError("Error reading file");
    };
    reader.readAsDataURL(file);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!user.user_name || !user.user_email || !user.user_password) {
      setError("Name, email and password are required");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/register`, user, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.token) {
        // Save token to localStorage
        localStorage.setItem("token", response.data.token);
        router.push("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
        setError(err.response.data?.message || `Error: ${err.response.status}`);
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
      <p className="text-gray-600 text-center mb-6">Join our community today</p>
      
      <form onSubmit={handleSignup}>
        {/* Avatar Upload Section */}
        <div className="mb-6 flex flex-col items-center">
          <div 
            className="w-24 h-24 mb-3 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-500"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="text-blue-500 text-sm font-medium"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Avatar
          </button>
          <p className="text-xs text-gray-500 mt-1">Click to upload (max 2MB)</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.user_name}
            onChange={(e) => setUser({ ...user, user_name: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.user_email}
            onChange={(e) => setUser({ ...user, user_email: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.user_password}
            onChange={(e) => setUser({ ...user, user_password: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="123 Main St"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.user_address}
            onChange={(e) => setUser({ ...user, user_address: e.target.value })}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="8420419829"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.user_phone_number}
            onChange={(e) => setUser({ ...user, user_phone_number: e.target.value })}
          />
        </div>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-500 hover:text-blue-700 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;