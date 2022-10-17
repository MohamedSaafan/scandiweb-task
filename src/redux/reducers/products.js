import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_LOADING,
} from "../actions/types/products";

const inititialState = { products: [], status: "idle", errorMessage: "" };

const productsReducer = (state = inititialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      filteredProducts.push(action.payload);
      return { ...state, products: filteredProducts, status: "fullfilled" };

    case FETCH_PRODUCT_LOADING:
      return { ...state, status: "loading" };
    case FETCH_PRODUCT_LOADING:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default productsReducer;
