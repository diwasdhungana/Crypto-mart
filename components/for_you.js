import Nextlink from "next/link";
import {
  Card,
  Paper,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";

import useStyle from "../utils/styles";
import axios from "axios";
import { Store } from "../utils/Store";
import React, { useContext } from "react";

const ForYou = (props) => {
  const classes = useStyle();
  let currency = "$";
  const Products = props.Products;
  const Name = props.Name;
  const { state, dispatch } = useContext(Store);

  return (
    <Paper elevation={6} className={classes.for_you}>
      <Grid>
        <Typography variant="h1" className={classes.topic} align="center">
          {Name}
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
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.rating} &#11088;
                </Typography>
                <Typography variant="h5">
                  {currency}
                  {item.price}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={async () => {
                    const data = await axios.get(`/api/products/${item._id}`);
                    if (
                      data.numInStock <= 0 ||
                      data.numInStock < item.quantity + 1
                    ) {
                      alert("Out of stock");
                      return;
                    }
                    dispatch({
                      type: "CART_ADD_ITEM",
                      payload: { ...item, quantity: 1 },
                    });
                  }}
                >
                  <h4>Add to cart</h4>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ForYou;
