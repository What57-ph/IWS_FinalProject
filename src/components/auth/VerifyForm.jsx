import { Form, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { MdOutlineEmail, MdOutlineVerifiedUser } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { callResetCodePassword } from "../../config/api";
import { toast } from "react-toastify";

const VerifyForm = ({
  validateEmail,
  setEmail, setCode, email
}) => {

  const location = useLocation();
  // console.log(location);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   console.log(email);
  // }, [email])

  const handleResetCode = async () => {

    if (email === null) {
      toast.error("Please input your email!!")
      return;
    }

    try {
      setIsLoading(true);
      const res = await callResetCodePassword(email);
      toast.success('Resend successfully..', {
        autoClose: 2000,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Resend failed!';
      console.log({ errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <Spin spinning={isLoading}>
      <Form.Item
        className="mt-5"
        name="username"
        validateTrigger={["onFinish"]}
        rules={[{ required: true, message: "This field cannot be empty" }]}
      >
        <div>
          <Input
            name="username"
            className="formInput"
            placeholder="Enter email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}

          />
          <MdOutlineEmail className="text-3xl absolute top-[10px] start-4 z-20 text-gray-500" />
        </div>
      </Form.Item>
      {location.pathname.includes("step1") && <Form.Item
        name="verifyCode"
        rules={[{ required: true, message: "This field cannot be empty" }]}
      >
        <div>
          <Input
            name="verifyCode"
            className="formInput"
            placeholder="Enter verification code"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <button onClick={handleResetCode}
            className={`${validateEmail(email)
              ? "text-blue-600"
              : "cursor-not-allowed text-blue-300"
              } absolute top-[8px] end-4 hover:text-blue-300 font-bold text-lg border-l-2 transition duration-200 border-gray-300 p-1 ps-5 flex items-center`}
          >
            Send code
          </button>
          <MdOutlineVerifiedUser className="text-2xl absolute top-[12px] start-5 z-20 text-gray-500" />
        </div>
      </Form.Item>}
    </Spin>
  );
};

export default VerifyForm;
