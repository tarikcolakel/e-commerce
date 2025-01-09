import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    total: 0,
    limit: 25,
    offset: 0,
    currentPage: 1,
    category: null,
    filter: '',
    sort: '',
    currentProduct: null,
    loading: false,
    error: null
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.offset = (action.payload - 1) * state.limit;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.offset = 0;
      state.currentPage = 1;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.offset = 0;
      state.currentPage = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.offset = 0;
      state.currentPage = 1;
    },
    fetchProductDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.currentProduct = action.payload;
      state.error = null;
    },
    fetchProductDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentProduct = null;
    }
  }
});

export const {
  setProducts,
  setTotal,
  setLimit,
  setOffset,
  setCurrentPage,
  setCategory,
  setFilter,
  setSort,
  fetchProductDetailStart,
  fetchProductDetailSuccess,
  fetchProductDetailFailure
} = productSlice.actions;

export default productSlice.reducer;