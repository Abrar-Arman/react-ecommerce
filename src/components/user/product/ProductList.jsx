import { useEffect } from "react";
import SubTitle from "../shared/SubTitle";
import Title from "../shared/Title";
import axios from "axios";
import { useProductContext } from "../../../context/ProductProvider";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

export default function ProductList({target}) {
  const { fetchProduct, products } = useProductContext();
  const navigate=useNavigate()
  useEffect(() => {
    fetchProduct();
  }, []);
  console.log(products)
  return (
    <section ref={target} className="w-[80%] mt-8 pt-4 mx-auto px-3  pb-7 border-b-[1px] border-b-[#D9DBE9]">
      <SubTitle>Our Products</SubTitle>
      <Title>Explore Our Products</Title>
      <div className="flex flex-wrap gap-y-3 justify-between px-2.5 items-center">
        {products.slice(0,8).map((product, index) => (
          <ProductItem
            key={index}
            name={product.name}
            discount={product.discount}
            price={product.price}
            finalPrice={product.finalPrice}
            img={product.mainImage.secure_url}
            id={product._id}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button onClick ={()=>{navigate('products')}} className="px-8 py-3 text-white font-semibold rounded-md bg-[#DF2648] cursor-pointer focus:outline-none">
         View All Product
        </button>
      </div>
    </section>
  );
}
