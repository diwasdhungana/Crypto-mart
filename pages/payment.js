import React from "react";
import { Paper, Typography, Container } from "@material-ui/core";
import useStyles from "../utils/styles";
import CheckoutWizard from "../components/CheckoutWizard";

export default function Payment() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper>
        <CheckoutWizard activeStep={2} />
        <Typography>
          This is the payment page. You can pay with your favoutire crypto.
        </Typography>
      </Paper>
    </Container>
  );
}
