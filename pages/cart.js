/* eslint-disable react/jsx-key */
import React, { useState } from "react";
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
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
} from "@material-ui/core";
import Nextlink from "next/link";
import Image from "next/image";
import axios from "axios";
import useStyle from "../utils/styles";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

function CartScreen() {
  const classes = useStyle();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  console.log(cartItems);
  const [quantity, setQuantity] = useState(0);

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
    // console.log("Quantity", product.quantity);
    // console.log("Instock", product.numInStock);
    if (product.quantity == product.numInStock) {
      alert("Max available quantity Selected");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product } });
  };
  const RemoveCartHandler = async (product) => {
    if (product.quantity == 1) {
      return;
    }
    dispatch({ type: "CART_REMOVE_ITEM", payload: { ...product } });
  };
  let currency = "$";
  return (
    <Container className={classes.container}>
      <Paper title="Cart" className={classes.cart_container}>
        <Typography className={classes.topic} color="primary">
          Your Cart
        </Typography>
        {cartItems.length === 0 ? (
          <div>
            <Typography variant="h1" color="primary">
              No items in cart
            </Typography>
            <Nextlink href="/" passHref>
              <Button
                className={classes.cart_shop}
                variant="contained"
                type="submit"
                color="primary"
              >
                Go Shopping
              </Button>
            </Nextlink>
          </div>
        ) : (
          <div>
            <Nextlink href="/" passHref>
              <Link style={{ textDecoration: "none" }}>
                <Button
                  style={{ margin: "-10% 74% 0 0" }}
                  className={classes.log_button}
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Continue Shopping
                </Button>
              </Link>
            </Nextlink>
            <Typography variant="h2" color="primary">
              Items Added to your Shopping Cart
            </Typography>

            <ul>
              {cartItems.map((item) => (
                <Grid container direction="column" spacing={2}>
                  <div key={item._id} className={classes.cart_items}>
                    <Nextlink href={`/product/${item.slug}`} passHref>
                      <Link className={classes.item_link}>
                        <Box className={classes.item_img}>
                          <Image
                            style={{
                              position: "relative",
                              left: "1rem",
                            }}
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                          />
                        </Box>
                      </Link>
                    </Nextlink>

                    <Box className={classes.item_name}>
                      <Typography
                        className={classes.item_name_text}
                        style={{
                          fontSize: "1.2rem",
                          position: "absolute",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflowY: "hidden",
                          width: "30rem",
                          overflowX: "hidden",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>

                    <Box className={classes.item_rating}>
                      <Typography>{item.rating} &#11088; </Typography>
                    </Box>

                    <Box className={classes.item_cat}>
                      <Typography>{item.category}</Typography>
                    </Box>
                    <Box>
                      <Typography className={classes.item_price}>
                        {item.price} {currency}
                      </Typography>
                    </Box>

                    <Box>
                      <ButtonGroup className={classes.item_button}>
                        <Button
                          className={classes.item_control}
                          color="primary"
                          onClick={() => {
                            RemoveCartHandler(item);
                          }}
                        >
                          -
                        </Button>
                        <Select
                          className={classes.item_quantity}
                          value={item.quantity}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color="primary"
                          onChange={(e) => {
                            updateCartHandler(item, e.target.value);
                          }}
                          style={{ backgroundColor: "#2b2b2b", color: "white" }}
                        >
                          {[...Array(item.numInStock).keys()].map((x) => (
                            <MenuItem
                              className={classes.item_menu}
                              key={x + 1}
                              value={x + 1}
                            >
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                        <Button
                          color="primary"
                          className={classes.item_control}
                          onClick={() => {
                            AddCartHandler(item);
                          }}
                        >
                          +
                        </Button>
                        )
                      </ButtonGroup>
                    </Box>

                    <Box>
                      <IconButton
                        className={classes.item_remove}
                        aria-label="delete"
                        onClick={() => {
                          dispatch({
                            type: "CART_DELETE_ITEM",
                            payload: item,
                          });
                        }}
                      >
                        <CancelPresentationIcon
                          style={{ fontSize: "25px", color: "red" }}
                        ></CancelPresentationIcon>
                      </IconButton>
                    </Box>
                    <Box>
                      <Typography className={classes.item_total_price}>
                        <Typography style={{ fontSize: "15px", margin: "0px" }}>
                          Total
                        </Typography>
                        {item.price * item.quantity} {currency}
                      </Typography>
                    </Box>
                  </div>
                </Grid>
              ))}
            </ul>

            <Nextlink href="/checkout" passHref>
              <Link style={{ textDecoration: "none" }}>
                <Button
                  className={classes.checkout_button}
                  color="primary"
                  variant="contained"
                >
                  Proceed To Checkout
                </Button>
              </Link>
            </Nextlink>
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
