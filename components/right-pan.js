/* eslint-disable react/jsx-key */
import { Typography } from "@material-ui/core";
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
      <Nextlink href="/cart" passHref>
        <Link>
          <Typography variant="h1" className={classes.panel_topic}>
            My Cart
          </Typography>
        </Link>
      </Nextlink>
      items:{cartItems.reduce((a, c) => a + c.quantity, 0)}
      <br />
      Subtotal:{" "}
      {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
    </div>
  );
}

export default Right_panel;
