import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useOrderContext } from '../../../../context/OrderContext';

const PaymentInfo = ({ form }) => {
    const { currentUser } = useAuth();
    const { setFullName, setEmail, setPhone, fullName, email, phone } = useOrderContext()
    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue({
                receiverName: currentUser.name,
                receiverEmail: currentUser.email,
                receiverPhone: currentUser.phone,
            });
            setFullName(currentUser?.name);
            setEmail(currentUser?.email);
            setPhone(currentUser?.phone);
        }
    }, [currentUser, form]);

    const handleInputChange = (changedValues, allValues) => {
        if (changedValues.receiverName) {
            setFullName(changedValues.receiverName);
        }
        if (changedValues.receiverEmail) {
            setEmail(changedValues.receiverEmail);
        }
        if (changedValues.receiverPhone) {
            setPhone(changedValues.receiverPhone);
        }
        console.log("All values:", allValues);
    };

    return (
        <Form
            form={form}
            onValuesChange={handleInputChange}
        >
            <div className="lg:w-[40vw] w-full eventStep2Form space-y-6">
                <h1 className="sm:text-xl text-lg font-semibold py-4 px-8 bg-gray-50">
                    Representative ticket recipient information
                </h1>
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
                            <Input placeholder="Please enter full name" className="w-full paymentInput p-4" defaultValue={fullName !== undefined ? fullName : currentUser?.name} />
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
                            <Input placeholder="Please enter email" className="w-full paymentInput p-4" defaultValue={email !== undefined ? email : currentUser?.email} />
                        </div>
                    </Form.Item>

                    <Form.Item
                        className="md:col-span-1 col-span-2 pb-2"
                        name="receiverPhone"
                        rules={[{ required: true, type: 'number', message: 'Please enter a valid phone number' }]}
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
                                <Input placeholder="Enter phone number" className="w-full paymentInput" defaultValue={phone !== null ? phone : currentUser?.phone} />
                            </div>
                        </div>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default PaymentInfo;