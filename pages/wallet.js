import { useMoralis } from "react-moralis";
import Profile from "../pages/profile"
import Auth from "./auth";


const Wallet = () => {
    const{isAuthenticated, logout}=useMoralis();
    return ( 
        <div>
            {isAuthenticated ? (
                 <Profile/>
                ):(
                    <Auth/>
                )}
        </div>        
     );
}
 
export default Wallet;