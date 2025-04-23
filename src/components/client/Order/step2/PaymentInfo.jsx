import { Divider, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';

const PaymentInfo = ({ form }) => {
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue({
                receiverName: currentUser.name,
                receiverEmail: currentUser.email,
                receiverPhone: currentUser.phone,
            });
        }
    }, [currentUser, form]);

    return (
        <>
            <div className="lg:w-[40vw] w-full eventStep2Form space-y-6">
                <h1 className="sm:text-xl text-lg font-semibold py-4 px-8 bg-gray-50">Representative ticket recipient information</h1>
                <div className="space-y-4 grid grid-cols-2 px-8 pb-8">
                    <Form.Item
                        className="col-span-2"
                        name="receiverName"
                        rules={[{ required: true, message: 'Please enter full name' }]}
                    >
                        <div>
                            <label className="block text-base mb-1">
                                Full Name <span className="text-red-500">(*)</span>
                            </label>
                            <Input placeholder="Please enter full name" className="w-full paymentInput p-4" value={currentUser?.name} />
                        </div>
                    </Form.Item>

                    <Form.Item
                        className="md:col-span-1 col-span-2"
                        name="receiverEmail"
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                    >
                        <div>
                            <label className="block text-base mb-1">
                                Email <span className="text-red-500">(*)</span>
                            </label>
                            <Input placeholder="Please enter email" className="w-full paymentInput p-4" value={currentUser?.email} />
                        </div>
                    </Form.Item>

                    <Form.Item
                        className="md:col-span-1 col-span-2 pb-2"
                        name="receiverPhone"
                        rules={[{ required: true, message: 'Please enter phone number' }]}
                    >
                        <div>
                            <label className="block text-base mb-1">
                                Phone Number <span className="text-red-500">(*)</span>
                            </label>
                            <div className="flex gap-2 h-[44px] bg-gray-100 text-base relative rounded-lg border-0 hover:bg-gray-100 focus:ring-2 focus:outline-none">
                                <select
                                    defaultValue="+84"
                                    className="w-fit h-full bg-gray-100 focus:bg-gray-100 focus:ring-2 cursor-pointer rounded-md px-2"
                                >
                                    <option value="+84">+84</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                </select>
                                <div className="border-r border-gray-300 my-2 text-gray-700" />
                                <Input placeholder="Enter phone number" className="w-full paymentInput" value={currentUser?.phone} />
                            </div>
                        </div>
                    </Form.Item>
                </div>
            </div>

            <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm eventStep2Form">
                <h2 className="sm:text-xl text-lg font-semibold mb-4 text-gray-800">Ticket Delivery Method</h2>
                <div className="bg-gray-100 p-4 border-2 border-blue-500 rounded-lg">
                    <label className="text-gray-700 flex justify-between items-center">
                        <span className="font-bold sm:text-base text-sm">
                            Receive online tickets via email and/or physical tickets at event
                        </span>
                        <input
                            id="online-tickets"
                            name="delivery-method"
                            type="radio"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            defaultChecked
                        />
                    </label>
                    <p className="mt-4 text-base text-gray-500">
                        Online tickets will be sent to email of the claimant and/or physical tickets will be delivered at the event (if any)
                    </p>
                </div>
            </div>
        </>
    );
};

export default PaymentInfo;
