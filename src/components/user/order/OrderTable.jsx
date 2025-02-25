import { useEffect } from "react";
import { useOrder } from "../../../context/OrderProvider";

export default function OrderTable() {
  const {order,getOrder}=useOrder();
  useEffect(()=>{
  if(order.length == 0)
    getOrder();
  },[]);
  console.log(order)
  return (
    <table className="mt-6 mb-12">
      <thead>
        <tr className="text-[14px]">
          <th className="px-3  text-left"># Order </th>
          <th className="px-3 text-left">Order Price</th>
          <th className="px-3 text-left"># of Products</th>
          <th className="px-3 text-left">Status</th>
        </tr>
      </thead>
      <tr>
        <td colSpan="4" >
          <div className="my-3 bg-[#E8ECEF] h-[1px]   "></div>
        </td>
      </tr>
      <tbody>
        {order.map((item, index) => (
          <>
          <tr key={index} className="text-center text-[12px]">
            <td>{index+1}</td>
            <td>${item.finalPrice.toFixed(2) }</td>
            <td>{item.products.length }</td>
            <td className={`p-2 block rounded-full ${item.status=='deliverd'?'bg-green-300':'bg-amber-200'}`}>{item.status }</td>
          </tr>
          <tr>
            <td className="my-2">
              <div className="h-[1px] bg-[#F3F5F7] my-2"></div>
            </td>
          </tr>
          </>
        ))}
      </tbody>
    </table>
  )
}
