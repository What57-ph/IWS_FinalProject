import React from "react";
import OrderStep from "./OrderStep";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useOrderContext } from "../../../context/OrderContext";

const OrderHead = ({ id }) => {
  const style = {
    background: "linear-gradient(to top, white 50%, rgb(242, 244, 247) 50%)",
  };
  const { event, setEvent, order, setOrder, eventId, setEventId } =
    useOrderContext();
  const location =
    event?.houseNumber +
    ", " +
    event?.ward +
    ", " +
    event?.district +
    ", " +
    event?.province;
  const name = event?.name.toLocaleUpperCase();
  const date = event?.startDate.split("T")[0].split("-").reverse().join("/");
  return (
    <>
      <div className=" flex justify-between items-center px-[16px] lg:px-[105px] xl:px-auto py-4">
        <OrderStep />
        <div className="w-fit flex items-center justify-center gap-2">
          <p className="text-lg text-gray-500 xl:block hidden">
            Time remaining to book tickets
          </p>
          <div className="flex items-center justify-center text-3xl font-bold ms-3">
            <div className="remainTime" style={style}>
              1
            </div>
            <div className="remainTime" style={style}>
              0
            </div>
            <div className="text-gray-400">:</div>
            <div className="remainTime" style={style}>
              0
            </div>
            <div className="remainTime" style={style}>
              0
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full border-1 border-gray-900 shadow-2xl overflow-hidden" style={{ background: "linear-gradient(90deg,rgba(21, 22, 46, 1) 0%, rgba(72, 77, 89, 1) 41%, rgba(35, 54, 77, 1) 86%)" }}>
        <p className="animate-slide text-nowrap text-lg font-bold text-white text-opacity-45 flex items-center py-4 w-fit">
          {name} &nbsp;&nbsp; <FaCalendarAlt />&nbsp;{date} &nbsp;&nbsp; <FaLocationDot />&nbsp;{location}
        </p>
      </div>

    </>
  );
};

export default OrderHead;
