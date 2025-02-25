import axios from "axios";
import { useState } from "react";
import { FaCamera, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuth } from "../../../context/AuthProvider";
const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const token=JSON.parse(localStorage.getItem('userAuth'))?.token;

export default function Menue({ name,image }) {
  const [img, setMyImg] = useState(null);
  console.log(img);
  const handleEdit = async() => {
    const formData=new FormData();
    formData.append('image',img);
    if(img){
      try{
        const response = await axios.put('https://ecommerce-node4.onrender.com/user/update-image',formData,{
            headers:{
              Authorization:`Tariq__${token}`,
            }
      });
       console.log(response)
    toast.success('Image updated successfully');
    }
      catch(err){
        toast.error("Failed to upload image! Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

 const {handleLogOut}= useUserAuth();
 const navigate=useNavigate();
  return (
    <div className="w-[30%] bg-[#F3F5F7] pt-5 pb-7 px-4 shadow h-[50vh]">
      <div className="flex justify-center gap-3 items-center ">
        <label htmlFor="img">
          <div className="relative w-[60px] h-[60px] rounded-full border-[1px] border-slate-300">
            {!img && !image &&(
              <div className="w-[60px] h-[60px] cursor-pointer rounded-full bg-amber-600 overflow-hidden flex justify-center items-center">
                <p className="w-[20px]">Add image</p>
              </div>
            )}
            <FaCamera className="absolute w-[15px] h-[15px] text-white right-[8px] bottom-[6px] cursor-pointer" />
            {img && (
              <img
                src={URL.createObjectURL(img)}
                className="w-[60px] h-[60px] cursor-pointer rounded-full  "
              />
            )}
            {image  && !img && (
              <img
                src={image.secure_url}
                className="w-[60px] h-[60px] cursor-pointer rounded-full  "
              />
            )}
          </div>
          <input
            type="file"
            id="img" 
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (allowedTypes.includes(file.type)) {
                setMyImg(file);
                return;
            }
            toast.error('Invalid file type')
            }}
          />
        </label>
        {name && (
          <div className="flex items-center gap-3">
            {" "}
            <h1 className="font-bold mt-2 text-[16px]">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </h1>
            <FaEdit className="cursor-pointer" onClick={handleEdit} />
          </div>
        )}
      </div>
      <div className="mt-7">
        <ul className="flex flex-col gap-4">
          <Link to="/profile">
            <li className="text-gray-500 cursor-pointer font-semibold text-[14px]">
              Account
            </li>
          </Link>
          <Link to="order">
            {" "}
            <li className=" text-gray-500 cursor-pointer font-semibold text-[14px]">
              Orders
            </li>
          </Link>
          <li onClick={()=>{
            handleLogOut();
            navigate('/auth/login');
          }} className=" text-gray-500 cursor-pointer font-semibold text-[14px]">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
