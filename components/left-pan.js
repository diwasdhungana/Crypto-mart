import { Link, Typography } from "@material-ui/core";
import useStyle from "../utils/styles"
import Navlink from "next/link";

function Left_panel()
{
        const classes = useStyle();
    return(
        <div className={classes.left_panel}>
            <Typography variant="h1" component="h2">Explore</Typography>
            <ul className={classes.left_items}>
                <Navlink href={'/docs/feature'}>   
                    <li className={classes.left_list}>Featured</li>
                </Navlink>
                <Navlink href={'/'}>   
                    <li className={classes.left_list}>Top Products</li>
                </Navlink>
                <Navlink href={'/'}>   
                    <li className={classes.left_list}>Popular</li>
                </Navlink>
                <Navlink href={'/'}>   
                    <li className={classes.left_list}>Weekly Best</li>
                </Navlink>
            </ul>

            <Typography variant="h1">Category</Typography>
            <ul className={classes.left_items}>
            <Navlink href={'/'}>   
                    <li className={classes.left_list}>Home</li>
                </Navlink>
                <Navlink href={'/'}>   
                    <li className={classes.left_list}>Fashion</li>
                </Navlink>
                <Navlink href={'/'}>   
                    <li className={classes.left_list}>Electronics</li>
                </Navlink>
                <Navlink href={'/'}>   
                    <li className={classes.left_list}>Arts</li>
                </Navlink>
            </ul>

            <Typography variant="h1">Coupons</Typography>
            <ul className={classes.left_items}>
            <Navlink href={'/'}>   
                    <li className={classes.left_list}>My Coupon</li>
                </Navlink>
                <Navlink href={'/'}>   
                    <li className={classes.left_list}>Apply Coupon</li>
                </Navlink>
                <Navlink href={'/'}>   
                    <li className={classes.left_list}>Free Coupon</li>
                </Navlink>
            </ul>
            
        </div>
    )
}

export default Left_panel