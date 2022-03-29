import { Link, Typography } from "@material-ui/core";
import useStyle from "../utils/styles"
import Navlink from "next/link";

function Left_panel()
{
        const classes = useStyle();
    return(
        <div className={classes.left_panel}>
<<<<<<< HEAD
            <Typography variant="h1" component="h2">Explore</Typography>
            <ul className={classes.left_items}>
                <Navlink href={'/'}>   
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
=======
            <h1>Explore</h1>
            <ul>
               <Link href={"/feature"}>
                <li className={classes.list}>Featured</li>
                </Link>
                <li className={classes.list}>Top Products</li>
                <li className={classes.list}>Popular</li>
                <li className={classes.list}>Weekly Best</li>
                
            </ul>

            <h1>Category</h1>
            <ul>
                <li className={classes.list}>Home</li>
                <li className={classes.list}>Fashion</li>
                <li className={classes.list}>Electronics</li>
                <li className={classes.list}>Arts</li>
            </ul>

            <h1>Coupon</h1>
            <ul>
                <li className={classes.list}>My Coupons</li>
                <li className={classes.list}>Apply Coupon Code</li>
                <li className={classes.list}>Free Coupon</li>
>>>>>>> 1cc7546e465b8fd0dea118d9acb45ff3f656a9aa
            </ul>
            
        </div>
    )
}

export default Left_panel