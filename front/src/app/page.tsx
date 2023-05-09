export default function Home() {
 return (
  <>
   <div className="min-h-[86vh] w-full flex items-center">
    <div className="uppercase font-bold text-7xl w-1/2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
     Register your company and be among the first to receive unique data about
     your product.
    </div>
    <div className="w-1/2 flex justify-center">
     <button
      className="uppercase font-bold text-4xl bg-gradient-to-r from-blue-500 to-blue-700
  text-gray-100 rounded-lg duration-300 ring-4 animate-bounce ring-blue-400 px-9 py-3 hover:text-white hover:ring-slate-300 mx-8"
     >
      Register
     </button>
    </div>
   </div>
  </>
 );
}
