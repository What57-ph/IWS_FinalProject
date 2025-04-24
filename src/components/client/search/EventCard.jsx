import { Image } from "antd";
import { formatVND } from "../../share/function/formatterCurrency";
import { FaCalendar } from "react-icons/fa6";

const EventCard = ({ item, search }) => {
  // console.log("Put in card", item);

  function getLowestPrice(tickets) {
    if (!tickets || tickets.length === 0) return null;

    let lowest = tickets[0].price;
    for (let i = 1; i < tickets.length; i++) {
      if (tickets[i].price < lowest) {
        lowest = tickets[i].price;
      }
    }
    return formatVND(lowest);
  }

  return (
    <div key={item.id} className="py-2 rounded-md ">
      <a href="#">
        <div className="border-none">
          <div className="relative">
            <Image
              className="w-full object-cover aspect-[16/9] rounded-lg"
              alt={item.name || "Event image"}
              src={item.information}
              preview={true}
              fallback="https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2Ff0%2F56%2Fd6%2F66e53d7f3faaff7b62f88df2882fc934.jpg&w=640&q=75" // Ảnh dự phòng khi load lỗi (tuỳ chọn)
            />
          </div>
          <div className="card-body flex flex-col gap-2 mt-4 p-0">
            <div className="flex flex-col gap-2">
              <p className={`text-[15px] ${search ? 'text-gray-500 md:!text-[15px]' : 'text-white'} flex flex-row items-center gap-2 `}>
                <FaCalendar /> {item.startDate}, {item.ward}
              </p>
              <div>
                <p className={` ${search ? 'text-green-500 !text-[15px]' : 'text-white'} `}>
                  From {getLowestPrice(item.tickets)}
                </p>
                <p className={`text-lg card-title font-semibold ${search ? 'md:text-xl' : 'md:text-[16px]'} overflow-hidden line-clamp-2`}>
                  {item.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
export default EventCard