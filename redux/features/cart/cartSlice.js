import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: {
    packagingType: "",
    size: "",
    weight: "",
    material: "",
    addons: [],
  },
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.item = action.payload; // Replace 'item' with the new item (object)
    },
    updateCart: (state, action) => {
      // Merge or update existing item properties
      state.item = { ...state.item, ...action.payload };
    },
    clearCart: (state) => {
      state.item = initialState.item;
      // Also clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lastOrder');
      }
    },
    addAddon: (state, action) => {
      // Check if addon already exists to avoid duplicates
      if (!state.item.addons) {
        state.item.addons = [];
      }
      
      if (!state.item.addons.some(addon => addon.id === action.payload.id)) {
        state.item.addons.push(action.payload);
      }
    },
    removeAddon: (state, action) => {
      if (state.item.addons) {
        state.item.addons = state.item.addons.filter(
          addon => addon.id !== action.payload
        );
      }
    },
    updateAddons: (state, action) => {
      // Replace all addons with the new array
      state.item.addons = action.payload;
    },
    clearAddons: (state) => {
      state.item.addons = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
  addToCart, 
  updateCart, 
  clearCart, 
  addAddon, 
  removeAddon, 
  updateAddons,
  clearAddons 
} = CartSlice.actions;

export default CartSlice.reducer;