import React, { useEffect, useState } from "react";
import Step from "../../components/auth/Step";
import PasswordForm from "../../components/auth/PasswordForm";
import { Form } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthButton from "../../components/auth/AuthButton";
import { callResetPassword } from "../../config/api";
import { toast } from "react-toastify";

const ForgotPageTwo = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const [searchParams] = useSearchParams();
  const email = decodeURIComponent(searchParams.get("email"));
  // console.log(email);

  const navigate = useNavigate();


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
  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match!");
    }
    try {
      const res = await callResetPassword(email, values.password);
      // console.log(res);
      toast.success('Reset password successfully...', {
        autoClose: 1500,
        onClose: () => navigate(`/auth/login`)
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Reset password failed!';
      console.log({ errorMessage });
      toast.error(errorMessage);
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
