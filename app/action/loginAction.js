"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

export async function loginAction(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // Input validation
  if (!email || !password) {
    return {
      error: 'Email and password are required',
      success: false
    };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    // Make login request to API
    const response = await axios.post(`${baseUrl}/api/v1/auth/login`, {
      user_email: email,
      user_password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { data } = response;

    // Check for valid token in response
    if ( data && data.data) {
      // Set secure HTTP-only cookie
      cookies().set('token', data.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      return{
        success:true,
        data:data.data,
        error:[]
      }

      // Redirect to home page
    } else {
      return {
        error: 'Invalid login response',
        success: false
      };
    }
  } catch (error) {
    console.error('Login error:', error);


    return {
      error: 'Network error. Please try again.',
      success: false
    };
  }
}


export async function logout(formData) {
  try{
  cookies().set('token', "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });
  return{
    success:true,
    data:null,
    error:[]
  }
}
catch(error){
  
  return {
    error,
    success: false
  };
}
}