import { Link, Typography } from "@material-ui/core";
import useStyle from "../utils/styles";
import Navlink from "next/link";

function Left_panel() {
  const classes = useStyle();
  return (
    <div className={classes.left_panel}>
      <Typography
        variant="h1"
        component="h3"
        className={classes.panel_topic}
        color="primary"
      >
        Explore
      </Typography>
      <ul className={classes.left_items}>
        <Navlink href={"/explore/Featured"} passHref>
          <li className={classes.left_list}>Featured</li>
        </Navlink>
        <Navlink href={"/explore/TopProducts"} passHref>
          <li className={classes.left_list}>Top Products</li>
        </Navlink>
        <Navlink href={"/explore/Popular"} passHref>
          <li className={classes.left_list}>Popular</li>
        </Navlink>
        <Navlink href={"/explore/WeeklyBest"} passHref>
          <li className={classes.left_list}>Weekly Best</li>
        </Navlink>
      </ul>

      <Typography variant="h1" className={classes.panel_topic} color="primary">
        Category
      </Typography>
      <ul className={classes.left_items}>
        <Navlink href={"/docs/Clothing"} passHref>
          <li className={classes.left_list}>Clothing</li>
        </Navlink>
        <Navlink href={"/docs/Fashion"} passHref>
          <li className={classes.left_list}>Fashion</li>
        </Navlink>
        <Navlink href={"/docs/Digital"} passHref>
          <li className={classes.left_list}>Digital</li>
        </Navlink>
        <Navlink href={"/docs/Medical"} passHref>
          <li className={classes.left_list}>Medical</li>
        </Navlink>
      </ul>

      <Typography variant="h1" className={classes.panel_topic} color="primary">
        Coupons
      </Typography>
      <ul className={classes.left_items}>
        <Navlink href={"/"} passHref>
          <li className={classes.left_list}>My Coupon</li>
        </Navlink>
        <Navlink href={"/"} passHref>
          <li className={classes.left_list}>Apply Coupon</li>
        </Navlink>
        <Navlink href={"/"} passHref>
          <li className={classes.left_list}>Free Coupon</li>
        </Navlink>
      </ul>
    </div>
  );
}

export default Left_panel;
