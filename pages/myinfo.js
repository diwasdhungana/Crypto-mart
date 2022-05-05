import { Button, Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyle from "../utils/styles";
import cookies from "js-cookie";

function Sendmail() {
  const classes = useStyle();
  const mail = cookies.get("userEmail");
  const userId = cookies.get("userId");
  const userName = cookies.get("userName");
  const user = {
    userId: userId,
    name: userName,
    email: mail,
  };

  return (mail) => {
    fetch("/api/mail/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      console.log(res);
      alert("mail sent");
      return res.json();
    });
  };
}

function Myinfo() {
  const classes = useStyle();
  const userinfo = cookies.get("userName");
  return (
    <Container className={classes.container}>
      <Paper>
        <h1>myinfo</h1>
        <Typography component="h1" variant="h1" color="primary">
          {userinfo}
        </Typography>
        <Button variant="contained" color="primary" onClick={Sendmail()}>
          send mail
        </Button>
      </Paper>
    </Container>
  );
}

export default Myinfo;
