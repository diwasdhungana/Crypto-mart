import { Container } from "@material-ui/core";
import { useMoralis } from "react-moralis";
import Profile from "../pages/profile";
import Auth from "./auth";
import ForYou from "../components/for_you";
import Product from "../models/Product";
import db from "../utils/db";

const Wallet = (props) => {
  const { isAuthenticated, logout } = useMoralis();
  const { products } = props;
  return (
    <Container>
      {isAuthenticated ? <Profile /> : <Auth />}
      <ForYou Products={products} Name="Our Products" />
    </Container>
  );
};
export default Wallet;

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
