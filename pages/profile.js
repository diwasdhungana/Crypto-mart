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
import { Store } from "../utils/Store";
import React, { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Profile(coins) {
  const { logout, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const classes = useStyle();
  const [ethBalance, setEthBalance] = useState();

  let currency = "$";
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const userId = Cookies.get("userId");
  const [userInfo, setUserInfo] = useState();

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

  const activateseller = async () => {
    //get request at /api/user/activate/sellerid
    //activate seller
    await axios
      .get(`/api/user/activate/${userId}`)
      .then((res) => {
        console.log("You are now a seller");
        alert("you are now a seller");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function userInfocall() {
    await axios.get(`/api/user/${userId}`).then((res) => {
      setUserInfo((userInfo) => res.data.user);
      console.log(res);
    });
  }

  useEffect(() => {
    fetchNativeBalance();
    userInfocall();
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            activateseller();
          }}
        >
          Become a Seller
        </Button>
        <div>{userInfo}</div>
      </Paper>
    </Container>
  );
}
export default Profile;
