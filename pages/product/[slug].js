/* eslint-disable react/jsx-key */
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import {
  Link,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  Container,
} from "@material-ui/core";
import Nextlink from "next/link";
import Image from "next/image";
import Product from "../../models/Product";
import db from "../../utils/db";
import Store from "../../utils/Store";

import useStyle from "../../utils/styles";

export default function ProductScreen(props) {
  const classes = useStyle();
  // const { dispatch } = useContext(Store);
  const { product } = props;
  let currency = "$";
  const addToCartHandler = async () => {
    const data = await axios.get(`/api/products/${product._id}`);
    if (data.numInStock <= 0) {
      alert("Out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
  };
  return (
    
    <Container className={classes.container}>
    <Layout title={product.name} description={product.description.long}>
      <div>
        <Nextlink href={"/"} passHref>
          <Link>
            <h1>{"<return"}</h1>
          </Link>
        </Nextlink>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4}>
          <Image
            src={product.image}
            alt={product.name}
            height={100}
            width={100}
            layout="responsive"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h3">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component="h4" variant="h4">
                category : {product.category}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component="h4" variant="h4">
                rating : {product.rating} &#11088; ({product.numReviews})
                Reviews
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component="h4" variant="h4">
                description : {product.description.short}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography> price :</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography>
                      {currency} {product.price}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography>Status :</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography>
                      {product.numInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  <Typography>Add to cart</Typography>
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
    </Container>
  );
}

export async function getStaticPaths(slug) {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  // const { params } = context;
  // const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocumentToObject(product),
    },
  };
}
