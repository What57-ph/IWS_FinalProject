import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProcessOne from "./ProcessOne";
import ProcessTwo from "./ProcessTwo";
import ProcessThree from "./ProcessThree";
import { useOrderContext } from "../../../context/OrderContext";

const BuyPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const step = searchParams.get("step");
  const id = searchParams.get("id");

  useEffect(() => {
    if (id === null) {
      navigate("/404-error", { replace: true });
      return;
    }
    if (!step || !["1", "2", "3"].includes(step)) {
      navigate(`/buy?id=${id}&step=1`, { replace: true });
    }
  }, [step, id, navigate]);

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

  return getComponent();
};

export default BuyPage;
