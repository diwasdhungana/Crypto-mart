import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControlLabel,
  Input,
  MenuItem,
  Paper,
  Radio,
  Select,
  TextField,
} from "@material-ui/core";
import useStyle from "../utils/styles";
import data from "../utils/data";
import ImageUpload from "../components/ImageUplode";
import axios from "axios";

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
        <h1>Register Product</h1>
        <TextField
          id="outlined-basic"
          label="Detailed Name"
          variant="outlined"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Tile"
          variant="outlined"
          value={tempTitle}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <br />
        <FormControlLabel
          label="Same as Name"
          checked={product.same}
          control={
            <Checkbox
              onChange={(e) =>
                setProduct({ ...product, same: e.target.checked })
              }
            />
          }
        />{" "}
        keep it unchecked for now
        <br />
        <TextField
          id="outlined-basic"
          label="Price $"
          variant="outlined"
          type="number"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Short Description"
          variant="outlined"
          onChange={(e) =>
            setProduct({
              ...product,
              description: { ...product.description, short: e.target.value },
            })
          }
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Long Description"
          variant="outlined"
          type="textarea"
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
          label="Quantity"
          variant="outlined"
          type="number"
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
        />
        <br />
        <FormControlLabel
          control={
            <Select
              value={product.category}
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
          label="Category"
        />
        <br />
        {product.category === "Digital" ? (
          <FormControlLabel
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
            <TextField
              id="outlined-basic"
              label="Width cm"
              variant="outlined"
              type="number"
              onChange={(e) =>
                setProduct({
                  ...product,
                  dimensions: { ...product.dimensions, width: e.target.value },
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Henght cm"
              variant="outlined"
              type="number"
              onChange={(e) =>
                setProduct({
                  ...product,
                  dimensions: { ...product.dimensions, length: e.target.value },
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Height cm"
              variant="outlined"
              type="number"
              onChange={(e) =>
                setProduct({
                  ...product,
                  dimensions: { ...product.dimensions, height: e.target.value },
                })
              }
            />
          </>
        ) : (
          <>
            {(product.dimensions.width = null)}
            {(product.dimensions.length = null)}
            {(product.dimensions.height = null)}
          </>
        )}
        <br />
        {product.category === "Digital" && product.isObject == false ? (
          <FormControlLabel
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
        <br />
        {product.category !== "Digital" ? (
          <div>
            <FormControlLabel
              label="Is Liquid"
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
        <input
          type="file"
          id="image"
          onChange={(e) => {
            setProduct({ ...product, image: e.target.files[0] });
          }}
        />
        <br />
        <Button
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
