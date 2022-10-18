import {
  ADD_ITEM_TO_CART,
  DECREASE_QUANTITY_OF_PRODUCT,
  INCREASE_QUANTITY_OF_PRODUCT,
  REMOVE_ITEM_FROM_CART,
} from "../types/cart";
export const addToCart = (productId) => {
  return { type: ADD_ITEM_TO_CART, payload: productId };
};

export const removeFromCart = (productId) => {
  return { type: REMOVE_ITEM_FROM_CART, payload: productId };
};
export const increaseCartAmount = (productId) => {
  return { type: INCREASE_QUANTITY_OF_PRODUCT, payload: productId };
};
export const decreaseCartAmount = (productId) => {
  return { type: DECREASE_QUANTITY_OF_PRODUCT, payload: productId };
};
