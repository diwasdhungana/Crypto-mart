import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get("darkMode") === "true" ? true : false,
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
  },
  userInfo: Cookies.get("userInfoCryptomart")
    ? JSON.parse(Cookies.get("userInfoCryptomart"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      let cartItems;
      if (existItem) {
        cartItems = state.cart.cartItems.map((item) => {
          if (item._id == newItem._id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        console.log("firstitem", newItem._id);
        cartItems = [...state.cart.cartItems, newItem];
      }
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_UPDATE_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      let cartItems;
      if (existItem) {
        cartItems = state.cart.cartItems.map((item) => {
          if (item._id == newItem._id) {
            return { ...item, quantity: newItem.quantity };
          }
          return item;
        });
      } else {
        console.log("firstitem", newItem._id);
        cartItems = [...state.cart.cartItems, newItem];
      }
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      let cartItems;
      if (existItem) {
        cartItems = state.cart.cartItems.map((item) => {
          if (item._id == newItem._id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      } else {
        console.log("firstitem", newItem._id);
        cartItems = [...state.cart.cartItems, newItem];
      }
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_DELETE_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.filter(
        (item) => item._id !== newItem._id
      );
      Cookies.set("cartItems", JSON.stringify(existItem));
      return { ...state, cart: { ...state.cart, cartItems: existItem } };
    }

    case "USER_LOGIN": 
      const userInfo = action.payload;
      console.log("userInfo", userInfo);
      Cookies.set("userInfoCryptomart", JSON.stringify(userInfo));
      return { ...state, userInfo };
      //  return {...state, userInfo: action.payload}
    case "USER_LOGOUT":
      return { ...state, userInfo: null,cart:{cartItems:[]} };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
