

function Input({placeholder}:{placeholder:string}) {
  return (
    <div>
        <form action="">

        <input type="url"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 " placeholder={placeholder} required />
      <button>Submit</button>
        </form>
    </div>
  )
}

export default Input
