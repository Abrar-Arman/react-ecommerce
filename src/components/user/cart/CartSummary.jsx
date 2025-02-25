import { useCartItem } from "../../../context/CartProvider";


export default function CartSummary() {
    const { cartItems } = useCartItem();
    if(cartItems.count==0){
      return null;
    }
    // if(Array.isArray(cartItems?.products)){
    var overAll=cartItems.products.reduce((acc, product) => {
        return acc + product.quantity * product.details.finalPrice;
      }, 0)
    // }
    
  return (
    <div className="shadow px-5 py-7 bg-[#fff] w-[400px] h-[350px] relative">
    <div className="flex justify-between items-center">
      <h2 className="text-[25px] font-bold font-mono">Cart Summary </h2>
      <p className="text-[#6C7275] text-[12px]"><span className="font-bold">{cartItems?.products?.length} </span>items</p>
      </div>
      <div className="flex justify-between items-center mt-12 font-bold">
        <p className="text-[18px]">Total</p>
        <p>${overAll.toFixed(2)}</p>
     </div>
     <div className="h-[1px] bg-[#F3F5F7] my-3"></div>
    <button className="text-white bg-[#000] px-4 absolute bottom-0 left-0 w-full py-3 rounded cursor-pointer">Checkout</button>
    </div>
  )
}
