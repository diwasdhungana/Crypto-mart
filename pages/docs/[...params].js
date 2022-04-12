import {useRouter} from 'next/router';
// import useStyle from "../utils/styles";
function Doc(){
    const router = useRouter() 
    const {params =[]} = router.query
    console.log(params,params.lenght)
    if(params.length === 2){
    
        return <h1>Product name {params[0]} and productID {params[1]}</h1>
    }
else if (params.length === 1){
    return <h1>Product name {params[0]}</h1>
}

    return <h1>404:Page NOT FOUND</h1>



}
export default  Doc;

