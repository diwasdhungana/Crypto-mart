/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import { MoralisProvider } from 'react-moralis'
import Layout from "../components/Layout";
import React, { useState } from "react";
import theme from "../components/theme";
import {
  Container,
  ThemeProvider,
} from "@material-ui/core";
import useStyle from "../utils/styles";

function App({ Component, pageProps }) {

  const classes = useStyle();
  return (
    <MoralisProvider
    appId="Yubo28twR1knu4dT7RigGC6X6UmmXneBdDqxImOq"
    serverUrl="https://mknm4od3jlmq.usemoralis.com:2053/server">
    <ThemeProvider theme={theme}>
    <Layout>
    <Container/>
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
    </Layout>
    </ThemeProvider>
    </MoralisProvider>
  );
}
  
export default App;


// function MyApp({ Component, pageProps }) {
//   useEffect(() => {
//     const jssStyles = document.querySelector("#jss-server-side");
//     if (jssStyles) {
//       jssStyles.parentElement.removeChild(jssStyles);
//     }
//   }, []);
//   return (
//     <Layout>
//     <MoralisProvider
//     appId="Yubo28twR1knu4dT7RigGC6X6UmmXneBdDqxImOq"
//     serverUrl="https://mknm4od3jlmq.usemoralis.com:2053/server">
//     <StoreProvider>
//       <Component {...pageProps} />
//     </StoreProvider>
//     </MoralisProvider>
//     </Layout>
//   );
// }

// export default MyApp;
