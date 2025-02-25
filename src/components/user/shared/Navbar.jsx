import search from '../../../assets/img/icon/search.svg';
import cart from '../../../assets/img/icon/cart.svg';
import heart from '../../../assets/img/icon/heart.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../context/AuthProvider';
import { useCartItem } from '../../../context/CartProvider';
export default function Navbar() {
  try{
    var {userAuth,handleLogOut} =useUserAuth();
    var {cartItems}=useCartItem()
  }
  catch(err){
    console.error(err);
  }
 
 if(userAuth?.userData != null ){
   var {userData}=userAuth;}
   let flag=true;
  if(window.location.pathname=='/auth/signup' || window.location.pathname=='/auth/login'){
    flag=false;
  }
  const navigate=useNavigate()
  return (
    <nav className='sticky z-20 top-0 flex border-b-2  border-b-[#F5F5F5] py-5 px-14 items-center justify-between bg-white'>
      <Link to='/'><div className='w-11 '><h1 className='text-[#DF2648] font-bold font-Gill  text-2xl'>Shoppy</h1></div></Link>
      <div>
        <ul className='flex cursor-pointer  gap-[12px]'>
          <Link to='/'>  <li className='hover:text-[#DF2648] transition-colors '>Home</li></Link>
          <li className='hover:text-[#DF2648] transition-colors '>About</li>
          <li className='hover:text-[#DF2648] transition-colors '>Contact</li>
         { flag && !userData && <Link to='/auth/signup'><li className='hover:text-[#DF2648] transition-colors '>Sign Up</li></Link> }
        </ul>
      </div>
      {flag &&(
      <div className='flex gap-2 items-center'>
        <div className='flex items-center justify-between w-[250px] gap-1.5 mr-2 rounded-[6px] bg-[#F5F5F5] py-2 ' >
          <input className='outline-none flex-1 pl-[6px]' type="text" placeholder="what are you looking for ?" />
          <img className='w-[20px] pr-1 cursor-pointer '  src={search}/>
          </div>
          <div className='flex gap-1 cursor-pointer'>
          {userData &&  
          <div className='relative p-2'>
           <Link to='/cart'> <img className='w-[20px] ' src={cart} /></Link>
            <div className='absolute top-[-5px] left-[-1px] text-white w-[20px] h-[20px] bg-[#000] rounded-full text-[9px] font-bold flex items-center justify-center '>{cartItems?.count}</div>
         </div>}
            <img className='w-[20px] ' src={heart} />
          </div>
          {userData && 
          <div className='relative group h-[60px] flex items-center justify-center'>
          <div className='w-6 h-6 flex bg-[#DF2648]  items-center justify-center rounded-full cursor-pointer text-white group'>
           <p> {userData.name.slice(0,1).toUpperCase()}</p>
           </div>
           <ul className='absolute  z-10 hidden group-hover:block right-1 top-11 bg-white shadow px-5 py-3'>
             <Link to='/profile'><li className='hover:text-[#DF2648]  text-[#000] text-[12px] cursor-pointer mb-2'>Profile</li></Link>
            <Link to='/orders'> <li className='hover:text-[#DF2648]  text-[#000] text-[12px] cursor-pointer mb-2'>Orders</li></Link>
             <li onClick={()=>{handleLogOut()
              navigate('/auth/login')
             }} className='hover:text-[#DF2648]  text-[#000] text-[12px] cursor-pointer'>Logout</li>
           </ul>
         
          </div>}
      </div>)
      }
       
    </nav>
  )
}
