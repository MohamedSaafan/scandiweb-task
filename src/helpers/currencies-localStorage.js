export const loadCurrencyFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("currency"));
};
export const persistCurrencyInLocalStorage = (currency) => {
  localStorage.setItem("currency", JSON.stringify(currency));
};
