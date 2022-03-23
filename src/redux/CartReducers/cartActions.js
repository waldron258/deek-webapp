import * as actionTypes from "./cartTypes";

export const addToCart = (item, qty) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payLoad: {
      item: item,
      qty: qty,
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payLoad: {
      id: itemID,
    },
  };
};

export const adjustQty = (itemID, value) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payLoad: {
      id: itemID,
      qty: value,
    },
  };
};
