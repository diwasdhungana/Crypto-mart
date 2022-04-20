import { Paper } from "@material-ui/core";
import {  useRouter } from "next/router";
import  {Store} from "../utils/Store";
import React from "react";
import {  useContext } from "react";

export default function Checkout() {
  const router =useRouter();
  const {state,dispatch} = useContext(Store);
  const{userInfo} = state;
  if(!userInfo){
    router.push("/login?redirect=/checkout");
  }
  return <Paper title="Checkout">Checkout page</Paper>;
}
