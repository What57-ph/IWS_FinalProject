import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import ContinueBtn from './ContinueBtn';
import { useOrderContext } from '../../../context/OrderContext';

const BottomBtn = () => {
    const { setCurrentStep, currentStep } = useOrderContext();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        handleClickPrevStep(); // Go back to the previous step
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleClickPrevStep = () => {
        if (currentStep <= 0) {
            return;
        }
        setCurrentStep((prev) => prev - 1);
    };
    return (
        <>
            <div className="sticky bottom-0 text-lg max-lg:hidden p-4 flex flex-row justify-between items-center shadow-sm rounded-md border-2 w-[95vw] mt-4 bg-[#fdfdfd] ">
                <p className="text-gray-500 md:block hidden">You need to fill in all information before proceeding to the next step</p>
                <div className="flex items-center md:w-auto w-full md:justify-normal justify-center gap-4">
                    <Button
                        type="button"
                        className="text-lg bg-gray-500 p-6 mt-2 hover:text-opacity-100 text-white text-opacity-90 font-semibold border-0 h-[48px] rounded-lg focus:outline-none focus:ring-2 hover:bg-gray-800"
                        onClick={showModal}
                    >
                        Select the ticket again
                    </Button>
                    <ContinueBtn isButtonHovered={true} isStep1={false} className="hover:bg-blue-950" />
                </div>

            </div>
            {/* Modal for confirmation */}
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={[
                    <div key="footer" className="flex gap-4">
                        <Button
                            key="cancel"
                            onClick={handleCancel}
                            className="flex-1 border border-gray-300 bg-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 h-10 font-medium"
                        >
                            Cancel
                        </Button>,
                        <Button
                            key="ok"
                            onClick={handleOk}
                            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white h-10 font-medium"
                        >
                            Continue
                        </Button>
                    </div>
                ]}
                closable={false}
            >
                <div className="">
                    <p className="font-bold text-xl text-gray-800">Select the ticket again</p>
                    <p className="text-gray-600 text-base">
                        Are you sure you want to select ticket again? You may not be able to reselect your favorite tickets if they run out.
                    </p>
                </div>
            </Modal>
        </>

    );
};

export default BottomBtn;