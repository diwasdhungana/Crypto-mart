import { Link, Typography } from "@material-ui/core";
import useStyle from "../utils/styles"
import Navlink from "next/link";

function Left_panel()
{
        const classes = useStyle();
    return(
        <div className={classes.left_panel}>
            <Typography variant="h1" component="h3" className={classes.panel_topic}>Explore</Typography>
            <ul className={classes.left_items}>
                <Navlink href={'/docs/Featured Products'}>   
                    <li className={classes.left_list}>Featured</li>
                </Navlink>
                <Navlink href={'/docs/Top Products'}>   
                    <li className={classes.left_list}>Top Products</li>
                </Navlink>
                <Navlink href={'/docs/Popular'}>   
                    <li className={classes.left_list}>Popular</li>
                </Navlink>
                <Navlink href={'/docs/Weekly Best'}>   
                    <li className={classes.left_list}>Weekly Best</li>
                </Navlink>
            </ul>

            <Typography variant="h1" className={classes.panel_topic}>Category</Typography>
            <ul className={classes.left_items}>
            <Navlink href={'/Home'}>   
                    <li className={classes.left_list}>Home</li>
                </Navlink>
                <Navlink href={'/Fashion'}>   
                    <li className={classes.left_list}>Fashion</li>
                </Navlink>
                <Navlink href={'/Electronics'}>   
                    <li className={classes.left_list}>Electronics</li>
                </Navlink>
                <Navlink href={'/Arts'}>   
                    <li className={classes.left_list}>Arts</li>
                </Navlink>
            </ul>

            <Typography variant="h1" className={classes.panel_topic}>Coupons</Typography>
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