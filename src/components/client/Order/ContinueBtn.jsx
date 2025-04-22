import React from 'react';
import { useOrderContext } from '../../../context/OrderContext';
import { Button } from 'antd';

const ContinueBtn = ({ isButtonHovered, isStep1 }) => {
    const { setCurrentStep } = useOrderContext();

    return (

        <Button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            type="button"
            className={`${isStep1 ? "w-full hover:bg-pink-500" : ""} mt-2  hover:text-opacity-100 text-white text-opacity-90 font-semibold border-0 h-[48px] text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${isButtonHovered ? "bg-pink-500" : "bg-pink-200"
                }`}
        >
            Continue
        </Button>

    );
};

export default ContinueBtn;