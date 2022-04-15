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
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import useStyle from "../utils/styles";

import data from "../utils/data";

const Featured = () => {
  const classes = useStyle();
  const { banner } = data;

  return (
    <Paper elevation={6} className={classes.featured_container}>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        spaceBetween={30}
        loop={true}
        effect={"fade"}
        modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {banner.map((item) => (
          <SwiperSlide key={item.id}>
            <Grid item xs={12} key={item.id} spacing={2}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="350"
                    title={item.name}
                    image={item.image}
                  ></CardMedia>
                </CardActionArea>
              </Card>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Paper>
  );
};
export default Featured;
