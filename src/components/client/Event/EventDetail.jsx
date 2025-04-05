import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SuggestCategory from "./SuggestCategory";

export default function EventDetail() {
  return (
    <div
      id="event-page-container"
      className="max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto pt-5"
    >
      <div id="detail-container" className="flex gap-4">
        <div className="flex-1 ">
            <img src="img/information/1.png" alt="event-image" className="mb-20"/>
            <Sidebar className="lg:hidden"/>
            <Navbar />


            <img src="img/information/1.png" alt="event-image" />
          Lịch sự kiện và sơ đồ chỗ ngồi
          <img src="img/information/1.png" alt="event-image" />
          Lịch sự kiện và sơ đồ chỗ ngồi
          <img src="img/information/1.png" alt="event-image" />
          Lịch sự kiện và sơ đồ chỗ ngồi
          <img src="img/information/1.png" alt="event-image" />
          Lịch sự kiện và sơ đồ chỗ ngồi
          <img src="img/information/1.png" alt="event-image" />
          Lịch sự kiện và sơ đồ chỗ ngồi
          <img src="img/information/1.png" alt="event-image" />
          Lịch sự kiện và sơ đồ chỗ ngồi
        </div>
        <Sidebar className="max-lg:hidden sticky top-4"/>
      </div>
      <SuggestCategory />
    </div>
  );
}
