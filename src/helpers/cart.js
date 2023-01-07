import { getPrice } from "./getPrice";

export const countCartProducts = (cart) => {
  return cart.reduce((prev, product) => product.quantity + prev, 0);
};
export const getCartProducts = (products, cart) => {
  return cart.map((item) => {
    const product = products.find((product) => product.id === item.id);
    if (product) return { product, amount: item.quantity };
    return undefined;
  });
};

export const calculateTotalPrice = (cartProducts, currentCurrency) => {
  let price = 0;

  cartProducts.forEach((product) => {
    price += getPrice(product.product, currentCurrency).amount * product.amount;
  });
  return price;
};
