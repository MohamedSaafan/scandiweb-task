import {
  SET_ACTIVE_CATEGORY,
  SET_CATEGORIES,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_LOADING,
} from "../actions/types/categories";
const initialState = {
  status: "idle",
  categories: [],
  errorMessage: "",
  activeCategory: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        status: "idle",
        categories: [...action.payload],
        errorMessage: "",
        activeCategory: action.payload[0].name,
      };

    case SET_CATEGORIES_LOADING:
      return {
        ...state,
        status: "loading",
      };
    case SET_CATEGORIES_ERROR:
      return {
        ...state,
        categories: [],
        errorMessage: action.payload,
      };

    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
