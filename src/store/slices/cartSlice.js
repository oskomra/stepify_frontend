import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
    discountTotal: 0,
    finalPrice: 0,
    quantity: 0,
  },
  reducers: {
    addCartItem: (state, action) => {
      const newItem = action.payload;

      const uniqueId = `${newItem.modelName}-${newItem.color}-${newItem.size}`;

      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.modelName === newItem.modelName &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.cartItems.push({
          ...newItem,
          id: uniqueId,
        });
      }

      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.quantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.quantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    removeCartItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.quantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.quantity = quantity;
        state.totalPrice = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
      state.quantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
    setCartQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setFinalPrice: (state, action) => {
      state.finalPrice = action.payload;
    },
    setDiscountTotal: (state, action) => {
      state.discountTotal = action.payload;
    },
  },
});

export const {
  addCartItem,
  setCartItems,
  removeCartItem,
  updateCartItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
