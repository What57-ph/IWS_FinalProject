import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleAfterPayment } from "../../../config/api";
import { useOrderContext } from "../../../context/OrderContext";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { order, setOrder } = useOrderContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderInfo = queryParams.get("vnp_OrderInfo") || null;
    const responseCode = queryParams.get("vnp_ResponseCode") || null;
    const paymentId = queryParams.get("paymentId") || null;
    useEffect(() => {
        if (!order) {
            const savedOrder = localStorage.getItem("order");
            if (savedOrder) {
                const parsedOrder = JSON.parse(savedOrder);
                setOrder(parsedOrder);
            }
        }
    }, [order, setOrder]);
    useEffect(() => {
        if (responseCode !== "00" && !paymentId) {
            navigate("/payment/failed");
        }
    }, [])
    useEffect(() => {
        const processAfterPay = async () => {
            if (order?.orderId) {
                await handleAfterPayment(order.orderId);
            }
        };
        processAfterPay();
    }, [order]);

    // Custom checkmark SVG
    const CheckmarkIcon = () => (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
    );
    return (
        <div className="mt-8 flex items-center justify-center p-4 font-sans">
            {responseCode === "00" || paymentId && (
                <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                                <CheckmarkIcon />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                            <p className="text-gray-600 mb-6">Thank you for your purchase. Your transaction has been completed.</p>

                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <h2 className="text-lg font-medium text-gray-800 mb-3">Payment Details</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Amount:</span>
                                        <span className="font-medium">{order?.totalPrice} VND</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Payment Info:</span>
                                        <span className="font-medium">Pay for event tickets</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Date:</span>
                                        <span className="font-medium">{new Date().toUTCString().split(' ').slice(0, 4).join(' ')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className="text-green-600 font-medium">Completed</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;