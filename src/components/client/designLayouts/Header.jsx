import React, { useEffect, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import Logo from "./Logo";
import LanguageOption from "./LanguageOption";

import data from "dvhcvn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import AccountFunc from "./AccountFunc";
import { Popover } from "antd";
import SearchPopup from "../search/SearchPopup";

const Header = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showLangList, setShowLangList] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const [placeholder, setPlacehoder] = useState("");
  const [showToggleContent, setShowToggleContent] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  // for search 

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  let screenWidth = window.screen.width;

  // If user has login
  const { user, isAuthenticated } = useAuth();
  // console.log("Try to print in header", user);

  const provinces = data.level1s.map((province) => ({
    value: province.name,
    label: province.name,
    code: province.id,
  }));
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

  const handleOpenChange = () => {
    setOpen(!open);
  };

  const handleSearch = () => {
    navigate(`/search?filter=name ~ '${searchValue}'`)
  }

  // console.log(location.pathname);

  return (
    <header className="lg:flex max-w-screen-xl mx-auto relative z-[100] lg:flex-row lg:items-center lg:justify-between max-lg:flex-col gap-x-10 gap-y-4 lg:px-16 px-4 py-4 grid grid-cols-3 ">
      <Logo />
      <div className="relative col-start-3 justify-self-end flex flex-row justify-center items-center gap-3" > {/* Thêm items-center */}

        <Link to={'/search'} className={`sm:hidden flex items-center border border-slate-500 p-1 rounded-full ${location.pathname === '/search' ? 'hidden' : ''}`}>
          <FaSearch className="text-gray-700" />
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className=" p-2 w-10 h-10 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
      </div>


      {/* // search */}


      <Popover
        content={<SearchPopup setOpen={setOpen} />}
        onOpenChange={handleOpenChange}
        open={open}
        trigger="click"
        className="w-full flex"
      >
        <div className="col-span-3 lg:flex lg:flex-row items-center justify-between bg-gray-100 rounded-full w-full relative">
          <input onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Search for events, artists, ${placeholder}`}
            className="bg-gray-100 focus:outline-none w-full px-4 py-2 rounded-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
                setOpen(false);
              }
            }}
          />
          <div className="absolute right-4 text-xl cursor-pointer" onClick={handleSearch}>
            <FaSearch />
          </div>
        </div>
      </Popover>


      {showToggleContent && (
        <div
          className={`absolute end-0 top-20 lg:relative lg:top-0 lg:bg-none lg:w-auto w-[350px] bg-white lg:shadow-none shadow-md lg:p-0 px-5 py-3 border-zinc-500 ${showToggleMenu ? "block" : "hidden"
            } lg:flex lg:w-auto flex-row items-center`}
          id="navbar-default"
        >
          {isAuthenticated === true ? (
            <AccountFunc />
          ) : (
            <div className="flex lg:flex-row lg:border-r-2 lg:border-b-0 border-b-2 flex-col justify-center items-start lg:items-center py-1 ">
              <Link to="/auth/login" className="authButton flex items-center">
                Login
              </Link>
              <Link
                to="/auth/register"
                className="authButton flex items-center"
              >
                Register
              </Link>
            </div>
          )}

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
