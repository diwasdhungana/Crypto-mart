import {useRouter} from 'next/router';
import useStyle from "../../utils/styles";
import {
    Container,
    Paper,
    Typography,
  } from "@material-ui/core";
function Doc(){
    const router = useRouter() 
    const classes = useStyle();
    const {params =[]} = router.query
        return (
            <Container className={classes.container}>
                <Paper className={classes.param_container} elevation={4}>
                 <div>
                    <Typography variant='h1'>{params[0]}</Typography>
                </div>  
                </Paper>
            </Container>
                     
        )
    }
export default  Doc;

