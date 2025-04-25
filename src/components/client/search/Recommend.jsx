import { useAuth } from "../../../context/AuthContext"
import EventCard from "./EventCard";

const Recommend = () => {

  const { events } = useAuth();

  return (
    <div className="border-t border-slate-950 flex flex-col items-center gap-4">
      <h2 className="mt-3 font-semibold">Recommend for you</h2>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          events.slice(0, 6).map((item) => {
            return EventCard({ item, search: true });
          })
        }
      </div>
    </div>
  )
}
export default Recommend