"use server";

import { cookies } from 'next/headers';
import axios from 'axios';

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateMobile(mobile) {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
}

export async function registerAction(formData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');
    const mobile = formData.get('mobile');
    const address = formData.get('address');
    const userImageUrl = formData.get('user_image_url') || '';

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

    // Check image size based on base64 string length
    // A rough estimation - base64 increases size by ~33%
    if (userImageUrl && typeof userImageUrl === 'string' && userImageUrl.length > 70000) { // Increased to account for data URL prefix
      validationErrors.push('Image size must be less than 50KB');
    }

    if (validationErrors.length > 0) {
      return {
        error: validationErrors,
        success: false
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return {
        error: ['API base URL not configured properly'],
        success: false
      };
    }

    // Prepare the user image for API submission
    let processedImageUrl = '';
    if (userImageUrl && typeof userImageUrl === 'string' && userImageUrl.startsWith('data:')) {
      // Extract the base64 portion after the comma
      const base64Data = userImageUrl.split(',')[1];
      console.log("Base64 Data:", base64Data); // Debugging line
      processedImageUrl = base64Data || '';
    } else {
      processedImageUrl = userImageUrl.toString();
    }

    const requestBody = {
      user_email: email.toString(),
      user_password: password.toString(),
      user_name: name.toString(),
      user_phone_number: mobile.toString(),
      user_address: address.toString(),
      user_image_url: processedImageUrl
    };

    const response = await axios({
      method: 'post',
      url: `${baseUrl}/api/v1/auth/register`,
      data: requestBody,
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const { data } = response;

    if (data?.data) {
      cookies().set({
        name: 'token',
        value: data.data.user_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return {
        success: true,
        data: {
          user: data.data.user_details,
          token: data.data.user_token
        },
        error: []
      };
    }

    return {
      error: ['Registration failed. Please try again.'],
      success: false
    };
  } catch (error) {
    console.error("Registration error:", error);
    
    if (axios.isAxiosError(error)) {
      return {
        error: [error.response?.data?.message || `Registration failed: ${error.message}`],
        success: false
      };
    }

    return {
      error: [error.message || 'Network error. Please try again.'],
      success: false
    };
  }
}