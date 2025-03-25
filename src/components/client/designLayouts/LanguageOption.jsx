import React from "react";
import { FaChevronDown } from "react-icons/fa";
import LanguageButton from "./buttons/LanguageButton";

const LanguageOption = ({ language, className }) => {
  return (
    <div className={className}>
      <LanguageButton language={language} />

      <span>{language === "EN" ? "EN" : "VN"}</span>
      <FaChevronDown />
    </div>
  );
};

export default LanguageOption;
