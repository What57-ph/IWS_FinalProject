import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../../assets/google.png";
import { useAuth } from "../../context/AuthContext";

const AuthBottom = ({ pathname }) => {

  const location = useLocation();
  const { login } = useAuth()

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      'http://localhost:8080/oauth2/authorization/google',
      'Google Login',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const cleanup = (messageHandler) => {
      window.removeEventListener('message', messageHandler);
    };

    const messageHandler = async (event) => {
      if (event.origin !== 'http://localhost:5173') return;

      try {
        const data = event.data;
        if (data.accessToken && data.user) {
          login(data.user, data.accessToken);
          navigate('/');
          popup?.close();
          cleanup(messageHandler);
        }
      } catch (error) {
        console.error('Error handling OAuth response:', error);
        popup?.close();
        cleanup(messageHandler);
      }
    };
    window.addEventListener('message', messageHandler);
  }

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
      <button onClick={handleGoogleLogin}>
        <img src={google} className="w-[30px] h-[30px] mt-5" />
      </button>
      <div className="flex items-center mt-5 gap-2  ">
        <p>{pText}</p>
        {link}
      </div>
    </div>
  ) : null;
};

export default AuthBottom;
