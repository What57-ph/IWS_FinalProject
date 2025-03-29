import React from "react";
import { useSearchParams } from "react-router-dom";

const ProcessThree = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const step = searchParams.get("step");

  return (
    <div>
      <h1>Proceed to Payment</h1>
      <p>ID: {id}</p>
      <p>Step: {step}</p>
    </div>
  );
};

export default ProcessThree;
