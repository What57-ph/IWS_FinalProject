import { Button } from 'antd';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PaymentInstruction = ({ isMBanking, setIsMBanking }) => {
    const [isShown, setIsShown] = useState(true);

    return (
        <div className='eventStep2Form xl:w-[45vw] w-full overflow-hidden'>
            <div className='flex justify-between items-center p-6'>
                <p className='font-semibold text-xl'>Payment Instructions</p>
                {isShown ? (
                    <Button type='button' onClick={() => setIsShown(!isShown)}>
                        <FaChevronUp className='text-2xl' />
                    </Button>
                ) : (
                    <Button type='button' onClick={() => setIsShown(!isShown)}>
                        <FaChevronDown className='text-2xl' />
                    </Button>
                )}
            </div>
            <hr />
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isShown ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className='px-6 flex'>
                    <button
                        onClick={() => setIsMBanking(!isMBanking)}
                        type='button'
                        className={`w-44 h-10 text-base flex items-center justify-center border-b-2 border-t-0 border-x-0 ${isMBanking
                            ? "text-sky-600 border-sky-600"
                            : "border-gray-900 text-gray-500"
                            }`}
                    >
                        VNPay Banking
                    </button>
                    <button
                        onClick={() => setIsMBanking(!isMBanking)}
                        type='button'
                        className={`w-44 h-10 text-base flex items-center justify-center border-b-2 border-t-0 border-x-0 ${!isMBanking
                            ? "text-sky-600 border-sky-600"
                            : "border-gray-900 text-gray-500"
                            }`}
                    >
                        PayPal Banking
                    </button>
                </div>

                {isMBanking ? (
                    <ul className="list-decimal list-inside space-y-2 text-base text-gray-700 px-6 py-4">
                        <li>Select <strong>VNPay</strong> as your payment method.</li>
                        <li>Review your order details.</li>
                        <li>You’ll be redirected to the secure VNPay payment page.</li>
                        <li>Choose your preferred payment method.</li>
                        <li>Fill in card/account details or scan the QR code using your banking app.</li>
                        <li>Enter OTP (One-Time Password) or use your banking app to confirm.</li>
                    </ul>
                ) : (
                    <ul className="list-decimal list-inside space-y-2 text-base text-gray-700 px-6 py-4">
                        <li>Choose <strong>PayPal</strong> as your payment method at checkout.</li>
                        <li>You’ll be redirected to PayPal. Log in to your account.</li>
                        <li>Select your preferred payment method (e.g., balance, bank, card).</li>
                        <li>Review and confirm your payment.</li>
                        <li>You’ll be redirected back to the store with a confirmation message.</li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PaymentInstruction;