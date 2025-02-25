
import myImg from '../../assets/img/Header.png'
export default function Header() {
  return (
    <div className='relative mt-5 flex justify-center'>
      <img src={myImg} className='w-[80%] h-[60vh]'/>
      <div className='absolute top-0 left-0 w-[80%]  flex flex-col items-center h-[60vh] justify-center'>
        <h1 className='text-[32px] text-white font-bold'>Welcome to My Store</h1>
        <p className='text-[18px] text-white'>Your one-stop shop for all your favorite products</p>
      </div>
    </div>
  )
}
