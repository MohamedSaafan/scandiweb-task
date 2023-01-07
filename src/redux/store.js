import { configureStore } from "@reduxjs/toolkit";
import { loadCurrencyFromLocalStorage } from "../helpers/currencies-localStorage";
import rootReducer from "./reducers";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   /* preloadedState, */ composeEnhancers(applyMiddleware(reduxThunk))
// );

const store = configureStore({ reducer: rootReducer });

export default store;
