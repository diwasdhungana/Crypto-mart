import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import React, { useState } from "react";

const theme = responsiveFontSizes(
  createTheme({
    root: {},
    typography: {
      color: "#000000",
      h1: {
        fontSize: "20px",
        fontWeight: "400",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      h2: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "0.5rem 0",
        fontFamily: "Barlow Condensed",
      },
      h3: {
        //for product name

        fontSize: "20px",
        fontWeight: "300",
        margin: "0.5rem 0",
        fontFamily: "Barlow Condensed",
      },
      h4: {
        //for product properties
        fontSize: "1rem",
        fontWeight: "300",
        margin: "0 0",
        fontFamily: "Barlow Condensed",
      },
      h5: {
        fontSize: "12px",
        fontWeight: "500",
        margin: "0rem 0",
        fontFamily: "Barlow Condensed",
      },
      h6: {
        fontSize: "35px",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      body1: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      body2: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      caption: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      button: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      overline: {
        fontSize: "1rem",

        fontWeight: "500",
        margin: "1rem 0",
        fontFamily: "Barlow Condensed",
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: "500",
        margin: "1rem 0",
      },
    },
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: '#dc143c',
      },
    },
  })
);

export default theme;
