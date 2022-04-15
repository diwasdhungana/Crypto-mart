/* eslint-disable react/jsx-key */
import React from "react";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import {
  Paper,
  Link,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import Nextlink from "next/link";
import Image from "next/image";
import axios from "axios";

function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;

  const updateCartHandler = async (product, quantity) => {
    const data = await axios.get(`/api/products/${product._id}`);
    if (data.numInStock <= 0) {
      alert("Out of stock");
      return;
    }
    dispatch({ type: "CART_UPDATE_ITEM", payload: { ...product, quantity } });
  };
  const AddCartHandler = async (product) => {
    const data = await axios.get(`/api/products/${product._id}`);
    if (data.numInStock <= 0) {
      alert("Out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product } });
  };
  const RemoveCartHandler = async (product) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: { ...product } });
  };

  return (
    <Paper title="Cart">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <h2>No items in cart</h2>
          <Nextlink href="/"> Go Shopping </Nextlink>
        </div>
      ) : (
        <div>
          <h2>Items in cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <Nextlink href={`/product/${item.slug}`} passHref>
                  <Link>
                    {item.name}
                    {
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                    }
                  </Link>
                </Nextlink>
                {
                  <Select
                    value={item.quantity}
                    onChange={(e) => {
                      updateCartHandler(item, e.target.value);
                    }}
                  >
                    {[...Array(item.numInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                }
                {
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        RemoveCartHandler(item);
                      }}
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => {
                        AddCartHandler(item);
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                }
                {item.price}
                {
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      dispatch({
                        type: "CART_DELETE_ITEM",
                        payload: item,
                      });
                    }}
                  >
                    X
                  </Button>
                }
              </li>
            ))}
          </ul>
          <Button>
            <Nextlink href="/" passHref>
              <Link>Continue Shopping</Link>
            </Nextlink>
          </Button>
          <Button>
            <Nextlink href="/checkout" passHref>
              <Link>Checkout</Link>
            </Nextlink>
          </Button>
        </div>
      )}
    </Paper>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
