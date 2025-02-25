import { useState } from "react";
import { useCartItem } from "../../../context/CartProvider";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import cart from '../../../assets/img/emptyCart.jpg';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const token = JSON.parse(localStorage.getItem("userAuth"))?.token;
export default function CartTable() {
  const { cartItems, handleQuantity,removeItem,clearCartItems } = useCartItem();

  console.log(cartItems)
 const navigate= useNavigate()
 if(cartItems.count==0){
   return <div className="mt-4 w-[900px] flex gap-2 flex-col items-center">
     <img src={cart} className="w-[300px]"/>
    <h2 className=" font-bold text-[20px] font-sans capitalize">Cart is currently  empty!</h2>
    <button className="text-white bg-[#DF2648] px-3 py-2 rounded cursor-pointer" onClick={()=>{
      navigate("/")
      scroll(0,0);
    }}>Return to shop</button>
   </div>
 }
  const increaseQuantity = async (id) => {
    try {
      handleQuantity(id, "increase", false);
      const response = await axios.patch(
        "https://ecommerce-node4.onrender.com/cart/incraseQuantity",
        { productId: id },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
    } catch (err) {
      toast.error("Failed to update item quantity! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      handleQuantity(id, "increase", true);
      console.log(err);
    }
  };
  const decreaseQuantity = async (id) => {
    handleQuantity(id, "decrease", false);
    try {
      const response = await axios.patch(
        "https://ecommerce-node4.onrender.com/cart/decraseQuantity",
        { productId: id },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
      handleQuantity(id, "decrease", true);
    }
  };
  const removeItems = async (id) => {
    const result = await Swal.fire({
      html: `<div style="display: flex; align-items: center;padding:'24px 12px'">
      <span style="margin-right: 10px;">
        <i class="fa fa-trash"></i> 
      </span>
      <span>Do you want to delete this item? Are you sure</span>
    </div>`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      customClass: {
        popup: 'custom-popup', // Custom class for the popup
      },
    });
  
    if (!result.isConfirmed) return;
    try {
      removeItem(id, false);
      const response = await axios.patch(
        "https://ecommerce-node4.onrender.com/cart/removeItem",
        { productId: id },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      toast.success("Item removed successfully!",{
        position: "bottom-right",
        autoClose: 3000,
      });
      console.log(response);
    } catch (err) {
      toast.error("Failed to remove item! Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
   
    }
  };
  const delateAllItems= async ()=>{
try{
const response=await axios.patch('https://ecommerce-node4.onrender.com/cart/clear',{}, { headers: {  Authorization: `Tariq__${token}`}});
  toast.success("All items removed successfully!",{
    position: "bottom-right",
    autoClose: 3000,
  });
  clearCartItems()

}catch (err) {
  toast.error("Failed to remove all items! Please try again.", {
    position: "bottom-right",
    autoClose: 3000,
  });
  console.log(err);
}
  }
  return (
    <table>
      <thead>
        <tr className=" text-[#121212] text-left">
          <th>Product</th>
          <th className="px-3">Quantity</th>
          <th className="px-3">Price</th>
          <th className="px-3">Total</th>
        </tr>
      </thead>
      <tr>
        <td colSpan={4} className="">
          <div className="mt-2 bg-[#E8ECEF] h-[2px] mb-2 "></div>
        </td>
      </tr>

      <tbody>
        {cartItems?.products?.map((product) => (
          <>
            <tr key={product.productId} className="pb-3 text-center">
              <div className="flex gap-3">
                <td>
                  <img
                    src={product?.details?.mainImage?.secure_url}
                    className="w-[40px]"
                  />
                </td>
                <div>
                  <h3 className="text-[14px]">
                    {product?.details?.name?.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex mt-2 gap-2 items-center">
                    <FaTrash
                      onClick={() => {
                        removeItems(product.productId);
                      }}
                      className="cursor-pointer w-[15px] h-[15px] hover:text-red-500"
                    />{" "}
                    <span className="text-[#6C7275] text-[10px] font-bold">
                      Remove
                    </span>
                  </div>
                </div>
              </div>
              <td className="px-3">
                <div className="flex gap-2  justify-center items-center py-2 border-[1px] border-[#E8ECEF] ">
                {product.quantity > 1 && <FaMinus
                    onClick={() => {
                      decreaseQuantity(product.productId);
                    }}
                    className="cursor-pointer w-[10px] h-[10px]"
                  />}  
                  <span className="text-[12px] font-bold">
                    {product.quantity}
                  </span>
                  <FaPlus
                    onClick={() => {
                      increaseQuantity(product.productId);
                    }}
                    className="cursor-pointer w-[10px] h-[10px]"
                  />
                </div>
              </td>
              <td className="px-3 text-[14px]">
                ${product.details.finalPrice}
              </td>
              <td className="px-3 font-bold text-[14px]">
                ${product.quantity * product.details.finalPrice}
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <div className="h-[1px] bg-[#F3F5F7] my-2"></div>
              </td>
            </tr>
          </>
        ))}
      </tbody> 
      <tr  >
    <td onClick={()=>{ delateAllItems()}} colSpan='4'>  <p  className="mt-4 bg-[#DF2648] text-white text-center text-[12px] py-2 font-semibold rounded cursor-pointer">Delete all</p></td>
      </tr>
    </table>
  );
}
