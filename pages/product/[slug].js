/* eslint-disable react/jsx-key */
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import {
  Grid,
  List,
  ListItem,
  Typography,
  Button,
  Container,
  Paper,
  Card,
  Link,
} from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Nextlink from "next/link";
import Image from "next/image";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";
import useStyle from "../../utils/styles";
import { useRouter } from "next/router";
import ForYou from "../../components/for_you";
import Reviews from "../../components/reviews";
import Cookies from "js-cookie";
import Modal from "../../components/picture_modal";

export default function ProductScreen(props) {
  const classes = useStyle();
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const { product, Products } = props;
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openpicture, setOpenpicture] = useState(product.image);
  const [rating, setRating] = useState(null);
  const [submitRatingvar, setSubmitRatingvar] = useState(false);
  const fetchReviews = async () => {
    const data = await axios.get(`/api/products/review/${product._id}`);
    console.log("data received:", data.data);
    setReviews(data.data);
  };

  const submitRating = async () => {
    console.log("rating:", rating);
    const data = await axios.post(`/api/products/rating/post`, {
      rating,
      product_id: product._id,
      user_id: Cookies.get("userId"),
    });
    setSubmitRatingvar(() => true);
  };

  useEffect(() => {
    setShowModal(false);
    //fetch reviews only when the page is loaded
    fetchReviews();
  }, []);

  let currency = "$";
  const addToCartHandler = async () => {
    const data = await axios.get(`/api/products/${product._id}`);
    if (data.numInStock <= 0 || data.numInStock < product.quantity + 1) {
      alert("Out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const data = await axios.post(`/api/products/review/post`, {
      review,
      product_id: product._id,
      user_id: Cookies.get("userId"),
      seller: product.seller,
      fullName: Cookies.get("userName") ? Cookies.get("userName") : "Anonymous",
      email: Cookies.get("userEmail"),
    });
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.product_container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} className={classes.product_img}>
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              spaceBetween={30}
              loop={true}
              effect={"fade"}
              className={classes.cert_swiper}
              modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {product.images.map((item) => (
                <SwiperSlide key={item.id}>
                  <Grid item xs={12} key={item.id} spacing={2}>
                    <Card>
                      <Image
                        src={item}
                        width={300}
                        height={300}
                        alt="product"
                        className={classes.product_img}
                        onClick={() => {
                          setShowModal(true);
                          setOpenpicture(item);
                        }}
                      />
                      <div
                        className={classes.product_img_modal}
                        style={{
                          display: showModal ? "block" : "none",
                        }}
                      >
                        {showModal && (
                          <Modal
                            show={showModal}
                            onClose={() => setShowModal(false)}
                          >
                            <img
                              src={openpicture}
                              alt={item}
                              style={{
                                width: "200%",
                                height: "200%",
                                objectFit: "contain",
                                objectPosition: "center",
                              }}
                            />
                          </Modal>
                        )}
                      </div>
                    </Card>
                  </Grid>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <Image
              src={product.images[0]}
              alt={product.name}
              height={250}
              width={200}
              layout="responsive"
              onClick={() => setShowModal(true)}
            /> */}
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <List>
              <ListItem>
                <Typography
                  component="h1"
                  variant="h1"
                  style={{ fontSize: "35px" }}
                  color="primary"
                >
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography component="h3" variant="h4" color="primary">
                  {product.rating} &#11088; ({product.numViews}) views
                </Typography>
              </ListItem>

              <ListItem>
                <Typography component="h2" variant="h2" color="primary">
                  <span style={{ fontWeight: "bold" }}>Price: </span>
                </Typography>
                <Typography component="h2" variant="h2" color="primary">
                  {currency}
                  {product.price}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography component="h4" variant="h4" color="primary">
                  <span style={{ fontWeight: "bold" }}>
                    Description:{" "}
                    <span style={{ fontWeight: "200" }}>
                      {product.description.short}
                    </span>{" "}
                  </span>{" "}
                </Typography>
                <Typography
                  component="h4"
                  variant="h4"
                  color="primary"
                ></Typography>
              </ListItem>

              <ListItem>
                <Typography component="h4" variant="h4" color="primary">
                  <span style={{ fontWeight: "bold" }}>Category: </span>
                </Typography>
                <Typography component="h4" variant="h4" color="primary">
                  {product.category}
                </Typography>
              </ListItem>
              <ListItem>
                {cartItems.find(({ slug }) => slug === product.slug) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "120%" }}
                  >
                    Added to Cart
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    s
                    onClick={addToCartHandler}
                    className={classes.log_button}
                  >
                    Add to Cart
                  </Button>
                )}
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <br></br>
        <div className={classes.product_details}>
          <Typography
            component="h1"
            variant="h1"
            style={{ fontSize: "25px" }}
            color="primary"
          >
            Product Details:
          </Typography>
          <Typography
            component="h4"
            variant="h4"
            style={{ fontSize: "16px" }}
            color="primary"
          >
            {product.description.long}
          </Typography>
        </div>
      </Paper>

      <Paper className={classes.review_container}>
        {submitRatingvar == false ? (
          <div>
            <Typography>Submit Your Ratings:</Typography>

            <span
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setRating(1)}
            >
              &#11088;
            </span>
            <span
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setRating(2)}
            >
              &#11088;
            </span>
            <span
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setRating(3)}
            >
              &#11088;
            </span>
            <span
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setRating(4)}
            >
              &#11088;
            </span>
            <span
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setRating(5)}
            >
              &#11088;
            </span>

            {rating > 0 && (
              <Button
                variant="contained"
                color="primary"
                style={{ width: "14%", height: "30px" }}
                onClick={() => submitRating()}
                className={classes.log_button}
              >
                Submit {rating} stars
              </Button>
            )}
          </div>
        ) : (
          <Typography>Your Rating has been submitted</Typography>
        )}
        <Typography>Submit Your Review: </Typography>
        <form onSubmit={submitReview}>
          <input
            type="text"
            rows="9"
            placeholder="Type your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{
              width: "100%",
              height: "150px",
              padding: "12px 20px",
              margin: "8px 0",
              boxSizing: "border-box",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ width: "5%" }}
            className={classes.log_button}
            type="submit"
          >
            Submit
          </Button>
        </form>
        {reviews.map((review) => (
          <Reviews
            fullname={review.fullName}
            review={review.review}
            isOwner={review.user_id === product.seller ? true : false}
            email={review.email}
          ></Reviews>
        ))}
      </Paper>
      <ForYou Products={Products} Name="Related Products" />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  // const { params } = context;
  // const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  const Products = await Product.find({ category: product.category }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocumentToObject(product),
      Products: Products.map(db.convertDocumentToObject),
    },
  };
}
