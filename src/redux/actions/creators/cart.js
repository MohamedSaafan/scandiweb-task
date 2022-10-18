import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SET_CART_AMOUNT,
} from "../types/cart";
export const addToCart = (productId) => {
  return { type: ADD_ITEM_TO_CART, payload: productId };
};

export const removeFromCart = (productId) => {
  return { type: REMOVE_ITEM_FROM_CART, payload: productId };
};
export const setCartAmount = (productId, newAmount) => {
  if (newAmount === 0)
    return { type: REMOVE_ITEM_FROM_CART, payload: productId };
  return { type: SET_CART_AMOUNT, payload: { productId, newAmount } };
};
