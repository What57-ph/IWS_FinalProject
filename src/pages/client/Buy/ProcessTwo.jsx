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
  const [fullName, setFullName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  // const step = searchParams.get("step");
  const { event, setEventId, setCurrentStep, currentStep } = useOrderContext();
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
          <OrderInfo fullName={fullName} email={email} phone={phone} />
        </div>
        <div>
          <PaymentInfo form={form} setFullName={setFullName} setEmail={setEmail} setPhone={setPhone} />
        </div>
      </div>
      <BottomBtn />


    </div>
  );
};

export default ProcessTwo;