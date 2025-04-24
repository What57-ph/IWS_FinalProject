import { useState } from "react";
import sampleData from "../../../data/sampleData";
import EventCard from "./EventCard";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const EventInfo = ({ setOpen }) => {

  // change hardcode here 
  const { events } = useAuth();
  const [list] = useState(events.slice(0, 6));

  return (
    <div className="flex flex-col gap-4 text-[18px]">
      <div className="font-semibold mb-2">
        Suggestions for you
      </div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-6">
        {list.map((item) => {
          return EventCard({ item });
        })}
      </div>

      <Link to={'/search'} onClick={() => setOpen(false)}
        className="w-[35%] mx-auto md:px-20 mt-5 py-2 hover:bg-green-500 bg-green-400/90 rounded-xl transition duration-200 hover:text-white"       >
        <p class="text-[18px] ">Watch more</p>
      </Link>

    </div>
  )
}
export default EventInfo