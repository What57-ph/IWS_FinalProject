import React, { useEffect, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import Logo from "./Logo";
import LanguageButton from "./buttons/LanguageButton";
import LanguageOption from "./LanguageOption";
import { BiSearch, BiSearchAlt } from "react-icons/bi";
import LanguageList from "./LanguageList";

const Header = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showLangList, setShowLangList] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const [placeholder, setPlacehoder] = useState("");
  const [showToggleContent, setShowToggleContent] = useState(false);
  let screenWidth = window.screen.width;
  useEffect(() => {
    if (screenWidth >= 1024) {
      setShowLangList(false);
      setShowToggleMenu(false);
      setShowToggleContent(true);
    }
    if (screenWidth < 1024) {
      setShowLangList(true);
      setShowToggleMenu(true);
    }
    setPlacehoder(screenWidth > 400 ? "..." : "");
  }, [screenWidth]);

  return (
    <header className="lg:flex relative z-[100] lg:flex-row lg:items-center lg:justify-between max-lg:flex-col gap-x-10 gap-y-4 border-b-2 lg:px-16 px-4 py-4 grid grid-cols-3 ">
      <Logo />
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="relative col-start-3 justify-self-end p-2 w-10 h-10 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="true"
        onClick={() => setShowToggleContent(!showToggleContent)}
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
      <div className="flex flex-row items-center bg-gray-100 rounded-full w-full relative col-span-3">
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
                  <li className="px-1 cursor-auto focus:outline-none">
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
            placeholder={` Search for events, artists,${placeholder}`}
            className="w-11/12 p-1 bg-gray-100 focus:outline-none"
          />
        </div>
        <div className="grow-0 absolute lg:end-5 end-2 text-xl">
          <FaSearch />
        </div>
      </div>
      {showToggleContent && (
        <div
          className={`absolute end-0 top-20 lg:relative lg:top-0 lg:bg-none lg:w-auto w-[350px] bg-white lg:shadow-none shadow-md lg:p-0 px-5 py-3 border-zinc-500 ${
            showToggleMenu ? "block" : "hidden"
          } lg:flex lg:w-auto flex-row items-center`}
          id="navbar-default"
        >
          <div className="flex lg:flex-row lg:border-r-2 lg:border-b-0 border-b-2 flex-col justify-center items-start lg:items-center py-1 ">
            <button type="button" className="authButton">
              Login
            </button>
            <button type="button" className="authButton">
              Register
            </button>
          </div>

          <LanguageOption
            language={language}
            showLangList={showLangList}
            showToggleMenu={showToggleMenu}
            setShowLangList={setShowLangList}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
