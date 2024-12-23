const initialState = {
    productList: [],
    total: 0,
    limit: 25,
    offset: 0,
    category: null,
    filter: "",
    sort: "",
    fetchState: "NOT_FETCHED",
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_PRODUCT_LIST":
        return { ...state, productList: action.payload };
      case "SET_TOTAL":
        return { ...state, total: action.payload };
      case "SET_FETCH_STATE":
        return { ...state, fetchState: action.payload };
      case "SET_CATEGORY":
        return { ...state, category: action.payload };
      case "SET_FILTER":
        return { ...state, filter: action.payload };
      case "SET_SORT":
        return { ...state, sort: action.payload };
      case "RESET_PRODUCTS":
        return { ...initialState };
      default:
        return state;
    }
  };
  
  export default productReducer;