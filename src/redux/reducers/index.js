import { combineReducers } from "redux";
import categoriesReducer from "./categories";
import currencyReducer from "./currency";
import productsReducer from "./products";
import cartReducer from "./cart";
export default combineReducers({
  categories: categoriesReducer,
  currency: currencyReducer,
  products: productsReducer,
  cart: cartReducer,
});
