import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null
  }


// Updated Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      }
    }
  });

export default authSlice.reducer;
export const {login,logout} = authSlice.actions;