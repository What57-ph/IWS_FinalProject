import { LeftOutlined, RightOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Steps,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import HandleTicketType from "./handleTicketType";
import HandleBasicInfo from "./handleBasicInfo";
import { createNewEvent } from "../../../config/api";

const { Step } = Steps;

const steps = [
  {
    title: "Event information",
    content: "basic-info",
  },
  {
    title: "Ticket type",
    content: "ticket-type",
  },
];

const EventModal = ({
  openModal,
  setOpenModal,
  handleSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [squareLogoFile, setSquareLogoFile] = useState([]);
  const [bannerFile, setBannerFile] = useState([]);
  const [organizerLogoFile, setOrganizerLogoFile] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (openModal) {
      form.resetFields();
      setSquareLogoFile([]);
      setBannerFile([]);
      setOrganizerLogoFile([]);
      setCurrentStep(0);

      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [openModal, initialValues]);
  const nextStep = async () => {
    try {
      // Validate fields trước khi chuyển step
      const fields = await form.validateFields(
        getStepFields(steps[currentStep].content)
      );
      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getStepFields = (stepContent) => {
    switch (stepContent) {
      case "basic-info":
        return [
          "name",
          "category",
          "startDate",
          "province",
          "district",
          "ward",
          "houseNumber",
        ];
      case "ticket-type":
        return ["tickets"];
      default:
        return [];
    }
  };

  const onFinish = (values) => {
    const basicInfoValues = form.getFieldsValue([
      "id",
      "name",
      "category",
      "startDate",
      "endDate",
      "province",
      "district",
      "ward",
      "houseNumber",
      "organizerName",
      "organizerInfo",
      "tickets",
    ]);
    console.log("Basic info values:", basicInfoValues);

    const formData = {
      ...basicInfoValues,
      // organizerName: values.organizerName,
      // organizerInfo: values.organizerInfo,
      imgEventInfo: squareLogoFile[0]?.url,
      banner: bannerFile[0]?.url,
      logo: organizerLogoFile[0]?.url,
      // tickets: values.tickets || [],
    };

    console.log("Form submitted with:", formData);
    handleSubmit(formData, formData.id);
    setOpenModal(false);
  };

  const renderStepContent = () => {
    switch (steps[currentStep].content) {
      case "basic-info":
        return (
          <HandleBasicInfo
            form={form}
            onFinish={onFinish}
            squareLogoFile={squareLogoFile}
            setSquareLogoFile={setSquareLogoFile}
            bannerFile={bannerFile}
            setBannerFile={setBannerFile}
            organizerLogoFile={organizerLogoFile}
            setOrganizerLogoFile={setOrganizerLogoFile}
          />
        );

      case "ticket-type":
        return <HandleTicketType form={form} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      title={form.getFieldValue("id") ? "Edit event" : "Add event"}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      onOk={() =>
        currentStep === steps.length - 1 ? form.submit() : nextStep()
      }
      width={1000}
      footer={[
        currentStep > 0 && (
          <Button key="back" onClick={prevStep} icon={<LeftOutlined />}>
            Previous
          </Button>
        ),
        <Button
          key="next"
          type="primary"
          onClick={() =>
            currentStep === steps.length - 1 ? form.submit() : nextStep()
          }
          icon={currentStep === steps.length - 1 ? null : <RightOutlined />}
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>,
      ]}
      styles={{
        body: {
          maxHeight: "60vh",
          overflowY: "auto",
          padding: "16px",
        },
      }}
    >
      <Steps current={currentStep} responsive className="mb-6">
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="font-bold"
      >
        {renderStepContent()}
      </Form>
    </Modal>
  );
};

export default EventModal;
