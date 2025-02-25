import SubTitle from "./shared/SubTitle";
import leftArrow from '../../assets/img/icon/arrow-left.svg';
import rightArrow from '../../assets/img/icon/arrow.svg';
import Title from "./shared/Title";
import { useEffect, useRef } from "react";
import { FaTooth, FaBlender, FaMobileAlt, FaCouch,FaBoxOpen } from 'react-icons/fa';
import { useCategory } from "../../context/CategoryProvider";
import { Link } from "react-router-dom";


// Dynamic category icon mapping
const categoryIcons = {
    'personal care': FaTooth ,
    'home & kitchen': FaBlender ,
    'mobiles': FaMobileAlt ,
    'furniture': FaCouch ,
};
export default function Category() {
  
 const {categories, fetchCategory}=useCategory()  ;
 useEffect(()=>{
  fetchCategory();
 },[])
  const length=categories.length; 
  const slider=useRef();
  
  let index=0;
  

  return (
    <section className="w-[80%] mt-8 pt-4 mx-auto px-3  pb-10 border-b-[1px] border-b-[#D9DBE9]">
        <div className="flex items-center justify-between px-3">
       <SubTitle>Categories</SubTitle>
       <div className="flex gap-4">
        <div className="rounded-full bg-[#EFF0F6] w-8 h-8 flex items-center justify-center">
        <img src={leftArrow} className="cursor-pointer "  onClick={()=>{ if(index != 0){index+= 16 ; slider.current.style.transform=`translateX(${index}%)`; }}}/>
        </div>
        <div className="rounded-full bg-[#EFF0F6] w-8 h-8 flex items-center justify-center">
        <img src={rightArrow} className="cursor-pointer " onClick={()=>{ if(Math.abs(index) != ((length-3) * 16)){index-= 16;slider.current.style.transform=`translateX(${ index}%)`;console.log('j')}}}/>
        </div>
       </div>
       </div>
       <Title>Browse By Category</Title>
   <div className="w-full  overflow-hidden">
   {categories.length > 0 ? (
        <div ref={slider} className="mt-4 w-[200%] flex h-[120px]   gap-2  transition-transform duration-200 ">
          {categories.map((category,index) => {
            const IconComponent = categoryIcons[category.name] || FaBoxOpen ;
            return (
          
            <Link to={`products/${category.name}/${category._id}`} key={index}  className="relative bg-[#FCFCFC] gap-1.5  group mr-2 w-[16%] flex items-center justify-center px-3 py-5 cursor-pointer border-[1px]  flex-col border-[#D9DBE9] ">
              {/* Background Fill Effect */}
              <div className="absolute top-0 left-0 w-0 h-full  bg-[#DF2648] group-hover:w-full transition-width duration-300"></div>
              {/* Icon & Text */}
              <IconComponent className="w-7 h-7 group-hover:text-white relative z-10 transition-all duration-300" />
              <span className="text-lg font-medium text-gray-900 group-hover:text-white relative z-10 transition-all duration-300">
                {category.name}
              </span>
            </Link>
            );
          })}
        </div>
      ) : (
        <p>No categories available.</p>
      )}
      </div>
    </section>
  )
}

