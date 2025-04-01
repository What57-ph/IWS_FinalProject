import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import AuthButton from "../../components/auth/AuthButton";
import PasswordForm from "../../components/auth/PasswordForm";
import VerifyForm from "../../components/auth/VerifyForm";

const RegisterPage = () => {
  const [checked, setChecked] = useState(true);
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
    if (formValues.email && formValues.password) {
      setIsButtonHovered(true);
    } else {
      setIsButtonHovered(false);
    }
  }, [formValues]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };
  const onChange = (e) => {
    setChecked(e.target.checked);
  };
  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      console.error("Passwords do not match!");
    } else {
      console.log("Register Info:", values);
    }
  };

  return (
    <Form className="w-full text-start" onFinish={onFinish}>
      <h4 className="font-semibold text-start">Email Verification</h4>
      <VerifyForm
        validateEmail={validateEmail}
        handleInputChange={handleInputChange}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <p className="text-gray-500 align-text-bottom text-start pb-5 text-base">
        Enter email address and click “Send code”, then check the inbox and
        follow instructions.
      </p>
      <h4 className="font-semibold text-start">Set password</h4>
      <PasswordForm
        validateEmail={validateEmail}
        handleInputChange={handleInputChange}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <div className="flex flex-row justify-between px-1">
        <p style={{ marginBottom: "20px" }}>
          <Checkbox checked={checked} onChange={onChange}>
            I agree to CTicket's Terms and conditions
          </Checkbox>
        </p>
      </div>
      <AuthButton isButtonHovered={isButtonHovered} />
    </Form>
  );
};

export default RegisterPage;
