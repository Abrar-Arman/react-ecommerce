import { Link } from "react-router-dom";
import { useUserAuth } from "../../../context/AuthProvider";
import useAddToCart from "../../../hooks/useAddToCart";
import Spinner from "../../shared/Spinner";
import { useCartItem } from "../../../context/CartProvider";
export default function ProductItem({
  img,
  finalPrice,
  price,
  discount,
  name,
  id,
}) {
  const { userAuth } = useUserAuth();
  const { addToCart, loading } = useAddToCart();
  const cart = useCartItem();
  console.log(cart.cartItems);
  return (
    <div className="  w-[23%] mt-4 pb-4 shadow">
      <div className="relative group  bg-white">
        <Link to={`product/${id}`}>
          <img
            src={img}
            alt={name}
            className="w-full h-[200px] cursor-pointer object-contain"
          />
        </Link>
        {userAuth.token &&  !cart.findItem(id) ? (
          <div
            disabled={!loading}
            onClick={() => {
              addToCart(id);
              if( !cart.findItem(id) ) {
                console.log('hhh')
                 cart.modifyCart();
                }
            }}
            className="text-white cursor-pointer bg-black text-center py-2 box-content scale-x-0 group-hover:scale-x-100 transition duration-300 origin-top absolute bottom-0 left-0  w-full"
          >
            {loading ? (
              <div className="flex gap-2 pl-2">
                <Spinner />
                <span className="cursor-not-allowed">Add to Cart</span>
              </div>
            ) : (
              "Add to Cart"
            )}
          </div>
        ): userAuth.token && cart.findItem(id) && (
         ' '
        ) 
        }
      </div>

      <div className="flex flex-col gap-2 pl-1">
        <p className="w-[90%] truncate text-[12px] mt-1.5 text-[#000] font-bold">
          {name.split(" ").slice(0, 5).join(" ")} ...
        </p>
        <div className="flex flex-col gap-2">
          {discount > 0 ? (
            <>
              <span className="text-sm text-[#000]">
                From: <span className="text-[#BE123C]">${price}</span>
              </span>
              <span className="text-sm ">
                Save: <span className="text-green-400">${discount}</span>
              </span>
              <span className="text-sm ">
                Final:{" "}
                <span className="text-sm text-[#DF2648]">${finalPrice}</span>
              </span>
            </>
          ) : (
            <span className="text-[#BE123C] text-sm ">${price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
