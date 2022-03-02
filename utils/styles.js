import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  appBar: {
    backgroundColor: "secondary",
  },
  container: {
    padding: "1rem",
    height: "80vh",
    overflow: "auto",
    textAlign: "Left",
  },
  footer: {
    //  backgroundColor: "#00bcd4",
    padding: "1rem",
    textAlign: "center",
  },
  grow: {
    display: "flex",
    flexGrow: 1,
    // backgroundColor: "#00bcd4",
    justifyContent: "end",
  },
  growcontent: {
    display: "flex",
    justifyItems: "space-between",
  },
  growcontentItem: {
    margin: "0.5rem",
    // color: "#fafafa",
  },
});

export default useStyle;
//blue hex  #00bcd4
