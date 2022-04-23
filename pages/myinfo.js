import { Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyle from "../utils/styles";
import Cookies from "js-cookie";

function Myinfo() {
  const classes = useStyle();
  const userinfo = Cookies.get("userEmail");
  return (
    <Container className={classes.container}>
      <Paper>
        <h1>myinfo</h1>
        <Typography component="h1" variant="h1">
          {userinfo}
        </Typography>
      </Paper>
    </Container>
  );
}

export default Myinfo;
