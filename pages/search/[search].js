import { Button, Card, Container, Paper, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Product from "../../models/Product";
import useStyles from "../../utils/styles";
import db from "../../utils/db";
import ForYou from "../../components/for_you";
import axios from "axios";
import { set } from "react-hook-form";

function Search(props) {
  const classes = useStyles();
  const { search, products } = props;
  const [searching, setSearching] = useState(search);
  const [productsList, setProductsList] = useState(products);
  const [displayproducts, setDisplayproducts] = useState(productsList);
  const [priceorder, setPriceorder] = useState("");
  const [Category, setCategory] = useState("");

  const updatePrice = () => {
    if (priceorder === "HLT") {
      let htlproductsList = [];
      htlproductsList = productsList.sort((b, a) => {
        return b.price - a.price;
      });
      setDisplayproducts((displayproducts) => htlproductsList);
    } else if (priceorder === "LTH") {
      let lthproductsList = [];
      lthproductsList = productsList.sort((b, a) => {
        return a.price - b.price;
      });
      setDisplayproducts((displayproducts) => lthproductsList);
    } else if (priceorder === "name") {
      setDisplayproducts((displayproducts) => productsList);
      return;
    }
    return;
  };

  const updateCategory = () => {
    if (Category === "") {
      return;
    } else if (Category === "name") {
      setDisplayproducts((displayproducts) => productsList);
      return;
    }
    let categoryproductsList = [];
    categoryproductsList = productsList.filter((product) => {
      return product.category === Category;
    });
    setDisplayproducts((displayproducts) => categoryproductsList);
  };

  const updateSearch = () => {
    displayproducts;
  };

  useEffect(() => {
    updatePrice();
    updateSearch();
    updateCategory();
  }, [priceorder, productsList, Category]);

  return (
    <Container
      maxWidth="md"
      component="main"
      className={classes.container}
      style={{ marginTop: "25px" }}
    >
      <Paper className={classes.auth_container}>
        <Card>
          <TextField
            className={classes.search_field}
            hiddenLabel
            id="filled-hidden-label-small"
            placeholder="Search...."
            variant="filled"
            size="small"
            onKeyUp={async (e) => {
              e.preventDefault();
              const { value } = e.target;
              console.log(value);
              if (value.trim().length > 0) {
                setSearching(() => value);
                try {
                  const data = await axios.post("/api/Search", { value });
                  setProductsList((productsList) => data.data);
                  setDisplayproducts((displayproducts) => data.data);
                  updatePrice();
                  updateCategory();
                  updateSearch();
                } catch (err) {
                  alert("error occured!");
                }
              }
            }}
          />
          <select
            className={classes.search_sort}
            onChange={(e) => {
              setPriceorder((priceorder) => e.target.value);
              updatePrice();
              updateSearch();
            }}
          >
            <option value="name" disables hidden>
              Price Filter
            </option>
            <option value="HLT">Price: High-Low</option>
            <option value="LTH">Price: Low-High</option>
            <option value="name">no filter</option>
          </select>
          <select
            className={classes.search_sort}
            onChange={(e) => {
              setCategory((Category) => e.target.value);
              updateCategory();
              updateSearch();
            }}
          >
            <option value="name" disables hidden>
              Category
            </option>
            <option value="Home-Kitchen">Home-Kitchen</option>
            <option value="Automotive">AutoMotive</option>
            <option value="Tools">Tools</option>
            <option value="Art">Art</option>
            <option value="Medical">Medical</option>
            <option value="Clothing">Clothing</option>
            <option value="Decors">Decors</option>
            <option value="Digital">Digital</option>
            <option value="Fashion">Fashion</option>
            <option value="name">no filter</option>
          </select>
        </Card>
        <h3>Searching for : {searching} </h3>

        <hr />
        {displayproducts.length > 0 ? (
          <ForYou Products={displayproducts} Name={"Matching Products"} />
        ) : (
          <h1>No Products Found</h1>
        )}
      </Paper>
    </Container>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const search = context.params.search;
  await db.connect();
  const tosearch = search.trim().toLowerCase();
  const products = await Product.find({
    name: {
      $regex: tosearch,
      $options: "i",
    },
  }).lean();
  await db.disconnect();
  return {
    props: {
      search,
      products: products.map(db.convertDocumentToObject),
    },
  };
}
