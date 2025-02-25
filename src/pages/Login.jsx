import email from "../assets/img/icon/Mail.png";
import password from "../assets/img/icon/password.png";
import Button from "../components/shared/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import signinSchema from "../validations/login";
import axios from "axios";
import { useUserAuth } from "../context/AuthProvider";
const inputFields = [
  { name: "email", type: "email", placeholder: "Email", icon: email },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    icon: password,
  },
];
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
    shouldFocusError: false,
  });
  const [errorState, setErrorState] = useState(errors);
  const navigate = useNavigate();
  useEffect(() => {
    setErrorState(errors); // Update error state to trigger re-render
  }, [errors]);
  const { handleLogin } = useUserAuth();
  const login = async (data) => {
    try {
      const response = await axios.post(
        "https://ecommerce-node4.onrender.com/auth/signin",
        data
      );
      console.log(response.data.token);
      handleLogin(response.data.token, response.data.user);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status == 400) {
        setError("root", {
          type: "server",
          message: "Email or Password is Wrong ",
        });
        console.log(error.response);
      } else {
        setError("root", { type: "server", message: "Something went wrong!" });
      }
    }
  };
  return (
    <form className="mt-3 w-[40%] h-[90%]" onSubmit={handleSubmit(login)}>
      <p className="text-[#14142B] font-bold text-2xl">
        Log in to <span className="text-[#DF2648]">Shoppy</span>
      </p>
      <span className="block mb-3.5 text-[12px] text-[#14142B]">
        Enter your details below
      </span>

      {errors.root && (
        <p className="mb-5 text-center w-[300px] text-[12px] text-red-700">
          {errors.root.message}
        </p>
      )}

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
                } bg-transparent  placeholder:text-[10px] placeholder:text-[676767] pl-1.5 outline-none pb-2 w-[300px]`}
              />
            </div>
            {errors[name] && (
              <p className="text-[10px] text-red-700 pl-3 mt-2 ">
                {errors[name].message}
              </p>
            )}
          </div>
        ))}
        <div>
          <div className="flex gap-6 items-center">
            <Button text="Sign In" isSubmit={isSubmitting} />
            <Link to="/forgetPassword">
              <span className="text-red-700 text-[10px] font-bold cursor-pointer">
                Forget Password ?
              </span>
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-3">
        Don’t have an accout yet?{" "}
        <Link to="/auth/signup" className="underline text-[#676767] font-bold">
          Signup
        </Link>
      </p>
    </form>
  );
}
