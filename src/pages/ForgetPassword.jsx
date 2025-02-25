import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const steps = ["Enter Email", "Reset Password & Verify Code", "Login"];
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
export default function ForgetPassword() {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const email = watch("email");
  const navigate = useNavigate();
  const handleforgetPassword = async (data) => {
    if (currentStep == 0) {
      try {
        const response = await axios.patch(
          "https://ecommerce-node4.onrender.com/auth/sendcode",
          data
        );
        setCurrentStep(currentStep + 1);
        toast.success("Email sent successfully");
      } catch (error) {
        toast.error("Failed ");
        console.log(error);
      }
    }

    if (currentStep == 1) {
      const info = { ...data, email };
      console.log(info);
      try {
        const response = await axios.patch(
          "https://ecommerce-node4.onrender.com/auth/forgotPassword",
          info
        );
        setCurrentStep(currentStep + 1);
        toast.success("Code is correct");
        navigate("/auth/login");
      } catch (error) {
        toast.error(`${error.response.data.message}`);
        console.log(error);
      }
    }
  };
  return (
    <div className="flex h-[70vh] mt-10 w-[80%] mx-auto items-center gap-10">
    <div className="w-90 p-6 h-[70vh] bg-white shadow-lg rounded-xl">
      <h2 className="text-xl border-l-[8px] border-l-[#DF2648] font-semibold mb-8 pl-3">
        Forgot Password
      </h2>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            {index < currentStep ? (
              <span className="text-green-500">✔</span>
            ) : (
              <span className={index === currentStep ? "text-[#DF2648]" : "text-gray-400"}>○</span>
            )}
            <span className={index === currentStep ? "font-bold" : "text-gray-500"}>{step}</span>
          </div>
        ))}
      </div>
    </div>

    
    <div className="w-[400px] bg-white p-6 shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Reset Your Password</h3>
      <p className="text-sm text-gray-500 mb-6">Follow the steps to reset your password</p>

      <form onSubmit={handleSubmit(handleforgetPassword)} className="space-y-4">
        {currentStep === 0 && (
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="pl-10 pr-3 py-2 border rounded w-full outline-none placeholder:text-sm border-[#676767] focus:border-[#DF2648]"
            />
            {errors.email && <p className="text-red-700 text-sm mt-1">Email is required</p>}
          </div>
        )}

        {currentStep === 1 && (
          <>
            <div className="relative">
              <FaKey className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("code", { required: true })}
                placeholder="Enter your code"
                className="pl-10 pr-3 py-2 border rounded w-full outline-none placeholder:text-sm border-[#676767] focus:border-[#DF2648]"
              />
              {errors.code && <p className="text-red-700 text-sm mt-1">Code is required</p>}
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("password", { required: true })}
                placeholder="Enter your new password"
                type="password"
                className="pl-10 pr-3 py-2 border rounded w-full outline-none placeholder:text-sm border-[#676767] focus:border-[#DF2648]"
              />
              {errors.password && <p className="text-red-700 text-sm mt-1">Password is required</p>}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-[#DF2648] text-white rounded-md hover:bg-[#c1213f] cursor-pointer transition-all"
        >
          {isSubmitting ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  </div>
);
}
  
