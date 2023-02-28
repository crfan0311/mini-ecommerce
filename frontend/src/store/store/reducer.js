import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
} from "../../constants/type";

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return { ...state, products: action.payload };
    }
    case ADD_PRODUCT: {
      return { ...state, products: [...state.products, action.payload] };
    }
    case UPDATE_PRODUCT: {
      return {
        ...state,
        products: state.products.map((e) =>
          e.id == action.payload.id ? action.payload : e
        ),
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter((e) => e.id == action.payload.id),
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as storeReducer };
