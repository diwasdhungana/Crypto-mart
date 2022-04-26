/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import { MoralisProvider } from "react-moralis";
import Layout from "../components/Layout";
import React, { useState } from "react";
import theme from "../components/theme";
import { Container, ThemeProvider } from "@material-ui/core";
import useStyle from "../utils/styles";

function MyApp({ Component, pageProps }) {
  const classes = useStyle();
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <StoreProvider>
      <MoralisProvider
        appId="Yubo28twR1knu4dT7RigGC6X6UmmXneBdDqxImOq"
        serverUrl="https://mknm4od3jlmq.usemoralis.com:2053/server"
      >
        <ThemeProvider theme={theme}>
          <Layout>
            <Container />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </MoralisProvider>
    </StoreProvider>
  );
}

export default MyApp;
