import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";
import { useCartItem } from "../context/CartProvider";

export default function useAddToCart() {
   const [loading,setLoading] =useState(false);
   const {getItem}=useCartItem()
   const token=JSON.parse(localStorage.getItem('userAuth'))?.token;
   async function  addToCart(id){
     console.log(id);
       try{
        setLoading(true);
        const response =await axios.post('https://ecommerce-node4.onrender.com/cart',{productId:id},
            {
                headers:{
                    Authorization:`Tariq__${token}`,
                },
            }
        );
      if(response.status==201){
        toast.success('Product Add To Cart',{
          position: "bottom-right",
          autoClose: 3000,
        })
        getItem()
      }

     console.log(response)
       }
       catch(err){

           if(err.response.status == 409){
            toast.error('Product already in cart')
           };
       }
       finally{
        setLoading(false);
       }
   }
   return { addToCart, loading };
}
