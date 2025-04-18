import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import OrderHead from "../../../components/client/Order/OrderHead";
import { useOrderContext } from "../../../context/OrderContext";

const ProcessTwo = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const step = searchParams.get("step");
  const { event, setEvent, order, setOrder, eventId, setEventId } =
    useOrderContext();
  useEffect(() => {
    setEventId(id);
  }, [id]);
  const antStep = document.querySelectorAll(".ant-steps-item");
  antStep.forEach((item, index) => {
    item.className += " px-2 ms-4 ";
  });
  return (
    <>
      <OrderHead />
      <div className="max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto">
        <h1>Enter Information</h1>
        <p>ID: {id}</p>
        <p>Step: {step}</p>
      </div>
    </>
  );
};

export default ProcessTwo;
