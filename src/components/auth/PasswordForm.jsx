import { Form, Input } from "antd";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";

const PasswordForm = ({ handleInputChange, formValues }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateConfirmPassword = (_, value) => {
    if (!value || value === formValues.password) {
      return Promise.resolve();
    }
    return Promise.reject("Passwords do not match");
  };

  return (
    <>
      <Form.Item
        className="mt-5"
        name="password"
        validateTrigger={["onFinish"]}
        rules={[{ required: true, message: "This field cannot be empty" }]}
      >
        <div>
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
        </div>
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        validateTrigger={["onFinish"]}
        rules={[
          { required: true, message: "This field cannot be empty" },
          { validator: validateConfirmPassword },
        ]}
      >
        <div>
          <Input.Password
            name="confirmPassword"
            className="formInput"
            placeholder="Confirm password"
            onChange={handleInputChange}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
          />
          <FaLock className="text-2xl absolute top-[12px] start-5 z-20 text-gray-500" />
        </div>
      </Form.Item>
    </>
  );
};

export default PasswordForm;
