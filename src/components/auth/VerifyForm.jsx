import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { MdOutlineEmail, MdOutlineVerifiedUser } from "react-icons/md";

const VerifyForm = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
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
  return (
    <>
      <Form.Item
        className="mt-5"
        name="email"
        rules={[{ required: true, message: "This field cannot be empty" }]}
      >
        <Input
          name="email"
          className="formInput"
          placeholder="Enter email address"
          onChange={handleInputChange}
        />
        <MdOutlineEmail className="text-3xl absolute top-[10px] start-4 z-20 text-gray-500" />
      </Form.Item>
      <Form.Item
        name="verifyCode"
        rules={[{ required: true, message: "This field cannot be empty" }]}
      >
        <Input
          name="verifyCode"
          className="formInput"
          placeholder="Enter verification code"
          onChange={handleInputChange}
        />
        <button
          className={`${
            validateEmail(formValues.email)
              ? "text-blue-600"
              : "cursor-not-allowed text-blue-300"
          } absolute top-[8px] end-4 hover:text-blue-300 font-bold text-lg border-l-2 border-gray-300 p-1 ps-5 flex items-center`}
        >
          Send code
        </button>
        <MdOutlineVerifiedUser className="text-2xl absolute top-[12px] start-5 z-20 text-gray-500" />
      </Form.Item>
    </>
  );
};

export default VerifyForm;
