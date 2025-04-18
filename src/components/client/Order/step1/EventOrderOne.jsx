import { Button, DatePicker, Divider, Form, Image, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../../../context/OrderContext";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import dayjs from "dayjs";
import { MdCalendarToday } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const EventOrderOne = () => {
    const { event, setEvent, order, setOrder, eventId, setEventId } =
        useOrderContext();
    const [quantity, setQuantity] = useState([]);
    const [isDropdown, setIsDropdown] = useState(false);
    const [organizeDate, setOrganizeDate] = useState(event?.startDate);
    const [dateValue, setDateValue] = useState();
    const [activeStates, setActiveStates] = useState([]);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const quantityArr = [];

    event?.tickets.map((ticket) => {
        quantityArr.push(0);
    });

    const increment = (index) => setQuantity((prev) => prev.map((item, i) => (i === index ? item + 1 : item)));
    const decrement = (index) => setQuantity((prev) => prev.map((item, i) => (i === index && item > 0 ? item - 1 : item)));
    const dateList = [];
    const activeDates = [];
    let current = new Date(event?.startDate);
    let end = new Date(event?.endDate);

    let index = 0;
    while (current <= end) {

        dateList.push(current.toLocaleString('en-GB', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }));

        if (index === 0) {
            activeDates.push(true);
        } else {
            activeDates.push(false);
        }
        index++;
        current.setDate(current.getDate() + 1);
    }
    useEffect(() => {
        setQuantity(quantityArr);
        setActiveStates(activeDates);
        setDateValue(dateList[0]);
        setOrganizeDate(dateList[0]);
    }, [event]);
    const handleClickDate = (index) => {
        setIsDropdown(!isDropdown);
        setDateValue(dateList[index]);
        setOrganizeDate(dateList[index]);
        setActiveStates((prevStates) => {
            const newStates = [...prevStates];
            newStates.fill(false);
            newStates[index] = true;
            return newStates;
        }
        );
    }
    const onFinish = (values) => {
        console.log(values)
    }
    // xl:block grid grid-cols-2
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-5 items-start px-4">

            <img src={event?.imgEventInfo} className="w-full h-full" />

            <Form layout="inline" className="flex-col lg:flex ms-5" onFinish={onFinish}>
                {/* Date Picker */}
                <Form.Item className="eventForm h-fit">
                    <div className="flex justify-between items-center text-center gap-2">

                        <label className="font-semibold text-xl">Date & Time</label>
                        <div className="flex items-center bg-gray-100 p-2 rounded-md">

                            {/* <label className="flex items-center"> */}
                            <Input type="hidden" value={dateValue} name="organizeDate"></Input>
                            <label className="flex">
                                <button
                                    type="button"
                                    className="flex flex-row items-center gap-2 w-max text-base h-10 bg-base-200 border-0 rounded-l-full px-3"
                                    onClick={() => setIsDropdown(!isDropdown)}
                                >
                                    <MdCalendarToday className="text-3xl" />
                                    <span className="text-ellipsis truncate max-w-[150px] lg:max-w-none overflow-hidden whitespace-nowrap">
                                        {dateValue}
                                    </span>
                                    <span>
                                        <FaChevronDown />
                                    </span>
                                </button>
                            </label>

                            {isDropdown && (
                                <div className="z-50 absolute top-full end-1">
                                    <ul className="menu p-2 shadow bg-white rounded-box max-h-96 min-w-[17rem] w-full overflow-auto rounded-none">
                                        {dateList.map((date, index) =>
                                            activeStates[index] === true ? (
                                                <li
                                                    key={index}
                                                    className="px-12 bg-gray-200 flex justify-between items-center"
                                                    onClick={() => handleClickDate(index)}
                                                >
                                                    <p>{date}</p>
                                                    <TiTick className="text-blue-400 text-2xl font-thin" />
                                                </li>
                                            ) : (
                                                <li
                                                    key={index}
                                                    className="px-12"
                                                    onClick={() => handleClickDate(index)}
                                                >
                                                    {date}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}




                        </div>
                    </div>
                </Form.Item>


                {/* Ticket Category */}

                <Form.Item className="eventForm">

                    <div className="flex items-center justify-between">
                        <label className="font-semibold text-xl">Ticket category</label>
                        <label className="font-semibold text-xl">Amount</label>
                    </div>


                    <hr />
                    <div className="h-[400px] overflow-y-scroll">
                        {event?.tickets.map((ticket, index) => {

                            if (ticket.quantity !== null) {
                                return (
                                    <div className="flex justify-between items-center py-4 text-lg" key={index}>
                                        <div>
                                            <div className="font-semibold">{ticket.type}</div>
                                            <div className="text-gray-700">{ticket.price}</div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button onClick={() => decrement(index)} size="small">
                                                -
                                            </Button>
                                            <Input type="hidden" value={quantity[index]} name={ticket.type}></Input>
                                            <span className="w-6 text-center">{quantity[index]}</span>
                                            <Button onClick={() => increment(index)} size="small">
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="flex justify-between items-center py-4 text-lg" key={index}>
                                        <div>
                                            <div className="font-semibold">{ticket.type}</div>
                                            <div className="text-gray-700">{ticket.price}</div>
                                        </div>
                                        <span className="text-red-500 font-medium">Sold out</span>
                                    </div>
                                )
                            }

                        })}




                    </div>
                </Form.Item>

                {/* Discount Info */}
                <Form.Item className="eventForm bg-gray-100 p-4 rounded-md border border-dashed border-yellow-500 eventForm ">
                    <h4 className="font-bold mb-2">🎟️ Combo Discount Offers:</h4>
                    <ul className="text-sm space-y-1">
                        <li>
                            👉 <strong>Combo 4</strong> – Get <strong>6% off</strong>{" "}
                            (Applicable when purchasing <strong>4-5-6-7 tickets</strong> in
                            one transaction).
                        </li>
                        <li>
                            👉 <strong>Combo 8</strong> – Get <strong>12% off</strong>{" "}
                            (Applicable when purchasing <strong>8-9-10 tickets</strong> in
                            one transaction).
                        </li>
                    </ul>
                </Form.Item>
                <Form.Item className="mt-4 ms-0 ">
                    <Button
                        type="submit"
                        className={`xl:w-[540px] lg:w-[400px] w-[80vw] hover:bg-pink-500 hover:text-opacity-100 text-white text-opacity-90 font-semibold border-0 h-[48px] text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${isButtonHovered ? "bg-pink-500" : "bg-pink-200"
                            }`}
                    >
                        Continue
                    </Button>
                </Form.Item>

            </Form>
        </div>

    );
};

export default EventOrderOne;
