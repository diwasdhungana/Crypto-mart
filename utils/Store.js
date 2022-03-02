import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get("darkMode") === "true" ? true : false,
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return { ...Store, darkMode: true };
    case "TOGGLE_LIGHT_MODE":
      return { ...Store, darkMode: false };
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.product._id === newItem.product._id
      );
      let cartItems;
      if (existItem) {
        cartItems = state.cart.cartItems.map((item) => {
          if (item.product._id === newItem.product._id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        cartItems = [...state.cart.cartItems, newItem];
      }
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
