import React, { useEffect, useState } from 'react';
import qrSample from "../../../../assets/qr-sample.png";
import { Image, Button, message } from 'antd';
import { useOrderContext } from '../../../../context/OrderContext';
import cakeLogo from "../../../../assets/cake-logo.png";
import { toast } from 'react-toastify';
import { FaRegCopy } from "react-icons/fa6";
import { FaCopy } from 'react-icons/fa';
import { createVNPayPayment } from '../../../../config/api';

const PaymentVnPay = () => {
    const { totalAmount } = useOrderContext();

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success("Copied!")
        }).catch(() => {
            toast.error("Failed to copy!");
        });
    };

    return (
        <div className='eventStep2Form xl:w-[45vw] w-full'>
            <p className='text-xl font-semibold px-6 py-4'>Account Information</p>
            <hr />
            <div className='flex md:flex-row flex-col justify-between p-6 items-center'>
                <Image src={qrSample} width={window.innerWidth >= 768 ? 500 : window.innerWidth > 540 ? 300 : 250} />
                <div className='px-2 w-full space-y-6'>
                    <div className='p-4 text-center text-base rounded-md border-1 border-gray-200 shadow-sm flex items-center flex-col'>
                        <p className='font-medium'>Total amount for payment</p>
                        <p className='text-3xl text-green-800 font-semibold my-2'>{totalAmount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                        })}</p>
                        <p className='text-gray-600'>You can scan the QR code or follow these steps to pay</p>
                    </div>
                    <div className='p-4 space-y-4 text-start text-base rounded-md border-1 border-gray-200 shadow-sm flex flex-col'>
                        <div className='space-y-2'>
                            <p className='text-gray-500'>Beneficiary bank</p>
                            <div className='flex justify-between items-center'>
                                <p className='font-medium'>Cake by VPBank</p>
                                <Image src={cakeLogo} width={30} preview={false} />
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <p className='text-gray-500'>Account number</p>
                            <div className='flex justify-between items-center'>
                                <p className='font-medium'>VCAK18495463324776</p>
                                <button
                                    className='bg-gray-200 p-2 rounded-md'
                                    onClick={() => handleCopy("VCAK18495463324776")}
                                >
                                    <FaRegCopy className='text-xl' />
                                </button>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <p className='text-gray-500'>Account name</p>
                            <div className='flex justify-between items-center'>
                                <p className='font-medium'>Nến Tầng CTicket</p>
                                <button
                                    className='bg-gray-200 p-2 rounded-md'
                                    onClick={() => handleCopy("Nến Tầng CTicket")}
                                >
                                    <FaRegCopy className='text-xl' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentVnPay;