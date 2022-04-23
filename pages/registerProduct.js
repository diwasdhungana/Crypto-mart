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
  let printedinfo = [];
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
        <p style={{ position: "relative", bottom: "16.5rem" }}>Upload Image:</p>
        <input
          className={classes.reg_file}
          type="file"
          id="image"
          onChange={(e) => {
            setProduct({ ...product, image: e.target.files[0] });
          }}
        />

        <br />
        <Button
          className={classes.reg_button}
          variant="contained"
          color="primary"
          onClick={async () => {
            const response = await fetch("/api/registerProduct", {
              method: "POST",
              body: JSON.stringify(product),
              headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            console.log(data);
          }}
        >
          {" "}
          Submit{" "}
        </Button>
      </Paper>
    </Container>
  );
}
