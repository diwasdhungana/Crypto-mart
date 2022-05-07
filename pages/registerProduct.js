/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControlLabel,
  Input,
  MenuItem,
  Paper,
  Grid,
  Select,
  TextField,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import useStyle from "../utils/styles";
import data from "../utils/data";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade, Autoplay } from "swiper";
import Cookies from "js-cookie";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Modal from "../components/thumbnail";
import { Icon } from "@mui/material";

export default function RegisterProduct() {
  // let imageSrc = [];
  // useEffect(() => {
  //   handleOnChange();
  // }, []);
  const token = Cookies.get("token");
  const Seller = Cookies.get("userId");
  const classes = useStyle();
  const { category } = data;
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    same: true,
    title: "",
    price: null,
    image: null,
    images: [],
    description: {
      short: null,
      long: null,
    },
    category: "Digital",
    quantity: null,
    Identity: false,
    isObject: false,
    dimensions: {
      width: null,
      height: null,
      length: null,
    },
    isFragile: false,
    isLiquid: false,
    isFlammable: false,
    isExplosive: false,
    seller: Seller,
  });
  let imagearray;
  const [images, setImages] = useState([]);
  const [uploadData, setUploadData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [Thumbnail, setThumbnail] = useState(null);

  let Bigdata;

  const final = async () => {
    product.image = Thumbnail;
    try {
      const data = await axios.post("/api/registerProduct", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product added Successful");
      router.push("/");
    } catch (err) {
      alert("error occured!");
    }
  };

  function handleOnChange(changeEvent) {
    setImages((images) => (images = []));
    setUploadData((uploadData) => (uploadData = []));
    if (changeEvent.target.files.length > 0) {
      if (changeEvent.target.files.length > 5) {
        alert("You can only upload 5 images");
      } else {
        Array.from(changeEvent.target.files).forEach((file) => {
          const objecturl = URL.createObjectURL(file);
          imagearray = {
            img: objecturl,
            name: file.name,
            id: `${file.name}000${Math.floor(Math.random() * 1000)}`,
          };
          setImages((images) => [
            ...images,
            {
              img: objecturl,
              name: file.name,
              id: `${file.name}000${Math.floor(Math.random() * 1000)}`,
            },
          ]);
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "cryptomart-images");
          setUploadData((uploadData) => [...uploadData, formData]);
        });
      }
    }
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    uploadData.forEach((data) => {
      axios
        .post("https://api.cloudinary.com/v1_1/cryptomart/image/upload", data)
        .then((res) => {
          Bigdata = res.data;
          console.log(Bigdata);
          setProduct((product) => ({
            ...product,
            images: [...product.images, Bigdata.secure_url],
          }));
        });
    });
    console.log("length" + product.images.length);
    setShowModal(() => true);
    console.log("modal" + showModal);
  }

  let tempTitle = product.same ? product.name : product.title;

  return (
    <Container className={classes.container}>
      <Paper className={classes.product_container} elevation={4}>
        <Typography variant="h1" color="primary" style={{ fontSize: "30px" }}>
          Register Your Product
        </Typography>
        <br></br>
        <Typography variant="h1" component="h1">
          Product Name
        </Typography>
        <TextField
          className={classes.product_name}
          id="outlined-adornment-name"
          label="Detailed Name"
          variant="outlined"
          style={{ width: "50%" }}
          InputProps={{ className: classes.reg_field }}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <br />
        <TextField
          className={classes.product_name}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          InputProps={{ className: classes.reg_field }}
          style={{ width: "20%", bottom: "50px" }}
          value={tempTitle}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <br />
        <FormControlLabel
          style={{ position: "relative", bottom: "7.5rem", left: "12rem" }}
          label="Same as Name (keep it unchecked for now)"
          checked={product.same}
          control={
            <Checkbox
              onChange={(e) =>
                setProduct({ ...product, same: e.target.checked })
              }
            />
          }
        />
        <Typography
          variant="h1"
          component="h1"
          style={{ position: "relative", bottom: "7.5rem" }}
        >
          Price:{" "}
        </Typography>
        <TextField
          className={classes.product_name}
          id="outlined-basic"
          label="Price $"
          variant="outlined"
          type="number"
          InputProps={{ className: classes.reg_field }}
          style={{ width: "10%", position: "relative", bottom: "9rem" }}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <br />
        <Typography
          variant="h1"
          component="h1"
          style={{ position: "relative", bottom: "9rem" }}
        >
          Product Description:
        </Typography>
        <TextField
          id="outlined-basic"
          multiline
          rows={4}
          InputProps={{ className: classes.reg_field }}
          label="Long Description"
          variant="outlined"
          type="textarea"
          style={{ width: "60%", position: "relative", bottom: "9.5rem" }}
          onChange={(e) =>
            setProduct({
              ...product,
              description: { ...product.description, long: e.target.value },
            })
          }
        />
        <br />
        <TextField
          id="outlined-basic"
          multiline
          rows={2}
          label="Short Description"
          variant="outlined"
          InputProps={{ className: classes.reg_field }}
          style={{ width: "50%", position: "relative", bottom: "9rem" }}
          onChange={(e) =>
            setProduct({
              ...product,
              description: { ...product.description, short: e.target.value },
            })
          }
        />
        <br />
        <Typography
          variant="h1"
          component="h1"
          style={{ position: "relative", bottom: "9rem" }}
        >
          Quantity :
        </Typography>
        <TextField
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          type="number"
          InputProps={{ className: classes.reg_field }}
          style={{ width: "12%", position: "relative", bottom: "10rem" }}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
        />
        <br />
        <Typography
          variant="h1"
          component="h1"
          style={{ position: "relative", bottom: "9rem" }}
        >
          Category:{" "}
        </Typography>
        <br></br>
        <FormControlLabel
          control={
            <Select
              className={classes.reg_select}
              value={product.category}
              style={{ position: "relative", bottom: "14.5rem", left: "6rem" }}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              {category.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {" "}
                  {item.name}{" "}
                </MenuItem>
              ))}
            </Select>
          }
        />
        <br />
        {product.category === "Digital" ? (
          <FormControlLabel
            className={classes.reg_dig}
            style={{ position: "relative", bottom: "15rem", left: "0rem" }}
            label="Is Object"
            control={
              <Checkbox
                checked={product.isObject}
                onChange={(e) =>
                  setProduct({ ...product, isObject: e.target.checked })
                }
              />
            }
          />
        ) : (
          (product.isObject = true)
        )}
        <br />
        {product.isObject ? (
          <>
            <div className={classes.dimensions}>
              <Grid>
                <Typography
                  variant="h1"
                  component="h1"
                  style={{ position: "relative", bottom: "15.5rem" }}
                >
                  Dimensions:{" "}
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Width cm"
                  variant="outlined"
                  type="number"
                  style={{ position: "relative", bottom: "16rem" }}
                  InputProps={{ className: classes.reg_dimension }}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      dimensions: {
                        ...product.dimensions,
                        width: e.target.value,
                      },
                    })
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Length cm"
                  variant="outlined"
                  type="number"
                  InputProps={{ className: classes.reg_dimension }}
                  style={{ position: "relative", bottom: "16rem" }}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      dimensions: {
                        ...product.dimensions,
                        length: e.target.value,
                      },
                    })
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Height cm"
                  variant="outlined"
                  type="number"
                  InputProps={{ className: classes.reg_dimension }}
                  style={{ position: "relative", bottom: "16rem" }}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      dimensions: {
                        ...product.dimensions,
                        height: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
            </div>
          </>
        ) : (
          <>
            {(product.dimensions.width = null)}
            {(product.dimensions.length = null)}
            {(product.dimensions.height = null)}
          </>
        )}
        {product.category === "Digital" && product.isObject == false ? (
          <FormControlLabel
            style={{ position: "relative", bottom: "16.5rem", left: "0rem" }}
            label="Identity Required to Buy"
            control={
              <Checkbox
                checked={product.Identity}
                onChange={(e) =>
                  setProduct({ ...product, Identity: e.target.checked })
                }
              />
            }
          />
        ) : (
          (product.Identity = true)
        )}
        {product.category !== "Digital" ? (
          <div>
            <p style={{ position: "relative", bottom: "16rem" }}>
              Product Packaging Description:{" "}
            </p>
            <FormControlLabel
              label="Is Liquid"
              className={classes.reg_pack}
              style={{ position: "relative", bottom: "17rem", left: "0rem" }}
              control={
                <Checkbox
                  checked={product.isLiquid}
                  onChange={(e) =>
                    setProduct({ ...product, isLiquid: e.target.checked })
                  }
                />
              }
            />
            <br />
            <FormControlLabel
              className={classes.reg_pack}
              style={{ position: "relative", bottom: "17rem", left: "0rem" }}
              label="Is Flammable"
              control={
                <Checkbox
                  checked={product.isFlammable}
                  onChange={(e) =>
                    setProduct({ ...product, isFlammable: e.target.checked })
                  }
                />
              }
            />
            <br />
            <FormControlLabel
              className={classes.reg_pack}
              style={{ position: "relative", bottom: "17rem", left: "0rem" }}
              label="Is Fragile"
              control={
                <Checkbox
                  checked={product.isFragile}
                  onChange={(e) =>
                    setProduct({ ...product, isFragile: e.target.checked })
                  }
                />
              }
            />
            <br />
            <FormControlLabel
              className={classes.reg_pack}
              style={{ position: "relative", bottom: "17rem", left: "0rem" }}
              label="Is Explosive"
              control={
                <Checkbox
                  checked={product.isExplosive}
                  onChange={(e) =>
                    setProduct({ ...product, isExplosive: e.target.checked })
                  }
                />
              }
            />
          </div>
        ) : null}
        <br />
        <p style={{ position: "relative", bottom: "16.5rem" }}>Upload Image:</p>
        {images.length > 0 ? (
          <Swiper
            spaceBetween={20}
            modules={[Navigation, A11y]}
            slidesPerView={3}
            navigation
            className={classes.cert_swiper_upload}
          >
            <Grid container direction="column" className={classes.cert_grid}>
              {images.map((item) => (
                <SwiperSlide key={item.id}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={12}
                    key={item.image}
                    spacing={0}
                  >
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={item.name}
                          height="320"
                          width="320"
                          image={item.img}
                        ></CardMedia>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h2"
                            component="h3"
                            style={{
                              fontSize: "15px",
                              position: "relative",
                              bottom: "2.5rem",
                              backgroundColor: "#2b2b2b",
                            }}
                            color="primary"
                          >
                            {item.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </SwiperSlide>
              ))}
            </Grid>
          </Swiper>
        ) : null}
        <form
          method="post"
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
          className={classes.reg_img}
        >
          {images.length > 0 ? (
            <label>
              <ArrowDropUpIcon
                style={{ position: "relative", left: "4rem", fontSize: "35px" }}
              />
              <ArrowDropUpIcon
                style={{ position: "relative", left: "4rem", fontSize: "35px" }}
              />
              <ArrowDropUpIcon
                style={{ position: "relative", left: "4rem", fontSize: "35px" }}
              />
              <br></br> First image will be taken as thumbnail <br />
              {product.image == null ? "Change Pictures" : null}
            </label>
          ) : (
            <label>Choose Pictures</label>
          )}

          <br></br>
          {product.image == null ? (
            <div className={classes.reg_choose}>
              <input type="file" name="file" multiple />
            </div>
          ) : null}

          {images.length > 0 && product.image == null ? (
            <Button
              className={classes.log_button}
              variant="contained"
              type="submit"
              color="primary"
            >
              Submit
            </Button>
          ) : null}
        </form>
        <div
          className={classes.product_img_modal}
          style={{
            display: showModal ? "block" : "none",
          }}
        >
          {product.images.length == 0 ? null : (
            <Modal show={showModal} onClose={() => final()}>
              <Swiper
                spaceBetween={20}
                modules={[Navigation, A11y]}
                slidesPerView={3}
                navigation
                className={classes.cert_swiper_upload}
              >
                <Grid
                  container
                  direction="column"
                  className={classes.cert_grid}
                >
                  {product.images.map((item) => (
                    <SwiperSlide key={item.id}>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={12}
                        key={item.image}
                        spacing={0}
                      >
                        <Card>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt={item}
                              height="320"
                              width="320"
                              image={item}
                              onClick={() => setThumbnail(item)}
                            ></CardMedia>
                            {item == Thumbnail ? (
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h2"
                                  component="h3"
                                  style={{
                                    fontSize: "20px",
                                    position: "relative",
                                    bottom: "3.5rem",
                                  }}
                                  color="primary"
                                >
                                  {"\u2705"}
                                  Thumbnail
                                </Typography>
                              </CardContent>
                            ) : null}
                          </CardActionArea>
                        </Card>
                      </Grid>
                    </SwiperSlide>
                  ))}
                </Grid>
              </Swiper>
            </Modal>
          )}
        </div>
      </Paper>
    </Container>
  );
}
