import { Typography } from "@material-ui/core";
import useStyle from "../utils/styles"

function Left_panel()
{
        const classes = useStyle();
    return(
        <div className={classes.left_panel}>
            <Typography variant="h1">Explore</Typography>
            <ul>
                <li>Featured</li>
                <li>Top Products</li>
                <li>Popular</li>
                <li>Weekly Best</li>
            </ul>

            <Typography variant="h1">Category</Typography>
            <ul>
                <li>Home</li>
                <li>Fashion</li>
                <li>Electronics</li>
                <li>Arts</li>
            </ul>

            <Typography variant="h1">Coupons</Typography>
            <ul>
                <li>My Coupons</li>
                <li>Apply Coupon Code</li>
                <li>Free Coupon</li>
            </ul>
        </div>
    )
}

export default Left_panel