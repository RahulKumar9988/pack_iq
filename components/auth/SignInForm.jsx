"use client";

import { loginAction } from "@/app/action/loginAction";
import React, { useState } from "react";
import { login } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export function SignInForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const result = await loginAction(formData);
      console.log(result);

      if(result.success){
        dispatch(login({ token: result.data.token, user: result.data.user }));
        router.push('/');
      }else{
        setError(result.error[0]);
      }
      
    } catch (err) {
      console.error('Submission error:', err);
      setError(`Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-full flex items-center justify-center shadow-md">
          <Lock size={28} className="text-white" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-900">Welcome Back</h2>
      
      <form action={handleSubmit}>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-blue-600" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="w-full pl-10 pr-3 py-2.5 border border-blue-200 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-blue-600" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 border border-blue-200 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
              required
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
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md text-sm text-red-600 flex items-start">
            <div className="flex-shrink-0 mr-2">⚠️</div>
            <div>{error}</div>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-900 hover:from-blue-700 hover:to-indigo-900 text-white font-medium py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Signing in...
            </div>
          ) : "Sign In"}
        </button>
      </form>
      
      <div>
        <p className="mt-6 text-center text-gray-600">
          Don not have an account? <a href="/auth/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default SignInForm;