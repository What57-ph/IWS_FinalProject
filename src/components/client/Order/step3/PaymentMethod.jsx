import React, { useState } from 'react';
import { BsBank } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { useOrderContext } from '../../../../context/OrderContext';

const PaymentMethod = ({ form }) => {
    // const [selectedMethod, setSelectedMethod] = useState("bank-transfer");
    const { selectedMethod, setSelectedMethod } = useOrderContext();
    return (
        <div className='eventStep2Form lg:w-[40vw] w-full space-y-3 pb-6'>
            <p className='text-[1.4rem] font-semibold px-8 pt-4'>Select payment method</p>
            <hr />
            <div
                className={`flex justify-between items-center mx-3 px-6 rounded-lg py-4 ${selectedMethod === "bank-transfer" ? "border-2 border-blue-700 bg-blue-50" : "border border-gray-300 bg-white"
                    }`}
            >
                <div className='flex items-center gap-6'>
                    <BsBank className='text-3xl text-blue-600 bg-white' />
                    <div className='text-lg'>
                        <p className='font-semibold'>Bank Transfer</p>
                        <p className='text-gray-500 sm:text-base text-sm'>Scan code instantly, confirm order immediately</p>
                    </div>
                </div>
                <input
                    id="bank-transfer"
                    name="deliveryMethod"
                    type="radio"
                    className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectedMethod === "bank-transfer"}
                    onChange={() => setSelectedMethod("bank-transfer")}
                />
            </div>

            <div
                className={`flex justify-between items-center mx-3 px-6 rounded-lg py-4 ${selectedMethod === "credit-card" ? "border-2 border-blue-700 bg-blue-50" : "border border-gray-300 bg-white"
                    }`}
            >
                <div className='flex items-center gap-6'>
                    <FaCreditCard className='text-3xl text-blue-600 bg-white' />
                    <div className='text-lg'>
                        <p className='font-semibold'>Debit/Credit card</p>
                        <p className='text-gray-500 sm:text-base text-sm'>Fill in additional information, smart security</p>
                    </div>
                </div>
                <input
                    id="credit-card"
                    name="deliveryMethod"
                    type="radio"
                    className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectedMethod === "credit-card"}
                    onChange={() => setSelectedMethod("credit-card")}
                />
            </div>
        </div>
    );
};

export default PaymentMethod;