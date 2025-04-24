import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../../../context/OrderContext";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
import ContinueBtn from "../ContinueBtn";

const EventOrderOne = ({ form }) => {
    const { event, selectedTickets, setSelectedTickets, totalAmount } =
        useOrderContext();
    const [quantity, setQuantity] = useState([]);
    const [isDropdown, setIsDropdown] = useState(false);
    const [organizeDate, setOrganizeDate] = useState(event?.startDate);
    const [dateValue, setDateValue] = useState();
    const [activeStates, setActiveStates] = useState([]);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isTicketSelected, setIsTicketSelected] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const quantityArr = [];

    event?.tickets.map((ticket) => {
        quantityArr.push(0);
    });

    const increment = (index) => {
        setQuantity((prev) => {
            const updated = [...prev];
            updated[index] = (updated[index] || 0) + 1;
            return updated;
        });
        setIsShown(true);
    };

    const decrement = (index) => {
        setQuantity((prev) => {
            const updated = [...prev];
            updated[index] = Math.max((updated[index] || 0) - 1, 0);
            return updated;
        });
        setIsShown(true);
    };
    const dateList = [];
    const activeDates = [];
    let current = new Date(event?.startDate);
    let end = new Date(event?.endDate);
    let index = 0;
    while (current <= end) {
        dateList.push(
            current.toLocaleString("en-GB", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })

        );

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
        form.setFieldsValue({ organizeDate: dateList[0] });
    }, [event]);
    useEffect(() => {
        if (quantity.some((qty) => qty > 0)) {
            setIsButtonHovered(true);
            setIsTicketSelected(true);
        } else {
            setIsButtonHovered(false);
            setIsTicketSelected(false);
        }
        const updateSelectedTickets = () => {
            const updatedTickets = quantity
                .map((qty, index) => {
                    if (qty > 0) {
                        return {
                            index: index,
                            ticketId: event?.tickets[index].id,
                            type: event?.tickets[index].type,
                            price: event?.tickets[index].price,
                            subTotal: event?.tickets[index].price,
                            quantity: qty,
                        };
                    }
                    return null;
                })
                .filter((ticket) => ticket !== null);

            setSelectedTickets(updatedTickets);
            form.setFieldsValue({ items: updatedTickets });
        };
        // form.setFieldsValue({ totalPrice: totalAmount });
        updateSelectedTickets();
    }, [quantity]);
    useEffect(() => {
        form.setFieldsValue({ totalPrice: totalAmount });
    }, [totalAmount]);

    const handleClickDate = (index) => {
        setIsDropdown(!isDropdown);
        setDateValue(dateList[index]);
        setOrganizeDate(dateList[index]);
        setActiveStates((prevStates) => {
            const newStates = [...prevStates];
            newStates.fill(false);
            newStates[index] = true;
            return newStates;
        });
        form.setFieldsValue({ organizeDate: dateList[index] });
    };
    console.log(dateValue);
    // console.log(selectedTickets);
    // console.log(selectedTickets);
    // console.log(totalAmount / 25960);


    return (
        <div className="flex lg:flex-row flex-col gap-6 w-full mt-5 lg:justify-normal justify-center xl:px-20 lg:px-0 px-4 overflow-hidden">
            <img
                src={event?.imgEventInfo}
                className="xl:w-full lg:w-1/2 xl:h-4/5 h-full "
            />

            <div className="flex flex-col justify-center items-center">
                {/* Date Picker */}
                <Form.Item className="eventForm h-fit" name="organizeDate">
                    <div className="flex sm:flex-row flex-col justify-between items-center text-center gap-2">
                        <label className="font-semibold text-xl">Date & Time</label>
                        <div className="flex items-center bg-gray-100 p-2 rounded-md">
                            {/* <label className="flex items-center"> */}
                            <Input type="hidden" value={dateValue}></Input>
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
                <Form.Item hidden name="items">
                    <Input />
                </Form.Item>
                <Form.Item hidden name="totalPrice">
                    <Input />
                </Form.Item>
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
                                    <div
                                        className="flex justify-between items-center py-4 text-lg"
                                        key={index}
                                    >
                                        <div>
                                            <div className="font-semibold">{ticket.type}</div>
                                            <div className="text-gray-700">{ticket.price}</div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button onClick={() => decrement(index)} size="small">
                                                -
                                            </Button>
                                            <Input
                                                type="hidden"
                                            // value={quantity[index]}
                                            ></Input>
                                            <span className="w-6 text-center">{quantity[index]}</span>
                                            <Button onClick={() => increment(index)} size="small">
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        className="flex justify-between items-center py-4 text-lg"
                                        key={index}
                                    >
                                        <div>
                                            <div className="font-semibold">{ticket.type}</div>
                                            <div className="text-gray-700">{ticket.price}</div>
                                        </div>
                                        <span className="text-red-500 font-medium">Sold out</span>
                                    </div>
                                );
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
                            (Applicable when purchasing <strong>8-9-10 tickets</strong> in one
                            transaction).
                        </li>
                    </ul>
                </Form.Item>
                <div className="sticky bottom-0 xl:w-[660px] lg:w-[450px] w-[100vw] bg-white p-4 rounded-lg shadow-xl mt-5 border border-gray-300">
                    <div className="flex items-center gap-4">
                        <Button type="button" onClick={() => setIsShown(!isShown)}>
                            {!isShown ? (
                                <FaChevronDown className="text-2xl" />
                            ) : (
                                <FaChevronDown className="text-2xl rotate-180" />
                            )}
                        </Button>
                        <span className="font-bold sm:text-2xl text-xl text-black">
                            Selected ticket
                        </span>
                    </div>
                    {isTicketSelected && (
                        <div
                            className={`px-2 mt-0 ${selectedTickets.length > 5 ? "overflow-y-scroll " : ""
                                } transition-all duration-300 ease-in-out ${isShown
                                    ? "max-h-[500px] opacity-100"
                                    : "max-h-0 opacity-0 overflow-hidden"
                                }`}
                        >
                            <Button
                                type="button"
                                onClick={() => {
                                    setSelectedTickets([]);
                                    setIsTicketSelected(false);
                                    setQuantity(quantityArr);
                                }}
                                className="flex justify-end items-center w-full"
                            >
                                <p className="text-red-700 font-bold font-sans text-lg">
                                    Delete All
                                </p>
                            </Button>

                            {selectedTickets.map((ticket, index) => {
                                return (
                                    <div
                                        className="text-lg flex p-2 px-5 mt-2 rounded-lg shadow-sm border border-gray-300"
                                        key={index}
                                    >
                                        <div className="flex justify-between items-center w-[92%] px-2">
                                            <div className="flex items-center flex-col">
                                                <div className="text-[#667085]">Type</div>
                                                <div className="w-6 text-center font-sans font-semibold">
                                                    {ticket.type}
                                                </div>
                                            </div>
                                            <div className="flex items-center flex-col">
                                                <div className="text-[#667085]">Quantity</div>
                                                <span className="w-6 text-center font-sans font-semibold">
                                                    x{ticket.quantity}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="border-s-2 flex items-center">
                                            <Button
                                                type="button"
                                                onClick={() => decrement(ticket.index)}
                                            >
                                                <FaRegTrashCan className="text-2xl ms-5" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="flex justify-between items-center my-3">
                                <div className="text-[#667085] text-lg">Subtotal</div>
                                <span className="font-bold text-lg">
                                    {selectedTickets
                                        .reduce(
                                            (total, ticket) => total + ticket.price * ticket.quantity,
                                            0
                                        )
                                        .toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                </span>
                            </div>
                        </div>
                    )}

                    <ContinueBtn isButtonHovered={isButtonHovered} isStep1={true} disabled={!isButtonHovered} />
                </div>
            </div>
        </div>
    );
};

export default EventOrderOne;
