import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    loading: false,
    error: null,
    showAddressForm: false,
    selectedAddress: null
  },
  reducers: {
    fetchAddressesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAddressesSuccess: (state, action) => {
      state.addresses = action.payload;
      state.loading = false;
    },
    fetchAddressesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleAddressForm: (state) => {
      state.showAddressForm = !state.showAddressForm;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    }
  }
});

export const {
  fetchAddressesStart,
  fetchAddressesSuccess,
  fetchAddressesFailure,
  toggleAddressForm,
  setSelectedAddress
} = addressSlice.actions;

export default addressSlice.reducer; 