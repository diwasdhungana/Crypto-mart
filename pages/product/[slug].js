/* eslint-disable react/jsx-key */
import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Grid,
  List,
  ListItem,
  Typography,
  Button,
  Container,
  Paper,
} from "@material-ui/core";
import Nextlink from "next/link";
import Image from "next/image";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";
import useStyle from "../../utils/styles";
import { useRouter } from "next/router";
import ForYou from "../../components/for_you";

export default function ProductScreen(props) {
  const classes = useStyle();
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const { product, Products } = props;
  let currency = "$";
  const addToCartHandler = async () => {
    const data = await axios.get(`/api/products/${product._id}`);
    if (data.numInStock <= 0 || data.numInStock < product.quantity + 1) {
      alert("Out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
    // router.push("/cart");

    //Quantity Amount
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.product_container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} className={classes.product_img}>
            <Image
              src={product.image}
              alt={product.name}
              height={250}
              width={200}
              layout="responsive"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <List>
              <ListItem>
                <Typography
                  component="h1"
                  variant="h1"
                  style={{ fontSize: "35px" }}
                  color="primary"
                >
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="h3" variant="h4" color="primary">
                  {product.rating} &#11088; ({product.numReviews}) Reviews
                </Typography>
              </ListItem>

              <ListItem>
                <Typography component="h2" variant="h2" color="primary">
                  <span style={{ fontWeight: "bold" }}>Price: </span>
                </Typography>
                <Typography component="h2" variant="h2" color="primary">
                  {currency}
                  {product.price}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography component="h4" variant="h4" color="primary">
                  <span style={{ fontWeight: "bold" }}>Description: <span style={{ fontWeight: "200" }}>{product.description.short}</span> </span>{" "}
                </Typography>
                <Typography component="h4" variant="h4" color="primary">
                 
                </Typography>
              </ListItem>

              <ListItem>
                <Typography component="h4" variant="h4" color="primary">
                  <span style={{ fontWeight: "bold" }}>Category: </span>
                </Typography>
                <Typography component="h4" variant="h4" color="primary">
                  {product.category}
                </Typography>
              </ListItem>

              <ListItem>
                {cartItems.find(({ slug }) => slug === product.slug) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "120%" }}
                  >
                    Added to Cart
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"s
                    onClick={addToCartHandler}
                    className={classes.log_button}
                  >
                    Add to Cart
                  </Button>
                )}
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <br></br>
        <div className={classes.product_details}>
          <Typography
            component="h1"
            variant="h1"
            style={{ 'fontSize': '25px' }}
            color="primary"
          >
            Product Details:
          </Typography>
          <Typography
            component="h4"
            variant="h4"
            style={{ fontSize: "16px" }}
            color="primary"
          >
            {product.description.long}
          </Typography>
        </div>
      </Paper>
      <ForYou Products={Products} Name="Related Products" />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  // const { params } = context;
  // const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  const Products = await Product.find({ category: product.category }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocumentToObject(product),
      Products: Products.map(db.convertDocumentToObject),
    },
  };
}
