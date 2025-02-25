import { useOutletContext } from "react-router-dom"


export default function ProfileForm() {
  const user = useOutletContext();
  console.log('kkkkkk')
  return (
    <div className="w-full">
      <p className="text-[18px] font-semibold">Account Details</p>
      <div className="mt-2 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <label className="text-gray-500 font-bold text-[12px]">UserName</label>
            <input type='text'  className=" border-[1px] border-gray-500 rounded w-[350px] outline-none pl-2 block py-1" value={user.userName}  />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 font-bold text-[12px]">Email</label>
            <input type='email' className="border-[1px]  border-gray-500 rounded w-[350px] outline-none pl-2 block py-1" value={user.email} />
        </div>
      </div>
    </div>
  )
}
