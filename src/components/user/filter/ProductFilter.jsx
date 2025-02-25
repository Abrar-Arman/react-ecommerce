import { useProductContext } from "../../../context/ProductProvider";
import myImg from "../../../assets/img/product-not-found.jpg";
import { useEffect, useState } from "react";
import Spinner from "../../shared/Spinner";
import { Link } from "react-router-dom";
import Sort from "./Sort";
import SearchBar from "./SearchBar";
export default function ProductFilter({ search,mergeFilter }) {
  const { products, fetchProduct, loading } = useProductContext();
  console.log(products)
  useEffect(() => {
    if (products.length == 0) {
      fetchProduct();
    }
  }, []);
  const [searchText, setSearchText] = useState("");
  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Spinner width={50} />
      </div>
    );
  }
  let filter = [...products];
  const categoryFilter = search.get("category");
  const priceFilter = search.get("price");
  const sortByPrice=search.get("sort");
  if (categoryFilter) {
    filter = products.filter(
      (product) => categoryFilter === product.categoryId
    );
    console.log(filter);
  }
  if (priceFilter) {
    console.log(priceFilter.split("-")[0]);
    filter = products.filter(
      (product) =>
        product.finalPrice >= priceFilter.split("-")[0] &&
        priceFilter.split("-")[1] > product.finalPrice
    );
    console.log(filter);
  }
  if(sortByPrice){
    filter=sortByPrice=='asc' ?filter.sort((a,b)=>Number(a.finalPrice)-Number(b.finalPrice)):filter.sort((a,b)=>Number(b.finalPrice)-Number(a.finalPrice));
  }
  if(searchText){
    filter=filter.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()));
  }
  if (filter.length == 0) {
    return (
      <div className="flex flex-col items-center w-full">
      <div className="mb-3">
      <SearchBar setSearchText={setSearchText}/>
      </div> 
      <div className="text-right mb-4">
      <Sort mergeFilter={mergeFilter} />
      </div>
      <div className=" flex justify-center  w-full">
        <img src={myImg} />
      </div></div>
    );
  }
  return (
    <div className="pl-[90px]">
     <div className="mb-3">
      <SearchBar setSearchText={setSearchText}/>
      </div> 
      <div className="text-right mb-4">
      <Sort mergeFilter={mergeFilter} />
      </div>
      <ul className="grid grid-cols-2 gap-3">
        {filter.map((product) => (
          <li
            key={product._id}
            className="py-1 w-[300px]  flex items-center justify-center"
          >
            <div className="shadow p-4 ">
              <Link to={`/product/${product._id}`}>
                {" "}
                <img
                  src={product.mainImage.secure_url}
                  className="w-[90px] cursor-pointer"
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
