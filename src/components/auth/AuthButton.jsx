import React from "react";

const AuthButton = ({ isButtonHovered }) => {
  return (
    <>
      <button
        type="submit"
        className={` hover:bg-pink-500 hover:text-opacity-100 text-white text-opacity-90 font-semibold border-0 w-full h-[48px] text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${
          isButtonHovered ? "bg-pink-500" : "bg-pink-200"
        }`}
      >
        Create account
      </button>
    </>
  );
};

export default AuthButton;
