import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrderHead from "../../../components/client/Order/OrderHead";
import { useOrderContext } from "../../../context/OrderContext";
import OrderInfo from "../../../components/client/Order/step2/OrderInfo";
import PaymentInfo from "../../../components/client/Order/step2/PaymentInfo";
import { Button, Modal } from "antd";
import ContinueBtn from "../../../components/client/Order/ContinueBtn";
import BottomBtn from "../../../components/client/Order/BottomBtn";
import { useAuth } from "../../../context/AuthContext";

const ProcessTwo = ({ form }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { currentUser } = useAuth();

  const { event, setEventId, fullName, setFullName, email, setEmail, phone, setPhone } = useOrderContext();

  useEffect(() => {
    setEventId(id);
  }, [id]);

  const antStep = document.querySelectorAll(".ant-steps-item");
  antStep.forEach((item, index) => {
    item.className += " px-2 ms-4 ";
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex lg:flex-row flex-col gap-6 w-full mt-5  justify-center xl:px-20 px-4">
        <div>
          <OrderInfo />
        </div>
        <div>
          <PaymentInfo form={form} />
        </div>
      </div>
      <BottomBtn />


    </div>
  );
};

export default ProcessTwo;