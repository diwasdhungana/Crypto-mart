/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";

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

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

export default function RegisterProduct() {
  // let imageSrc = [];
  // useEffect(() => {
  //   handleOnChange();
  // }, []);

  const classes = useStyle();
  const { category } = data;
  const [product, setProduct] = useState({
    name: "",
    same: true,
    title: "",
    price: null,
    image: null,
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
  });
  let imagearray;
  const [images, setImages] = useState([]);
  const [uploadData, setUploadData] = useState();
  let Bigdata;

  function handleOnChange(changeEvent) {
    setImages((images) => (images = []));
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
          console.log("images", images);
        });

        const form = changeEvent.currentTarget;
        const fileInput = Array.from(form.elements).find(
          ({ name }) => name === "file"
        );
        console.log("fileInput", fileInput);
        const formData = new FormData();
        for (const file of fileInput.files) {
          formData.append("file", file);
        }
        // console.log(formData);
        formData.append("upload_preset", "cryptomart-images");
        setUploadData((uploadData) => {
          uploadData = null;
          return formData;
        });
        console.log("uploadData", uploadData);
      }
    }

    // const reader = new FileReader();
    // reader.onload = function (onLoadEvent) {
    //   setImageSrc([...imageSrc, { img: onLoadEvent.target.result }]);
    //   console.log(onLoadEvent);
    //   console.log(
    //     Array.from(changeEvent.target.files).map((file) => file.name)
    //   );
    //   setUploadData(undefined);
    // };
    // reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    // console.log(event.currentTarget);
    Bigdata = await fetch(
      "https://api.cloudinary.com/v1_1/cryptomart/image/upload",
      {
        method: "POST",
        body: uploadData,
      }
    ).then((res) => res.json());
    alert("Image uploaded successfully, Submit to finalize");
    console.log("Bigdata :", Bigdata);
    setUploadData(Bigdata);
    console.log("URL : ", Bigdata.secure_url);
    setProduct({
      ...product,
      image: Bigdata.secure_url,
    });
  }

  let tempTitle = product.same ? product.name : product.title;

  return (
    <Container className={classes.container}>
      <Paper className={classes.product_container} elevation={4}>
        <Typography variant="h1" color="primary">
          Register Your Product
        </Typography>
        <br></br>
        <p>Product Name</p>
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
        <p style={{ position: "relative", bottom: "7.5rem" }}>Price: </p>
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
        <p style={{ position: "relative", bottom: "9rem" }}>
          Product Description:
        </p>
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
        <p style={{ position: "relative", bottom: "9rem" }}>Quantity :</p>
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
        <p style={{ position: "relative", bottom: "9rem" }}>Category: </p>
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
                <p style={{ position: "relative", bottom: "15.5rem" }}>
                  Dimensions:{" "}
                </p>
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
              ^^^^^^^^^^^^^^^^^^^^ <br></br> First image will be taken as
              thumbnail <br />
              {product.image == null ? "Change Pictures" : null}
            </label>
          ) : (
            <label>Choose Pictures</label>
          )}

          <br></br>
          {product.image == null ? (
            <input type="file" name="file" multiple />
          ) : null}

          {images.length > 0 && product.image == null ? (
            <button>Confirm Image</button>
          ) : null}
        </form>
        {product.image == null ? null : (
          <Button
            className={classes.reg_button}
            style={{
              backgroundColor: "#2b2b2b",
              color: "black",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
            onClick={async () => {
              console.log("PRODUCT :", product);
              const response = await fetch("/api/registerProduct", {
                method: "POST",
                body: JSON.stringify(product),
                headers: { "Content-Type": "application/json" },
              });
              const res = await response.json();
              alert("upload Successful");
              // console.log(datatoapi);
            }}
          >
            {" "}
            Submit{" "}
          </Button>
        )}
      </Paper>
    </Container>
  );
}
