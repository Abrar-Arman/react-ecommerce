import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#000] mt-8 py-8 px-4">
      <div className="flex justify-between py-5 border-[1px] border-b-[#F3F5F7]">
        <div className="text-white items-center flex gap-2">
         <Link to='/'><h1 className="font-bold  text-[22px]">Shoppy </h1></Link> 
          <span>|</span>
          <p className="text-[12px]">one-stop shop for all your favorite products</p>
        </div>
      <div>
        <ul className="flex gap-3 text-white">
          <Link to='/'><li className="cursor-pointer text-[14px]">Home</li></Link>
          <Link to='/products'><li className="cursor-pointer text-[14px] ">Products</li></Link>
          <li className="cursor-pointer text-[14px] ">Contact</li>
        </ul>
      </div>
      </div>
      <div className="mt-3">
        <p className="text-white text-center">Copyright © 2025 Shoppy. All rights reserved.</p> 
      </div>
    </footer>
  )
}
