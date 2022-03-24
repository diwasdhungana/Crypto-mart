import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({

  appBar: {
    padding:'0 10rem',
    background:"#CFBEBE"
  },
  container: {
    width:'75%',
    padding: "2rem",
    minHeight: "100vh",
    textAlign: "Left",
    marginTop:"6%",
    alignItems:'center'
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
    minHeight:'40vh',
    padding:'1.5rem',
    borderRadius:'20px'
  },
  category:{
    marginTop:'20px',
    minHeight:'80vh',
    padding:'1rem',
    borderRadius:'20px'

  },
  for_you:{
    marginTop:'20px',
    minHeight:'80vh',
    padding:'1rem',
    borderRadius:'20px'
  },
  featured_container:{
    minHeight:"580px",
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
    '&:hover':{
      background:'#E0E0E0',
    },
    margin: "0 1rem",
    padding:'0.5rem',
    borderRadius:'10px',
  },
  search:{
    marginLeft:"38rem",
   

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
      width: '25vh',
      padding: '20px',
      margin: '20px',
      background:"#ffff",
      borderRadius:"20px",
    },

    list:
    {
      listStyle: "none",
      
      '&:hover':{
        textDecoration: "underline",
      }
    }
});

export default useStyle;
//blue hex  #00bcd4
