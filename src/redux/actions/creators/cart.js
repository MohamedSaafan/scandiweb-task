import request, { gql } from "graphql-request";
import { baseUri } from "../../../api/consts";
import {
  ADD_ITEM_TO_CART,
  INCREASE_PRODUCT_AMOUNT,
  REMOVE_ITEM_FROM_CART,
  SET_CART_AMOUNT,
} from "../types/cart";
const getProductAttributesQuery = gql`
  query getProductAttributesDetails($productId: String!) {
    product(id: $productId) {
      attributes {
        id
        items {
          displayValue
          id
          value
        }
        name
        type
      }
    }
  }
`;

const isProductInCart = (productUUID, cart) => {
  console.log(cart, "from cart");
  const product = cart.find((product) => {
    return product.UUID === productUUID;
  });
  if (product) return product;
  return false;
};
const buildCartProductId = (productId, attributes) => {
  attributes.sort();
  let id = productId + ",";
  for (let i = 0; i < attributes.length; i++) {
    console.log(attributes[i].id, attributes[i].selected);
    id += attributes[i].id + ":" + attributes[i].selected;
  }
  return id;
};
export const addToCart = (productId, options) => async (dispatch, getState) => {
  const state = getState();
  let attributes;
  attributes = options;
  if (options === "defaultOptions") {
    // get the default Attributes and append it as a string;
    let defaultAttributes;
    try {
      const response = await request({
        url: baseUri,
        document: getProductAttributesQuery,
        variables: { productId },
      });
      defaultAttributes = response.product.attributes;
      // iterate over them and attach the default attribute
      defaultAttributes = defaultAttributes.map((attribute) => {
        attribute.selected = attribute.items[0].id;
        return attribute;
      });
      attributes = defaultAttributes;
    } catch (err) {
      console.log(err, "from error");
      // dispatch and error and refuse to put it to the cart
    }
  }
  const productUUID = buildCartProductId(productId, attributes);

  // check if the product in the cart or not
  const product = isProductInCart(productUUID, state.cart);
  if (product) return dispatch(increaseProductAmount(product.UUID));

  // iterate over every item and extract the id and the selected value correspons to it

  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: {
      productId,
      productUUID,
      options: attributes,
    },
  });
};

export const removeFromCart = (productId) => {
  return { type: REMOVE_ITEM_FROM_CART, payload: productId };
};
export const increaseProductAmount = (productUUID) => {
  return {
    type: INCREASE_PRODUCT_AMOUNT,
    payload: productUUID,
  };
};
export const setCartAmount = (productId, newAmount) => {
  if (newAmount === 0)
    return { type: REMOVE_ITEM_FROM_CART, payload: productId };
  return { type: SET_CART_AMOUNT, payload: { productId, newAmount } };
};
