import { FaStar } from "react-icons/fa";


export default function Rating({rating}) {
  return (
    <div className="flex gap-1 items-center">
     {Array.from({ length: rating }).map((_, ind) => (
        <FaStar key={ind} color="gold" className="cursor-pointer" />
      ))}
    </div>
  )
}

