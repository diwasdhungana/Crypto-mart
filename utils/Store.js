import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
  },
  userInfo: Cookies.get("userInfoCryptomart")
    ? Cookies.get("userInfoCryptomart")
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
      Cookies.set("userInfoCryptomart", userInfo);
      // Cookies.set("userInfoCryptomart", JSON.stringify(userInfo));
      Cookies.set("token", userInfo.token);
      Cookies.set("userId", userInfo._id);
      Cookies.set("userName", userInfo.Firstname);
      Cookies.set("userEmail", userInfo.email);
      Cookies.set("isAdmin", userInfo.isAdmin);
      return { ...state, userInfo };
    //  return {...state, userInfo: action.payload}
    case "USER_LOGOUT":
      Cookies.remove("userInfoCryptomart");
      Cookies.remove("token");
      Cookies.remove("userId");
      Cookies.remove("userName");
      Cookies.remove("userEmail");
      Cookies.remove("isAdmin");
      Cookies.remove("cartItems");
      return { ...state, userInfo: null, cart: { cartItems: [] } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
