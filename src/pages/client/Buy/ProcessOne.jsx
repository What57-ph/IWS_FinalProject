import { useSearchParams } from "react-router-dom";

const ProcessOne = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const step = searchParams.get("step");

  return (
    <div>
      <h1>Select ticket</h1>
      <p>ID: {id}</p>
      <p>Step: {step}</p>
    </div>
  );
};

export default ProcessOne;
