import { Form, Input, Steps } from "antd";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import VerifyForm from "../../components/auth/VerifyForm";
import Step from "../../components/auth/Step";
import { callVerify } from "../../config/api";
import { toast } from "react-toastify";

const ForgotPageOne = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    verifyCode: "",
    confirmPassword: "",
  });

  const [email, setEmail] = useState(null);
  const [code, setCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(email);
    console.log(code);

  }, [email, code])

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onFinish = async () => {
    try {
      // console.log('comes to try');
      const res = await callVerify(email, code);
      console.log(res);
      console.log('Verification code:', code);
      toast.success('Verify successfully...', {
        autoClose: 1500,
        onClose: () => navigate(`/auth/forgot-password/step2?email=${email}`)
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Verify failed, please check your verify code!';
      console.log({ errorMessage });
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <Step />
      <Form className="w-full text-start" onFinish={onFinish}>
        <VerifyForm
          validateEmail={validateEmail}
          setCode={setCode}
          setEmail={setEmail}
          email={email}
        />
        <button
          type="submit"
          className={` hover:bg-pink-500 hover:text-opacity-100 text-white text-opacity-90 font-semibold border-0 w-full transition duration-200 h-[48px] text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${isButtonHovered ? "bg-pink-500" : "bg-pink-200"
            }`}
        >
          Continue
        </button>
      </Form>
      <Link to="/auth/login" className="mt-5 text-blue-600 hover:text-blue-400">
        Back to login
      </Link>
    </>
  );
};

export default ForgotPageOne;
