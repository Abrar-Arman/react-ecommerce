import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SubTitle from "../../components/user/shared/SubTitle"
import Spinner from "../../components/shared/Spinner";
import myImg from '../../assets/img/No_Product_Found.png'
export default function ProductCategory() {
   const [productCategory,setProductCategory] =useState([]);
   const [loading,setLoading] =useState(true);
   const{id,name}=useParams()
    useEffect(()=>{
   async function getProductCategory(){
      try{
   const {data} =await axios.get(`https://ecommerce-node4.onrender.com/products/category/${id}
`);
    console.log(data,'productCategory');
      setProductCategory(data.products);
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
   }
   getProductCategory()
    },[])
    if(!loading && productCategory.length==0){
       return <div className="flex items-center justify-center">
           <img src={myImg} />    </div>
    }
  return (
    <div className="mt-7 w-[80%] mx-auto">
    <SubTitle>
      <h1 className="mb-7">{name}</h1>
     </SubTitle>
      <ul className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
        {loading && <div className="flex w-[80vw] h-[50vh] items-center justify-center"><Spinner width={50}/></div>}
        {productCategory.length>0 && productCategory.map((product,index)=>(
          <li className='flex items-center gap-2 shadow rounded-md overflow-hidden' key={index}>
            <img src={product.mainImage.secure_url} alt={product.name} className="w-[120px]" />
        <div className="text-[14px] text-justify pr-2">
           <h2> {product.name}</h2>
        </div>
            </li>
        ))}
      </ul>
    </div>
  )
}

