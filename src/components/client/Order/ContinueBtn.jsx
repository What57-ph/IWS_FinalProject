import React, { useState } from 'react';
import { useOrderContext } from '../../../context/OrderContext';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { createVNPayPayment, fetchPayPalURL } from '../../../config/api';

const ContinueBtn = ({ isButtonHovered, isStep1, form, disabled }) => {
    const { setCurrentStep, selectedMethod, totalAmount } = useOrderContext();
    const [payPalInfo, setPayPalInfo] = useState();
    console.log(disabled)
    const handleClickForPay = async () => {
        if (selectedMethod === "bank-transfer") {
            setCurrentStep((prev) => prev + 1);
        } else {
            try {
                form.submit();
                const res = await fetchPayPalURL(totalAmount / 25960);
                const url = res?.data?.url;
                if (url) {
                    setPayPalInfo(res.data);
                    window.location.href = url;
                    console.log(url);
                } else {
                    toast.error("Failed to get PayPal URL.");
                }



            } catch (error) {
                toast.error("Payment initialization failed.");
                console.error("PayPal fetch error:", error);
            }
        }
    };

    return (
        <Button
            onClick={handleClickForPay}
            disabled={disabled}
            type="button"
            className={`${isStep1 ? "w-full" : ""} mt-2  hover:text-opacity-100 text-white text-opacity-90 font-semibold border-0 h-[48px] text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${isButtonHovered ? "bg-pink-500 hover:bg-pink-900" : "bg-pink-200"
                }`}
        >
            Continue
        </Button>
    );
};

export default ContinueBtn;
