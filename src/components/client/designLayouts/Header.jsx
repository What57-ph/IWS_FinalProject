import React, { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import Logo from "./Logo";
import LanguageButton from "./buttons/LanguageButton";
import LanguageOption from "./LanguageOption";
import { BiSearch, BiSearchAlt } from "react-icons/bi";

const Header = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showLangList, setShowLangList] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  return (
    <header className="flex relative z-[100] flex-row min-lg:items-center justify-between max-lg:flex-col gap-x-10 gap-y-4 border-b-2 max-lg:px-4 px-16 py-4">
      <Logo />
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div className="flex flex-row items-center bg-gray-100 rounded-full w-full relative">
        <div className="grow h-10">
          <input type="hidden" value name="city" />
          <div role="listbox" className="relative inline-block">
            <label className="flex">
              <button
                type="button"
                className="label relative flex flex-row items-center gap-2 w-max text-base h-10 bg-base-200 border-0 rounded-l-full px-3"
                onClick={() => setIsDropdown(!isDropdown)}
              >
                <span> All Cities </span>
                <span>
                  <FaChevronDown />
                </span>
              </button>
            </label>

            {isDropdown && (
              <div className="z-50 absolute">
                <ul className="menu p-2 shadow bg-white rounded-box max-h-96 min-w-[15rem] w-full overflow-auto rounded-none">
                  <li className="px-1 hover:bg-transparent cursor-auto focus:outline-none">
                    <input className="border-2 rounded-md w-full h-8" />
                  </li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                  <li>Ha Noi</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grow w-full">
          <input
            placeholder="Search for events, artists,..."
            className="w-11/12 p-1 bg-gray-100 focus:outline-none"
          />
        </div>
        <div className="grow-0 absolute end-5 text-xl">
          <FaSearch />
        </div>
      </div>
      <div
        className="hidden lg:flex lg:w-auto flex-row items-center"
        id="navbar-default"
      >
        <div className="flex flex-row border-r-2 justify-center">
          <button type="button" className="authButton">
            Login
          </button>
          <button type="button" className="authButton">
            Register
          </button>
        </div>
        <label className="relative">
          <button
            type="button"
            className="langOption relative"
            onClick={() => setShowLangList(!showLangList)}
          >
            <LanguageOption language={language} className={"langOption"} />
          </button>
          {showLangList === true && (
            <div className="z-50 absolute top-8 right-0">
              <ul className="p-2 shadow bg-white rounded-box max-h-96 min-w-[15rem] w-full overflow-auto rounded-none">
                <li className="langItem">
                  <LanguageButton language={"VN"} />
                  {"Vietnamese (VN)"}
                </li>
                <li className="mt-1 langItem">
                  <LanguageButton language={"EN"} />
                  {"English (EN)"}
                </li>
              </ul>
            </div>
          )}
        </label>
      </div>
    </header>
  );
};

export default Header;
