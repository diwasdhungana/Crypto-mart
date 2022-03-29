import { Link, Typography } from "@material-ui/core";
import useStyle from "../utils/styles"

function Left_panel()
{
        const classes = useStyle();
    return(
        <div className={classes.left_panel}>
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
            </ul>
            
        </div>
    )
}

export default Left_panel