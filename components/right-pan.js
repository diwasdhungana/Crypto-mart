/* eslint-disable react/jsx-key */
import { Button, Typography, Grid } from "@material-ui/core";
import useStyle from "../utils/styles";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import Nextlink from "next/link";
import Link from "next/link";

function Right_panel() {
  const classes = useStyle();
  const { state } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const router = useRouter();
  return (
    <div className={classes.right_panel}>
      <Button>
        <Nextlink href="/cart" passHref>
          <Link>
            <Typography
              variant="h1"
              className={classes.panel_topic}
              style={{ position: "relative", bottom: "30px" }}
              color="primary"
            >
              My Cart
            </Typography>
          </Link>
        </Nextlink>
      </Button>
      <br />
      <Grid container style={{ position: "relative", bottom: "2rem" }}>
        <Grid
          item
          xs={6}
          style={{ textAlign: "right", paddingLeft: "20px", textAlign: "left" }}
        >
          <Typography color="primary">Items:</Typography>
          <hr></hr>
          <Typography color="primary" style={{ fontSize: "18px" }}>
            Subtotal:{" "}
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "left" }}>
          <Typography color="secondary">
            {cartItems.reduce((a, c) => a + c.quantity, 0)}
          </Typography>
          <hr
            style={{ width: "30px", position: "relative", right: "25px" }}
          ></hr>
          <Typography style={{ fontSize: "18px" }} color="secondary">
            {cartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Right_panel;
