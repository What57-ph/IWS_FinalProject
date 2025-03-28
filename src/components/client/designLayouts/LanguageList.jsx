import React from "react";
import LanguageButton from "./buttons/LanguageButton";

const LanguageList = () => {
  return (
    <div className="z-50 mt-2 lg:absolute relative lg:top-8 top-0 right-0 lg:shadow-md lg:border-1 cursor-pointer">
      <ul className="p-3 bg-white rounded-box max-h-96 min-w-[15rem] w-full overflow-auto rounded-none">
        <li className="langItem">
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
