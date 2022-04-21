import {
  Paper,
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  Link,
  ListItem,
} from "@material-ui/core";
import axios from "axios";
import NextLink from "next/link";
import useStyle from "../utils/styles";
import { Store } from "../utils/Store";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Featured = () => {
  const router = useRouter();
  //login?redirect=shipping
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  if (userInfo) {
    router.push("/");
  }
  const classes = useStyle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/api/user/login", { email, password });
      dispatch({ type: "USER_LOGIN", payload: data });
      // Cookies.set("userInfo", data);
      router.push(redirect || "/");
      alert("Login Successful");
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
      // alert("something is still not working");
    }
  };

  return (
    <Container className={classes.container}>
      <Paper>
        <Grid>
          <Typography variant="h1" className={classes.title}>
            Login
          </Typography>
        </Grid>
        <form onSubmit={submitHandler} className={classes.form}>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            inputProps={{ type: "email" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            inputProps={{ type: "Password" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>

          <Button variant="contained" type="submit" fullWidth color="primary">
            Submit
          </Button>
        </form>

        <ListItem>
          Dont have an account? {""}
          <NextLink href="/register" passHref>
            <Link>Register</Link>
          </NextLink>
        </ListItem>
      </Paper>
    </Container>
  );
};

export default Featured;
