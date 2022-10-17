import { combineReducers } from "redux";
import categoriesReducer from "./categories";
import currencyReducer from "./currency";
import productsReducer from "./products";

export default combineReducers({
  categories: categoriesReducer,
  currency: currencyReducer,
  products: productsReducer,
});
