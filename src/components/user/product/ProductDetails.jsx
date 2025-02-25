import { Link, useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../../../context/AuthProvider";
import useAddToCart from "../../../hooks/useAddToCart";
import Spinner from "../../shared/Spinner";
import { useCartItem } from "../../../context/CartProvider";
import { FaArrowRight } from "react-icons/fa";
import  Rating from './Rating'
import { useOrder } from "../../../context/OrderProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const token=localStorage.getItem('userAuth') && JSON.parse(localStorage.getItem('userAuth')).token 
export default function ProductDetails() {
  const { id } = useParams();
  const { selectProduct, findProduct, products, setSelectProduct,fetchProduct } =
    useProductContext();
  const [img, setImg] = useState(null);
  const { userAuth } = useUserAuth();
  const cart = useCartItem();
  const { addToCart, loading } = useAddToCart();
  const [showText, setShowText] = useState(true);
 const {makeReview,getOrder,order}= useOrder();
 const {register,reset,handleSubmit,formState:{errors,isSubmitting}}=useForm();
  useEffect(() => {
    if (products.length == 0) {
      async function fetchProduct() {
        try {
          const response = await axios.get(
            `https://ecommerce-node4.onrender.com/products/${id}`
          );
          setSelectProduct(response.data.product);
          setImg(response.data.product.mainImage.secure_url);
        } catch (e) {
          console.log(e);
        }
      }
      fetchProduct();
    } else {
      findProduct(id);
    }
  }, [id]);
  useEffect(() => {
    if ("mainImage" in selectProduct) {
      console.log("hhhhhhh");
      setImg(selectProduct.mainImage.secure_url);
    }
  }, [selectProduct]);
useEffect(()=>{
 if(order.length == 0){
  getOrder()
 }
},[])
  const handleMakeReview=async (data)=>{
    console.log(data);
   try{
   const response=await axios.post(`https://ecommerce-node4.onrender.com/products/${id}/review`,data,{
     headers:{
         Authorization:`Tariq__${token}`,
     }
   });
    reset();
    toast.success('Review Posted Successfully');
    console.log(response)
   }catch(e){
    console.log(e)
    toast.error(e.response.data.message);
    reset();
   }
  }
  return (
    <>
    <div className="flex">
      <div className="w-[40%]">
        <div className="relative border-[1px] border-[#D9DBE9] flex flex-col gap-3 ">
          {img && <img src={img} className="w-[300px]" />}
          {selectProduct?.discount > 0 && (
            <div className="absolute top-0 left-0 pl-1.5 bg-[#38CB89] py-2 px-4 box-content text-center rounded-[8px] text-[20px] font-bold text-white w-[60px]">
              {selectProduct.discount}%
            </div>
          )}
          {selectProduct?.subImages && (
            <div className="flex justify-around flex-wrap gap-2">
              {selectProduct.subImages.map((image, index) => (
                <img
                  onClick={() => {
                    setImg(
                      img == image.secure_url
                        ? selectProduct.mainImage.secure_url
                        : image.secure_url
                    );
                  }}
                  key={index}
                  src={image.secure_url}
                  className="w-[100px] h-[100px] object-contain cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex  justify-end pr-3">
        <div className="pt-3 w-[90%] flex flex-col items-start">
          <h1 className="text-[#141718] font-bold">{selectProduct?.name}</h1>
          <p
            className="text-[#6C7275]  mt-3 text-justify  
            "
          >
            {showText ? (
              <span>
                {selectProduct?.description?.split(" ").slice(0, 40).join(" ")}{" "}
                <span
                  onClick={() => {
                    setShowText(!showText);
                  }}
                  className="underline cursor-pointer text-blue-900"
                >
                  Show more
                </span>
              </span>
            ) : (
              <span>
                {selectProduct?.description}
                <span
                  onClick={() => {
                    setShowText(!showText);
                    scroll(0,0);
                  }}
                  className="underline cursor-pointer text-blue-900"
                >
                  Show less
                </span>
              </span>
            )}
          </p>
          <div className="flex mt-2 gap-3 items-center">
            <span className="text-[#141718] font-bold text-[17px]">
              ${selectProduct?.finalPrice}
            </span>
            {selectProduct?.discount > 0 && (
              <span className="text-[#6C7275] font-bold line-through text-[12px]">
                ${selectProduct?.price}
              </span>
            )}
          </div>
          {userAuth.token && !cart.findItem(id) ? (
            <button
              onClick={() => {
                addToCart(id);
                cart.modifyCart();
              }}
              className="text-white bg-[#141718] cursor-pointer mt-4 px-4 py-2"
            >
              {loading ? (
                <div className="flex gap-2 pl-2">
                  <Spinner />
                  <span className="cursor-not-allowed">Add to Cart</span>
                </div>
              ) : (
                "Add to Cart"
              )}
            </button>
          ) : userAuth.token && cart.findItem(id) ? (
            <Link to="/cart" className="block px-3 py-2 ">
              <div className="mt-4 bg-[#DF2648]  px-3 py-2 capitalize flex items-center gap-3 rounded text-white">
                item already in cart
                <FaArrowRight />
              </div>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
    <div className='mt-8'>
      {selectProduct?.reviews?.length >0 &&(
        <div>
        <div className='text-[#23262F] text-[28px] font-bold font-mono mb-3'>Customer Reviews</div>
       {userAuth.token && makeReview(id) &&(
          <div className="border border-[#E8ECEF] pb-2 rounded-[12px]">
          <div className="flex items-center gap-3">
       
          <textarea {...register('comment',{required:true})} placeholder="add comment" type="text" className="py-1 w-[75%] ml-2.5 outline-none" />
          {errors.comment && <p className="text-[10px] text-red-500 mt-1">comment is required</p>}
          <button onClick={handleSubmit(handleMakeReview)} disabled={isSubmitting} className="bg-[#000] ml-2 text-white cursor-pointer px-3 py-2 rounded-full">
           {isSubmitting?'Processing': 'Write Review'}
            </button>
          </div>
          <div className="pl-1.5">
            <span className="text-slate-700 text-[12px]">Add Rating:</span>
            <input {...register('rating',{required:true,min:0,max:5})} min='0' max='5' type='number' className="ml-2 border w-[40px] text-center outline-none rounded border-[#E8ECEF]"/>
            {errors.rating && <p className="text-[10px] text-red-500 mt-1">rating is required</p>}
          </div>
          
         </div>
       )}
        <div className='mt-3'>
          <span className=' text-[18px] font-bold font-mono'>{selectProduct.reviews.length} Reviews</span>
        </div>
        <div className='flex flex-col gap-3 mt-5'>
            {selectProduct.reviews.map((review,ind)=>(
              <div key={ind} className='flex flex-col gap-3 p-3 shadow rounded-md'>
                <h3>{review.createdBy.userName.toUpperCase()}</h3>
                
              <div className='flex gap-2 mt-1'>
                <Rating rating={review.rating}/>
                <div>{review.rating}</div>
                </div>
                <div className='text-slate-500'>{review.comment}</div>
               
              </div>
            ))}
        </div>
        </div>

      )
      }
    </div>
    </>
  );
}
