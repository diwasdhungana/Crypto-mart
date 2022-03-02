/* eslint-disable react/jsx-key */
import React, { useContext } from "react";
//import Head
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  useTheme,
  ThemeProvider,
  CssBaseline,
  createTheme,
  Switch,
  Badge,
} from "@material-ui/core";
import useStyle from "../utils/styles";
import Navlink from "next/link";
import { deepPurple } from "@material-ui/core/colors";
import Image from "next/image";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const classes = useStyle();
  const { darkMode } = state;
  const darkmodeHandler = () => {
    dispatch({ type: darkMode ? "TOGGLE_LIGHT_MODE" : "TOGGLE_DARK_MODE" });
    const newdarkMode = !darkMode;
    Cookies.set("darkMode", newdarkMode ? "true" : "false");
  };
  const theme = createTheme({
    root: {
      backgroundColor: "#f5f5f5",
    },
    typography: {
      h1: {
        fontSize: "2rem",
        fontWeight: "400",
        margin: "1rem 0",
        fontFamily: "Montserrat",
      },
      h2: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      h3: {
        //for product name
        fontSize: "2rem",
        fontWeight: "300",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      h4: {
        //for product properties
        fontSize: "1.5rem",
        fontWeight: "300",
        margin: "0 0",
        fontFamily: "Barlow Condensed",
      },
      h5: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      h6: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      body1: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      body2: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      caption: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      button: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      overline: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: deepPurple[500],
        contrastText: "#f7f7f7",
      },
      secondary: {
        main: "#cfbebe",
        light: "#f7f7f7",
        dark: "#dad6d6",
        contrastText: "#000000",
      },
    },
  });
  return (
    <div color="secondary">
      <Head>
        <title>{title ? title : "Cryptomart"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar} color="secondary">
          <Toolbar>
            <Navlink href={"/"} passHref>
              <Link>
                <Image
                  src={"/logo/cryptomart/logo.png"}
                  alt="logo"
                  height={100}
                  width={100}
                />
              </Link>
            </Navlink>
            <div className={classes.grow}>
              <div className={classes.growcontent}>
                <Switch
                  checked={darkMode}
                  onChange={darkmodeHandler}
                  name="darkMode"
                />
                <div className={classes.growcontentItem}>
                  <Navlink href={"/login"} passHref>
                    <Link>
                      <Typography variant="h5" color="textPrimary">
                        Login
                      </Typography>
                    </Link>
                  </Navlink>
                </div>
                <div className={classes.growcontentItem}>
                  <Navlink href={"/profile"} passHref>
                    <Link>
                      <Typography variant="h5" color="textPrimary">
                        Profile
                      </Typography>
                    </Link>
                  </Navlink>
                </div>
                <div className={classes.growcontentItem}>
                  <Navlink href={"/cart"} passHref>
                    <Link>
                      {/* {cart.cartIems.length > 0 ? ( */}
                      <Badge
                        // badgeContent={cart.length}
                        color="secondary"
                      >
                        <Typography variant="h5" color="textPrimary">
                          Cart
                        </Typography>
                      </Badge>
                      {/* ) : (
                        <Typography variant="h5" color="textPrimary">
                          Cart
                        </Typography>
                      )} */}
                    </Link>
                  </Navlink>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.container} color="secondary">
          {children}
        </Container>
        {/* <footer className={classes.footer}>
          <Typography variant="h6">
            Cryptomart © {new Date().getFullYear()}
            <br />
            All rights reserved.
          </Typography>
        </footer> */}
      </ThemeProvider>
    </div>
  );
}
