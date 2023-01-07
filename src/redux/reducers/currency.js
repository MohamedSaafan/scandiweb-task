import { loadCurrencyFromLocalStorage } from "../../helpers/currencies-localStorage";
import {
  SET_CURRENCY_LOADING,
  SET_CURRENCY_LOADING_ERROR,
} from "../actions/types/categories";
import {
  SET_CURRENCIES,
  SET_CURRENT_CURRENCY,
} from "../actions/types/currency";
const initialState = {
  currencies: [],
  currentCurrency: loadCurrencyFromLocalStorage(),
  status: "idle",
  errorMessage: "",
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
        currentCurrency: loadCurrencyFromLocalStorage() || action.payload[0],
        status: "fullfilled",
      };
    case SET_CURRENT_CURRENCY:
      return { ...state, currentCurrency: action.payload };
    case SET_CURRENCY_LOADING:
      return { ...state, status: "loading", errorMessage: "" };
    case SET_CURRENCY_LOADING_ERROR:
      return {
        ...state,
        status: "error",
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
export default currencyReducer;
