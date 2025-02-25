import { BiBus } from "react-icons/bi";  // Bus icon
import { MdSecurity } from "react-icons/md";  // Security icon
import { FaHeadphones } from "react-icons/fa";
const service=[
    {icon:BiBus ,title:'FREE AND FAST DELIVERY',details:'Free delivery for all orders over $140'},
    {icon:FaHeadphones,title:'Friendly 24/7 customer support',details:'24/7 CUSTOMER SERVICE'},
    {icon:MdSecurity,title:'MONEY BACK GUARANTEE',details:'We reurn money within 30 days'}

]
export default function Service() {
  return (
    <section className="w-[80%] mt-8 pt-4 mx-auto px-3 pb-5">
     <div className="flex justify-between items-center flex-wrap">
        {service.map((item,ind)=> (
            <div key={ind} className="w-[30%] p-4">
             <div className="flex flex-col justify-center items-center gap-3">
            <div className="w-[50px] h-[50px] rounded-full bg-[#000] flex justify-center items-center 	shadow-[0px_10px_20px_rgba(0,0,0,0.4)] "><item.icon className="h-[30px] w-[30px] text-white cursor-pointer"/></div> 
             <h3 className="font-semibold">{item.title}</h3>
             </div>
             <p className="text-[12px] text-center">{item.details}</p>
            </div>
        ))}

     </div>
    </section>
  )
}
