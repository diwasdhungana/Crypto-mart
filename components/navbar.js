import React, { useState } from "react";
import {
    createTheme,
    AppBar,
    Toolbar,
    Typography,
    Link,
    Switch,
    FormControl,
    InputLabel,
    InputAdornment,
    TextField,
    OutlinedInput,
  } from "@material-ui/core";
import useStyle from "../utils/styles";
import Navlink from "next/link";
import Image from "next/image";

import {useMoralis} from 'react-moralis'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

  const Navbar = () => {
    const classes = useStyle(); 
    const{authenticate, authError, user} = useMoralis()
    return (  
        <AppBar position="fixed" className={classes.appBar} color="secondary">
        <Toolbar>
          <Navlink href={"/"} passHref>
            <Link>
              <Image
                src={"/logo/cryptomart/logo.png"}
                alt="logo"
                height={80}
                width={80}
              />
            </Link>
          </Navlink>

      {/* <div className={classes.search}>
      <FormControl sx={{ m: 1, width: '25rem'}}>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><SearchIcon color="9747FF"/></InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </div> */}

          <div className={classes.grow}>
            <div className={classes.growcontent}>

              <div className={classes.growcontentItem}>
                <Navlink href={"/login"} passHref>
                  <Link>
                  <LoginIcon color="#9747FF" sx={{ fontSize: 20 }}/>
                    <Typography variant="h5" color="textPrimary">
                      LOGIN
                    </Typography>
                  </Link>
                </Navlink>
              </div>
              <div className={classes.growcontentItem}>
                <Navlink href={"/profile"} passHref>
                  <Link>
                  <AccountCircleIcon color="#9747FF" sx={{ fontSize: 20 }}/>
                    <Typography variant="h5" color="textPrimary">
                      PROFILE
                    </Typography>
                  </Link>
                </Navlink>
              </div>
              <div className={classes.growcontentItem}>
                <Navlink href={"/cart"} passHref>
                  <Link>
                      <ShoppingCartIcon color="#9747FF" sx={{ fontSize: 20 }}/>
                      <Typography variant="h5" color="textPrimary" >
                        CART
                      </Typography>
                  </Link>
                </Navlink>
              </div>
              <div className={classes.growcontentItem}>  

              <Link href={"/wallet"}>
                  <AccountBalanceWalletIcon color="#9747FF" sx={{ fontSize: 20 }}/>
                  <Typography variant="h5" color="textPrimary">
                      WALLET
                    </Typography>
                 
                  </Link>
              </div>
              <Switch onChange={() => setMode(mode === "light" ? "dark" : "light")} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
     );
}
 
export default Navbar;
