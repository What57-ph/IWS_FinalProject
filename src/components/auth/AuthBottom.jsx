import React from "react";
import { Link, useLocation } from "react-router-dom";
import google from "../../assets/google.png";

const AuthBottom = ({ pathname }) => {

  const location = useLocation();

  let display = [
    "/auth/forgot-password",
    "/auth/forgot-password/step1",
    "/auth/forgot-password/step2",
  ].includes(pathname)
    ? "hidden"
    : "flex flex-col items-center";

  let afterOr = pathname === "/auth/login" ? "login" : "register";
  let pText =
    pathname === "/auth/login" ? "Not have an account?" : "Have an account?";
  let link =
    pathname === "/auth/login" ? (
      <span className="text-blue-700 hover:text-blue-900">
        <Link to="/auth/register"> Register now </Link>
      </span>
    ) : (
      <span className="text-blue-700 hover:text-blue-900">
        <Link to="/auth/login"> Log in </Link>
      </span>
    );
  return !location.pathname.includes('verification') ? (
    <div className={`${display} `}>
      <div className={`w-full mt-6`}>
        <p className="relative text-gray-500 text-base text-center sideOr">
          Or {afterOr} with
        </p>
      </div>
      <a href="http://localhost:8080/oauth2/authorization/google">
        <img src={google} className="w-[30px] h-[30px] mt-5" />
      </a>
      <div className="flex items-center mt-5 gap-2  ">
        <p>{pText}</p>
        {link}
      </div>
    </div>
  ) : null;
};

export default AuthBottom;
