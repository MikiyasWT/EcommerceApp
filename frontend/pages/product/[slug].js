import {useQuery} from "urql"
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {DetailStyle,ProductInfo,Quantity,Buy} from "../../styles/ProductDetail"
import {AiFillMinusCircle,AiFillPlusCircle} from 'react-icons/ai'
import {useStateContext} from "../../lib/context"


export default function ProductDetail(){
    //chekcing state coming
    const {quantity,increaseQuantity,decreaseQuantity,onAdd} = useStateContext();
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
            <Buy onClick={() => onAdd(data.products.data[0].attributes,quantity)}>Add to cart</Buy>
            </ProductInfo>
            
        </DetailStyle>
    );
}