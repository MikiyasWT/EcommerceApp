import React, {createContext,useContext,useState} from 'react'

const ShopContext = createContext();

export const StateContext = ({children}) => {
    //adding states an initializing their values
    const [showCart, setShowCart]= useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [totalQuantities,setTotalQuantities] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    //add item quantity
    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1)
    }

    //decrease item quantity
    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => {
            if(prevQuantity -1 < 1) return 1;
            return prevQuantity - 1
        }
       );
    }

    //Add product to cart
    //we check if such item exists inside cartItems if so we map over the cartItems to see
    //an item with same slug, if find one we append additional quantity to it not overriding
    //we are appending to existing values using spread operator

    //else we leave the item as it is
    const onAdd = (product,quantity) => {

      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
      setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity)
      
      const exist = cartItems.find((item) => item.slug === product.slug)
      if(exist){
        setCartItems(
            cartItems.map((item) => 
            item.slug === product.slug ?
             {...exist,quantity:exist.quantity + quantity}:item
            )
        );
      }
      else {
        setCartItems([...cartItems,{...product,quantity:quantity}]);
      }
    }

    const onRemove = (product) => {
      setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price)

      setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1)
      //check if the product exist in the cart
      const exist = cartItems.find((item) => item.slug === product.slug)
      if(exist.quantity === 1){
        setCartItems(cartItems.filter((item) => item.slug !== product.slug));
      }
      else {
        setCartItems(
           cartItems.map((item) => 
             item.slug === product.slug ? {...exist,quantity:exist.quantity - 1} : item
             )
        );
      }
    }
    
  return(
    <ShopContext.Provider value={{quantity,setQuantity,increaseQuantity,decreaseQuantity,showCart, setShowCart,cartItems,onAdd,onRemove,totalQuantities,totalPrice}}>
     {children}
    </ShopContext.Provider>
  );
}


export const useStateContext = () => useContext(ShopContext);