import { useSearchParams } from "react-router-dom";
import Filter from "../../components/user/filter/Filter";
import ProductFilter from "../../components/user/filter/ProductFilter";


export default function Products() {
  const [search,setSearch]=useSearchParams();
  function mergeFilter(key,value){
    const params = new URLSearchParams(search);
    if(value==null)
      params.delete(key);
    else{
      params.set(key, value);
    }
   setSearch(`?${params.toString()}`)
  }
  return (
    <div className="mx-auto w-[80%] mt-8">
     <div className="flex items-start">
      <Filter onClick={mergeFilter} search={search}/>
      <ProductFilter search={search}  mergeFilter={mergeFilter}/>
      </div> 
    </div>
  )
}
