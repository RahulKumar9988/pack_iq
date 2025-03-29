import { createSlice } from '@reduxjs/toolkit';

const productFilterSlice = createSlice({
  name: 'productFilter',
  initialState: {
    filters: {
      packagingForm: null,
      material: null,
      size: null,
      quantity: null
    },
    filteredProducts: []
  },
  reducers: {
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
    },
    clearFilter: (state, action) => {
      const { filterType } = action.payload;
      state.filters[filterType] = null;
    },
    clearAllFilters: (state) => {
      state.filters = {
        packagingForm: null,
        material: null,
        size: null,
        quantity: null
      };
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    }
  }
});

export const { 
  setFilter, 
  clearFilter, 
  clearAllFilters, 
  setFilteredProducts 
} = productFilterSlice.actions;

export default productFilterSlice.reducer;