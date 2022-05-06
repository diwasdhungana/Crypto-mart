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
  Link,
} from "@material-ui/core";
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

  useEffect(() => {
    setShowModal(false);
  }, [router.query.slug]);

  let currency = "$";
  const addToCartHandler = async () => {
    const data = await axios.get(`/api/products/${product._id}`);
    if (data.numInStock <= 0 || data.numInStock < product.quantity + 1) {
      alert("Out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
  };

  const fetchReviews = async () => {
    const data = await axios.get(`/api/products/review/${product._id}`);
    console.log("data received:", data.data);
    setReviews(data.data);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const data = await axios.post(`/api/products/review/post`, {
      review,
      product_id: product._id,
      user_id: Cookies.get("userId"),
      isOwner: true,
      fullName: Cookies.get("userName") ? Cookies.get("userName") : "Anonymous",
      email: Cookies.get("userEmail"),
    });
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.product_container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} className={classes.product_img}>
            <Image
              src={product.image}
              alt={product.name}
              height={250}
              width={200}
              layout="responsive"
              onClick={() => setShowModal(true)}
            />
            <div
              className={classes.product_img_modal}
              style={{
                display: showModal ? "block" : "none",
              }}
            >
              {showModal && (
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                  {" "}
                  <img
                    src={product.image}
                    alt={product.name}
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
                  {product.rating} &#11088; ({product.numReviews}) Reviews
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
      <button onClick={fetchReviews}>Fetch Reviews</button>
      {/* <Reviews
        fullname="Diwash Dhungana"
        review="Nice product"
        isOwner="False"
        email="diwasdhungana@gmail.com"
      /> */}
      <form onSubmit={submitReview}>
        <input
          type="text"
          placeholder="Type your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {reviews.map((review) => (
        <Reviews
          fullname={review.fullName}
          review={review.review}
          isOwner={review.isOwner}
          email={review.email}
        />
      ))}

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
