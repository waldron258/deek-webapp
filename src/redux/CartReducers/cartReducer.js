import * as actionTypes from "./cartTypes";
import Cookies from "js-cookie";

const INITIAL_STATE = {
  cart: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  let cart;
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      let item = action.payLoad.item;
      const isOnCart = state.cart.find((item) =>
        item.id === action.payLoad.item.id ? true : false
      );
      cart = isOnCart
        ? state.cart.map((item) =>
            item.id === action.payLoad.item.id
              ? { ...item, qty: item.qty + action.payLoad.qty }
              : item
          )
        : [...state.cart, { ...item, qty: action.payLoad.qty }];
      Cookies.set("cartItems", JSON.stringify(cart));
      return {
        ...state,
        cart: cart,
      };
    case actionTypes.REMOVE_FROM_CART:
      cart = state.cart.filter((item) => item.id !== action.payLoad.id);
      if (cart.length === 0) {
        Cookies.remove("cartItems");
      } else {
        Cookies.set("cartItems", JSON.stringify(cart));
      }
      return {
        ...state,
        cart: cart,
      };
    case actionTypes.ADJUST_QTY:
      cart = state.cart.map((item) =>
        //item.id lo que hay
        {
          return item.id === action.payLoad.id
            ? { ...item, qty: action.payLoad.qty }
            : item;
        }
      );
      Cookies.set("cartItems", JSON.stringify(cart));
      return {
        ...state,
        cart: cart,
      };
    default:
      return state;
  }
};
