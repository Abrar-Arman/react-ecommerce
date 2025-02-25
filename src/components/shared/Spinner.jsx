

export default function Spinner({width=20}) {
  return (
    <div className={`w-[${width}px] h-[${width}px] border-2  border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
  )
}
