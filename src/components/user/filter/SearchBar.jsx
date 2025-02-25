
export default function SearchBar({setSearchText}) {
  return (
    <div>
      <input onChange={e=>{setSearchText(e.target.value)}} placeholder="search by Title" className="placeholder:text-slate-400  pl-3 py-2 block outline-none w-[380px] rounded-full border border-gray-300 "/>
    </div>
  )
}
