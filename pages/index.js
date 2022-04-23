/* eslint-disable react/jsx-key */

import Product from "../models/Product";
import db from "../utils/db";

//Components
import Featured from "../components/featured";
import Cert from "../components/certified";
import ForYou from "../components/for_you";
import Category from "../components/category";

import useStyle from "../utils/styles";
import { Container } from "@material-ui/core";

export default function Home({ products }) {
  const classes = useStyle();
  return (
    <Container className={classes.container}>
      <Featured />
      <Cert />
      <Category />
      <ForYou Products={products} Name="For You" />
    </Container>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocumentToObject),
    },
  };
}
