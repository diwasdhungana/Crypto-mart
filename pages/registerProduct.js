import React, { useEffect, useState } from "react";

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
} from "@material-ui/core";
import useStyle from "../utils/styles";
import data from "../utils/data";
import axios from "axios";
import { Category } from "@material-ui/icons";
import { display } from "@mui/system";

export default function RegisterProduct() {
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

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  let Bigdata;

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "cryptomart-images");
    Bigdata = await fetch(
      "https://api.cloudinary.com/v1_1/cryptomart/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());
    alert("Image uploaded successfully, Submit to finalize");
    setUploadData(Bigdata);
    console.log("URL : ", Bigdata.secure_url);
    setImageSrc(Bigdata.secure_url);
    setProduct({
      ...product,
      image: Bigdata.secure_url,
    });
  }

  let tempTitle = product.same ? product.name : product.title;

  return (
    <Container className={classes.container}>
      <Paper className={classes.product_container} elevation={4}>
        <Typography variant="h1">Register Your Product</Typography>
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
        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit} className={classes.reg_img}>
          <p>
            <input type="file" name="file" />
          </p>
          <img src={imageSrc} />

          {/* {imageSrc && !uploadData && ( */}
          <p>
            <button>Confirm Image</button>
          </p>
          {/* )} */}

          {/* {uploadData && (
            <code>
            <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )} */}
        </form>
        <Button
          className={classes.reg_button}
          style={{'backgroundColor':'#c88bd1', 'color':'black', 'padding':'10px 20px', 'borderRadius':'10px'}}
          onClick={async () => {
            console.log(imageSrc);
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
        </Button>{" "}
      </Paper>
    </Container>
  );
}
