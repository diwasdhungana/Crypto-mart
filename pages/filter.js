
import useStyle from '../utils/styles';
import {
    Card,
    Button,
    Paper,
    Container,
    TextField,
    CardMedia,
    Grid,
    Typography,
  } from "@material-ui/core";

import data from "../utils/data";

import Search from '@mui/icons-material/Search';

const Filter = () => {
  const classes = useStyle();
  const{Products} = data;

return ( 
<Container className={classes.container}>
     <Paper elevation={4} className={classes.auth_container}>

     <TextField className={classes.search_field} 
     hiddenLabel id="filled-hidden-label-small" 
     placeholder="Search...." 
     variant="filled" size="small"/>
     <Button>Search</Button>

                <select className={classes.search_sort}>
                <option value="name" disables hidden>Price Filter</option>
                     <option value="-price">Price: High-Low</option>
                     <option value="price">Price: Low-High</option>
                </select>


                <select className={classes.search_sort}>
                    <option value="name" disables hidden>Category</option>
                     <option value="-createdAt">Home/Kitchen</option>
                     <option value="oldest">AutoMotives</option>
                     <option value="ascending">Tools</option>
                     <option value="descending">Art</option>
                     <option value="-price">Medicals</option>
                     <option value="price">Clothing</option>
                </select>
</Paper>
</Container>

      

);
}
 
export default Filter;