
import CartTable from "../../components/user/cart/CartTable";
import CartSummary from "../../components/user/cart/CartSummary";
import MakeOrder from "../../components/user/cart/MakeOrder";

export default function Cart() {
  return (
    <main className="w-[95%] mx-auto flex flex-col gap-y-6 items-center  mt-10 ">
    <h1 className="w-[80%] text-[34px] font-serif mb-3 pl-2 border-l-8 border-l-[#DF2648]">My Cart</h1>
    <div className="flex w-[80%] items-center gap-8 justify-between flex-wrap">
      <div className=""> 
         <CartTable />
      </div>
    <div>
      <CartSummary />
      </div>
    </div>
      <MakeOrder />
    </main>
  )
}
