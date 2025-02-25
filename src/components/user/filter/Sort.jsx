
export default function Sort({mergeFilter}) {
  return (
    <div className="relative">
    <select onChange={e=>{mergeFilter('sort',e.target.value)}} className="p-2 outline-none text-[14px] font-mono cursor-pointer bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#DF2648] ">
      <option hidden className="font-bold">Sort by Price</option>
      <option value='all'>All</option>
      <option value="asc">Low to High</option>
      <option value="desc">High to Low</option>
    </select>
  </div>
  )
}

