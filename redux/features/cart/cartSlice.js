import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: {
    packagingType: "",
    size: "",
    weight: "",
    material: "",
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
      state.item = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
