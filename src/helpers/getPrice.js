export const getPrice = (product, currentCurrency) => {
  if (!currentCurrency || !product) return null;

  return product.prices.find(
    (price) => price.currency.symbol === currentCurrency.symbol
  );
};
