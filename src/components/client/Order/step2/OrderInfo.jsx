import React, { useState } from 'react';
import { useOrderContext } from '../../../../context/OrderContext';
import { Button, Divider, Image } from 'antd';
import { FaCalendar, FaCalendarAlt, FaChevronCircleDown, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoLocationOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../context/AuthContext';
const OrderInfo = () => {
    const { event, order, selectedTickets, fullName, email, phone } = useOrderContext();
    const { currentUser } = useAuth();
    const { t } = useTranslation();
    const [isShownInfo, setIsShownInfo] = useState(true);
    const [isShownType, setIsShownType] = useState(true);
    const [isShownPayment, setIsShownPayment] = useState(true);
    const formattedDate = new Date(event?.startDate).toLocaleString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    const eventDate = new Date(event?.startDate);
    const eventDatePlus3Hours = new Date(eventDate);
    eventDatePlus3Hours.setHours(eventDatePlus3Hours.getHours() + 3);
    const formattedHour = (date) => {
        return date.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };
    const location =
        event?.houseNumber +
        ", " +
        event?.ward +
        ", " +
        event?.district +
        ", " +
        event?.province;
    return (
        <div className='flex flex-col'>
            <div className='eventStep2Form p-6 space-y-8'>
                <Image src={event?.banner} className='rounded-lg'></Image>
                <div className='space-y-5'>
                    <p className='text-black font-bold font-sans sm:text-2xl text-xl'>{event?.name}</p>
                    <div className='flex items-start gap-2'>
                        <FaCalendarAlt className='sm:text-2xl text-xl mt-1' />
                        <div className='sm:text-lg text-base'>
                            <p className='font-semibold'>{formattedDate}</p>
                            <p className='text-gray-500 text-base'>{formattedHour(eventDate)} - {formattedHour(eventDatePlus3Hours)}</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-1'>
                        <IoLocationOutline className='text-4xl mt-1' />
                        <div className='sm:text-lg text-base'>
                            <p className='font-semibold'>{location}</p>
                            <p className='text-gray-500 text-base'>{location}</p>
                        </div>
                    </div>
                </div>
                <Divider />
                <div>
                    <div className='flex w-full justify-between items-center'>
                        <p className='sm:text-[19px] text-lg font-medium'>Ticket Delivery Information</p>
                        <Button type='button' onClick={() => setIsShownInfo(!isShownInfo)}>
                            {isShownInfo ? (<FaChevronUp className='text-2xl' />) : (<FaChevronDown className='text-2xl' />)}
                        </Button>
                    </div>
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isShownInfo ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className='border border-gray-300 mt-4 p-4 rounded-lg shadow-sm'>
                            <p className='font-semibold sm:text-lg text-base text-gray-800'>Customer Information</p>
                            <ul className="space-y-2 text-gray-700 mt-2 sm:text-base text-sm">
                                <li className="flex items-center">
                                    <span className="font-medium w-20">Name:</span>
                                    <span className="text-gray-900">{fullName}</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="font-medium w-20">Email:</span>
                                    <span className="text-gray-900">{email}</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="font-medium w-20">Phone:</span>
                                    <span className="text-gray-900">{phone}</span>
                                </li>
                            </ul>
                        </div>
                        <div className='border border-gray-300 mt-4 p-4 rounded-lg shadow-sm sm:text-lg text-base'>
                            <p className='font-semibold text-gray-800'>Receive online tickets via email and/or physical tickets at event</p>
                            <p className='text-base'>Online tickets will be sent to email of the claimant and/or physical tickets will be delivered at the event (if any)</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex w-full justify-between items-center'>
                        <p className='sm:text-[19px] text-lg font-medium'>Ticket Type Information</p>
                        <Button type='button' onClick={() => setIsShownType(!isShownType)}>
                            {isShownType ? (<FaChevronUp className='text-2xl' />) : (<FaChevronDown className='text-2xl' />)}
                        </Button>
                    </div>
                    <div
                        className={`${selectedTickets.length > 4 ? "overflow-y-scroll" : ""} transition-all duration-300 ease-in-out overflow-hidden ${isShownType ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        {selectedTickets.map((ticket, index) => (
                            <div key={index} className={`sm:text-lg text-base grid grid-cols-6 border border-gray-300 mt-4 px-4 py-2 rounded-lg shadow-sm`}>
                                <div className='flex flex-col justify-center items-start md:col-span-4 col-span-2'>
                                    <span className='text-gray-500 font-normal'>Type</span>
                                    <span className='font-semibold'>{ticket?.type}</span>
                                </div>
                                <div className='flex flex-col justify-center items-center md:col-span-1 col-span-2'>
                                    <span className='text-gray-500 font-normal'>Quantity</span>
                                    <span className='font-semibold'>x{ticket?.quantity}</span>
                                </div>
                                <div className='flex flex-col items-end md:col-span-1 col-span-2'>
                                    <span className='text-gray-500 font-normal'>Price</span>
                                    <span className='font-semibold'>{ticket?.price.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "VND",
                                    })}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='eventStep2Form'>
                <div className='flex justify-between items-center w-ful p-6 pb-4'>
                    <p className='font-semibold sm:text-[19px] text-lg'>Payment Information</p>
                    <div className='flex items-center'>
                        <p className='text-red-600 font-semibold sm:text-[22px] text-lg'>
                            {selectedTickets.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0).toLocaleString("en-US", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                        <Button type='button' onClick={() => setIsShownPayment(!isShownPayment)}>
                            {isShownPayment ? (<FaChevronUp className='text-2xl' />) : (<FaChevronDown className='text-2xl' />)}
                        </Button>
                    </div>
                </div>
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isShownPayment ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className='border-1 border-gray-100 bg-gray-200'></div>
                    <div className='flex w-full justify-between text-lg p-6 pt-2'>
                        <p className='text-gray-500'>Subtotal</p>
                        <p className=''>
                            {selectedTickets.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0).toLocaleString("en-US", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;