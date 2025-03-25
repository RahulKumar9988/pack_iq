"use client";

import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { login } from '@/redux/auth/authSlice';
import { Eye, EyeOff } from 'lucide-react';
import { registerAction } from '@/app/action/registerAction';
import { useRouter } from 'next/navigation';

function SignUpForm() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await registerAction(formData);

      console.log(result);

      if (result.success) {
 
        dispatch(login({ token: "register",user: result.user }));
        router.push('/');
      
      } else {
        // Handle validation or registration errors
        setError({
          message: 'Registration failed',
          details: result?.error || ['An unexpected error occurred']
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError({
        message: 'Unexpected error',
        details: [err.message || 'Unknown error']
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      
      {error && error.message && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-bold">{error.message}</p>
          {error.details && (
            <ul className="list-disc list-inside mt-2">
              {error.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form action={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-10 transform -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your full name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="mobile" className="block mb-2 text-sm font-medium">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            required
            placeholder="Enter your mobile number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block mb-2 text-sm font-medium">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            required
            placeholder="Enter your address"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;