import SignUpForm from '@/components/auth/SignUpForm';
import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function page() {
  return (
    <div className=" flex items-center justify-center w-full">
      <SignUpForm />
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}