import { useAuth } from "../../../context/AuthContext";
import sampleData from "../../../data/sampleData";
import EventList from "../Home/EventList";

export default function SuggestEvent() {
    const { events } = useAuth();
  
    const SuggestEvents = events.slice(0,12);
    return(
        <div className="mt-20">
            <h1 id="suggested-category" className="font-bold text-2xl mb-4">
              You Might Like
            </h1>
            <EventList list={SuggestEvents}/>
        </div>
    );
}
