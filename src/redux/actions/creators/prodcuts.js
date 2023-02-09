import request, { gql } from "graphql-request";
import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_LOADING,
  SELECT_ACTIVE_PRODUCT_ATTRIBUTE,
} from "../types/products";
import { baseUri } from "../../../api/consts";
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
export const fetchProduct = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_LOADING });
  try {
    const response = await request({
      url: baseUri,
      document: fetchProductQuery,
      variables: { id },
    });
    const initializedAttributes = response.product.attributes.map((attr) => {
      attr.selected = attr.items[0];

      return attr;
    });
    console.log(initializedAttributes, "from initialized attributes");
    response.product.attributes = initializedAttributes;
    dispatch({ type: FETCH_PRODUCT, payload: response.product });
  } catch (err) {
    console.log(err, "from err fetching product");
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

export const selectActiveProductAttribute =
  (attributeId, itemId) => async (dispatch, getState) => {
    dispatch({
      type: SELECT_ACTIVE_PRODUCT_ATTRIBUTE,
      payload: { attributeId, itemId },
    });
  };
