import { FaArrowUp } from 'react-icons/fa';

export default function TopArrow({arrow}) {
  return (
    <div ref={arrow} className='w-7 h-7 cursor-pointer  bg-[#000] fixed bottom-3 right-1.5  hidden items-center justify-center'>
     <FaArrowUp onClick={()=>{scroll(0,0)}} className='text-white'/>
    </div>
  )
}
