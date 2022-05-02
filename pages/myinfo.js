import { Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyle from "../utils/styles";
import Cookies from "js-cookie";

function Myinfo() {
  const classes = useStyle();
  const userinfo = Cookies.get("userName");
  return (
    <Container className={classes.container}>
      <Paper>
        <h1>myinfo</h1>
        <Typography component="h1" variant="h1" color="primary">
          {userinfo}
        </Typography>
      </Paper>
    </Container>
  );
}

export default Myinfo;
