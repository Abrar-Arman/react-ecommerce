import { useForm } from "react-hook-form";
import Button from "../../shared/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useCartItem } from "../../../context/CartProvider";
const token=JSON.parse(localStorage.getItem('userAuth'))?.token;

export default function MakeOrder() {
const { cartItems} = useCartItem();
const {register,reset,handleSubmit,formState:{errors,isSubmitting} }= useForm();
  if(cartItems.count===0){
    return null;
  }
  const makeOrder = async (data)=>{
   try{
    const response=await axios.post('https://ecommerce-node4.onrender.com/order',data,{
        headers:{
            Authorization:`Tariq__${token}`,
        }
    });
    console.log(response);
    reset();
    toast.success('Order Placed Successfully');
   }catch(err){
    toast.error('Order Placed Error')
    console.log(err);
   }
  }
  console.log(errors)
  return (
    <div className="w-[80%] mt-8">
      <h2 className="text-[16px] font-bold">Have a coupon?</h2>
      <form onSubmit={handleSubmit(makeOrder)}>
     <div className="flex flex-col gap-3 items-start">   
        <div className="mt-3">
            <input type='text' {...register('couponName')} placeholder="Coupon name" className="pl-2 placeholder:text-[12px] outline-none w-[280px] py-1 rounded border-[2px] border-[#E8ECEF]"/>
        </div>
        {errors.couponName && <p className="text-[10px] lowercase text-red-500">couponName is requried</p>}
        <div>
            <input type='text'  {...register('address',{required: true})} placeholder="address" className="pl-2 placeholder:text-[12px] outline-none w-[280px] py-1 rounded border-[2px] border-[#E8ECEF]"/>
        </div>
        {errors.address && <p className="text-[10px] lowercase text-red-500">address is requried</p>}
        <div className="mb-3">
            <input type='text' {...register('phone',{required: true})} placeholder="phone" className="pl-2 placeholder:text-[12px] outline-none w-[280px] py-1 rounded border-[2px] border-[#E8ECEF]"/>
        </div>
        {errors.phone && <p className="text-[10px] lowercase text-red-500">phone is requried</p>}
         <Button text="Make Order"  isSubmit={isSubmitting}/>
        </div>
      </form>
    </div>
  )
}
