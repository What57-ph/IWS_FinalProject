import React, { useEffect, useState } from "react";
import { Button, Checkbox, Divider, Form, Input } from "antd";

import AuthButton from "../../components/auth/AuthButton";
import PasswordForm from "../../components/auth/PasswordForm";
import VerifyForm from "../../components/auth/VerifyForm";

const RegisterPage = () => {
  const [checked, setChecked] = useState(true);
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setChecked(e.target.checked);
  };
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

  return (
    <Form className="w-full text-start">
      <h4 className="font-semibold text-start">Email Verification</h4>
      <VerifyForm />
      <p className="text-gray-500 align-text-bottom text-start pb-5 text-base">
        Enter email address and click “Send code”, then check the inbox and
        follow instructions.
      </p>
      <h4 className="font-semibold text-start">Set password</h4>
      <PasswordForm />
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
