import { Form, Input } from "antd";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";

const PasswordForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <Form.Item
        className="mt-5"
        name="password"
        rules={[{ required: true, message: "This field cannot be empty" }]}
      >
        <Input.Password
          name="password"
          className="formInput"
          placeholder="Enter password"
          onChange={handleInputChange}
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
        />
        <FaLock className="text-2xl absolute top-[12px] start-5 z-20 text-gray-500" />
      </Form.Item>
      <Form.Item
        name="verifyCode"
        rules={[{ required: true, message: "This field cannot be empty" }]}
      >
        <Input.Password
          name="conformPassword"
          className="formInput"
          placeholder="Confirm password"
          onChange={handleInputChange}
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
        />

        <FaLock className="text-2xl absolute top-[12px] start-5 z-20 text-gray-500" />
      </Form.Item>
    </>
  );
};

export default PasswordForm;
