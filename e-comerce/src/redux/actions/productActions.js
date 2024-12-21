import axios from "axios";

export const setCategories = (categories) => ({ type: "SET_CATEGORIES", payload: categories });
export const setProductList = (products) => ({ type: "SET_PRODUCT_LIST", payload: products });
export const setTotal = (total) => ({ type: "SET_TOTAL", payload: total });
export const setFetchState = (fetchState) => ({ type: "SET_FETCH_STATE", payload: fetchState });
export const setLimit = (limit) => ({ type: "SET_LIMIT", payload: limit });
export const setOffset = (offset) => ({ type: "SET_OFFSET", payload: offset });
export const setFilter = (filter) => ({ type: "SET_FILTER", payload: filter });

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(setFetchState("FETCHING")); // Yükleme durumunu başlat
      
      const response = await axios.get("https://workintech-fe-ecommerce.onrender.com/products");
      
      dispatch(setTotal(response.data.total));
      dispatch(setProductList(response.data.products));
      dispatch(setFetchState("FETCHED")); // Yükleme tamamlandı
    } catch (error) {
      console.error("Ürünler yüklenirken hata oluştu:", error);
      dispatch(setFetchState("FAILED")); // Hata durumu
    }
  };
};
