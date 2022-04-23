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
  const { product, Products } = props;
  // const { Products } = data;
  let currency = "$";
  const [incart, setInCart] = useState(false);

  const addToCartHandler = async () => {
    const data = await axios.get(`/api/products/${product._id}`);
    if (data.numInStock <= 0 || data.numInStock < product.quantity + 1) {
      alert("Out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
    setInCart(true);
    // router.push("/cart");

    //Quantity Amount
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.product_container} elevation={4}>
        <Grid container spacing={1}>
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
                <Typography component="h1" variant="h1">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="h3" variant="h4">
                  {product.rating} &#11088; ({product.numReviews}) Reviews
                </Typography>
              </ListItem>

              <ListItem>
                <Typography component="h2" variant="h2">
                  {" "}
                  Price:{" "}
                </Typography>
                <Typography component="h2" variant="h4">
                  {currency}
                  {product.price}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography component="h4" variant="h4">
                  Description: {product.description.short}
                </Typography>
              </ListItem>

              <ListItem>
                {!incart ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <>
                    <Button fullWidth variant="contained" color="secondary">
                      Added to Cart
                    </Button>
                    <br />
                    <Typography component="h5" variant="h5">
                      item can be removed from cart in MyCart page.
                    </Typography>
                  </>
                )}
              </ListItem>

              <ListItem>
                <Typography component="h2" variant="h2">
                  Category :
                </Typography>
                <Typography component="h4" variant="h4">
                  {product.category}
                </Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <div className={classes.product_details}>
          <Typography>Product Details:</Typography>
          <Typography component="h4" variant="h4">
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
