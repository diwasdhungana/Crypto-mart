/* eslint-disable react/jsx-key */
import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  ButtonGroup,
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
import data from "../../utils/data";
import { Store } from "../../utils/Store";

import useStyle from "../../utils/styles";

export default function ProductScreen(props) {
  const classes = useStyle();

  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const { Products } = data;
  let currency = "$";

  const addToCartHandler = async () => {
    const data = await axios.get(`/api/products/${product._id}`);
    if (data.numInStock <= 0) {
      alert("Out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });

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
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
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

      <Paper elevation={6} className={classes.for_you}>
        <Grid>
          <Typography variant="h1" align="center">
            Related Products
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {Products.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card>
                <Nextlink href={`/product/${item.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={item.name}
                      height="250"
                      image={item.image}
                      title={item.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="h4">
                        {item.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Nextlink>
                <CardActions>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.rating} &#11088;
                  </Typography>
                  <Typography variant="h5">
                    {currency}
                    {item.price}
                  </Typography>
                  <Button size="small" color="primary">
                    <h4>Add to cart</h4>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
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
