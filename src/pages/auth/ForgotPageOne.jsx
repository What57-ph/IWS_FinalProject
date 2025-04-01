import { Form, Input, Steps } from "antd";
import React, { useEffect, useState } from "react";
import Step from "../../components/auth/Step";

import AuthButton from "../../components/auth/AuthButton";
import { Link } from "react-router-dom";
import VerifyForm from "../../components/auth/VerifyForm";

const ForgotPageOne = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    verifyCode: "",
    confirmPassword: "",
  });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (formValues.email && formValues.verifyCode) {
      setIsButtonHovered(true);
    } else {
      setIsButtonHovered(false);
    }
  }, [formValues]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      <Step />
      <Form className="w-full text-start" onFinish={onFinish}>
        <VerifyForm
          validateEmail={validateEmail}
          handleInputChange={handleInputChange}
          formValues={formValues}
          setFormValues={setFormValues}
        />
        <AuthButton isButtonHovered={isButtonHovered} />
      </Form>
      <Link to="/auth/login" className="mt-5 text-blue-600 hover:text-blue-400">
        Back to login
      </Link>
    </>
  );
};

export default ForgotPageOne;
