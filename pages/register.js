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
import { useState } from "react";
import bcrypt from "bcryptjs";

const Register = () => {
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
      <Paper>
        <Grid>
          <Typography variant="h1" className={classes.title}>
            Register
          </Typography>
        </Grid>
        <form onSubmit={submitHandler} className={classes.form}>
          <br></br>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            fullWidth
            inputProps={{ type: "First Name" }}
            onChange={handleChangeOnFirstname}
          />
          <br></br>
          <TextField
            id="outlined-basic"
            label="Middle Name"
            variant="outlined"
            fullWidth
            inputProps={{ type: "Middle Name" }}
            onChange={handleChangeOnMiddlename}
          />
          <br></br>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            fullWidth
            inputProps={{ type: "Last name " }}
            onChange={handleChangeOnLastname}
          />
          <br></br>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            inputProps={{ type: "email" }}
            onChange={handleChangeOnEmail}
          />
          <br></br>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            inputProps={{ type: "Password" }}
            onChange={handleChangeOnPassword}
          />
          <br></br>

          <br></br>
          <TextField
            id="outlined-basic"
            label="Re-type Password"
            variant="outlined"
            fullWidth
            inputProps={{ type: "Password" }}
            onChange={handleChangeOnPassword2}
          />

          <br></br>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            fullWidth
            inputProps={{ type: "Number" }}
            onChange={handleChangeOnPhoneNumber}
          />
          <br></br>

          <Button variant="contained" fullWidth color="primary" type="submit">
            Register
          </Button>
        </form>
        <ListItem>
          Already have an account?{" "}
          <NextLink href="/login" passHref>
            <Link>Login</Link>
          </NextLink>
        </ListItem>
      </Paper>
    </Container>
  );
};

export default Register;
