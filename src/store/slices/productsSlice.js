import { createSlice } from "@reduxjs/toolkit";
import sortProducts from "@/utils/sortProducts";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    sortOption: null,
    searchQuery: "",
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
    exactProductSearch: (state, action) => {
      const productId = action.payload;
      const exactProduct = state.products.find(
        (product) => product.id === productId
      );

      if (exactProduct) {
        state.filteredProducts = [exactProduct];
        state.searchQuery = `${exactProduct.brandName} ${exactProduct.modelName}`;
      }
    },
    searchProducts: (state, action) => {
      state.searchQuery = action.payload;

      let results = [...state.products];

      if (action.payload.trim() !== "") {
        const query = action.payload.toLowerCase();
        results = results.filter(
          (product) =>
            product.brandName.toLowerCase().includes(query) ||
            product.modelName.toLowerCase().includes(query)
        );
      }

      const { brandNames, categories, genders, colors, sizes } = state.filters;

      if (brandNames && brandNames.length > 0) {
        results = results.filter((product) =>
          brandNames.includes(product.brandName)
        );
      }

      if (categories && categories.length > 0) {
        results = results.filter((product) =>
          categories.includes(product.category)
        );
      }

      if (genders && genders.length > 0) {
        results = results.filter((product) => genders.includes(product.gender));
      }

      if (colors && colors.length > 0) {
        results = results
          .filter((product) =>
            product.colors.some((colorObj) => colors.includes(colorObj.color))
          )
          .map((product) => {
            return {
              ...product,
              colors: product.colors.filter((colorObj) =>
                colors.includes(colorObj.color)
              ),
            };
          });
      }

      if (sizes && sizes.length > 0) {
        results = results
          .filter((product) =>
            product.colors.some((colorObj) =>
              colorObj.sizes.some((sizeObj) => sizes.includes(sizeObj.size))
            )
          )
          .map((product) => {
            return {
              ...product,
              colors: product.colors
                .map((colorObj) => ({
                  ...colorObj,
                  sizes: colorObj.sizes.filter((sizeObj) =>
                    sizes.includes(sizeObj.size)
                  ),
                }))
                .filter((colorObj) => colorObj.sizes.length > 0),
            };
          });
      }

      state.filteredProducts = sortProducts(results, state.sortOption);
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
  searchProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
