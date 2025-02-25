import user from '../assets/img/icon/User.svg'
import email from '../assets/img/icon/Mail.png'
import password from '../assets/img/icon/password.png'
import Button from '../components/shared/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import signupSchema from '../validations/signup'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'

const inputFields = [
  { name: "userName", type: "text", placeholder: "User name", icon: user },
  { name: "email", type: "email", placeholder: "Email", icon: email },
  { name: "password", type: "password", placeholder: "Password", icon: password },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    icon: password,
  },
];
export default function Register() {
 const {register,handleSubmit,setError,formState:{errors,isSubmitting}} =useForm({
  resolver: zodResolver(signupSchema),
  mode:'onBlur',
  shouldFocusError: false,
 });
 const [errorState, setErrorState] = useState(errors);
 const navigate=useNavigate()
 useEffect(() => {
   setErrorState(errors); // Update error state to trigger re-render
 }, [errors]);
 const registeruser= async ({password,userName,email})=>{
  try{
  const data={userName,email,password};
  const response =await axios.post('https://ecommerce-node4.onrender.com/auth/signup',data);
  console.log(response)
   if(response.status===201){
    toast.info('Please check your email', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
    navigate('/auth/login')
   }
  }
 catch(error){
  console.log(error);
  if(error.response.status==409){
    setError('email', { type: "server", message: "Email already taken " });
    console.log(error.response)
  }
 else {
  setError('root', { type: "server", message: "Something went wrong!" })}
 
 }}
 
  return (
    <>
     <form className='w-[40%] h-[90%]' onSubmit={handleSubmit(registeruser)}>
      <p className='text-[#14142B] font-bold text-2xl'>Create an account</p>
      <span className='block mb-3.5 text-[12px] text-[#14142B]'>Enter your details below</span>

      {errors.root &&  <p className='mb-3  text-red-700'>{errors.root.message }</p>}
     
      <div className="flex flex-col items-start gap-3.5">
        {inputFields.map(({ name, type, placeholder, icon }) => (
          <div key={name}>
            <div className="flex items-center">
              <img src={icon} className="mr-2" />
              <input
                type={type}
                {...register(name)}
                placeholder={placeholder}
                className={`${
                  errorState[name]
                    ? "border-red-500 rounded-[8px] border-b-red-500 border-[1px] focus:ring-red-500 focus:border-red-500"
                    : "border-b-[1px] border-b-[#676767] focus:border-b-[#52D880]"
                } bg-transparent placeholder:text-[676767] placeholder:text-[10px] pl-1.5 outline-none pb-2 w-[300px]`}
              />
            </div>
            {errors[name] && (
              <p className="text-[10px] text-red-700 pl-3 mt-2 ">
                {errors[name].message}
              </p>
            )}
          </div>
        ))}

        <Button text="Create Account" isSubmit={isSubmitting} />
      </div>

      <p className="mt-3">
        Already have an account?{" "}
        <Link to="/auth/login" className="underline text-[#676767] font-bold">
          Login
        </Link>
      </p>
    </form>
   
   </>
    
  )

 }