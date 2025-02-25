import { FiFilter } from 'react-icons/fi';
import FilterCategory from './FilterCategory';
import FilterByPrice from './FilterByPrice';

export default function Filter({onClick,search}) {
   
  return (
    <div className="w-80 shadow p-3 pb-5 bg-white">
     <div className="flex items-center gap-2.5">
     <FiFilter className='w-5'/> <span className='text-[#121212] text-xl font-medium font-sans'>Filter</span>
     </div>
     <FilterCategory onClick={onClick} search={search}/>
    < FilterByPrice  onClick={onClick} search={search}/>
    </div>
  )
}
