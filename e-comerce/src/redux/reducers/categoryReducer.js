import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Kategorileri çekmek için async thunk
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/categories');
    // Validate and clean the data
    const validCategories = response.data
      .filter(category => category && category.title && category.gender)
      .map(category => ({
        ...category,
        title: category.title.trim(),
        gender: category.gender.toLowerCase() === 'k' ? 'kadin' : 
                category.gender.toLowerCase() === 'e' ? 'erkek' : 
                category.gender.toLowerCase(),
        rating: Number(category.rating) || 0
      }));
    return validCategories;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default categorySlice.reducer;
