import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DetailMap from "./DetailMap";
import DetailOrganizer from "./DetailOrganizer";
import SuggestEvent from "./SuggestEvents";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import About from "./About";

export default function EventDetail() {
  const { id } = useParams();
  const { isAuthenticated, events } = useAuth();
  // const [event, setEvent] = useState();

  // useEffect(() => {
  //   setEvent(events.find((item) => item.id == id))
  // }, [events])
  const event = events.find((item) => item.id == id)

  if (!event) {
    return <div></div>;
  }
  return (
    <div
      id="event-page-container"
      className="relative max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto pt-5"
    >
      <div id="detail-container" className="flex gap-4">
        <div className="flex-1 ">
          <img
            src={event.banner}
            alt="event-image"
            className="mb-20"
          />
          <Sidebar className="lg:hidden" data={event} isAuthenticated={isAuthenticated}/>
          <Navbar />
          <DetailMap data={event}/>
          <About data={event} />
          <DetailOrganizer data={event}/>
        </div>
        <Sidebar className="max-lg:hidden sticky top-4" data={event} isAuthenticated={isAuthenticated}/>
      </div>
      <SuggestEvent />
      <div className="sticky bottom-0 bg-base-100 text-center p-4 z-20 lg:hidden bg-white">
            {isAuthenticated
              ? <a href="" className="bg-pink-300 h-[60px] rounded-lg text-[1.125rem] justify-center flex items-center w-full">
                  Mua vé ngay
                </a>
              :<a href="/auth/login" className="bg-pink-300 h-[60px] rounded-lg text-[1.125rem] justify-center flex items-center w-full">
              Đăng nhập để mua vé
            </a>
            }
      </div>
    </div>
  );
}
