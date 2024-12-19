import axios from 'axios';

// Action Types
export const FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';

// Initial State
const initialState = {
  categories: [],
  status: 'idle',
  error: null
};

// Action Creators
export const fetchCategoriesStart = () => ({
  type: FETCH_CATEGORIES_START
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories
});

export const fetchCategoriesError = (error) => ({
  type: FETCH_CATEGORIES_ERROR,
  payload: error
});

// Thunk Action
export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/categories');
      // Validate and clean the data
      const validCategories = response.data
        .filter(category => category && category.name && category.gender)
        .map(category => ({
          ...category,
          name: category.name.trim(),
          gender: category.gender.trim(),
          rating: Number(category.rating) || 0
        }));
      dispatch(fetchCategoriesSuccess(validCategories));
    } catch (error) {
      dispatch(fetchCategoriesError(error.message));
    }
  };
};

// Reducer
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_START:
      return {
        ...state,
        status: 'loading'
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        categories: action.payload
      };
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        status: 'failed',
        error: action.payload
      };
    default:
      return state;
  }
};

export default categoryReducer;
