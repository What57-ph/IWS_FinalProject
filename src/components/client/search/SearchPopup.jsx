import { FaArrowTrendUp, FaTurnUp } from "react-icons/fa6"
import ExploreByType from "./ExploreByType"
import EventInfo from "./EventInfo"

const SearchPopup = () => {
  return (
    <div className="absolute transform -translate-x-1/2 translate-y-14  
                min-w-[300px] w-auto max-h-[70vh] h-auto rounded-xl 
                bg-slate-900/40 backdrop-blur-2xl
                border border-white/20 shadow-2xl
                flex flex-col text-white text-2xl py-4
                overflow-y-auto">
      <div className="text-[18px]">
        <div className="flex flex-row gap-2 py-1 px-5 items-center w-full hover:bg-gray-200/20 hover:font-bold cursor-pointer transition duration-200">
          <FaArrowTrendUp className="text-pink-500" />
          exid
        </div>
        <div className="flex flex-row gap-2 py-1 px-5 items-center w-full hover:bg-gray-200/20 hover:font-bold cursor-pointer transition duration-200">
          <FaArrowTrendUp className="text-pink-500" />
          ntpmm
        </div>
        <div className="flex flex-row gap-2 py-1 px-5 items-center w-full hover:bg-gray-200/20 hover:font-bold cursor-pointer transition duration-200">
          <FaArrowTrendUp className="text-pink-500" />
          pbm
        </div>
      </div>
      <div className="px-5 text-[18px] mt-5">
        <ExploreByType />
        <EventInfo />
      </div>
    </div>
  )
}
export default SearchPopup