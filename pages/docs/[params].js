import useStyle from "../../utils/styles";
import Nextlink from "next/link";
import db from "../../utils/db";
import Product from "../../models/Product";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
function Doc(props) {
  const { params, Products } = props;
  const classes = useStyle();
  let currency = "$";
  return (
    <Container className={classes.container}>
      <Paper elevation={6} className={classes.for_you}>
        <Grid>
          <Typography variant="h1" className={classes.topic} align="center">
            {params}
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {Products.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card>
                <Nextlink href={`/product/${item.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={item.name}
                      height="250"
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
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
      </Paper>
    </Container>
  );
}
export default Doc;

// export async function getStaticPaths(params) {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// }

export async function getServerSideProps(context) {
  const params = context.params.params;
  await db.connect();
  const products = await Product.find({ category: params }).lean();
  await db.disconnect();
  return {
    props: {
      Products: products.map(db.convertDocumentToObject),
      params,
    },
  };
}
