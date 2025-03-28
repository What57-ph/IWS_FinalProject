import React from "react";
import { useSearchParams } from "react-router-dom";

const ProcessTwo = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const step = searchParams.get("step");

  return (
    <div>
      <h1>Enter ticket receiver info</h1>
      <p>ID: {id}</p>
      <p>Step: {step}</p>
    </div>
  );
};

export default ProcessTwo;
