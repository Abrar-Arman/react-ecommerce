import { useEffect } from "react";
import { useCategory } from "../../../context/CategoryProvider";

export default function FilterCategory({onClick,search}) {
    const {categories,fetchCategory}=useCategory();
    useEffect(()=>{
        if(categories.length==0)
           fetchCategory();
    },[]);
   console.log(categories,'folter')
   const categoryFilter =search.get('category')
  return (
    <div className="mt-5">
    <h2 className="mb-3 text-[#121212] text-[16px] font-mono font-extrabold ">Filter by Categorits</h2>
    <div className="bg-[#E9EAEC] h-0.5 mb-4"></div>
      <ul className="flex flex-col  pl-2 gap-3 h-32 overflow-y-auto">
        {categories.map((category, index) => (
          <li key={index} className="cursor-pointer text-[#807E7E] pl-2 border-l-[5px] border-[#DF2648] " onClick={()=>{categoryFilter!=category._id ? onClick('category',category._id):onClick('category',null)}}>
           {category.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
