/* eslint-disable react/jsx-key */
import React, { useContext } from "react";
//import Head
import Head from "next/head";

import useStyle from "../utils/styles";
import Navlink from "next/link";
import { deepPurple } from "@material-ui/core/colors";
import Image from "next/image";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";

import {useMoralis} from 'react-moralis'

import Navbar from "./navbar";

import Left_Panel from "./left-pan"


export default function Layout({ title, description, children }) {

  const classes = useStyle();
  return (
    <div className={classes.content}>
      <Navbar/>
      <Left_Panel/>
      <Head>
        <title>{title ? title : "Cryptomart"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
          {children}
        {/* <footer className={classes.footer}>
          <Typography variant="h6">
            Cryptomart © {new Date().getFullYear()}
            <br />
            All rights reserved.
          </Typography>
        </footer> */}
        </div>
  );
}
