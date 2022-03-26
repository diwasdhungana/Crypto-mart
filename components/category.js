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
  const classes = useStyle()
  const{category} = data;

  return ( 
    <Paper elevation={6} className={classes.category}>
    <Grid>
            <Typography variant="h1" align="center">
                Category
            </Typography>
    </Grid>
    <Grid container spacing={2}>
    {category.map(item => (
    <Grid item xs={12} sm={6} md={3} key={item.id} spacing={3}>
      <Card>
            <Nextlink href={`/product/${item.slug}`} passHref>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="120"
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
          </Card>
      </Grid>
       ))}
    </Grid>
</Paper>
   );
}
 
export default Category