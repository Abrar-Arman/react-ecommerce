import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext=createContext()

export const CartContextProvider=({children})=>{
    const [cartItems, setCartItems]=useState({});
    const token=localStorage.getItem('userAuth') && JSON.parse(localStorage.getItem('userAuth')).token 
   const [loading,setLoading]=useState(true);
    async function getItem(){
        try {
            const response=await axios.get('https://ecommerce-node4.onrender.com/cart',{
                headers:{
                    Authorization:`Tariq__${token}`,
                }
     
            });
            console.log(response,'my caret')
            setCartItems(response.data)
        } catch (error) {
            console.log(error,'cart');
        }
        finally{
          setLoading(false)
        }
       }
   useEffect(()=>{
   if(!token) {
    setLoading(false);
    return}
   getItem()
   console.log('item')
   },[token])
 function modifyCart(){
    setCartItems({...cartItems,count:cartItems.count+1})
 }
 const handleQuantity = (id,op,error) => {
    const previousCart = { ...cartItems };

  if (error) {
    // If an error occurs, revert to the previous state
    setCartItems(previousCart);
    return;
  }
    
   setCartItems((prevCart) => ({
      ...prevCart, // copy the rest of the cart
      products: prevCart.products.map((product) => {
        if (product.productId == id) {
          // Update the quantity for the matching product
          return { ...product, quantity: op == 'increase'? product.quantity + 1:product.quantity - 1 };
        }
        return product; // leave other products unchanged
      }),
    }));
  };


  const removeItem = (id,error) => {
    const previousCart = { ...cartItems };

  if (error) {
    // If an error occurs, revert to the previous state
    setCartItems(previousCart);
    return;
  }
   setCartItems(previousCart=>({...previousCart,products:
    previousCart.products.filter((product) => product.productId!== id)
   }));
   setCartItems(previousCart=>({...previousCart,count:previousCart.count-1}))
  };
  
 function findItem(id){
  console.log('jhj')
    if (!cartItems || !Array.isArray(cartItems.products)) {
        return undefined; // Return undefined if cartItems or products array doesn't exist
    }
    
    return cartItems.products.find(product => product.productId == id) && true;
   
 }
 function clearCartItems(){
   setCartItems({products:[],count:0,
    message:''})
 }
    return <CartContext.Provider value={{cartItems,modifyCart,findItem,handleQuantity,removeItem,getItem,clearCartItems,loading}}>
    {children}
    </CartContext.Provider>
}

export function useCartItem(){
   const cartItem =useContext(CartContext);
   return cartItem;
}