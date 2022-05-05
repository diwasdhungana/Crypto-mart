import { Container, Paper } from "@material-ui/core";
import React from "react";
import useStyle from "../../../utils/styles";
import axios from "axios";
import { useState, useEffect } from "react";

function Verify({ token }) {
  const classes = useStyle();
  const [message, setMessage] = useState("verification in progress");

  async function tokenverification(token) {
    try {
      const data = await axios.post("/api/user/postverify", { token: token });
      data.data.message == "true"
        ? setMessage(
            (message) =>
              "verification successful, visit login page now. https://localhost:3000/login"
          )
        : setMessage((message) => "verification failed");
    } catch (err) {
      setMessage(err.data.message);
    }
  }

  useEffect(() => {
    tokenverification(token);
  }, [token]);

  return (
    //page to handle the verification of the user in querry string
    <Container className={classes.container}>
      <Paper className={classes.paper}>{message}</Paper>
    </Container>
  );
}

export default Verify;

export async function getServerSideProps(context) {
  const token = context.params.token;

  return {
    props: {
      token,
    },
  };
}
