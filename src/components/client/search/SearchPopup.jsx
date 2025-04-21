import { FaArrowTrendUp, FaTurnUp } from "react-icons/fa6"
import ExploreByType from "./ExploreByType"
import EventInfo from "./EventInfo"
import { Link } from "react-router-dom"

const SearchPopup = ({ setOpen }) => {
  return (
    <div className="absolute transform -translate-x-1/2 translate-y-14  
                min-w-[300px] w-auto max-h-[70vh] h-auto rounded-xl 
                bg-slate-900/40 backdrop-blur-2xl
                border border-white/20 shadow-2xl
                flex flex-col text-white text-2xl py-4
                overflow-y-auto">
      <div className="text-[18px]">
        <Link to={"/search?filter=name ~ 'Autumn'"}
          onClick={() => setOpen(false)}
          className="flex flex-row gap-2 py-1 px-5 items-center w-full hover:bg-gray-200/20 hover:font-bold cursor-pointer transition duration-200">
          <FaArrowTrendUp className="text-pink-500" />
          Autumn
        </Link>
        <Link to={"/search?filter=name ~ 'International'"}
          onClick={() => setOpen(false)}
          className="flex flex-row gap-2 py-1 px-5 items-center w-full hover:bg-gray-200/20 hover:font-bold cursor-pointer transition duration-200">
          <FaArrowTrendUp className="text-pink-500" />
          International
        </Link>
        <Link to={"/search?filter=name ~ 'Auto'"}
          onClick={() => setOpen(false)}
          className="flex flex-row gap-2 py-1 px-5 items-center w-full hover:bg-gray-200/20 hover:font-bold cursor-pointer transition duration-200">
          <FaArrowTrendUp className="text-pink-500" />
          Auto
        </Link>
      </div>
      <div className="px-5 text-[18px] mt-5">
        <ExploreByType setOpen={setOpen} />
        <EventInfo setOpen={setOpen} />
      </div>
    </div>
  )
}
export default SearchPopup