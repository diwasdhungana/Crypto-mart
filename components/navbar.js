import React, { useContext, useReducer,useState } from "react";
import {
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Link,
  TextField,
  Badge,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";

import useStyle from "../utils/styles";
import Navlink from "next/link";
import Image from "next/image";

//Moralis Import
import { useMoralis } from "react-moralis";

//Icons Import
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Store } from "../utils/Store";
import {useRouter}  from "next/router";
import Cookies from "js-cookie";


const Navbar = () => {
  const classes = useStyle(); 
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  console.log("state", state.cart.cartItems);
  const { cart, darkMode, userInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler =(e)=>{
    setAnchorEl(e.currentTarget);
};
  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  }
  const logoutCLickHandler =() =>{
    setAnchorEl(null);
    dispatch({type:"USER_LOGOUT"});
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");

    loginMenuCloseHandler();
  }
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
        />
        <button className={classes.btn_search}>
          <Navlink href={"/filter"} passHref>
            <SearchIcon color="#9747FF" sx={{ fontSize: 20 }} />
          </Navlink>
        </button>
      {/* classes for navbar icon right side  */}
        <div className={classes.grow}>
          <div className={classes.growcontent}>
            <div className={classes.growcontentItem}>
           
           
             {/* Check for login and if logged in display name initial */}
              {userInfo? (
                <>
                {/* Here to another button effecting navbar user initial display error ass well */}
                <Button 
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={loginClickHandler}
                  className={classes.btn_login}>

              <Button >
              
            {userInfo.name}
              </Button>
              <Menu 
                 id="simple-menu"
                 anchorEl={anchorEl}
                 keepMounted
                 open={Boolean(anchorEl)}
                 onClose={loginMenuCloseHandler}
                 >
                   <MenuItem onClick={logoutCLickHandler}>Logout</MenuItem>
                 </Menu>
                 </Button>
              </>
              ): (
                // if not login display login icon
                <Navlink href={"/login"} passHref>
                  <Link>
                    <LoginIcon color="#9747FF" sx={{ fontSize: 25 }} />
                    <Typography variant="h5" color="textPrimary">
                      LOGIN
                    </Typography>
                  </Link>
                </Navlink>
               
              )
              }
              
              {/* Profile button */}
            </div>
            <div className={classes.growcontentItem}>
              <Navlink href={"/profile"} passHref>
                <Link>
                  <AccountCircleIcon color="#9747FF" sx={{ fontSize: 25 }} />
                  <Typography variant="h5" color="textPrimary">
                    PROFILE
                  </Typography>
                </Link>
              </Navlink>
            </div>
           
           
           {/* cart button with increment and decrement for items added */}
           
            <div className={classes.growcontentItem}>
              <Navlink href={"/cart"} passHref>
                <Link>
                  {cart.cartItems.length ? (
                    <Badge
                      badgeContent={cart.cartItems.length}
                      color="secondary"
                    >
                      <ShoppingCartIcon color="#9747FF" sx={{ fontSize: 25 }} />
                    </Badge>
                  ) : (
                    <ShoppingCartIcon color="#9747FF" sx={{ fontSize: 25 }} />
                  )}
                  <Typography variant="h5" color="textPrimary">
                    CART
                  </Typography>
                </Link>
              </Navlink>
            </div>
            
            {/* wallet button */}
            
            <div className={classes.growcontentItem}>
              <Link href={"/wallet"}>
                <AccountBalanceWalletIcon
                  color="#9747FF"
                  sx={{ fontSize: 25 }}
                />
                <Typography variant="h5" color="textPrimary">
                  WALLET
                </Typography>
              </Link>
            </div>
            {/* <Switch
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
            /> */}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
