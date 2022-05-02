import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(
  {
    appBar: {
      padding: "0 5rem",
      background: "#1b1b1b",
      height: "65px",
      color: "white",
    },
    logo: {
      marginTop: "1rem",
    },
    field: {
      marginLeft: "18rem",
      width: "300px",
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
      backgroundColor: "black",
    },
    param_container: {
      minHeight: "500px",
      padding: "20px",
      background: "#1b1b1b",
      borderRadius: "20px",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    content: {
      background: "black",
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
      background: "#2b2b2b",
    },
    cert_swiper: {
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
      background: "#2b2b2b",
    },
    for_you: {
      marginTop: "20px",
      minHeight: "80vh",
      padding: "1rem",
      borderRadius: "20px",
      background: "#2b2b2b",
    },
    product_card: {
      boxShadow: "none",
      border: " 1px solid #1b1b1b",
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
      backgroundColor: "#2b2b2b",
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
    },
    auth_container: {
      minHeight: "500px",
      background: "1b1b1b",
      padding: "20px",
      borderRadius: "20px",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    cart_container: {
      minHeight: "500px",
      background: "#1b1b1b",
      padding: "20px",
      borderRadius: "20px",
      justifyContent: "center",
      textAlign: "center",
    },
    cart_items: {
      listStyle: "none",
      padding: "10px",
      margin: "20px",
      position: "relative",
      left: "-20px",
      background: "#1b1b1b",
      minHeight: "50px",
      borderRadius: "20px",
      textDecoration: "none",
      border: "1px solid black",
      "&:hover": {
        background: "#222222",
        textDecoration: "none",
        transition: "0.3s",
        cursor: "pointer",
      },
    },
    cart_shop: {
      border: "1px solid purple",
      borderRadius: "10px",
      background: "#cfbebe",
      "&:hover": {
        background: "#cfbebe",
        color: "black",
        textDecoration: "none",
      },
    },

    item_link: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    item_name: {
      margin: " 0 2rem 0",
      position: "relative",
      bottom: "60px",
      fontSize: "20px",
      fontWeight: "500",
    },
    item_rating: {
      position: "relative",
      right: "15%",
      fontSize: "13px",
      bottom: "40px",
    },
    item_cat: {
      position: "relative",
      right: "20.6%",
      fontSize: "13px",
      bottom: "20px",
    },
    item_price: {
      margin: " 0 2rem 1rem",
      position: "relative",
      bottom: "35px",
      right: "9%",
    },
    item_image: {
      borderRadius: "12px",
    },

    item_quantity: {
      position: "relative",
      top: "0px",
      height: "30px",
      width: "55px",
      border: "1px solid black",
    },
    item_menu: {
      position: "relative",
      height: "5px",
    },
    item_button: {
      margin: " 0 2rem 1rem",
      position: "relative",
      bottom: "35px",
      right: "60px",
      height: "30px",
    },
    item_control: {
      borderRadius: "20px",
      border: "1px solid black",
      height: "30px",
      backgroundColor: "#2b2b2b",
    },
    item_remove: {
      borderRadius: "20px",
      height: "30px",
      position: "relative",
      bottom: "35px",
      right: "27px",
      backgroundColor: "#363636",
    },
    checkout_button: {
      borderRadius: "20px",
      height: "45px",
      backgroundColor: "#363636",
    },

    // Register Product
    product_container: {
      minHeight: "500px",
      overflow: "hidden",
      background: "#1b1b1b",
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
      border: "0.5px dotted #cfbebe",
      borderRadius: "10px",
      background: "#1b1b1b",
    },
    reg_select: {
      color: "black",
      padding: "5px",
      border: "0.5px solid #cfbebe",
      background: "#1b1b1b",
    },
    reg_dimension: {
      color: "black",
      border: "0.5px dotted #cfbebe",
      borderRadius: "10px",
      background: "#1b1b1b",
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
      background: "#1b1b1b",
      position: "relative",
      bottom: "16rem",
    },
    reg_button: {
      position: "relative",
      bottom: "3rem",
      backgroundColor: "#cfbebe",
    },
    reg_img: {
      position: "relative",
      bottom: "5rem",
    },
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
      background: "1b1b1b",
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
    },
    log_icon: {
      position: "relative",
      top: "2rem",
      right: "1rem",
    },

    connect: {
      padding: "1rem",
      marginTop: "2rem",
      borderRadius: "20px",
      border: "1px solid #cfbebe",
      fontSize: "20px",
      fontFamily: "Barlow Condensed",
      background: "#1b1b1b",
      transition: "0.3s",
      cursor: "pointer",
      "&:hover": {
        background: "#E0E0E0",
      },
    },
    profile_container: {
      minHeight: "500px",
      background: "1b1b1b",
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
      background: "#222222",
      borderRadius: "20px",
      border: "1px solid #1b1b1b",
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
      background: "#222222",
      borderRadius: "20px",
      fontFamily: "Barlow Condensed",
      border: "1px solid #1b1b1b",
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
      background: "#1b1b1b",
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
      "&:hover": {
        background: "#1b1b1b",
        transition: "0.5s",
        borderRadius: "10px",
      },
    },
  },

  { index: 1 }
);

export default useStyle;
//blue hex  #00bcd4
