import React from "react";
import LanguageButton from "./buttons/LanguageButton";
import { callLogout } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";

const LanguageList = () => {
  const { logout, isAuthenticated } = useAuth();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  const handleLogout = async () => {
    const res = await callLogout();
    // alert("lgout");
    if (res && res && +res.statusCode === 200) {
      logout();
      window.location.href = callback ? callback : '/';
    }
  }

  return (
    <div className="z-50 mt-2 lg:absolute relative lg:top-8 top-0 right-0 lg:shadow-md lg:border-1 lg:border-t-2 cursor-pointer">
      <ul className="p-3 bg-white rounded-box max-h-96 min-w-[15rem] w-full overflow-auto rounded-none">
        {isAuthenticated && <>
          <li className="langItem">
            Ticket History
          </li>

          <li className="mt-2 langItem">
            My Profile
          </li>

          <li className="mt-2 langItem" onClick={() => handleLogout()}>
            Log out
          </li>
          <hr />
        </>
        }


        <li className="mt-4 langItem">
          <LanguageButton language={"VN"} />
          {"Vietnamese (VN)"}
        </li>
        <li className="mt-4 langItem">
          <LanguageButton language={"EN"} />
          {"English (EN)"}
        </li>
      </ul>
    </div>
  );
};

export default LanguageList;
