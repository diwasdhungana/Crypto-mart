import { Typography } from "@material-ui/core";
import useStyle from "../utils/styles"

function Right_panel()
{
        const classes = useStyle();
    return(
        <div className={classes.right_panel}>
            <Typography variant="h1" className={classes.panel_topic}>My Cart</Typography>
            
        </div>
    )
}

export default Right_panel