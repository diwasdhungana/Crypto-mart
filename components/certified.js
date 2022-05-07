//Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

import {
  Card,
  Paper,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";

import useStyle from "../utils/styles";
import data from "../utils/data";

const Cert = () => {
  const classes = useStyle();
  const { brands } = data;

  return (
    <Paper className={classes.cert_container}>
      <Grid>
        <Typography
          variant="h1"
          className={classes.topic}
          align="center"
          color="primary"
        >
          Certified Shops
        </Typography>
      </Grid>
      <Swiper
        spaceBetween={20}
        loop={true}
        modules={[Navigation, A11y]}
        slidesPerView={4}
        navigation
        className={classes.cert_swiper}
      >
        <Grid container direction="column" className={classes.cert_grid}>
          {brands.map((item) => (
            <SwiperSlide key={item.name}>
              <Grid item xs={12} key={item.image} spacing={0}>
                <Card style={{ backgroundColor: "white", padding: "1px" }}>
                  <Link href={`/brands/${item.name}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={item.name}
                        height="80"
                        width="80"
                        image={item.image}
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
                  </Link>
                </Card>
              </Grid>
            </SwiperSlide>
          ))}
        </Grid>
      </Swiper>
    </Paper>
  );
};

export default Cert;
