import { Outlet } from "react-router-dom";
import Navbar from "../components/user/shared/Navbar";
import Footer from "../components/user/shared/Footer";
import { AuthProvider } from "../context/AuthProvider";
import { ProductContextProvider } from "../context/ProductProvider";
import { useCartItem } from "../context/CartProvider";
import { FaSpinner } from "react-icons/fa";


export default function RootLayout() {
  const {loading}=useCartItem();
  if(loading){
    return <div className="flex  h-[100vh] justify-center items-center mt-4">
    <div className="w-16 h-16 border-t-4 border-[#DF2648] border-solid rounded-full animate-spin relative">
      <FaSpinner className="w-8 h-8 text-[#DF2648] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  </div>
  }
  return (
    <>
     
        <Navbar />
     
     <ProductContextProvider>
         <Outlet />
      </ProductContextProvider>
      <Footer />
    </>
  )
}
