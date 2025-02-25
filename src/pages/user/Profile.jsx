import Menue from "../../components/user/profile/Menue";
import axios from "axios";
import { Outlet, useLoaderData } from "react-router-dom";
const token=JSON.parse(localStorage.getItem('userAuth'))?.token;
export default function Profile() {
  const user = useLoaderData();
 
  return (
    <div className="mt-4 h-[70vh] w-[85%] mx-auto">
        <h1 className="mb-8 font-bold text-[34px] text-center">My Account</h1>
      <div className="flex w-[90%] items-start gap-12 mx-auto">
        <Menue name={user?.userName} image={user?.
image} />
        <Outlet  context={user} />
      </div>
    </div>
  )
}
export async function profileLoader() {
  try {
    const response=await axios.get('https://ecommerce-node4.onrender.com/user/profile',{
        headers:{
            Authorization:`Tariq__${token}`,
        }

    });
  return response.data.user;
} catch (error) {
    console.log(error);
}
}
