import {useQuery} from "urql"
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {DetailStyle,ProductInfo,Quantity,Buy} from "../../styles/ProductDetail"
import {AiFillMinusCircle,AiFillPlusCircle} from 'react-icons/ai'
import {useStateContext} from "../../lib/context"
import toast from 'react-hot-toast';
import { useEffect } from "react";

export default function ProductDetail(){
    //chekcing state coming
    const {quantity,setQuantity,increaseQuantity,decreaseQuantity,onAdd} = useStateContext();
    console.log(quantity)
    const {query} = useRouter();
    
    const [results] = useQuery({
        query:GET_PRODUCT_QUERY,
        variables:{slug:query.slug},
        });
        
    const { data,fetching,error} = results;
    if(fetching){
        return <p>Loading...</p>
      }
      if(error){
        return <p>error has occured</p>
      }
      
    const {title,description,price,image} = data.products.data[0].attributes; 
        
     //creating  toast notification
     const notify = () => {
        toast.success(`${title} added to your cart `, {duration:1500})
     } 
     
     //reset quantity  run once after the componnet mounts
     useEffect(()=>{
        setQuantity(1)
     },[])
          
    return(
        <DetailStyle>
            <img src={image.data.attributes.formats.small.url} alt="" />
            <ProductInfo>
                <h3>{title}</h3>
                <p>{description}</p>
                

                
            <Quantity>
                <span>Quanitity</span>
                <button><AiFillMinusCircle onClick={decreaseQuantity}/></button>
                <p>{quantity}</p>
                <button><AiFillPlusCircle onClick ={increaseQuantity} /></button>
            </Quantity>
            <Buy onClick={() => {
                onAdd(data.products.data[0].attributes,quantity);
                notify();
            }}>Add to cart</Buy>
            </ProductInfo>
            
        </DetailStyle>
    );
}