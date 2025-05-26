import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/ordersSlice";
import addressesReducer from "./slices/addressesSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
    addresses: addressesReducer,
    user: userReducer,
  },
});
