import { makeStyles } from "@material-ui/core";
import { color } from "@mui/system";

const colors = {
  container: "#E0E0E0",
  main: "#F7F7F7",
};
const useStyle = makeStyles(
  {
    appBar: {
      padding: "0 5rem",
      background: "#CFBEBE",
      height: "65px",
      color: "white",
    },
    logo: {
      marginTop: "1rem",
    },
    nav_icons: {
      color: "#9747FF",
    },
    field: {
      marginLeft: "18rem",
      width: "300px",
      // border: "1px solid white",
      "& .MuiFilledInput-root ": {
        color: "white",
        border: "1px solid #grey",
        borderRadius: "5px",
      },
    },
    topic: {
      fontSize: "30px",
      fontWeight: "500",
      fontFamily: "Barlow Condensed",
    },
    panel_topic: {
      fontSize: "25px",
      fontWeight: "500",
      fontFamily: "Barlow Condensed",
      textDecoration: "underline",
      color: "primary",
    },
    btn_search: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
    },
    container: {
      width: "70%",
      padding: "2rem",
      minHeight: "110vh",
      textAlign: "Left",
      marginTop: "4%",
      alignItems: "center",
      paddingTop: "3rem",
      backgroundColor: colors.container,
    },
    param_container: {
      minHeight: "500px",
      padding: "20px",
      borderRadius: "20px",
    },
    content: {
      background: colors.container,
    },
    footer: {
      padding: "1rem",
      textAlign: "center",
      justifyContent: "center",
    },
    cert_grid: {
      overflowX: "scroll",
      overflowY: "hidden",
    },
    cert_container: {
      marginTop: "20px",
      minHeight: "30vh",
      padding: "1rem",
      borderRadius: "20px",
      background: colors.main,
    },
    cert_swiper: {
      "& .swiper-button-next": {
        padding: "10px",
        color: "#9747FF",
      },
      "& .swiper-button-prev": {
        padding: "10px",
        color: "#9747FF",
      },
      "& .MuiPaper-root": {
        padding: "10px",
      },
    },
    cert_swiper_upload: {
      bottom: "15rem",
      height: "330px",
      marginBottom: "-10rem",
      "& .swiper-button-next": {
        padding: "10px",
        color: "purple",
      },
      "& .swiper-button-prev": {
        padding: "10px",
        color: "purple",
      },
      "& .MuiPaper-root": {
        padding: "10px",
      },
    },
    category: {
      marginTop: "20px",
      minHeight: "80vh",
      padding: "1rem",
      borderRadius: "20px",
      background: colors.main,
    },
    for_you: {
      marginTop: "20px",
      minHeight: "80vh",
      padding: "1rem",
      borderRadius: "20px",
      background: colors.main,
    },
    product_card: {
      boxShadow: "none",
      padding: "0rem",
      "& .MuiCardActions-root": {
        position: "relative",
        // bottom: "20px",
      },
      "&:hover": {
        transform: "scale(1.01)",
        transition: "0.1s",
        boxShadow: "1",
        background: "#f8F8F8",
      },
    },
    featured_container: {
      minHeight: "50px",
      padding: "0.5rem",
      borderRadius: "20px",
      backgroundColor: colors.main,
    },
    media: {
      height: 0,
      paddingTop: "100%",
    },
    grow: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "end",
    },
    growcontent: {
      display: "flex",
      justifyItems: "space-between",
    },
    growcontentItem: {
      fontFamily: "Barlow Condensed",
      fontSize: "30px",
      textDecoration: "none",
      "&:hover": {
        transform: "scale(1.1)",
        transition: "0.3s",
      },
      margin: "-1rem 0.5rem",
      padding: "0.5rem",
      borderRadius: "10px",
    },
    nav_logout: {
      marginLeft: "8px",
      cursor: "pointer",
      color: "#9747FF",
    },
    auth_container: {
      minHeight: "500px",
      background: "1b1b1b",
      padding: "20px",
      borderRadius: "20px",
      alignItems: "center",
      textAlign: "center",
    },
    cart_container: {
      minHeight: "500px",
      background: "white",
      padding: "20px",
      borderRadius: "20px",
      justifyContent: "center",
      textAlign: "center",
    },
    cart_items: {
      padding: "10px",
      position: "relative",
      left: "-20px",
      margin: "10px",
      height: "130px",
      borderRadius: "10px",
      textDecoration: "none",
      border: "1px solid black",
      "&:hover": {
        background: "white",
        textDecoration: "none",
        transition: "0.3s",
        cursor: "pointer",
      },
    },
    cart_shop: {
      background: "rgb(151 71 255)",
      "&:hover": {
        background: "#cfbebe",
        color: "black",
        textDecoration: "none",
      },
    },
    item_img: {
      float: "left",
      marginRight: "20px",
    },
    item_name: {
      float: "left",
      textAlign: "left",
      fontSize: "22px",
      overflow: "hidden",
      height: "50px",
      width: "12rem",
    },
    item_rating: {
      float: "left",
      width: "3rem",
      position: "relative",
      top: "2rem",
      right: "12rem",
      textAlign: "left",
    },
    item_cat: {
      float: "left",
      width: "7rem",
      position: "relative",
      top: "3.5rem",
      right: "15rem",
      textAlign: "left",
    },
    item_price: {
      position: "absolute",
      right: "9rem",
      width: "6rem",
      top: "1.5rem",
      fontSize: "23px",
      textAlign: "left",
    },
    item_total_price: {
      position: "absolute",
      right: "0rem",
      width: "6rem",
      bottom: "0rem",
      fontSize: "25px",
      textAlign: "left",
    },
    item_button: {
      position: "absolute",
      right: "10rem",
      top: "4.5rem",
    },
    item_quantity: {
      position: "relative",
      height: "30px",
      width: "55px",
      border: "1px solid black",
      background: "black",
    },
    item_menu: {
      height: "10px",
    },

    item_control: {
      borderRadius: "20px",
      border: "1px solid black",
      height: "30px",
    },
    item_remove: {
      borderRadius: "20px",
      height: "30px",
      position: "absolute",
      top: "0.2rem",
      right: "0.2rem",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
    item_link: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "none",
        cursor: "pointer",
      },
    },

    checkout_button: {
      background: "rgb(151 71 255)",
      "&:hover": {
        background: "#cfbebe",
        color: "black",
        textDecoration: "none",
      },
    },
    // Register Product
    product_container: {
      minHeight: "500px",
      overflow: "hidden",
      background: "white",
      padding: "25px",
      borderRadius: "20px",
    },
    product_img: {
      marginLeft: "8.5rem",
      marginTop: "2.5rem",
    },
    product_details: {
      paddingLeft: "6rem",
      paddingRight: "6rem",
      paddingBottom: "2rem",
      textAlign: "justify",
    },
    product_name: {
      position: "relative",
      bottom: "25px",
      left: "0px",
    },
    reg_field: {
      color: "black",
      borderRadius: "10px",
    },
    reg_select: {
      color: "black",
      padding: "5px",
      border: "0.5px solid #cfbebe",
    },
    reg_dimension: {
      color: "black",
      border: "0.5px dotted #cfbebe",
      borderRadius: "10px",
      marginRight: "1rem",
    },
    reg_pack: {
      position: "relative",
      bottom: "18rem",
    },
    reg_dig: {
      position: "relative",
      bottom: "20rem",
    },
    reg_file: {
      color: "black",
      position: "relative",
      bottom: "16rem",
    },
    reg_button: {
      position: "relative",
      color: "white",
      bottom: "3rem",
      padding: "0.5rem",
      background: "rgb(151 71 255)",
      "&:hover": {
        background: "#cfbebe",
        color: "black",
        textDecoration: "none",
      },
    },
    reg_img: {
      position: "relative",
      bottom: "5rem",
    },
    reg_choose: {},
    reg_img_container: {
      position: "relative",
      backgroundcolor: "black",
      height: "350px",
      height: "fixed",
      bottom: "15rem",
    },
    //Login
    log_container: {
      minHeight: "500px",
      background: colors.main,
      padding: "20px",
      borderRadius: "20px",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    upload_container: {
      minHeight: "1000px",
      background: "1b1b1b",
      padding: "20px",
      borderRadius: "20px",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    log_field: {
      width: "35%",
      "& .MuiOutlinedInput-root ": {
        border: "1px solid #9747FF",
        borderRadius: "5px",
      },
    },
    log_button: {
      background: "rgb(151 71 255)",
      "&:hover": {
        background: "#cfbebe",
        color: "black",
        textDecoration: "none",
      },
    },
    log_icon: {
      position: "relative",
      top: "2rem",
      right: "1rem",
      color: "#9747FF",
    },

    connect: {
      background: "rgb(151 71 255)",
      "&:hover": {
        background: "#cfbebe",
        color: "black",
        textDecoration: "none",
      },
    },
    profile_container: {
      minHeight: "500px",
      background: colors.main,
      padding: "20px",
      borderRadius: "20px",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },

    left_panel: {
      float: "left",
      position: "fixed",
      height: "100%",
      width: "15%",
      padding: "20px",
      marginTop: "3rem",
      marginLeft: "1rem",
      background: colors.main,
      borderRadius: "20px",
      textAlign: "left",
      color: "white",
      height: "Fixed",
      fontFamily: "Barlow Condensed",
    },

    right_panel: {
      color: "white",
      position: "fixed",
      float: "right",
      minHeight: "50vh",
      width: "15%",
      padding: "20px",
      marginTop: "3rem",
      marginLeft: "84%",
      background: colors.main,
      borderRadius: "20px",
      fontFamily: "Barlow Condensed",
    },

    list: {
      listStyle: "none",
      textAlign: "left",
      cursor: "pointer",
      height: "5vh",

      "&:hover": {
        transition: "0.3s",
        textDecoration: "underline",
        color: "	#4B0082",
        fontSize: "103%",
      },
    },

    //Checkout Page CSS
    ship_container: {
      minHeight: "500px",
      padding: "20px",
      borderRadius: "20px",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },

    search_sort: {
      borderRadius: "10px",
      padding: "0.5rem",
      marginLeft: "5px",
    },
    search_field: {
      width: "300px",
    },
    left_items: {
      listStyle: "none",
      cursor: "pointer",
      right: "20px",
      position: "relative",
    },

    left_list: {
      padding: "5px",
      fontSize: "20px",
      color: "black",
      "&:hover": {
        background: "#CFBEBE",
        transition: "0.5s",
        borderRadius: "10px",
      },
    },
  },

  { index: 1 }
);

export default useStyle;
//blue hex  #00bcd4
