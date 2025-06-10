import { createSlice } from "@reduxjs/toolkit";

const promotionsSlice = createSlice({
  name: "promotions",
  initialState: {
    promotions: [],
  },
  reducers: {
    setPromotions: (state, action) => {
      state.promotions = action.payload;
    },
    removePromotions: (state, action) => {
      const promotionId = action.payload;
      state.promotions = state.promotions.filter(
        (promotion) => promotion.id !== promotionId
      );
    },
  },
});
export const { setPromotions } = promotionsSlice.actions;
export default promotionsSlice.reducer;
