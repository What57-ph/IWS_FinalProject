import React, { useEffect, useState } from "react";
import Logo from "../../components/client/designLayouts/Logo";
import LanguageOption from "../../components/client/designLayouts/LanguageOption";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import Link from "antd/es/typography/Link";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import { Outlet, useLocation } from "react-router-dom";
import AuthBottom from "./AuthBottom";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  const [showLangList, setShowLangList] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checked, setChecked] = useState(true);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [header, setHeader] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/auth/login") {
      setHeader("Log in");
    } else if (location.pathname === "/auth/register") {
      setHeader("Create an account");
    }
    else if (location.pathname.includes('verification')) {
      setHeader("Verification account");
    }
    else {
      setHeader("Reset password");
    }
  }, [location]);

  return (
    <div className="overflow-x-hidden">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-screen py-6 lg:px-20 px-5 flex justify-between">
        <Logo />
        <LanguageOption
          language={"EN"}
          showLangList={showLangList}
          setShowLangList={setShowLangList}
        />
      </div>
      <div
        className={`xl:mx-96 xl:px-20 ${location.pathname === "/auth/register" ? "pb-10" : ""
          }`}
      >
        <main className="text-center bg-white lg:shadow-lg flex flex-col items-center justify-center border-1 rounded-xl lg:p-10 p-2">
          <div className="font-[700]">
            <h2>{header}</h2>
            <Divider />
          </div>
          <Outlet />
          {header === "Log in" ? (
            <AuthBottom pathname={location.pathname} />
          ) : (
            <AuthBottom pathname={location.pathname} />
          )}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
