import React, { useEffect, useState } from "react";
import OrderStep from "./OrderStep";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useOrderContext } from "../../../context/OrderContext";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const OrderHead = ({ id }) => {
  const style = {
    background: "linear-gradient(to top, white 50%, rgb(242, 244, 247) 50%)",
  };
  const { event } = useOrderContext();
  const location =
    event?.houseNumber +
    ", " +
    event?.ward +
    ", " +
    event?.district +
    ", " +
    event?.province;
  const name = event?.name?.toLocaleUpperCase();
  const date = event?.startDate?.split("T")[0].split("-").reverse().join("/");

  const [time, setTime] = useState(600);
  const [outTime, setOutTime] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          setOutTime(true);
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // convert seconds to m/s format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return [minutes, secs].map((val) => String(val).padStart(2, "0"));
  };

  const [minutes, seconds] = formatTime(time);


  const handleOk = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex justify-between items-center px-[16px] lg:px-[105px] xl:px-auto py-4">
        <OrderStep />
        <div className="w-fit flex items-center justify-center gap-2">
          <p className="text-lg text-gray-500 xl:block hidden">
            Time remaining to book tickets
          </p>
          <div className="flex items-center justify-center text-3xl font-bold ms-3">
            <div className="remainTime" style={style}>
              {minutes[0]}
            </div>
            <div className="remainTime" style={style}>
              {minutes[1]}
            </div>
            <div className="text-gray-400">:</div>
            <div className="remainTime" style={style}>
              {seconds[0]}
            </div>
            <div className="remainTime" style={style}>
              {seconds[1]}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex justify-end w-full border-1 border-gray-900 shadow-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg,rgba(21, 22, 46, 1) 0%, rgba(72, 77, 89, 1) 41%, rgba(35, 54, 77, 1) 86%)",
        }}
      >
        <p className="animate-slide text-nowrap text-lg font-bold text-white text-opacity-45 flex items-center py-4 w-fit">
          {name} &nbsp;&nbsp; <FaCalendarAlt />&nbsp;{date} &nbsp;&nbsp;{" "}
          <FaLocationDot />&nbsp;{location}
        </p>
      </div>

      {/* time out modal */}
      <Modal
        title={<span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Time Out</span>}
        visible={outTime}
        onOk={handleOk}
        closable={false}
        footer={[
          <button
            key="ok"
            onClick={handleOk}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-800"
          >
            Ok
          </button>,
        ]}
        centered
      >
        <p className="text-base">You can only complete the ticket booking within a 10-minute time frame. Please rebook.</p>
      </Modal>
    </>
  );
};

export default OrderHead;