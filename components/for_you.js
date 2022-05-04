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
import { height } from "@mui/system";

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
        <Typography
          variant="h1"
          className={classes.topic}
          align="center"
          color="primary"
        >
          {Name}
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {Products.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card
              style={{
                minHeight: "380px",
                maxHeight: "380px",
                // minWidth: "220px",
                // maxWidth: "220px",
                backgroundColor: "#1b1b1b",
                // boxShadow: "none",
              }}
              className={classes.product_card}
            >
              <Nextlink href={`/product/${item.slug}`} passHref>
                <CardActionArea
                  style={{ backgroundColor: "rgb(231 231 231)", height: "310px" }}
                >
                  <CardMedia
                    component="img"
                    alt={item.name}
                    height="250"
                    image={item.image}
                    title={item.name}
                    style={{ backgroundColor: "white" }}
                  ></CardMedia>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h2"
                      component="h2"
                      color="primary"
                      style={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        position: "relative",
                        bottom: "10px",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Nextlink>
              <CardActions
                style={{
                  backgroundColor: "rgb(205 205 205)",
                  top: "0rem",
                  paddingTop: "0rem",
                  width: "100%",
                  height: "90px",
                }}
              >
                <FavoriteIcon
                  style={{
                    color: "red",
                    fontSize: "23px",
                    position: "absolute",
                    top: "0.5rem",
                    left: "1rem",
                  }}
                  sx={{ fontSize: "20px" }}
                ></FavoriteIcon>
                <Typography
                  variant="h5"
                  style={{
                    fontSize: "20px",
                    position: "absolute",
                    top: "2rem",
                    left: "0.5rem",
                  }}
                  color="primary"
                >
                  {item.rating}
                </Typography>
                <StarRateTwoToneIcon
                  style={{
                    color: "#ffc107",
                    fontSize: "20px",
                    position: "absolute",
                    top: "2.2rem",
                    left: "2rem",
                  }}
                  sx={{ fontSize: "20px" }}
                ></StarRateTwoToneIcon>
                <Typography
                  variant="h5"
                  style={{
                    fontSize: "20px",
                    position: "absolute",
                    top: "0.5rem",
                    right: "1rem",
                  }}
                  color="primary"
                >
                  {currency}
                  {item.price}
                </Typography>
                {cartItems.find(({ slug }) => slug === item.slug) ? (
                  <Button
                    size="small"
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      color: "red",
                    }}

                  >
                    Added to Cart
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="black"
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                    }}
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
