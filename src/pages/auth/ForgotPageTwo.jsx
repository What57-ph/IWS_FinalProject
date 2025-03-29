import React from "react";
import Step from "../../components/auth/Step";
import PasswordForm from "../../components/auth/PasswordForm";
import { Form } from "antd";
import { Link } from "react-router-dom";
import AuthButton from "../../components/auth/AuthButton";

const ForgotPageTwo = () => {
  return (
    <>
      <Step />
      <Form className="w-full text-start">
        <PasswordForm />
        <AuthButton />
      </Form>
      <Link to="/auth/login" className="mt-5 text-blue-600 hover:text-blue-400">
        Back to login
      </Link>
    </>
  );
};

export default ForgotPageTwo;
