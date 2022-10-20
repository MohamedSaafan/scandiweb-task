const buildLocalStorageKey = (optionId, productId) => {
  return `${productId}Option${optionId}`;
};
export const setLocalStorageOption = (optionId, productId, optionValue) => {
  const key = buildLocalStorageKey(optionId, productId);
  const stringifiedValue = JSON.stringify(optionValue);
  localStorage.setItem(key, stringifiedValue);
};

export const getLocalStorageOption = (optionId, productId) => {
  const key = buildLocalStorageKey(optionId, productId);
  return JSON.parse(localStorage.getItem(key));
};
