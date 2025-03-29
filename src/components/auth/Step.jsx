import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const Step = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routes = ["step1", "step2"];

  const getCurrentStep = () => {
    if (location.pathname.includes("step2")) return 1;
    return 0;
  };

  const [current, setCurrent] = useState(getCurrentStep());
  const [status, setStatus] = useState({ status1: "process", status2: "wait" });

  useEffect(() => {
    const stepIndex = getCurrentStep();
    setCurrent(stepIndex);
    setStatus(
      stepIndex === 0
        ? { status1: "process", status2: "wait" }
        : { status1: "finish", status2: "process" }
    );
  }, [location.pathname]);

  const onChange = (value) => {
    navigate(`/auth/forgot-password/${routes[value]}`);
  };

  return (
    <Steps
      type="navigation"
      current={current}
      onChange={onChange}
      className="site-navigation-steps"
      items={[
        { status: status.status1, title: "Verify Account" },
        { status: status.status2, title: "Reset Password" },
      ]}
    />
  );
};

export default Step;
