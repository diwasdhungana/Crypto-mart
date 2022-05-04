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
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import NextLink from "next/link";
import useStyle from "../utils/styles";
import { useState } from "react";
import bcrypt from "bcryptjs";

//Icon Imports
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";

const Register = () => {
  //For password visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const classes = useStyle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Middlename, setMiddlename] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const Address = null;
  const city = null;
  const streetName = null;
  const country = null;
  const [PhoneNumber, setPhoneNumber] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/signup", {
        email,
        password: bcrypt.hashSync(password),
        Firstname,
        Lastname,
        Middlename,
        isAdmin,
        isActive,
        Address,
        city,
        streetName,
        country,
        PhoneNumber,
        fullName: `${Firstname} ${Middlename} ${Lastname}`,
      });
      alert("User Registered");
    } catch (err) {
      alert(err.message);
    }
  };
  //check valid email
  const handleChangeOnEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      // If email is invalid, show an error message
      //rejin do css
      // alert("Invalid Email");
      console.log("invalid email");
    }
  };
  //check strong password
  const handleChangeOnPassword = (e) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/;
    if (!passwordRegex.test(email)) {
      console.log("Weak Password");
    }
  };
  //check  if the passwords match or not
  const handleChangeOnPassword2 = (e) => {
    setPassword2(e.target.value);
    if (password != password2) {
      console.log("Passwords do not match ");
    }
  };

  const handleChangeOnFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleChangeOnLastname = (e) => {
    setLastname(e.target.value);
  };
  const handleChangeOnPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeOnMiddlename = (e) => {
    setMiddlename(e.target.value);
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.log_container}>
        <Grid>
          <Typography variant="h1" className={classes.title} color="primary">
            Register
          </Typography>
        </Grid>
        <form onSubmit={submitHandler} className={classes.form}>
          <br></br>
          <DriveFileRenameOutlineIcon
            className={classes.log_icon}
            sx={{ fontSize: 30 }}
          />
          <TextField
            id="outlined-basic"
            className={classes.log_field}
            label="First Name"
            variant="outlined"
            inputProps={{ type: "First Name" }}
            onChange={handleChangeOnFirstname}
          />
          <br></br>
          <DriveFileRenameOutlineIcon
            className={classes.log_icon}
            sx={{ fontSize: 30 }}
          />
          <TextField
            id="outlined-basic"
            className={classes.log_field}
            label="Middle Name"
            variant="outlined"
            inputProps={{ type: "Middle Name" }}
            onChange={handleChangeOnMiddlename}
          />
          <br></br>
          <DriveFileRenameOutlineIcon
            className={classes.log_icon}
            sx={{ fontSize: 30 }}
          />
          <TextField
            id="outlined-basic"
            className={classes.log_field}
            label="Last Name"
            variant="outlined"
            inputProps={{ type: "Last name " }}
            onChange={handleChangeOnLastname}
          />
          <br></br>
          <br></br>
          <AccountCircleIcon
            className={classes.log_icon}
            sx={{ fontSize: 30 }}
          />
          <TextField
            id="outlined-basic"
            className={classes.log_field}
            label="Email"
            variant="outlined"
            inputProps={{ type: "email" }}
            onChange={handleChangeOnEmail}
          />
          <br></br>
          <KeyIcon
            className={classes.log_icon}
            sx={{ fontSize: 30 }}
          />
          <TextField
            id="outlined-basic"
            className={classes.log_field}
            label="Password"
            variant="outlined"
            onChange={handleChangeOnPassword}
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

          <br></br>
          <LockIcon
            className={classes.log_icon}
            sx={{ fontSize: 30 }}
          />
          <TextField
            id="outlined-basic"
            label="Re-type Password"
            variant="outlined"
            onChange={handleChangeOnPassword2}
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
          <br></br>
          <PhoneIcon
            className={classes.log_icon}
            sx={{ fontSize: 30 }}
          />
          <TextField
            id="outlined-basic"
            className={classes.log_field}
            label="Phone Number"
            variant="outlined"
            inputProps={{ type: "Number" }}
            onChange={handleChangeOnPhoneNumber}
          />
          <br></br>

          <Button variant="contained" color="primary" type="submit" className={classes.log_button}>
            Register
          </Button>
        </form>
        Already have an account? <br></br>
        <NextLink href="/login" passHref>
        <Button className={classes.log_button}>
          <Link style={{'textDecoration':'none', 'color':'white'}}>Login</Link>
          </Button>
        </NextLink>
      </Paper>
    </Container>
  );
};

export default Register;
