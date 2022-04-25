import {
  List,
  ListItem,
  Typography,
  TextField,
  Paper,
  Button,
  Container,
  Grid,
  Column,
  UserProfile,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";
import CheckoutWizard from "../components/CheckoutWizard";
import axios from "axios";



export default function CheckOut() {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const token = Cookies.get("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/checkout");
    }
    const getusers = async () => {
      const data = await axios.get("/api/user/shippingAddress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.data);
      if (data.data.data.Address == null) {
        router.push("/newaddress");
      }
    };
    getusers();
  }, [userInfo, router, token]);

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper className={classes.ship_container}>
        <CheckoutWizard activeStep={1} />
        {user && (
          <Grid container>
          <Grid item xs={6} style={{'textAlign':'right','paddingRight':'3rem', 'borderRight':'1px solid black'}}>
          <Typography>Address : </Typography>
          <Typography>City, State: </Typography>
          <Typography>Street Name: </Typography>
          <Typography>Country: </Typography>
          </Grid>
          <Grid item xs={6} style={{'textAlign':'left', 'paddingLeft':'3rem'}}>          
             <Typography>{user.Address}</Typography>              
            <Typography>{user.city} </Typography>
            <Typography>{user.streetName} </Typography>
            <Typography>{user.country} </Typography>
          </Grid>
     </Grid>
        )}
        <Typography> Are These information still Valid? </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
          onClick={() => {
            router.push("/payment");
          }}
        >
          Continue with this address
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            router.push("/newaddress");
          }}
        >
          Change my address
        </Button>
      </Paper>
    </Container>
  );
}
