 const price=[100,200,300,400,500,600,700,800,900]
export default function FilterByPrice({onClick,search}) {
  const priceFilter =search.get('price')
  const current= priceFilter && priceFilter.split('-')[0]
  return (
   <div className="mt-10">
    <h2 className="mb-2 text-[#121212] text-[16px] font-mono font-extrabold">Filter by Price</h2>
    <div className="bg-[#E9EAEC] h-0.5 mb-4"></div>

    <ul className="flex flex-col gap-3">
      {
        price.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <input type="checkbox" id={`price-${index}`} className="cursor-pointer" onClick={()=>{current!=item? onClick('price',`${item}-${item+99}`):onClick('price',null)}}/>
            <label className='text-[#807E7E]' htmlFor={`price-${index}` }> $<span className="text-[#807E7E]">{item }{ ' '}-{ ' '}${ item+99} </span></label>
          </li>
        ))
      }
    </ul>
    </div>
  )
}

