import React, { useEffect, useState } from "react";
import Step from "../../components/auth/Step";
import PasswordForm from "../../components/auth/PasswordForm";
import { Form } from "antd";
import { Link } from "react-router-dom";
import AuthButton from "../../components/auth/AuthButton";

const ForgotPageTwo = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    if (formValues.confirmPassword && formValues.password) {
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
    if (values.password !== values.confirmPassword) {
      console.error("Passwords do not match!");
    } else {
      console.log("Register Info:", values);
    }
  };
  return (
    <>
      <Step />
      <Form className="w-full text-start" onFinish={onFinish}>
        <PasswordForm
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

export default ForgotPageTwo;
