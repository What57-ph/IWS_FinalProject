import { useSearchParams } from "react-router-dom";
import OrderStep from "../../../components/client/Order/OrderStep";
import OrderHead from "../../../components/client/Order/OrderHead";
import { useEffect } from "react";
import { useOrderContext } from "../../../context/OrderContext";
import EventOrderOne from "../../../components/client/Order/step1/EventOrderOne";

const ProcessOne = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const step = searchParams.get("step");
  const { event, setEvent, order, setOrder, eventId, setEventId } =
    useOrderContext();
  useEffect(() => {
    setEventId(id);
  }, [id]);

  return (
    <>
      <OrderHead

        id={id}
      />
      <div className="max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto">
        <EventOrderOne />
      </div>
    </>
  );
};

export default ProcessOne;
