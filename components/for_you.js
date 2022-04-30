import Nextlink from "next/link";
import {
  Card,
  Paper,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";

import useStyle from "../utils/styles";
import axios from "axios";
import { Store } from "../utils/Store";
import React, { useContext, useState } from "react";
import Image from "next/image";

import StarRateTwoToneIcon from "@mui/icons-material/StarRateTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ForYou = (props) => {
  const classes = useStyle();
  let currency = "$";
  const Products = props.Products;
  const Name = props.Name;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  console.log("CartItems", cartItems);

  const namehandler = (e) => {
    let name = "";
    for (let i = 0; i < 60; i++) {
      e[i] ? (name += e[i]) : (name += " ");
    }
    return name;
  };

  return (
    <Paper className={classes.for_you}>
      <Grid>
        <Typography variant="h1" className={classes.topic} align="center">
          {Name}
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {Products.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card
              style={{
                minHeight: "360px",
                background: "transparent",
                boxShadow: "none",
              }}
              className={classes.product_card}
            >
              <Nextlink href={`/product/${item.slug}`} passHref>
                <CardActionArea style={{ background: "transparent" }}>
                  <CardMedia
                    component="img"
                    alt={item.name}
                    height="250"
                    image={item.image}
                    title={item.name}
                    style={{ borderRadius: "8px 8px 0 0" }}
                  ></CardMedia>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h2"
                      component="h2"
                      style={{
                        position: "relative",
                        bottom: "10px",
                        display: "inline",
                        maxLength: 20,
                      }}
                    >
                      {namehandler(item.name)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Nextlink>
              <CardActions>
                <FavoriteIcon
                  style={{
                    color: "red",
                    fontSize: "20px",
                    position: "relative",
                    top: "3px",
                  }}
                  sx={{ fontSize: "20px" }}
                ></FavoriteIcon>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.rating}{" "}
                  <StarRateTwoToneIcon
                    style={{
                      color: "#ffc107",
                      fontSize: "20px",
                      position: "relative",
                      top: "3px",
                    }}
                    sx={{ fontSize: "20px" }}
                  ></StarRateTwoToneIcon>
                </Typography>
                <Typography variant="h5" style={{ fontSize: "14px" }}>
                  {currency}
                  {item.price}
                </Typography>
                {cartItems.find(({ slug }) => slug === item.slug) ? (
                  <Button size="small" color="primary">
                    Added to Cart
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="secondary"
                    onClick={async () => {
                      const data = await axios.get(`/api/products/${item._id}`);
                      if (
                        data.numInStock <= 0 ||
                        data.numInStock < item.quantity + 1
                      ) {
                        alert("Out of stock");
                        return;
                      }
                      dispatch({
                        type: "CART_ADD_ITEM",
                        payload: { ...item, quantity: 1 },
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ForYou;
