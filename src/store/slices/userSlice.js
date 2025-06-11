import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    name: "",
    lastName: "",
    phone: "",
    authority: "",
  },
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setUserPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});
export const { setUserEmail, setUserName, setUserLastName, setUserPhone } =
  userSlice.actions;

export default userSlice.reducer;
