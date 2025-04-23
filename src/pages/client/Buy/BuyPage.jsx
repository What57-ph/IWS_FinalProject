import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProcessOne from "./ProcessOne";
import ProcessTwo from "./ProcessTwo";
import ProcessThree from "./ProcessThree";
import { useOrderContext } from "../../../context/OrderContext";
import OrderHead from "../../../components/client/Order/OrderHead";
import { Form, Input } from "antd";
import PaymentPage from "./PaymentPage";
import { toast } from "react-toastify";
import { callCreateOrder } from "../../../config/api";

const BuyPage = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { setEventId, setOrder, currentStep } = useOrderContext();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    setEventId(id);
  }, [id]);


  useEffect(() => {
    if (id === null) {
      navigate("/404-error", { replace: true });
      return;
    }
  }, [id, navigate]);

  const renderStepComponent = () => {
    if (currentStep === 0) {
      return <ProcessOne id={id} form={form} />;
    }
    if (currentStep === 1) {
      return <ProcessTwo id={id} form={form} />;
    }
    if (currentStep === 2) {
      return <ProcessThree id={id} form={form} />;
    }
    if (currentStep >= 3) {
      return <PaymentPage id={id} form={form} />;
    }
  };

  const onFinish = async (values) => {
    const basicInfoValues = form.getFieldsValue([
      "totalPrice",
      "organizeDate",
      "receiverName",
      "receiverEmail",
      "receiverPhone",
      "items",
    ]);
    const createTemporaryOrder = async (tempOrder) => {
      try {
        const res = await callCreateOrder(tempOrder);
        setOrder(res.data);
      } catch (error) {
        toast.error(error);
      }
    }

    createTemporaryOrder(basicInfoValues);
    console.log("Basic info values:", basicInfoValues);
  };

  return (
    <>
      <OrderHead currentStep={currentStep} />
      <Form form={form} onFinish={onFinish} className="flex items-center" layout="inline">

        {renderStepComponent()}
      </Form>
    </>
  );
};

export default BuyPage;