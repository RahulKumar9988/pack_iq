import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get base URL from environment variables
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Format credentials to match your API expectations
      const requestData = {
        user_email: credentials.email,
        user_password: credentials.password
      };
      
      const response = await axios.post(`${baseUrl}/api/v1/auth/login`, requestData, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Check if response has the expected structure
      if (response.data && response.data.data && response.data.data.token) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.data.token);
        
        // If response includes user data, store it as well
        if (response.data.data.user) {
          localStorage.setItem("userData", JSON.stringify(response.data.data.user));
          return {
            token: response.data.data.token,
            user: response.data.data.user
          };
        }
        
        // If no user data is present, return token only
        return {
          token: response.data.data.token,
          user: null
        };
      } else {
        return rejectWithValue("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      let errorMessage = "Login failed. Please try again.";
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Invalid email or password. Please check your credentials.";
        } else {
          errorMessage = err.response.data?.message || `Error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = err.message;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Register thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/register`, userData, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        
        if (response.data.user) {
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          return {
            token: response.data.token,
            user: response.data.user
          };
        }
        
        return {
          token: response.data.token,
          user: null
        };
      } else {
        return rejectWithValue("Invalid response from server");
      }
    } catch (err) {
      console.error("Registration error:", err);
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.response) {
        errorMessage = err.response.data?.message || `Error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = err.message;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch user profile data
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const response = await axios.get(`${baseUrl}/api/v1/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.user) {
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        return response.data.user;
      } else {
        return rejectWithValue("Invalid user data received");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      let errorMessage = "Could not retrieve profile information";
      
      if (err.response) {
        if (err.response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          errorMessage = "Session expired. Please login again.";
        } else {
          errorMessage = err.response.data?.message || `Error: ${err.response.status}`;
        }
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Logout thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // You can add an API call to invalidate the token on the server side
      // const response = await axios.post(`${baseUrl}/api/v1/auth/logout`);
      
      // Clear local storage regardless of server response
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      
      return null;
    } catch (err) {
      console.error("Logout error:", err);
      // Still clear localStorage even if the API call fails
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      
      return rejectWithValue("Error during logout process");
    }
  }
);

// Load initial state from localStorage
const loadInitialState = () => {
  if (typeof window === 'undefined') {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    };
  }
  
  try {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    
    return {
      token: token || null,
      user: userData ? JSON.parse(userData) : null,
      isAuthenticated: !!token,
      loading: false,
      error: null
    };
  } catch (error) {
    console.error("Error loading auth state from localStorage:", error);
    return {
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    };
  }
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    checkAuthState: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("userData");
        
        state.token = token || null;
        state.user = userData ? JSON.parse(userData) : null;
        state.isAuthenticated = !!token;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Profile fetch cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (action.payload === 'Session expired. Please login again.') {
          state.token = null;
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      
      // Logout case
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  }
});

export const { clearError, checkAuthState } = authSlice.actions;
export default authSlice.reducer;