import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();
export const OrderProvider = ({ children }) => {
  const token =
    localStorage.getItem("userAuth") &&
    JSON.parse(localStorage.getItem("userAuth")).token;
  const [order, setOrder] = useState([]);
  
    async function getOrder() {
        if(!token)return;
      try {
        const response = await axios.get(
          "https://ecommerce-node4.onrender.com/order",
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        setOrder(response.data.orders);
        console.log(response.data.orders)
        console.log(response.data.orders);
        console.log(response.data.orders.filter(order=>order.status!='pending').map(order=>order.products
        ).flat().map(product=>product.productId._id)
        ,'orderrrrr');
      } catch (error) {
        console.log(error);
      }
    }
  
 
  function makeReview(id){
    if( order.length>0){
   const orderProduct=  order.filter(order=>order.status!='pending').map(order=>order.products
   ).flat().map(product=>product.productId._id);
   console.log(orderProduct.includes(id))
   return  orderProduct.includes(id);}
  }
  return (
    <OrderContext.Provider value={{ order,makeReview,getOrder }}>{children}</OrderContext.Provider>
  );
};
export function useOrder() {
  const order = useContext(OrderContext);
  return order;
}
