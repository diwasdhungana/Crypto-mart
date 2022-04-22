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
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import Nextlink from "next/link";
import Image from "next/image";
import axios from "axios";
import useStyle from "../utils/styles";

function CartScreen() {
  const classes = useStyle();
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
  let currency = "$";
  return (
    <Container className={classes.container}>
    <Paper title="Cart" className={classes.cart_container}>
      <Typography className={classes.topic}>Your Cart</Typography>
      {cartItems.length === 0 ? (
        <div>
          <Typography variant="h1">No items in cart</Typography>
          <Nextlink href="/"> 
          <Button className={classes.cart_shop}>
            Go Shopping
            </Button>
           </Nextlink>
        </div>
      ) : (
        <div>
          <Typography variant='h2'>Items Added to your Shopping Cart</Typography>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className={classes.cart_items}>
                <Nextlink href={`/product/${item.slug}`} passHref>
                  <Link className={classes.item_link}>
                    {
                      <Image
                        className={classes.item_image}
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={90}
                      />
                    }
      <span className={classes.item_name}>{item.name}</span>
      <span className={classes.item_rating}>{item.rating} &#11088; </span>
      <span className={classes.item_cat}>{item.category}</span>
                  </Link>
                </Nextlink>
                <span className={classes.item_price}>{item.price} {currency}</span>


                {
                  <ButtonGroup className={classes.item_button}>

                    <Button className={classes.item_control}
                      onClick={() => {
                        RemoveCartHandler(item);
                      }}
                    >
                      -
                    </Button>

                    <Select
                    components={{DropdownIndicator:() => null}}
                  className={classes.item_quantity}
                    value={item.quantity}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    
                    onChange={(e) => {
                      updateCartHandler(item, e.target.value);
                    }}
                  >
                    {[...Array(item.numInStock).keys()].map((x) => (
                      <MenuItem className={classes.item_menu} key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>

                    <Button className={classes.item_control}
                      onClick={() => {
                        AddCartHandler(item);
                      }}
                    >
                      +
                    </Button>
                    {

                }
                    
                  </ButtonGroup>
}
                  <Button className={classes.item_remove}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    dispatch({
                      type: "CART_DELETE_ITEM",
                      payload: item,
                    });
                  }}
                >
                  Remove
                </Button>

              </li>
            ))}
          </ul>       
          <Button className={classes.checkout_button}  style={{position:'relative', bottom:'17rem', right:'12.5rem'}}>
            <Nextlink href="/" passHref>
              <Link style={{textDecoration:'none'}}>Continue Shopping</Link>
            </Nextlink>
          </Button>
          <Button className={classes.checkout_button} style={{position:'relative', right:'5rem'}}>
            <Nextlink href="/checkout" passHref>
              <Link style={{textDecoration:'none'}}>Proceed To Checkout</Link>
            </Nextlink>
          </Button>
        </div>
      )}
    </Paper>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
