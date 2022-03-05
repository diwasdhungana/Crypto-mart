
import {useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useTokenPrice} from 'react-moralis'
import {useState, useEffect} from 'react'
import Moralis from 'moralis'
import styles from '../styles/Home.module.css'


function Dash(coins)
{
    console.log(coins)
    const{logout, user} = useMoralis()
    const Web3Api = useMoralisWeb3Api()

    const [ethBalance, setEthBalance] = useState()
    
    const fetchNativeBalance = async()=>{
        const result = await Web3Api.account.getNativeBalance({
            chain:"matic"
        }).catch(e=>console.log(e))
        if(result.balance){
            setEthBalance(Moralis.Units.FromWei(result.balance))
        }
    }

    useEffect(()=>{
        fetchNativeBalance()
    }
    )
    return ( 
        <div className={styles.main}>
            <div className={styles.dashboard}>
            <h1>Wallet successfully connected!</h1>
            <h2>Welcome User: {user.getUsername()}</h2>
            <p>Your Wallet Address: {user.get('ethAddress')}</p>
            <p className={styles.balance}>Balance:{ethBalance} MATIC </p>
            <button onClick={logout}>Disconnect</button>
            </div>
        </div>
     );
}
 
export default Dash;


