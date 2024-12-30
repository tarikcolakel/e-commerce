import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    cards: [],
    loading: false,
    error: null,
    showCardForm: false,
    selectedCard: null
  },
  reducers: {
    fetchCardsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCardsSuccess: (state, action) => {
      state.cards = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCardsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleCardForm: (state) => {
      state.showCardForm = !state.showCardForm;
    },
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    }
  }
});

export const {
  fetchCardsStart,
  fetchCardsSuccess,
  fetchCardsFailure,
  toggleCardForm,
  setSelectedCard
} = cardSlice.actions;

export default cardSlice.reducer; 