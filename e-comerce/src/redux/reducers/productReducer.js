import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],  // products olarak düzeltildi
    total: 0,
    limit: 25,
    offset: 0,
    currentPage: 1,
    category: null,
    filter: '',
    sort: ''
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
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
    }
  }
});

export const { 
  setProducts, 
  setLimit, 
  setOffset, 
  setCurrentPage, 
  setCategory, 
  setFilter, 
  setSort 
} = productSlice.actions;

export default productSlice.reducer;