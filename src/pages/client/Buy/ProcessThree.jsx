import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrderHead from "../../../components/client/Order/OrderHead";
import { useOrderContext } from "../../../context/OrderContext";
import PaymentMethod from "../../../components/client/Order/step3/PaymentMethod";
import OrderInfo from "../../../components/client/Order/step2/OrderInfo";
import BottomBtn from "../../../components/client/Order/BottomBtn";

const ProcessThree = ({ form }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
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
      <div className="flex flex-col items-center">
        <div className="flex lg:flex-row flex-col gap-6 w-full mt-5 lg:justify-normal justify-center xl:px-20 lg:px-0 px-4">
          <div>
            <OrderInfo />
          </div>
          <div>
            <PaymentMethod form={form} />
          </div>
        </div>
        <BottomBtn form={form} />
      </div>
    </>
  );
};

export default ProcessThree;
