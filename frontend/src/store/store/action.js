import { ADD_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS, UPDATE_PRODUCT } from "../../constants/type";
import axios from "../../util/api";

export const fetchProducts = () => {
  return async (dispatch) => {
    return await axios.get("products").then(({ data }) => {
      return dispatch({
        type: FETCH_PRODUCTS,
        payload: data.products,
      });
    });
  };
};

export const addProduct = (data) => {
  return async (dispatch) => {
    return await axios
      .post("products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        return dispatch({
          type: ADD_PRODUCT,
          payload: data.product,
        });
      });
  };
};

export const updateProduct = (data, id) => {
  return async (dispatch) => {
    return await axios
      .post(`products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        return dispatch({
          type: UPDATE_PRODUCT,
          payload: data.product,
        });
      });
  };
};


export const deleteProduct = (id) => {
  return async (dispatch) => {
    return await axios
      .delete(`products/${id}`)
      .then(() => {
        return dispatch({
          type: DELETE_PRODUCT,
          payload: id,
        });
      });
  };
};
