import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { callLogin } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checked, setChecked] = useState(true);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const { login } = useAuth()

  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");
  const navigate = useNavigate();

  useEffect(() => {
    setIsButtonHovered(!!(formValues.email && formValues.password));
  }, [formValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  const onFinish = async (values) => {
    try {
      const { username, password } = values;
      const res = await callLogin(username, password);
      // console.log(res);
      if (res?.data) {

        if (!res.data.user || typeof res.data.user !== 'object') {
          throw new Error('Invalid user data from server');
        }

        login(res.data.user, res.data.accessToken);
        toast.success('Đăng nhập tài khoản thành công!', {
          autoClose: 500,
          onClose: () => navigate('/')
        });
      }

    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed!';
      console.log({ errorMessage });
      alert(errorMessage);
      notification.error({
        message: "Lỗi!!!",
        description: errorMessage,
        duration: 5
      });
    }

  };

  // const handleGoogleLogin = () => {
  //   const width = 500;
  //   const height = 600;
  //   const left = window.screenX + (window.outerWidth - width) / 2;
  //   const top = window.screenY + (window.outerHeight - height) / 2;

  //   const popup = window.open(
  //     'http://localhost:8080/oauth2/authorization/google',
  //     'Google Login',
  //     `width=${width},height=${height},left=${left},top=${top}`
  //   );

  //   window.addEventListener('message', async (event) => {
  //     if (event.origin !== 'http://localhost:8080') return;

  //     const data = event.data;
  //     if (data.accessToken && data.user) {
  //       login(data);
  //       navigate('/')
  //       popup.close();
  //     }
  //   });
  // }

  return (
    <Form className="w-full text-start" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "This field cannot be empty" }]}
      >
        <div className="relative">
          <Input
            name="email"
            className="formInput"
            placeholder="Enter email address"
            onChange={handleInputChange}
          />
          <MdOutlineEmail className="text-3xl absolute top-[10px] start-4 z-20 text-gray-500" />
        </div>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "This field cannot be empty" }]}
      >
        <div className="relative">
          <Input.Password
            name="password"
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            className="formInput"
            placeholder="Enter password"
            onChange={handleInputChange}
          />
          <FaLock className="text-2xl absolute top-[10px] start-4 z-20 text-gray-500" />
        </div>
      </Form.Item>

      <div className="flex flex-row justify-between px-1">
        <Checkbox checked={checked} onChange={onChange}>
          Auto log in
        </Checkbox>
        <p className="font-semibold">
          <Link to="/auth/forgot-password/step1" className="text-blue-500">
            Forgot password?
          </Link>
        </p>
      </div>

      <button
        type="submit"
        className={`hover:bg-pink-500 hover:text-opacity-100 text-white text-opacity-90 font-semibold border-0 w-full h-[48px] text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${isButtonHovered ? "bg-pink-500" : "bg-pink-200"
          }`}
      >
        Log in
      </button>
    </Form>
  );
};

export default LoginPage;
