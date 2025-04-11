"use client";

import React, { useState, useRef } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { login } from '@/redux/auth/authSlice';
import { Eye, EyeOff, Lock, Mail, User, Phone, MapPin, Camera } from 'lucide-react';
import { registerAction } from '@/app/action/registerAction';
import { useRouter } from 'next/navigation';

function SignUpForm() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const router = useRouter();

  const MAX_FILE_SIZE = 50 * 1024; // 50KB in bytes

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageError('');
    
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setImageError(`Image size must be less than 50KB. Current size: ${(file.size / 1024).toFixed(2)}KB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      const base64Data = base64String.split(',')[1];
      console.log("Base64 Data:", base64Data); // Debugging line  
      
      
      // Store the full base64 string including the data URL prefix
      setProfileImage(base64String);
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Get form values
      const formData = new FormData();
      formData.append('email', formRef.current.email.value);
      formData.append('password', formRef.current.password.value);
      formData.append('name', formRef.current.name.value);
      formData.append('mobile', formRef.current.mobile.value);
      formData.append('address', formRef.current.address.value);
      
      // Add the profile image if it exists
      if (profileImage) {
        formData.append('user_image_url', profileImage);
      } else {
        formData.append('user_image_url', '');
      }
  
      const result = await registerAction(formData);
      
      if (result.success) {
        dispatch(login({ token: result.data.token, user: result.data.user }));
        router.push('/');
      } else {
        setError({
          message: 'Registration failed',
          details: result?.error || ['An unexpected error occurred']
        });
      }
    } catch (err) {
      setError({
        message: 'Unexpected error',
        details: [err.message || 'Unknown error']
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-96 mx-auto m-10 p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
      <div className="flex justify-center mb-6">
        {imagePreview ? (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Profile Preview" 
              className="h-20 w-20 rounded-full object-cover border-2 border-blue-400 shadow-md"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full shadow-sm"
            >
              <Camera size={16} />
            </button>
          </div>
        ) : (
          <div className="relative">
            <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-full flex items-center justify-center shadow-md">
              <User size={32} className="text-white" />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full shadow-sm"
            >
              <Camera size={16} />
            </button>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/jpeg, image/png, image/gif"
          className="hidden"
        />
      </div>

      {imageError && (
        <div className="mb-4 p-2 bg-red-50 border-l-4 border-red-500 rounded-md">
          <p className="text-sm text-red-600">{imageError}</p>
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-900">Create Account</h2>
      
      {error && error.message && (
        <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
          <p className="font-medium text-red-700">{error.message}</p>
          {error.details && (
            <ul className="list-disc list-inside mt-2 text-sm text-red-600">
              {error.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-blue-600" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full pl-10 pr-3 py-2.5 border border-blue-200 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-blue-600" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Create a strong password"
              className="w-full pl-10 pr-10 py-2.5 border border-blue-200 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-blue-600" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your full name"
              className="w-full pl-10 pr-3 py-2.5 border border-blue-200 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={18} className="text-blue-600" />
            </div>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              required
              placeholder="Enter your mobile number"
              className="w-full pl-10 pr-3 py-2.5 border border-blue-200 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
            Address
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
              <MapPin size={18} className="text-blue-600" />
            </div>
            <textarea
              id="address"
              name="address"
              required
              placeholder="Enter your address"
              rows="3"
              className="w-full pl-10 pr-3 py-2.5 border border-blue-200 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-900 hover:from-blue-700 hover:to-indigo-900 text-white font-medium py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Registering...
            </div>
          ) : "Register"}
        </button>
      </form>
      
      <div>
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <a href="/auth/signin" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;