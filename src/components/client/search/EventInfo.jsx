import { useState } from "react";
import sampleData from "../../../data/sampleData";

const EventInfo = () => {

  // change hardcode here 
  const [list] = useState(sampleData.events.slice(0, 6));

  const createEvent = ({ item }) => {
    console.log(item);
    return (
      <div key={item.id} className="py-2 rounded-md ">
        <a href="#">
          <div className="border-none">
            <div className="relative">
              <img
                className="w-full object-cover aspect-[16/9] rounded-lg"
                alt=""
                src={item.information}
              />
            </div>
            <div className="card-body flex flex-col gap-2 mt-4 p-0">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-white">
                  {item.date}, {item.province}
                </p>
                <p className="card-title font-semibold text-[16px] overflow-hidden line-clamp-2">
                  {item.name}
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 text-[18px]">
      <div className="font-semibold mb-2">
        Suggestions for you
      </div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-6">
        {list.map((item) => {
          return createEvent({ item });
        })}
      </div>

      <button
        className="w-[35%] mx-auto md:px-20 mt-5 py-2 hover:bg-green-500 bg-green-400/90 rounded-xl transition duration-200"      >
        <p class="text-[18px] ">Xem thêm</p>
      </button>

    </div>
  )
}
export default EventInfo