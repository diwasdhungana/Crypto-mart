import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";

function Picture_modal({ show, onClose, children }) {
  const [isbrowser, setIsbrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsbrowser(true);
    }
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    console.log("closing");
    onClose();
  };

  const pictureModal = show ? (
    <div
      className="pictureModal"
      style={{
        display: isbrowser ? "block" : "none",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999",
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%",
        height: "100%",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        border: "none",
        outline: "none",
        padding: "0",
        margin: "0",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        spacing="none"
        style={{
          //center of screen horizontally
          maxWidth: "80%",
          maxHeight: "80%",
          position: "absolute",
          left: "15rem",
          top: "5%",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{
            position: "absolute",
            top: "0rem",
            maxWidth: "20rem",
          }}
        >
          {children}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            onClick={handleClose}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            size="small"
          >
            &times;
          </Button>
        </Grid>
      </Grid>
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

export default Picture_modal;
