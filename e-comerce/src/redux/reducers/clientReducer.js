const getUserFromStorage = () => {
  try {
    const userInfo = typeof window !== 'undefined' ? localStorage.getItem("userInfo") : null;
    return userInfo ? JSON.parse(userInfo) : {};
  } catch {
    return {};
  }
};

const initialState = {
  user: getUserFromStorage(),
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "",
  language: "",
  loading: false,
  error: null
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ROLES":
      return { ...state, roles: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default clientReducer;