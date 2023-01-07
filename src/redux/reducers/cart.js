import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SET_CART_AMOUNT,
} from "../actions/types/cart";

const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, { id: action.payload, quantity: 1 }];

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

    default:
      return state;
  }
};
export default cartReducer;
