import Link from "next/link"
import {FiShoppingCart} from "react-icons/fi"
import {NavStyles, NavItems} from "../styles/NavStyles"
import Cart from "./Cart"
import { useStateContext } from "../lib/context"
import User from "./User"
import { useUser, UseUser } from "@auth0/nextjs-auth0/dist/frontend/use-user"
const {AnimatePresence,motion} = require('framer-motion')

export default function Nav(){
  
  const {user,error,isLoading} = useUser();
  console.log(user)
  const {showCart,setShowCart,totalQuantities} = useStateContext();
    return(
        <NavStyles>
          <Link href={"/"}>Gebeya.</Link>
          <NavItems>
            <User />
            <div onClick={()=> setShowCart(true)}>
              {totalQuantities > 0 && <motion.span initial={{scale:0}} animate={{scale:1}}>{totalQuantities}</motion.span>}
                <FiShoppingCart />
                <h3>Cart</h3>
            </div>
          </NavItems>
          <AnimatePresence>
          {
            showCart && <Cart />
          }
          </AnimatePresence>
          
          
        </NavStyles>
    );
}