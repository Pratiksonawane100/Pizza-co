// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Get initial username from localStorage
const initialState = {
  username: localStorage.getItem("username") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
      localStorage.setItem("username", action.payload); // Save username to localStorage
    },
    clearUsername(state) {
      state.username = "";
      localStorage.removeItem("username"); // Remove username from localStorage
    },
  },
});

export const { updateName, clearUsername } = userSlice.actions;
export default userSlice.reducer;
