/* eslint-disable react/jsx-key */
import { useMoralis } from "react-moralis";
import useStyle from "../utils/styles";

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
  Container,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

import data from "../utils/data";
const Auth = () => {
  const classes = useStyle();
  const { metamask } = data;
  const { authenticate, authError, user } = useMoralis();

  return (
    <Container className={classes.container}>
      <Paper elevation={4} className={classes.auth_container}>
        <Grid>
          <Typography variant="h1">Connect Your Wallet </Typography>
          <Typography variant="h1">
            Connect with one of our available wallet providers or create a new
            one.
          </Typography>

          {authError && (
            <p>
              {authError.name}
              {authError.message}
            </p>
          )}
          <button onClick={authenticate} className={classes.connect}>
            Connect with Metamask
          </button>
          {metamask.map((item) => (
            <Card>
              <CardMedia
                component="img"
                alt={item.name}
                height="500"
                image={item.image}
              ></CardMedia>
            </Card>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
