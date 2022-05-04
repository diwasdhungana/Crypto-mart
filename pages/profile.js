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
  Container,
} from "@material-ui/core";

//Web3 Imports
import useStyle from "../utils/styles";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useTokenPrice,
} from "react-moralis";
import { useState, useEffect } from "react";
import Moralis from "moralis";

import axios from "axios";
import { Store } from "../utils/Store";
import React, { useContext } from "react";

import Nextlink from "next/link";
import data from "../utils/data";


import StarRateTwoToneIcon from "@mui/icons-material/StarRateTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Dash(coins) {
  const { logout, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const classes = useStyle();
  const [ethBalance, setEthBalance] = useState();

  let currency = "$";
  const { Products } = data;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  console.log("CartItems", cartItems);

  const fetchNativeBalance = async () => {
    const result = await Web3Api.account
      .getNativeBalance({
        chain: "matic",
      })
      .catch((e) => console.log(e));
    if (result.balance) {
      setEthBalance(Moralis.Units.FromWei(result.balance));
    }
  };
  useEffect(() => {
    fetchNativeBalance();
  });

  return (
    <Container className={classes.container}>
      <Paper elevation={4} className={classes.profile_container}>
        <Grid>
          <Typography color="primary">
            <h1>Your PortoFolio!</h1>
            <h2>Balance:{ethBalance} MATIC </h2>
          </Typography>
          <button onClick={logout} className={classes.connect}>
            Disconnect
          </button>
        </Grid>
      </Paper>

      <Paper elevation={6} className={classes.for_you}>
        <Grid>
          <Typography variant="h1" align="center" color="primary">
            Explore Our Products
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
                    color="black"
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
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
    </Container>
  );
}

export default Dash;
