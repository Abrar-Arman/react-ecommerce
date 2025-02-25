
import Navbar from '../components/user/shared/Navbar'
import { Outlet } from 'react-router-dom'
import myimg from '../assets/img/Shopping.png'


export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <div className='flex h-[80vh] items-center gap-5 justify-center'>
      <div className=' w-[500px] flex items-center gap-[30px]'>
      <img src={myimg} className='h-[500px]' />
     </div>
      <Outlet />
      </div>
    </>
  )
}
