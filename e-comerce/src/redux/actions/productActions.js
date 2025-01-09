import axios from "axios";
import { 
  setProducts, 
  setTotal,
  fetchProductDetailStart,
  fetchProductDetailSuccess,
  fetchProductDetailFailure 
} from '../reducers/productReducer';

const BASE_URL = 'https://workintech-fe-ecommerce.onrender.com';

// Action Types
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_FETCH_STATE = "SET_FETCH_STATE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_FILTER = "SET_FILTER";
export const SET_SORT = "SET_SORT";

// Action Creators
export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState });
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setCategory = (categoryId) => ({ type: SET_CATEGORY, payload: categoryId });
export const setFilter = (filterText) => ({ type: SET_FILTER, payload: filterText });
export const setSort = (sortValue) => ({ type: SET_SORT, payload: sortValue });

// Thunk Actions
export const fetchProducts = (options = {}) => {
  return async (dispatch, getState) => {
    try {
      const state = getState().product;
      const { category, filter, sort, limit, offset } = { ...state, ...options };
      
      const queryParams = new URLSearchParams();
      
      // Kategori parametresi
      if (category) {
        queryParams.append('category', category);
      }
      
      // Pagination parametreleri
      if (limit) {
        queryParams.append('limit', limit);
      }
      if (offset) {
        queryParams.append('offset', offset);
      }
      
      // Filtre ve sıralama parametreleri
      if (filter) {
        queryParams.append('filter', filter);
      }
      if (sort) {
        queryParams.append('sort', sort);
      }

      const queryString = queryParams.toString() 
        ? `?${queryParams.toString()}` 
        : '';
      
      console.log('Fetching URL:', `${BASE_URL}/products${queryString}`);
      const response = await axios.get(`${BASE_URL}/products${queryString}`);
      console.log('API Response:', response.data);

      dispatch(setProducts(response.data.products || []));
      dispatch(setTotal(response.data.total || 0));

    } catch (error) {
      console.error('Ürünleri getirirken hata oluştu:', error);
      dispatch(setProducts([]));
      dispatch(setTotal(0));
    }
  };
};

// Ürün detayı için thunk action
export const fetchProductDetail = (productId) => {
  return async (dispatch) => {
    dispatch(fetchProductDetailStart());
    
    try {
      const response = await axios.get(`${BASE_URL}/products/${productId}`);
      
      dispatch(fetchProductDetailSuccess(response.data));
    } catch (error) {
      console.error('Ürün detayı getirilirken hata oluştu:', error);
      dispatch(fetchProductDetailFailure(error.message));
    }
  };
};
