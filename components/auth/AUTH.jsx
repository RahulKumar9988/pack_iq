"use client";
import React, { useState } from "react";
import { 
  FiArrowRight,

  FiCheckCircle,

} from "react-icons/fi";
import { motion } from "framer-motion";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
function AUTH() {
    const [showSignUp, setShowSignUp] = useState(false);
      
  return (
    <div>
      <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Auth Section */}
            <div className="p-8 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
              <div className="max-w-sm mx-auto space-y-8">
                <h2 className="text-3xl font-bold">Welcome Back</h2>
                <div className="space-y-4">
                  {["Order tracking", "Personalized recommendations", "Exclusive member deals"].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <FiCheckCircle className="w-5 h-5 text-green-300" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/20 pt-6">
                  <button 
                    className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition"
                    onClick={() => setShowSignUp(!showSignUp)}
                  >
                    <span>Create Account</span>
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8">
              {showSignUp ? (
                <SignUpForm onSuccess={() => setShowSignUp(false)} />
              ) : (
                <SignInForm onSwitch={() => setShowSignUp(true)} />
              )}
            </div> 
          </motion.div>
    </div>
  )
}

export default AUTH
