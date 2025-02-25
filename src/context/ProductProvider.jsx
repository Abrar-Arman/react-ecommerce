
import axios from "axios";
import { createContext, useContext, useState } from "react";

const ProductContext=createContext();
export const ProductContextProvider=({children})=>{
    const [products,setProduct]=useState([]);
    const [loading,setLoading]=useState(true);
    const [selectProduct,setSelectProduct]=useState({});
    async function fetchProduct() {
        try {
          const response = await axios.get(
            "https://ecommerce-node4.onrender.com/products?limit=10"
          );
          setProduct(response.data.products);
        } catch (e) {
          console.log(e);
        }finally{
            setLoading(false);
        }
      }
    function findProduct(id){
       const select= products.find(product => product._id==id)||{};
       console.log(select)
       setSelectProduct((pre)=>({...pre, ...select}));
      
    }
   
    return(
        <ProductContext.Provider value={{products,setProduct,findProduct,selectProduct,setSelectProduct,fetchProduct,loading}}>
            {children}
        </ProductContext.Provider>
    )
}
export function useProductContext(){
   const productContext= useContext(ProductContext)
   return productContext;
}