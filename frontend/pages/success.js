import {useRouter} from "next/router"
import styled from "styled-components"
import Image from "next/image"
import success_thank from "../public/success_thank.jpg"
//hellotest
const {motion} = require("framer-motion")

const Wrapper = styled.div`
   margin:2rem 10rem;
`;


const Card = styled(motion.div)`
   display:flex;
   flex-direction: column;
   align-items: center;
   background: white;
   border-radius: 2rem;
   padding:3rem 3rem;
   button {
    padding:1rem 2rem;
    color:white;
    background:var(--primary);
    font-weight:500;
    cursor:pointer;
    font-size:1.2rem;
   }

   h2 {
    margin:1rem 0rem;
   }
`;


const Address = styled.div`
 width:100%;
 font-size:1.2rem;
`;


const OrderInfo = styled.div`
 width:100%;
 font-size:1.2rem;
 div {
    padding-bottom: 1rem;
 }
`;


const InforWrapper = styled.div`
display:flex;
margin:2rem 0rem;
`;






const stripe = require("stripe")
(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);




export async function getServerSideProps(params){
   const order = await stripe.checkout.sessions.retrieve(
      params.query.session_id,
      {
        expand:["line_items"],
      }
   );   
    
   return { props:{order}};
  }




export default function Success({order}){
     console.log(order)
    const route = useRouter();
    return(
        <Wrapper>
            <Card
              animate={{opacity:1,scale:1}}
              initial={{opacity:0,scale:0.75}}
              transition={{duration:0.75}}
            >
                
                <h1>Thank you for your Order!</h1>
                <h2>A Confirmation email has been sent to </h2>
                <h2>{order.customer_details.email}</h2>
                <InforWrapper>
                <Address>
                    <h2>Address info</h2>
                    {
                        Object.entries(order.customer_details.address).map((key,val)=> 
                        <p key={key}> {key}: {val}</p>
                        )
                    }
                </Address>
                <OrderInfo>
                  
                    
                    <h2>All the products</h2>
                    {
                        order.line_items.data.map(item => (
                            <div key={item.id}>
                             <p>Product: {item.description}</p>
                             <p>Quantity: {item.quantity}</p>
                             <p>Price: {item.price.unit_amount}</p>
                            </div>    
                        ))
                    }
                    </OrderInfo>
                  </InforWrapper>
                <button onClick={()=> route.push("/")}>Continue Shopping</button>
                <Image src={success_thank} alt="thank you for shopping with us"/>
             
            </Card>
        </Wrapper>
    );
}