import React from "react";
import { FaChevronDown } from "react-icons/fa";
import LanguageButton from "./buttons/LanguageButton";
import LanguageList from "./LanguageList";

const LanguageOption = ({
  language,
  className,
  showLangList,
  showToggleMenu,
  setShowLangList,
}) => {
  return (
    <label className="relative">
      <button
        type="button"
        className={`langOption relative lg:m-0 mt-2 ${showToggleMenu ? "hidden" : "block"
          }`}
        onClick={() => setShowLangList(!showLangList)}
      >
        <div
          className={`langOption ${showToggleMenu ? "" : "flex"} ${className}`}
        >
          <LanguageButton language={language} />

          <span>{language === "EN" ? "EN" : "VN"}</span>
          <FaChevronDown />
        </div>
      </button>
      {showLangList && <LanguageList />}
    </label>
  );
};

export default LanguageOption;
