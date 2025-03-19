import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

async function getSizes() {
  let sizeArray, quantityArray;
  try {
    const sizeResponse = await axios.get(
      `${baseUrl}/api/v1/resources/list-packaging-type-size/1`
    );
    if (sizeResponse.data.status === 200) {
      sizeArray = sizeResponse.data.data.map((ele) => {
        return ele.sizeId.name;
      });
    }
    const quantityResponse = await axios.get(
      `${baseUrl}/api/v1/resources/list-packaging-type-size-quantity/1`
    );
    if (quantityResponse.data.status === 200) {
      quantityArray = quantityResponse.data.data.map((ele) => {
        return ele.quantityId.quantity;
      });
    }
    return {
      sizeList: sizeArray,
      quantityList: quantityArray,
    };
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}

export const constantSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      state.item = action.payload; // Replace 'item' with the new item (object)
    },
    update: (state, action) => {
      // Merge or update existing item properties
      state.item = { ...state.item, ...action.payload };
    },
    clear: (state) => {
      state.item = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, update, clear } = constantSlice.actions;

export default constantSlice.reducer;
