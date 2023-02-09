import {
  ADD_ITEM_TO_CART,
  INCREASE_PRODUCT_AMOUNT,
  REMOVE_ITEM_FROM_CART,
  SET_CART_AMOUNT,
} from "../actions/types/cart";

const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [
        ...state,
        {
          id: action.payload.productId,
          UUID: action.payload.productUUID,
          quantity: 1,
          options: action.payload.options,
        },
      ];

    case REMOVE_ITEM_FROM_CART:
      return [...state.filter((product) => product.id !== action.payload)];

    case SET_CART_AMOUNT:
      const product = state.find(
        (product) => product.id === action.payload.productId
      );
      return [
        ...state.filter((product) => product.id !== action.payload.productId),
        { ...product, quantity: action.payload.newAmount },
      ];
    case INCREASE_PRODUCT_AMOUNT: {
      const product = state.find((product) => product.UUID === action.payload);
      console.log(product, "from product");
      const filteredProducts = state.filter(
        (product) => product.UUID !== action.payload
      );
      return [
        ...filteredProducts,
        {
          ...product,
          quantity: product.quantity + 1,
        },
      ];
    }

    default:
      return state;
  }
};
export default cartReducer;
