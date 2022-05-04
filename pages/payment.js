import React from "react";
import useStyles from "../utils/styles";
import CheckoutWizard from "../components/CheckoutWizard";
import dynamic from "next/dynamic";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Store } from "../utils/Store";
import data from "../utils/data";
import { Typography, Paper, Button, Container, Grid } from "@material-ui/core";

function Payment({ product }) {
  const classes = useStyles();
  const [delivery, setDelivery] = useState("");
  const { Moralis, account, chainId, authenticate, enableWeb3 } = useMoralis();

  const { state } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;

  //For Balance Showing
  const Web3Api = useMoralisWeb3Api();
  const [ethBalance, setEthBalance] = useState();
  const [totalMatic, setTotalMatic] = useState(0);

  //Initialize Moralis

  const serverUrl = "https://mknm4od3jlmq.usemoralis.com:2053/server";
  const appId = "Yubo28twR1knu4dT7RigGC6X6UmmXneBdDqxImOq";
  Moralis.start({ serverUrl, appId });

  let currency = "$";
  const { Products } = data;

  const fetchNativeBalance = async () => {
    const result = await Web3Api.account
      .getNativeBalance({
        chain: "matic",
      })
      .then((result) => {
        if (result.balance) {
          setEthBalance(Moralis.Units.FromWei(result.balance));
        }
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchNativeBalance();
    handleOk();
  }, [cartItems]);
  // cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  //Total Price
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const ProductPrice = total;

  //Transaction
  const handleOk = async () => {
    const options = {
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      chain: "eth",
    };
    const price = await Moralis.Web3API.token.getTokenPrice(options);

    const PriceMatic = ProductPrice / price.usdPrice;
    console.log("MATIC:" + PriceMatic);
    setTotalMatic(PriceMatic);

    const web3Provider = await Moralis.enableWeb3();
    const options1 = {
      type: "native",
      amount: Moralis.Units.ETH(PriceMatic),
      receiver: "0x72563b13Cb51739c0e0eAdA7BF90556c1B80B485",
    };

    let receipt = await Moralis.transfer(options1).then((receipt) => {
      console.log(receipt);
      alert.apply(("Done!"));
        }).catch((e) => alert(e.message))
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.ship_container}>
        <CheckoutWizard activeStep={2} />
        <Typography
          variant="h1"
          component="h4"
          style={{ fontSize: "30px" }}
          color="primary"
        >
          Payment Page. <br></br>
          <span style={{ fontSize: "25px" }}>
            You can pay with your favoutire crypto.
          </span>
        </Typography>
        <Grid
          container
          style={{ border: "1px solid #6e6767", borderRadius: "5px" }}
        >
          <Grid
            item
            xs={6}
            style={{ textAlign: "right", paddingRight: "3rem" }}
          >
            <Typography
              component="h1"
              variant="h1"
              style={{ fontSize: "22px" }}
              color="primary"
            >
              Your current Balance:
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              style={{ fontSize: "22px" }}
              color="primary"
            >
              Your Subtotal:{" "}
            </Typography>
            <hr />
            <Typography
              component="h1"
              variant="h1"
              style={{ fontSize: "22px" }}
              color="primary"
            >
              Your Total in MATIC:{" "}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "left", paddingLeft: "3rem" }}>
            <Typography
              component="h1"
              variant="h1"
              style={{ fontSize: "22px" }}
              color="primary"
            >
              {ethBalance} MATIC
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              style={{ fontSize: "22px" }}
              color="primary"
            >
              {currency}
              {ProductPrice}
            </Typography>
            <hr
              style={{ width: "126%", position: "relative", right: "6rem" }}
            />
            <Typography
              component="h1"
              variant="h1"
              style={{ fontSize: "22px" }}
              color="primary"
            >
              {totalMatic} MATIC{" "}
            </Typography>
          </Grid>
        </Grid>
        <Button onClick={handleOk} variant="contained" color="primary" className={classes.log_button} >
          Buy Now
        </Button>
      </Paper>
    </Container>
  );
}
export default dynamic(() => Promise.resolve(Payment), { ssr: false });
