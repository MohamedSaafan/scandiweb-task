export const countCartProducts = (cart) => {
  return cart.reduce((prev, product) => product.quantity + prev, 0);
};
export const extractCartProductsDetails = (products, cart) => {
  return cart.map((item) => {
    const product = products.find((product) => product.id === item.id);
    if (product) return { product, amount: item.quantity };
  });
};
