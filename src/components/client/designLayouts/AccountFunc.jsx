import { Button, Dropdown, message } from "antd";
import { callLogout } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const AccountFunc = () => {

  const { logout, user } = useAuth();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    const res = await callLogout();
    // alert("lgout");
    if (res && res && +res.statusCode === 200) {
      logout();
      message.success('Đăng xuất thành công');
      window.location.href = callback ? callback : '/';
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-3 max-lg:hidden cursor-pointer px-2 py-2 rounded-3xl bg-slate-100/80"
        onClick={() => setShowDropdown(!showDropdown)}>
        <div className="flex-shrink-0">
          <img
            className="h-8 w-8 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/a/ACg8ocI_YpbHVIYyaKKlL3Hxri54jM7hboP-qpvrTBol2n19pHxH7798=s96-c"
            alt="User avatar"
            width={40}
            height={40}
            loading="lazy"
          />
        </div>

        <div className="min-w-0 w-[170px]">
          <p className="truncate font-medium text-gray-900 text-center">{user.email}</p>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          className="flex-shrink-0 text-gray-500"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12h18M3 6h18M3 18h18"
          />
        </svg>
      </div>


      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link to={"/account/history"} className="px-4 py-2 hover:bg-gray-100 cursor-pointer block">
            Ticket History
          </Link>
          <Link to={"/account/profile"}  className="px-4 py-2 hover:bg-gray-100 cursor-pointer block">
            My Profile
          </Link>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
            onClick={handleLogout}
          >
            Log out
          </div>
        </div>
      )}

    </div>
  )
}
export default AccountFunc