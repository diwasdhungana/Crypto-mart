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

import Nextlink from "next/link";
import data from "../utils/data";

function Dash(coins) {
  const { logout, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const classes = useStyle();
  const [ethBalance, setEthBalance] = useState();

  let currency = "$";
  const { Products } = data;

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
              <Card>
                <Nextlink href={`/product/${item.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={item.name}
                      height="350"
                      image={item.image}
                      title={item.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="h4"
                        color="primary"
                      >
                        {item.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Nextlink>
                <CardActions>
                  <Typography variant="body2" component="p" color="primary">
                    {item.rating} &#11088;
                  </Typography>
                  <Typography variant="h5">
                    {currency}
                    {item.price}
                  </Typography>
                  <Button size="small" color="primary">
                    <h4>Add to cart</h4>
                  </Button>
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
