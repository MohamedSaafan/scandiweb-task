import request, { gql } from "graphql-request";
import { baseUri } from "../../../api/consts";
import {
  SET_ACTIVE_CATEGORY,
  SET_CATEGORIES,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_LOADING,
} from "../types/categories";
const fetchCategoriesQuery = gql`
  {
    categories {
      name
      products {
        name
        id
        name
        gallery
        inStock
        prices {
          currency {
            symbol
            label
          }
          amount
        }
      }
    }
  }
`;
export const loadCategories = () => async (dispatch, getState) => {
  dispatch({
    type: SET_CATEGORIES_LOADING,
  });

  try {
    const response = await request(baseUri, fetchCategoriesQuery);
    dispatch({ type: SET_CATEGORIES, payload: response.categories });
    dispatch({
      type: SET_ACTIVE_CATEGORY,
      payload: response.categories[0].name,
    });
  } catch (err) {
    dispatch({
      type: SET_CATEGORIES_ERROR,
      payload: err.message,
    });
  }
};

export const setActiveCategory = (category) => {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload: category,
  };
};
