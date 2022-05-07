import React, { useContext, useReducer, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  TextField,
  Badge,
} from "@material-ui/core";

import useStyle from "../utils/styles";
import Navlink from "next/link";
import Image from "next/image";

//Moralis Import
import { useMoralis } from "react-moralis";

//Icons Import
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Navbar = () => {
  const classes = useStyle();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const logoutCLickHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };
  return (
    <AppBar position="fixed" className={classes.appBar} color="secondary">
      <Toolbar>
        <Navlink href={"/"} passHref>
          <Link>
            <Image
              className={classes.logo}
              src={"/logo/cryptomart/logo.png"}
              alt="logo"
              height={85}
              width={85}
            />
          </Link>
        </Navlink>

        <TextField
          className={classes.field}
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder="Search...."
          variant="filled"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon className={classes.searchIcon} />,
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.target.value && router.push(`/search/${e.target.value}`);
            }
          }}
        />
        {/* classes for navbar icon right side  */}
        <div className={classes.grow}>
          <div className={classes.growcontent}>
            <div className={classes.growcontentItem}>
              {/* Check for login and if logged in display name initial */}
              {userInfo ? (
                <>
                  <Link
                    onClick={logoutCLickHandler}
                    style={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    <LogoutIcon
                      sx={{ fontSize: 20 }}
                      className={classes.nav_logout}
                    />
                    <Typography variant="h5" color="primary">
                      LOGOUT
                    </Typography>
                  </Link>
                </>
              ) : (
                <Navlink href={"/login"} passHref>
                  <Link style={{ textDecoration: "none" }}>
                    <LoginIcon
                      sx={{ fontSize: 25 }}
                      className={classes.nav_icons}
                    />
                    <Typography variant="h5" color="primary">
                      LOGIN
                    </Typography>
                  </Link>
                </Navlink>
              )}

              {/* Profile button */}
            </div>
            <div className={classes.growcontentItem}>
              <Navlink href={"/profile"} passHref>
                <Link style={{ textDecoration: "none" }}>
                  <AccountCircleIcon
                    sx={{ fontSize: 25 }}
                    className={classes.nav_icons}
                  />
                  <Typography variant="h5" color="primary">
                    {Cookies.get("userName")
                      ? Cookies.get("userName")
                      : "Profile"}
                  </Typography>
                </Link>
              </Navlink>
            </div>

            {/* cart button with increment and decrement for items added */}

            <div className={classes.growcontentItem}>
              <Navlink href={"/cart"} passHref>
                <Link style={{ textDecoration: "none" }}>
                  {cart.cartItems.length ? (
                    <Badge
                      badgeContent={cart.cartItems.length}
                      color="secondary"
                    >
                      <ShoppingCartIcon
                        sx={{ fontSize: 25 }}
                        className={classes.nav_icons}
                      />
                    </Badge>
                  ) : (
                    <ShoppingCartIcon
                      sx={{ fontSize: 25 }}
                      className={classes.nav_icons}
                    />
                  )}
                  <Typography variant="h5" color="primary">
                    CART
                  </Typography>
                </Link>
              </Navlink>
            </div>

            {/* wallet button */}

            <div className={classes.growcontentItem}>
              <Link href={"/wallet"} style={{ textDecoration: "none" }}>
                <AccountBalanceWalletIcon
                  sx={{ fontSize: 25 }}
                  className={classes.nav_icons}
                />
                <Typography variant="h5" color="primary">
                  WALLET
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
