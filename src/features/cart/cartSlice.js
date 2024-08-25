import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = {
  cart: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
      saveCartToLocalStorage(state.cart);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
      saveCartToLocalStorage(state.cart);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
        saveCartToLocalStorage(state.cart);
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
        saveCartToLocalStorage(state.cart);
      }
    },
    clearCart(state) {
      state.cart = [];
      saveCartToLocalStorage(state.cart);
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;
