import axios from "axios";

export const setCategories = (categories) => ({ type: "SET_CATEGORIES", payload: categories });
export const setProductList = (products) => ({ type: "SET_PRODUCT_LIST", payload: products });
export const setTotal = (total) => ({ type: "SET_TOTAL", payload: total });
export const setFetchState = (fetchState) => ({ type: "SET_FETCH_STATE", payload: fetchState });
export const setLimit = (limit) => ({ type: "SET_LIMIT", payload: limit });
export const setOffset = (offset) => ({ type: "SET_OFFSET", payload: offset });
export const setCategory = (categoryId) => ({ type: "SET_CATEGORY", payload: categoryId });
export const setFilter = (filterText) => ({ type: "SET_FILTER", payload: filterText });
export const setSort = (sortValue) => ({ type: "SET_SORT", payload: sortValue });

import { setProducts } from '../reducers/productReducer';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const { category, filter, sort, limit, offset } = getState().product;
      
      const queryParams = new URLSearchParams();
      
      // Pagination parametreleri
      queryParams.append('limit', limit);
      queryParams.append('offset', offset);
      
      if (category) {
        queryParams.append('category', category);
      }
      
      if (filter) {
        queryParams.append('filter', filter);
      }
      
      if (sort) {
        queryParams.append('sort', sort);
      }

      const queryString = queryParams.toString() 
        ? `?${queryParams.toString()}` 
        : '';
      
      const response = await axios.get(
        `https://workintech-fe-ecommerce.onrender.com/products${queryString}`
      );

      // Total ürün sayısını ve ürünleri güncelle
      dispatch(setProducts({
        products: response.data.products || [],
        total: response.data.total || 0
      }));

    } catch (error) {
      console.error('Ürünleri getirirken hata oluştu:', error);
      // Hata durumunda boş liste ve 0 total
      dispatch(setProducts({
        products: [],
        total: 0
      }));
    }
  }
};
