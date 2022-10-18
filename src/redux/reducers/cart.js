import {
  ADD_ITEM_TO_CART,
  DECREASE_QUANTITY_OF_PRODUCT,
  INCREASE_QUANTITY_OF_PRODUCT,
  REMOVE_ITEM_FROM_CART,
} from "../actions/types/cart";

const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, { id: action.payload, quantity: 1 }];

    case REMOVE_ITEM_FROM_CART:
      return state.filter((product) => product.id !== action.payload);

    case INCREASE_QUANTITY_OF_PRODUCT:
      return state.map((product) => {
        const id = action.payload;
        if (product.id === id) product.quantity++;
        return product;
      });

    case DECREASE_QUANTITY_OF_PRODUCT:
      let isLastElement = false;
      const products = state.map((product) => {
        const id = action.payload;
        if (product.id === id) product.quantity--;
        if (product.quantity === 0) isLastElement = true;
        return product;
      });
      if (isLastElement)
        return products.filter((product) => product.id !== action.payload);
      return products;

    default:
      return state;
  }
};
export default cartReducer;
