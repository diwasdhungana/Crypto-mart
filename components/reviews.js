import { Paper, Grid, List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import Image from "next/image";
import { ClassNames } from "@emotion/react";
import useStyle from "../utils/styles";

function reviews({ fullname, review, isOwner }) {
  const classes = useStyle();
  return (
    <Grid container spacing={1} className={classes.review_content}>
      <Grid item xs={12} sm={6} md={4} className={classes.review_avatar}>
        <img
          src={`https://ui-avatars.com/api/?name=${fullname}&rounded=true`}
          alt={fullname}
          height={50}
          width={50}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <List>
          <ListItem>
            <Typography component="h3" variant="h4" color="secondary">
              {review}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component="h2" variant="h2" color="primary">
              <span style={{ fontWeight: "bold" }}>Review posted by: </span>
            </Typography>
            <Typography component="h2" variant="h2" color="secondary">
              {fullname}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component="h4" variant="h4" color="primary">
              <span style={{ fontWeight: "bold" }}>Owner: </span>{" "}
            </Typography>
            <Typography component="h4" variant="h4" color="secondary">
              {isOwner == true ? "Yes" : "No"}
            </Typography>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default reviews;
