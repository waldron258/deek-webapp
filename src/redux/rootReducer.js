import { combineReducers } from "redux";

import { cartReducer } from "./CartReducers/cartReducer";

export const rootReducer = combineReducers({ cart: cartReducer });
