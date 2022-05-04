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
import data from "../utils/data";

const Category = () => {
  const classes = useStyle();
  const { category } = data;

  return (
    <Paper className={classes.category}>
      <Grid>
        <Typography
          variant="h1"
          className={classes.topic}
          align="center"
          color="primary"
        >
          Category
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {category.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id} spacing={3}>
            <Card style={{ backgroundColor: "#1b1b1b" }}>
              <Nextlink href={`/docs/${item.name}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={item.name}
                    height="120"
                    image={item.image}
                    title={item.name}
                  ></CardMedia>
                  <CardContent
                    height="4px"
                    style={{ backgroundColor: "rgb(231 231 231)" }}
                  >
                    <Typography
                      gutterBottom
                      variant="h2"
                      component="h3"
                      style={{ fontSize: "18px" }}
                      color="primary"
                    >
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Nextlink>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Category;
