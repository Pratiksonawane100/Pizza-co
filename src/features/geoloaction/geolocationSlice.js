import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: "",
  city: "",
  state: "",
};

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.state = action.payload.state;
    },
  },
});

export const { setLocation } = geolocationSlice.actions;

export const selectGeolocation = (state) => state.geolocation;

export default geolocationSlice.reducer;
