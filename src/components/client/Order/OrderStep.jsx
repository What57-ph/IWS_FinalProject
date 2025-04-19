import { Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useOrderContext } from "../../../context/OrderContext";

const OrderStep = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = useOrderContext();
  const id = searchParams.get("id");
  const location = useLocation();
  const [status, setStatus] = useState({
    status1: "process",
    status2: "wait",
    status3: "wait",
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const title = ["Select Tickets", "Enter Information", "Payment"];
  const handlePreviousBtn = () => {
    if (currentStep <= 0) {
      navigate(-1);
    }
    setCurrentStep((prev) => prev - 1);
  }
  useEffect(() => {

    setStatus(
      currentStep === 0
        ? { status1: "process", status2: "wait", status3: "wait" }
        : currentStep === 1
          ? { status1: "finish", status2: "process", status3: "wait" }
          : { status1: "finish", status2: "finish", status3: "process" }
    );
  }, [currentStep]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onChange = (value) => {
    setCurrentStep(value);
  };

  const renderStepOrder = () => {
    return screenWidth > 1024 ? (
      <Steps
        type="navigation"
        current={currentStep}
        onChange={onChange}
        className="w-[720px] ms-4"
        items={[
          { status: status.status1, title: "Select Tickets" },
          { status: status.status2, title: "Enter Information" },
          { status: status.status3, title: "Payment" },
        ]}
      />
    ) : (
      <div>
        <p>{title[currentStep]}</p>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-evenly">
      <button
        className="p-2 rounded-full border border-gray-200 bg-opacity-90 backdrop-blur-sm"
        onClick={handlePreviousBtn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          ></path>
        </svg>
      </button>
      {renderStepOrder()}
    </div >
  );
};

export default OrderStep;