import { Button, DatePicker, Divider, Form, Image, Select, Space } from "antd";
import React, { useState } from "react";
import { useOrderContext } from "../../../../context/OrderContext";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import dayjs from "dayjs";
import { MdCalendarToday } from "react-icons/md";

const EventOrderOne = () => {
    const { event, setEvent, order, setOrder, eventId, setEventId } =
        useOrderContext();
    const [quantity, setQuantity] = useState(Array(event?.tickets.length).fill(0));
    const increment = (index) => setQuantity((prev) => prev.map((item, i) => (i === index ? item + 1 : item)));
    const decrement = (index) => setQuantity((prev) => prev.map((item, i) => (i === index && item > 0 ? item - 1 : item)));
    const dateList = [];
    const [organizeDate, setOrganizeDate] = useState(event?.startDate);
    let current = new Date(event?.startDate);
    let end = new Date(event?.endDate);
    const handleDateChange = (value) => {
        setOrganizeDate(dateList[value]);
    }
    while (current <= end) {
        dateList.push(current.toLocaleString('en-GB', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
        current.setDate(current.getDate() + 1);
    }
    const FirstSelection = () => {
        return (
            <>
                <MdCalendarToday className="text-3xl" />
                {current.toLocaleString('en-GB', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}



                <FaChevronDown />

            </>
        )
    }
    console.log(dateList);
    return (
        <div className="relative flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto mt-5">
            <Image src={event?.imgEventInfo} />
            <div className="grow relative w-full">
                <Form>
                    {/* Date Picker */}
                    <div className="eventForm flex justify-between items-center text-center gap-2">

                        <label className="font-semibold text-xl">Date & Time</label>
                        {/* <div className="flex items-center bg-gray-100 p-3 rounded-md relative bottom-2"> */}

                        {/* <label className="flex items-center"> */}
                        <Form.Item className="flex items-center bg-gray-100 p-3 rounded-md relative bottom-2" name="organizeDate">
                            <Space wrap>
                                <Select
                                    defaultValue={dateList[0]}
                                    className="w-full"
                                    onChange={handleDateChange}
                                    options={dateList.map((date) => ({ label: date, value: date }))}
                                />
                            </Space>
                        </Form.Item>

                        {/* </label> */}

                        {/* {isDropdown && (
                                <div className="z-50 absolute top-[3.5rem] start-0">
                                    <Form.Item className="w-full md:w-1/2" label="Category" name="category">
                                        <Select>
                                            {dateList.map((date) => {
                                                return (
                                                    <Select.Option key={date} value={date}>
                                                        {date}
                                                    </Select.Option>
                                                )
                                            })}

                                        </Select>
                                    </Form.Item>
                                </div>
                            )} */}
                        {/* </div> */}
                    </div>

                    {/* Ticket Category */}
                    <div className="eventForm">
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
                    </div>

                    {/* Discount Info */}
                    <div className="bg-gray-100 p-4 rounded-md border border-dashed border-yellow-500 eventForm">
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
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default EventOrderOne;
