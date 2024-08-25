import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {
    country: "",
    state: "",
    city: "",
  },
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;

export const selectAddress = (state) => state.address.address;
