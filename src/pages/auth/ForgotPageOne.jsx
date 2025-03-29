import { Form, Input, Steps } from "antd";
import React, { useEffect, useState } from "react";
import Step from "../../components/auth/Step";

import AuthButton from "../../components/auth/AuthButton";
import { Link } from "react-router-dom";
import VerifyForm from "../../components/auth/VerifyForm";

const ForgotPageOne = () => {
  return (
    <>
      <Step />
      <Form className="w-full text-start">
        <VerifyForm />
        <AuthButton />
      </Form>
      <Link to="/auth/login" className="mt-5 text-blue-600 hover:text-blue-400">
        Back to login
      </Link>
    </>
  );
};

export default ForgotPageOne;
