import React, { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { callVerify } from '../../config/api';

const VerificationPage = () => {


  const { verifyUser } = useAuth();

  useEffect(() => {
    console.log("VerificationPage verifyUser:", verifyUser);
  }, [verifyUser]);

  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    if (value !== '' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join('');

    if (code.length !== 6) {
      toast.error('Please input exactly 6 digit!');
      return;
    }
    try {
      console.log('comes to try');

      const res = await callVerify(verifyUser, code);
      console.log(res);
      console.log('Verification code:', code);
      console.log("this is verify user: ", verifyUser);
      toast.success('Verify success!');
      window.location.href = callback ? callback : '/auth/login';
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Verify failed!';
      console.log("this is verify user: ", verifyUser);
      console.log({ errorMessage });
      alert(errorMessage);
    }

  };

  return (
    <div className=" bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-1 rounded-xl">
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
          </div>
          {/* <h2 className="mt-6 text-3xl font-bold text-gray-900">Verify your email</h2> */}
          <p className="mt-2 text-sm text-gray-600">
            We sent a verification code to your email. Enter the code below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center space-x-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold text-gray-700 focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Verify Email
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => console.log('Resend code')}
              >
                Resend
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;