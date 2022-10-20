import request, { gql } from "graphql-request";
import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_LOADING,
} from "../types/products";
import { baseUri } from "../../../api/consts";

export const fetchProduct = (id) => async (dispatch) => {
  const fetchProductQuery = gql`
    query getProduct($id: String!) {
      product(id: $id) {
        id
        gallery
        name
        category
        description
        brand
        inStock
        prices {
          currency {
            symbol
            label
          }
          amount
        }
        attributes {
          name
          type
          id
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  `;
  dispatch({ type: FETCH_PRODUCT_LOADING });
  try {
    const response = await request({
      url: baseUri,
      document: fetchProductQuery,
      variables: { id },
    });
    dispatch({ type: FETCH_PRODUCT, payload: response.product });
  } catch (err) {
    console.log(err, "from err");
    dispatch({ type: FETCH_PRODUCT_ERROR, payload: err.message });
  }
};
export const fetchCartProducts = (cart) => (dispatch, getState) => {
  const state = getState();
  state.cart.forEach(async (cartProduct) => {
    let isFoundInProducts = false;

    state.products.products.forEach((product) => {
      if (cartProduct.id === product.id) isFoundInProducts = true;
    });

    if (!isFoundInProducts) {
      dispatch(fetchProduct(cartProduct.id));
    }
  });
};
