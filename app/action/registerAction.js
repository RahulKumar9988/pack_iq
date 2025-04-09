"use server";

import { cookies } from 'next/headers';
import axios from 'axios';

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate mobile number (assuming 10-digit phone number)
function validateMobile(mobile) {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
}

export async function registerAction(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');
  const mobile = formData.get('mobile');
  const address = formData.get('address');
  const userImageUrl = formData.get('user_image_url') || ''; 

  // Comprehensive input validation
  const validationErrors = [];

  if (!email || !validateEmail(email.toString())) {
    validationErrors.push('Valid email is required');
  }

  if (!password || password.toString().length < 8) {
    validationErrors.push('Password must be at least 8 characters long');
  }

  if (!name || name.toString().trim().length < 2) {
    validationErrors.push('Name is required and must be at least 2 characters');
  }

  if (!mobile || !validateMobile(mobile.toString())) {
    validationErrors.push('Valid 10-digit mobile number is required');
  }

  if (!address || address.toString().trim().length < 5) {
    validationErrors.push('Address is required and must be at least 5 characters');
  }

  // If there are validation errors, return them
  if (validationErrors.length > 0) {
    return {
      error: validationErrors,
      success: false
    };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    // Create the request payload including the image URL
    const requestPayload = {
      user_email: email,
      user_password: password,
      user_name: name,
      user_phone_number: mobile,
      user_address: address,
      user_image_url: userImageUrl 
    };
    
    console.log('Registration request payload:', requestPayload);
    
    // Make registration request to API
    const response = await axios.post(`${baseUrl}/api/v1/auth/register`, requestPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Log the complete response
    console.log('Registration API response:', response);

    const {data} = response;
    // Log the response data specifically
    console.log('Registration response data:', data);
    
    // Check for valid token in response
    if (data && data.data) {
      // Set secure HTTP-only cookie
      cookies().set('token', data.data.user_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week validity 
      });
      
      const registerData = {
        user: data.data.user_details,
        token: data.data.user_token
      };
      
      console.log('Processed registration data:', registerData);
      
      return {
        success: true,
        data: registerData,
        error: []
      };
    } else {
      console.log('Registration failed: No valid data in response');
      return {
        error: ['Registration failed. Please try again.'],
        success: false
      };
    }
  } catch (error) {
    console.error('Registration error:', error);

    // Log the complete error object
    console.log('Full error object:', JSON.stringify(error, null, 2));

    // Handle specific axios error responses
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
        
        return {
          error: [error.response.data.message || 'Registration failed'],
          success: false
        };
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request:', error.request);
        return {
          error: ['No response received from server'],
          success: false
        };
      }
    }
    return {
      error: ['Network error. Please try again.'],
      success: false
    };
  }
}