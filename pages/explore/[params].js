import useStyle from "../../utils/styles";
import Nextlink from "next/link";
import db from "../../utils/db";
import Product from "../../models/Product";
import { Container, Paper } from "@material-ui/core";
import ForYou from "../../components/for_you";
function Doc(props) {
  const { params, Products } = props;
  const classes = useStyle();
  let currency = "$";

  const newproducts = () => {
    if (params == "Featured") {
      return Products.filter((product) => product.featured);
    } else if (params == "Weekly Best") {
      //filter products uploaded within last week
      return Products.filter((product) => {
        if (product.dateCreated) {
          let date = new Date(product.dateCreated);
          let today = new Date();
          let diff = today.getTime() - date.getTime();
          let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          if (diffDays <= 7) {
            return product;
          }
        }
      });
    } else if (params == "Top Products") {
      return Products.filter((product) => product.rating > 3);
    } else if (params == "Popular") {
      return Products.filter((product) => product.numViews > 10);
    }
    return Products;
  };
  return (
    <Container className={classes.container}>
      <Paper className={classes.param_container}>
        <ForYou Products={newproducts()} Name={params} />
      </Paper>
    </Container>
  );
}
export default Doc;

export async function getServerSideProps(context) {
  const params = context.params.params;
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      Products: products.map(db.convertDocumentToObject),
      params,
    },
  };
}
