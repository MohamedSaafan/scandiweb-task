import request, { gql } from "graphql-request";
import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_LOADING,
} from "../types/products";
import { baseUri } from "../../../api/consts";

export const fetchProduct = (id) => async (dispatch) => {
  console.log(id, "from id");

  const fetchProductQuery = gql`
    query getProduct($id: String!) {
      product(id: $id) {
        id
        gallery
        name
        category
        description
        brand
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
    console.log(response, "from response");
    dispatch({ type: FETCH_PRODUCT, payload: response.product });
  } catch (err) {
    console.log(err, "from err");
    dispatch({ type: FETCH_PRODUCT_ERROR, payload: err.message });
  }
};
