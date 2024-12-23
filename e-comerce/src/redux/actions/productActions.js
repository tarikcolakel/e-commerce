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

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setFetchState("FETCHING"));
      
      const { category, filter, sort } = getState().product;
      
      // Dinamik query parametreleri oluştur
      const queryParams = new URLSearchParams();
      
      // Kategori parametresi
      if (category) {
        queryParams.append('category', category);
      }
      
      // Filtre parametresi
      if (filter) {
        queryParams.append('filter', filter);
      }
      
      // Sıralama parametresi
      if (sort) {
        queryParams.append('sort', sort);
      }
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      
      const response = await axios.get(`https://workintech-fe-ecommerce.onrender.com/products${queryString}`);
      
      dispatch(setTotal(response.data.total || 0));
      dispatch(setProductList(response.data.products || []));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error("Ürünler yüklenirken hata oluştu:", error);
      dispatch(setFetchState("FAILED"));
      dispatch(setTotal(0));
      dispatch(setProductList([]));
    }
  };
};
