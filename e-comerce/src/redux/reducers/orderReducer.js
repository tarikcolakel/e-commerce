import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure
} = orderSlice.actions;

export default orderSlice.reducer; 