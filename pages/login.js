import * as React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  Paper,
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  Link,
  ListItem,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import axios from "axios";
import NextLink from "next/link";
import useStyle from "../utils/styles";
import { Store } from "../utils/Store";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

//Icon Imports
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";

const Login = () => {
  //For password visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const router = useRouter();
  //login?redirect=shipping
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo, router]);

  const classes = useStyle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/api/user/login", { email, password });
      dispatch({ type: "USER_LOGIN", payload: data.data });
      // console.log("user data", data.data);
      alert("Login Successful");
      router.push(redirect || "/");
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
      // alert("something is still not working");
    }
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.log_container}>
        <Grid>
          <Typography variant="h1" className={classes.title} color="primary">
            Login
          </Typography>
        </Grid>
        <form onSubmit={submitHandler} className={classes.form}>
          <br></br>
          <AccountCircleIcon
            className={classes.log_icon}
            style={{ color: "#9747FF" }}
            sx={{ fontSize: 30 }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            inputProps={{ type: "email" }}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.log_field}
          />
          <br></br>
          <KeyIcon
            className={classes.log_icon}
            style={{ color: "#9747FF" }}
            sx={{ fontSize: 30 }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            className={classes.log_field}
            type={showPassword ? "text" : "password"}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br></br>

          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </form>
        Dont have an account? {""}
        <br></br>
        <NextLink href="/register" passHref>
          <Link>
            <Button>Register</Button>
          </Link>
        </NextLink>
      </Paper>
    </Container>
  );
};

export default Login;
