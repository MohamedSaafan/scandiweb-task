import { combineReducers } from "redux";
import categoriesReducer from "./categories";
import currencyReducer from "./currency";

export default combineReducers({
  categories: categoriesReducer,
  currency: currencyReducer,
});
