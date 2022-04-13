import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({

  appBar: {
    padding:'0 5rem',
    background:"#CFBEBE",
    height:'65px'
  },
  logo:{
    marginTop:'1rem',
  },
  field:{
      marginLeft:"18rem",
      width:'300px'
  },
  topic:{
    fontSize:'30px',
    fontWeight:'500',
    fontFamily:'Barlow Condensed',
  },
  panel_topic:{
    fontSize:'25px',
    fontWeight:'500',
    fontFamily:'Barlow Condensed',
    textDecoration:'underline',
  },
  btn_search:{
    background:'transparent',
    border:'none',
    cursor:'pointer',
  },
  container: {
    width:'70%',
    padding: "2rem",
    minHeight: "100vh",
    textAlign: "Left",
    marginTop:"4%",
    alignItems:'center',
    paddingTop:'3rem'
  },
  param_container:{
    minHeight:"500px",
    background:"white",
    padding:"20px",
    borderRadius:"20px",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
  },
  content:{
    background:"#E0E0E0",
  },
  footer: {
    padding: "1rem",
    textAlign: "center",
    justifyContent:'center'
  },
  cert_grid:{
    overflowX:'scroll',
    overflowY:'hidden',
  },
  cert_container:{
    marginTop:'20px',
    minHeight:'30vh',
    padding:'1rem',
    borderRadius:'20px',
    background: '#B0C4DE'
  },
  category:{
    marginTop:'20px',
    minHeight:'80vh',
    padding:'1rem',
    borderRadius:'20px',
    background: '#B0C4DE'
  },
  for_you:{
    marginTop:'20px',
    minHeight:'80vh',
    padding:'1rem',
    borderRadius:'20px',
    background: '#B0C4DE'
  },
  featured_container:{
    minHeight:"50px",
    padding:'2rem',
    borderRadius:'20px'
  },
  media: {
		height: 0,
		paddingTop: '100%',
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
    fontFamily:'Barlow Condensed',
    fontSize:'30px',
    textDecoration:'none',
    '&:hover':{
      transform:'scale(1.1)',
      transition:'0.3s'
    },
    margin: "-1rem 0.5rem",
    padding:'0.5rem',
    borderRadius:'10px',
  },
  auth_container:{
    minHeight:"500px",
    background:"white",
    padding:"20px",
    borderRadius:"20px",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
  },
  connect:{
    padding:'2rem',
    borderRadius:'20px',
    fontSize:"20px",
    background:"#CFBEBE",
    transition:'0.3s',
    cursor:'pointer',
    '&:hover':{
      background:'#E0E0E0',
    }
  },
  profile_container:{
      minHeight:"500px",
      background:"white",
      padding:"20px",
      borderRadius:"20px",
      alignItems:"center",
      justifyContent:"center",
      textAlign:"center",
    },

  left_panel:
    {
      float: 'left',
      height: '100%',
      width: '15%',
      padding: '20px',
      marginTop: '3rem',
      marginLeft: '1rem',
      background:"#ffff",
      borderRadius:"20px",
      textAlign:"left",
      height:"Fixed",
      // '&:hover':{
      // borderColor:"#4B0082",
      // transition:'0.3s'
      // }
      fontFamily:'Barlow Condensed',
    },

    right_panel:
    {
      float: 'right',
      minHeight: '50vh',
      width: '15%',
      padding: '20px',
      marginTop: '3rem',
      marginRight: '1rem',
      background:"#ffff",
      borderRadius:"20px",
      fontFamily:'Barlow Condensed',
    },

    list:
    {
      listStyle: "none",
      textAlign: "left",
      cursor: "pointer",
      height: "5vh",
      
      '&:hover':{
        transition:'0.3s',
        textDecoration: "underline",
        color:"	#4B0082", 
        fontSize:"103%",
      },
    },
    product_container:{
      minHeight:"500px",
      background:"white",
      padding:"20px",
      borderRadius:"20px",
      alignItems:"center",
      justifyContent:"center",
      textAlign:"center",
    },
    product_img:{
        marginLeft:'8.5rem',
        marginTop:'2.5rem'
    },
    product_details:{
        paddingLeft:'6rem',
        paddingRight:'6rem',
        paddingBottom:'2rem',
        textAlign:'justify',
    },
    search_sort:{
      borderRadius:'10px',
      padding:'0.5rem',
      marginLeft:'5px'
    },
    search_field:{
      width:'300px'
    },
    left_items:
    {
      listStyle: "none",
      cursor: "pointer", 
      right: '20px',
      position: 'relative',
    },

    left_list:{
      padding:'5px',
      fontSize:'20px',
    '&:hover':{
      background:'#cfbebe',
      transition:'0.5s',
      borderRadius:'10px',
        }}
});

export default useStyle;
//blue hex  #00bcd4
