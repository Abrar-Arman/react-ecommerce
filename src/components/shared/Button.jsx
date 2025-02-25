

export default function Button({text,isSubmit}) {
  return (
    <button disabled={isSubmit} className="bg-[#DF2648]  text-white px-3 py-1.5 rounded-full block mt-2 cursor-pointer">
      {isSubmit ? 'Loading...' :text }
    </button>
  )
}
