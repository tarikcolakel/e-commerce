import axios from "axios";
import { setRoles } from "./clientActions";

export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    const { roles } = getState().client;
    if (roles.length === 0) {
      try {
        const response = await axios.get("https://workintech-fe-ecommerce.onrender.com/roles");
        dispatch(setRoles(response.data));
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    }
  };
};
