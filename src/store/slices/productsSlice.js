import { createSlice } from "@reduxjs/toolkit";
import sortProducts from "@/utils/sortProducts";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    sortOption: null,
    filters: {
      brandNames: [],
      categories: [],
      genders: [],
      colors: [],
      sizes: [],
    },
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    removeProducts: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
    setFilteredProducts: (state, action) => {
      const unsorted = [...action.payload];
      state.filteredProducts = sortProducts(unsorted, state.sortOption);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    addFilter: (state, action) => {
      const { filterType, value } = action.payload;
      if (!state.filters[filterType]) {
        state.filters[filterType] = [];
      }
      if (!state.filters[filterType].includes(value)) {
        state.filters[filterType].push(value);
      }
    },
    removeFilter: (state, action) => {
      const { filterType, value } = action.payload;
      if (state.filters[filterType]) {
        state.filters[filterType] = state.filters[filterType].filter(
          (item) => item !== value
        );
      }
    },
    sortFilteredProducts: (state, action) => {
      const newSortOption = action.payload;
      state.sortOption = newSortOption;
      state.filteredProducts = sortProducts(
        state.filteredProducts,
        newSortOption
      );
    },
  },
});

export const {
  setProducts,
  setFilteredProducts,
  setFilters,
  addFilter,
  removeFilter,
  sortFilteredProducts,
  setSortOption,
} = productsSlice.actions;

export default productsSlice.reducer;
