import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orderItems: [],
    totalPrice: 0,
    deliveryPrice: 0,
    shippingAddress: "",
    date: null,
    status: "",
    deliveryMethod: "Courier",
    deliveryCompany: "FedEx",
    parcelLockerId: "",
    paymentMethod: "BLIK",
  },
  reducers: {
    setOrderItems: (state, action) => {
      state.orderItems = action.payload;
      state.totalPrice = state.orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    setDeliveryPrice: (state, action) => {
      state.deliveryPrice = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    addTotalPrice: (state, action) => {
      state.totalPrice += action.payload;
    },
    reduceTotalPrice: (state, action) => {
      state.totalPrice -= action.payload;
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setDeliveryMethod: (state, action) => {
      state.deliveryMethod = action.payload;
    },
    setDeliveryCompany: (state, action) => {
      state.deliveryCompany = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setParcelLockerId: (state, action) => {
      state.parcelLockerId = action.payload;
    },
    setOrder: (state, action) => {
      const {
        orderItems,
        totalPrice,
        deliveryPrice,
        shippingAddress,
        date,
        status,
        deliveryMethod,
        deliveryCompany,
        parcelLockerId,
        paymentMethod,
      } = action.payload;

      state.orderItems = orderItems || state.orderItems;
      state.totalPrice = totalPrice || state.totalPrice;
      state.deliveryPrice = deliveryPrice || state.deliveryPrice;
      state.shippingAddress = shippingAddress || state.shippingAddress;
      state.date = date || state.date;
      state.status = status || state.status;
      state.deliveryMethod = deliveryMethod || state.deliveryMethod;
      state.deliveryCompany = deliveryCompany || state.deliveryCompany;
      state.parcelLockerId = parcelLockerId || state.parcelLockerId;
      state.paymentMethod = paymentMethod || state.paymentMethod;
    },
  },
});

export default ordersSlice.reducer;
