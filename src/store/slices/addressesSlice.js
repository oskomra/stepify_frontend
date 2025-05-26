import { createSlice } from "@reduxjs/toolkit";

const addressesSlice = createSlice({
  name: "addresses",
  initialState: {
    addresses: [],
    selectedAddress: null,
  },
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const { setAddresses, addAddress, removeAddress, setSelectedAddress } =
  addressesSlice.actions;

export default addressesSlice.reducer;
