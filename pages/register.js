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
  
  
  const Register = () => {
  const classes = useStyle();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [password2,setPassword2] = useState("");

  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post("/api/user/login", {email, password});
      alert('Login Successful');
    }
    catch(err){
      alert(err.message);
    }
  
  }
  //check valid email
  const handleChangeOnEmail = e => {
    setEmail(e.target.value);
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(email)){
      // If email is invalid, show an error message
      //rejin do css 
      // alert("Invalid Email");
      console.log("invalid email");
    }
  }
  //check strong password 
  const handleChangeOnPassword = e=>{
    setPassword(e.target.value);
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/;
    if(!passwordRegex.test(email)){
      console.log("Weak Password");
    }
  }
  //check  if the passwords match or not
  const handleChangeOnPassword2 = e=>{
    setPassword2(e.target.value);
    if (password != password2){
      console.log("Passwords do not match ")
    }
  }


  
  return(
  <Container className={classes.container}>
   <Paper>
     <Grid>
       <Typography variant="h1" className={classes.title}>
         Register
         </Typography>
     </Grid>
   <form onSubmit={submitHandler} className={classes.form}>
   <br></br>
      <TextField id="outlined-basic"
      label="FirstName"
      variant="outlined"
      fullWidth
      inputProps={{type: "First Name"}}
    //   onChange={e=>setEmail(e.target.value)}
      />
      <br></br>
      <br></br>
      <TextField id="outlined-basic"
      label="Last Name"
      variant="outlined"
      fullWidth
      inputProps={{type: "Last name "}}
    //   onChange={e=>setEmail(e.target.value)}
      />
      <br></br>
      <br></br>
      <TextField id="outlined-basic"
      label="Email"
      variant="outlined"
      fullWidth
      inputProps={{type: "email"}}
      onChange={handleChangeOnEmail}
      />
      <br></br>
      <TextField
       id="outlined-basic"
       label="Password"
        variant="outlined"
        fullWidth
        inputProps={{type: "Password"}}
        onChange={handleChangeOnPassword}
        />
      <br></br>

      <br></br>
      <TextField
       id="outlined-basic"
       label="Re-type Password"
        variant="outlined"
        fullWidth
        inputProps={{type: "Password"}}
        onChange={handleChangeOnPassword2}
        />


      <br></br>
     
      <Button variant="contained" fullWidth color="primary"  type="submit">
  Register
  </Button>
  
  </form>
  <ListItem>
    Already have an account? {''}
     <NextLink href = "/login" >
       <Link>Login</Link>
       </NextLink>
  </ListItem>
       
   </Paper>
  </Container>
  )
  
  }
  
  export default Register