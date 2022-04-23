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
  const submitHandler = async ({
    fullName,
    address,
    city,
    streetName,
    country,
  }) => {
    try {
      const data = await axios.post(
        "/api/user/shippingAddress",
        {
          fullName,
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
      alert("Address added Successful");
      router.push("/checkout");
    } catch (err) {
      alert(err.response ? err.response : err.message);
    }
  };
  return (
    <Container className={classes.container}>
      <Paper>
        <CheckoutWizard activeStep={1} />
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Typography component="h1" variant="h1">
            Shipping Address
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === "minLength"
                          ? "Full Name length is more than 1"
                          : "Full Name is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
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
                    fullWidth
                    id="address"
                    label="Address"
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === "minLength"
                          ? "Address length is more than 1"
                          : "Address is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
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
                    fullWidth
                    id="city"
                    label="City"
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
            </ListItem>
            <ListItem>
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
                    fullWidth
                    id="streetName"
                    label="Street Name"
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
            </ListItem>
            <ListItem>
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
                    fullWidth
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
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                Continue
              </Button>
            </ListItem>
          </List>
        </form>
      </Paper>
    </Container>
  );
}
