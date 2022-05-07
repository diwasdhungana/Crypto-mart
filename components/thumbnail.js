import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";

////This is a modal file.

function Thumbnail({ show, onClose, children }) {
  const [isbrowser, setIsbrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsbrowser(true);
    }
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    console.log("submitting");
    onClose();
  };

  const pictureModal = show ? (
    <div
      className="pictureModal"
      style={{
        display: isbrowser ? "block" : "none",
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999",
        backgroundColor: "rgba(30,0,50,0.7)",
        width: "100%",
        height: "100%",
        overflow: "auto",
        WebkitOverflowScaling: "touch",
        border: "none",
        outline: "none",
        padding: "0",
        margin: "0",
        overflow: "hidden",
        minWidth: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          maxHeight: "80%",
          position: "absolute",
          left: "10rem",
          top: "50%",
          minWidth: "100%",
        }}
      >
        {children}
        <Typography
          variant="h6"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            textAlign: "center",
            padding: "1rem",
            color: "white",
            fontSize: "1.5rem",
          }}
        >
          Choose Thumbnail
        </Typography>
        <Button
          style={{
            position: "absolute",
            bottom: "-1rem",
            left: "0",
            right: "0",
            margin: "0 auto",
            width: "10%",
            height: "3rem",
            backgroundColor: "rgba(100,0,30,1)",
            color: "white",
          }}
          onClick={handleClose}
        >
          Submit
        </Button>
      </div>
    </div>
  ) : null;

  if (!isbrowser) {
    return null;
  }

  return ReactDOM.createPortal(
    pictureModal,
    document.getElementById("pictureModal")
  );
}

export default Thumbnail;
