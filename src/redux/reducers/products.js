import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_LOADING,
  SELECT_ACTIVE_PRODUCT_ATTRIBUTE,
} from "../actions/types/products";

const inititialState = {
  products: [],
  status: "idle",
  errorMessage: "",
  activeProduct: null,
};

const productsReducer = (state = inititialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      filteredProducts.push(action.payload);
      return {
        ...state,
        products: filteredProducts,
        status: "fullfilled",
        activeProduct: action.payload,
      };

    case FETCH_PRODUCT_LOADING:
      return { ...state, status: "loading" };
    case FETCH_PRODUCT_ERROR:
      return { ...state, errorMessage: action.payload };
    case SELECT_ACTIVE_PRODUCT_ATTRIBUTE:
      const currentAttributes = [...state.activeProduct.attributes];
      const newSelectedAttributes = currentAttributes.map((attr) => {
        const newAttr = { ...attr };
        if (attr.id === action.payload.attributeId) {
          newAttr.selected = action.payload.itemId;
        }
        return newAttr;
      });
      return {
        ...state,

        activeProduct: {
          ...state.activeProduct,
          attributes: [...newSelectedAttributes],
        },
      };

    default:
      return state;
  }
};
export default productsReducer;
