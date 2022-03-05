import useStyle from "../utils/styles"

function Left_panel()
{
        const classes = useStyle();
    return(
        <div className={classes.left_panel}>
            <h1>Explore</h1>
            <ul>
                <li>Featured</li>
                <li>Top Products</li>
                <li>Popular</li>
                <li>Weekly Best</li>
            </ul>

            <h1>Category</h1>
            <ul>
                <li>Home</li>
                <li>Fashion</li>
                <li>Electronics</li>
                <li>Arts</li>
            </ul>

            <h1>Coupon</h1>
            <ul>
                <li>My Coupons</li>
                <li>Apply Coupon Code</li>
                <li>Free Coupon</li>
            </ul>
        </div>
    )
}

export default Left_panel