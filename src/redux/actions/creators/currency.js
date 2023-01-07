import request, { gql } from "graphql-request";
import { baseUri } from "../../../api/consts";
import { persistCurrencyInLocalStorage } from "../../../helpers/currencies-localStorage";
import {
  SET_CURRENCY_LOADING,
  SET_CURRENCY_LOADING_ERROR,
} from "../types/categories";
import { SET_CURRENCIES, SET_CURRENT_CURRENCY } from "../types/currency";

const currenciesQuery = gql`
  query Currencies {
    currencies {
      label
      symbol
    }
  }
`;

export const loadCurrencies = () => async (dispatch) => {
  dispatch({ type: SET_CURRENCY_LOADING });
  try {
    const response = await request(baseUri, currenciesQuery);
    console.log(response, "from currencies response");
    dispatch({ type: SET_CURRENCIES, payload: response.currencies });
  } catch (err) {
    dispatch({ type: SET_CURRENCY_LOADING_ERROR, payload: err.message });
  }
};

export const setCurrentCurrency = (currency) => {
  persistCurrencyInLocalStorage(currency);
  return { type: SET_CURRENT_CURRENCY, payload: currency };
};
