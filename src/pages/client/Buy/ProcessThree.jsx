import React from "react";
import { useSearchParams } from "react-router-dom";
import OrderHead from "../../../components/client/Order/OrderHead";

const ProcessThree = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const step = searchParams.get("step");

  return (
    <>
      <OrderHead />
      <div className="max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto">
        <h1>Payment</h1>
        <p>ID: {id}</p>
        <p>Step: {step}</p>
      </div>
    </>
  );
};

export default ProcessThree;
