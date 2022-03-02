/* eslint-disable react/jsx-key */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import Nextlink from "next/link";
import Layout from "../components/Layout";
import Product from "../models/Product";
import db from "../utils/db";

export default function Home(props) {
  const { products } = props;
  let currency = "$";
  return (
    <Layout title="Cryptomart">
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card>
              <Nextlink href={`/product/${item.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={item.name}
                    height="350"
                    image={item.image}
                    title={item.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="h4">
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Nextlink>
              <CardActions>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.rating} &#11088;
                </Typography>
                <Typography variant="h5">
                  {currency}
                  {item.price}
                </Typography>
                <Button size="small" color="primary">
                  <h4>Add to cart</h4>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocumentToObject),
    },
  };
}
