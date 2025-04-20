import { Popover } from "antd";
import React, { useState } from "react";
import { FaAngleDown, FaFilter, FaX } from "react-icons/fa6"
import Filter from "../../../components/client/search/Filter";


const SearchResultPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
  };

  return <div className="max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto my-10 h-3">
    <div className="flex flex-row justify-between">
      <h4 className="font-semibold">Results found: </h4>

      <Popover content={<Filter />} placement="bottomRight" onOpenChange={handleOpenChange}
        trigger="click" className={`flex flex-row font-semibold justify-center items-center gap-2 px-4 py-2 bg-gray-500 rounded-full text-white cursor-pointer
          ${open && "bg-pink-500"} transition duration-300
        `}>
        <FaFilter />
        <span>Filter</span>
        {open ? <FaX className="transition duration-300" /> : <FaAngleDown className="transition duration-300" />}
      </Popover>
    </div>
  </div>;
};

export default SearchResultPage;
