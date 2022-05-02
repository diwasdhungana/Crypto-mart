import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React from "react";

export default function checkoutWizard({ activeStep = 0 }) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      style={{ backgroundColor: "#1b1b1b" }}
    >
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step) => (
          <Step
            key={step}
            color="primary"
            style={{ backgroundColor: "#1b1b1b" }}
          >
            <StepLabel color="primary">
              <Typography color="primary">{step}</Typography>
            </StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}
