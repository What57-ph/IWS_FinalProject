import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProcessOne from "./ProcessOne";
import ProcessTwo from "./ProcessTwo";
import ProcessThree from "./ProcessThree";
import { useOrderContext } from "../../../context/OrderContext";
import OrderHead from "../../../components/client/Order/OrderHead";
import EventOrderOne from "../../../components/client/Order/step1/EventOrderOne";
import { Form } from "antd";

const BuyPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const step = searchParams.get("step");
  const id = searchParams.get("id");
  const { event, setEventId, setCurrentStep, currentStep } =
    useOrderContext();
  const steps = [
    {
      title: "Select Tickets",
      content: "select-tickets",
    },
    {
      title: "Enter Information",
      content: "enter-info",
    },
    {
      title: "Payment",
      content: "payment",
    },
  ];
  useEffect(() => {
    setEventId(id);
  }, [id]);

  useEffect(() => {
    if (id === null) {
      navigate("/404-error", { replace: true });
      return;
    }
    // if (!step || !["1", "2", "3"].includes(step)) {
    //   navigate(`/buy?id=${id}&step=1`, { replace: true });
    // }
  }, [id, navigate]);

  const getComponent = () => {
    switch (step) {
      case "1":
        return <ProcessOne id={id} />;
      case "2":
        return <ProcessTwo id={id} />;
      case "3":
        return <ProcessThree id={id} />;
      default:
        return null;
    }
  };
  const renderStepComponent = () => {
    if (currentStep === 0) {
      return <ProcessOne id={id} />;
    }
    if (currentStep === 1) {
      return <ProcessTwo id={id} />;
    }
    if (currentStep === 2) {
      return <ProcessThree id={id} />;
    }
  }

  return (
    <>
      <OrderHead />
      <Form className="flex items-center" layout="inline">

        {renderStepComponent()}
      </Form>
    </>
  )
};

export default BuyPage;
