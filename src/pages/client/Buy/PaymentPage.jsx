import React, { useEffect, useState } from 'react';
import PaymentVnPay from '../../../components/client/Order/payment/PaymentVnPay';
import PaymentInstruction from '../../../components/client/Order/payment/PaymentInstruction';
import OrderInfo from '../../../components/client/Order/step2/OrderInfo';
import { Button, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../../../context/OrderContext';
import { callCreateOrder, createVNPayPayment } from '../../../config/api';
import { toast } from 'react-toastify';

const PaymentPage = ({ form }) => {
    const { totalAmount } = useOrderContext();
    const [isMBanking, setIsMBanking] = useState(true);
    const [paymentData, setPaymentData] = useState();

    useEffect(() => {
        const fetchPaymentURL = async (totalAmount) => {
            const data = await createVNPayPayment(totalAmount);
            setPaymentData(data);
        };

        fetchPaymentURL(BigInt(totalAmount));
    }, []);
    const handlePaymentClick = (url) => {
        form.submit();
        if (url) {
            window.location.href = url;
        } else {
            toast.error("It occurs an error when payment!");
        }
    }

    return (
        <>
            <div className="flex flex-col items-center overflow-hidden">
                <div className="flex xl:flex-row flex-col gap-6 w-full mt-5 lg:justify-normal justify-center xl:px-20 lg:px-10 px-4">
                    <div>
                        <OrderInfo />
                    </div>
                    <div>
                        <Form.Item hidden name="totalPrice"><Input /></Form.Item>
                        <PaymentVnPay />
                        <PaymentInstruction isMBanking={isMBanking} setIsMBanking={setIsMBanking} />
                        <Button
                            type="primary"

                            onClick={() => handlePaymentClick(paymentData?.url)}
                            className='mt-6 p-6 w-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-xl font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out hover:from-red-500 hover:to-pink-500 hover:shadow-lg hover:scale-105'
                        >
                            Proceed Payment
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;