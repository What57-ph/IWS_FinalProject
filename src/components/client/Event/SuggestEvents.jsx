import sampleData from "../../../data/sampleData";
import EventList from "../Home/EventList";

export default function SuggestEvent() {
    const events = sampleData.events.slice(0,12);
    return(
        <div className="mt-20">
            <h1 id="suggested-category" className="font-bold text-2xl mb-4">
              Có thể bạn sẽ thích
            </h1>
            <EventList list={events}/>
          </div>
    )
}