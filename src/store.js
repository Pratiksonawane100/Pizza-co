import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import geolocationReducer from "./features/geoloaction/geolocationSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    geolocation: geolocationReducer,
  },
});

export default store;
