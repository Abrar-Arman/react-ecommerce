import { useEffect, useRef } from "react";
import TopArrow from "../../components/shared/TopArrow";
import Category from "../../components/user/Category";
import Header from "../../components/user/Header";
import ProductList from "../../components/user/product/ProductList";
import Service from "../../components/user/Service";
export default function Home() {
 const target= useRef();
 const arrow = useRef()
 useEffect(()=>{
  console.log(target.current)
  window.addEventListener('scroll', function() {
    const sectionRect =target.current.getBoundingClientRect();
    if (sectionRect.top <= window.innerHeight && sectionRect.bottom >= 0) {
       arrow.current.style.display = 'flex';
    } else {
       arrow.current.style.display = 'none';
    }
  })
 },[])
  return (
    <>
      <Header />
      <Category />
      <ProductList target={target} />
      <Service />
      <TopArrow  arrow={arrow}/>
</>
  );
}
