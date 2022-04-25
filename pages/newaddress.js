import {
  List,
  ListItem,
  Typography,
  TextField,
  Paper,
  Button,
  Container,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";
import axios from "axios";

//Icon Imports
import HomeIcon from '@mui/icons-material/Home';
import SignpostIcon from '@mui/icons-material/Signpost';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';

export default function CheckOut() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const token = Cookies.get("token");
  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/checkout");
    }
  }, [userInfo, setValue, router, token]);

  const classes = useStyles();
  const submitHandler = async ({ address, city, streetName, country }) => {
    try {
      const data = await axios.post(
        "/api/user/shippingAddress",
        {
          address,
          city,
          streetName,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/checkout");
      alert("Address added Successful");
    } catch (err) {
      alert(err.response ? err.response : err.message);
    }
  };
  return (
    <Container className={classes.container}>
      <Paper className={classes.ship_container}>
        <CheckoutWizard activeStep={1} />
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Typography component="h1" variant="h1">
            Please Enter Your Shipping Address
          </Typography>
          <HomeIcon className={classes.log_icon} style={{'color':"#9747FF"}} sx={{ fontSize: 30 }} />
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
              
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    id="address"
                    className={classes.log_field}
                    label="Address (block no, Area/colony name)"
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === "minLength"
                          ? "Address length is more than 1"
                          : "Address is required"
                        : ""
                    }
                    {...field}
                  >
                  </TextField>

                )}
              ></Controller>
              <br/>
              <SignpostIcon className={classes.log_icon} style={{'color':"#9747FF"}} sx={{ fontSize: 30 }} />
              <Controller
                name="streetName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    id="streetName"
                    label="Street Name"
                    className={classes.log_field}
                    error={Boolean(errors.streetName)}
                    helperText={
                      errors.streetName
                        ? errors.streetName.type === "minLength"
                          ? "Street Name length is more than 1"
                          : "Street Name is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
              <br/>
              <LocationCityIcon className={classes.log_icon} style={{'color':"#9747FF"}} sx={{ fontSize: 30 }} />
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    className={classes.log_field}
                    id="city"
                    label="City, State"
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === "minLength"
                          ? "City length is more than 1"
                          : "City is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
              <br/>
              <FlagIcon className={classes.log_icon} style={{'color':"#9747FF"}} sx={{ fontSize: 30 }} />
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    className={classes.log_field}
                    id="country"
                    label="Country"
                    error={Boolean(errors.country)}
                    helperText={
                      errors.country
                        ? errors.country.type === "minLength"
                          ? "Country length is more than 1"
                          : "Country is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
              <br/>
              <Button
                variant="contained"
                type="submit"
                color="primary"
              >
                Continue
              </Button>
        </form>
      </Paper>
    </Container>
  );
}
