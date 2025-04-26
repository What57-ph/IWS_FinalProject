import { Popover } from "antd";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaFilter, FaX } from "react-icons/fa6"
import Filter from "../../../components/client/search/Filter";
import { callFilterEvents } from "../../../config/api";
import EventCard from "../../../components/client/search/EventCard";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import NotFound from "../../../components/client/search/NotFound";
import Recommend from "../../../components/client/search/Recommend";


const SearchResultPage = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();

  // for event
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [filterParam, setFilterParam] = useState(location.search);
  const [searchValue, setSearchValue] = useState('');
  const [size, setSize] = useState(9);

  useEffect(() => {
    setFilterParam(location.search);
  }, [location.search]);

  useEffect(() => {
    fetchEvents(filterParam);
  }, [filterParam]);



  // console.log("this is url", location.search);


  const fetchEvents = async (filterParam) => {
    setLoadingEvents(true);
    try {
      const res = await callFilterEvents(filterParam);
      console.log("Fetching data for filter event: ", res.data);

      if (res && res.data) {
        setEvents(res.data.result || []);
      } else {
        setEvents([]);
      }
      setLoadingEvents(false);
    } catch (error) {
      setEvents([]);
      const errorMessage = error.response?.data?.error || 'Fetch failed';
      console.log({ errorMessage });
      // alert(errorMessage);
    }
  }

  const handleOpenChange = () => {
    setOpen(!open);
  };

  const handleSearch = () => {
    navigate(`/search?filter=name ~ '${searchValue}'`)
  }


  return <div className="max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto my-5 min-h-[calc(100vh-200px)] flex flex-col">
    <div className="flex flex-row justify-between mb-2 gap-2">
      <h4 className="font-semibold hidden md:block">Results found: </h4>
      <div className="hidden flex-row items-center justify-between bg-gray-100 rounded-full w-full relative md:hidden ">
        <input onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Input keywords`}
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
      <Popover content={<Filter filterParam={filterParam} setFilterParam={setFilterParam} setOpen={setOpen} />} placement="bottom" onOpenChange={handleOpenChange}
        trigger="click" className={`flex flex-row font-semibold justify-center items-center gap-2 px-4 py-2 bg-gray-500 rounded-full text-white cursor-pointer
          ${open && "bg-pink-500"} transition duration-300
        `}
        open={open}
      >
        <FaFilter />
        <span>Filter</span>
        {open ? <FaX className="transition duration-300" /> : <FaAngleDown className="transition duration-300" />}
      </Popover>
    </div>

    <div className={`${events.length > 0 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} grid  gap-4`}>
      {
        events.length > 0 ?

          events.length > 9 ?
            events.slice(0, size).map((item) => {
              return EventCard({ item, search: true });
            })
            :
            events.map((item) => {
              return EventCard({ item, search: true });
            })
          :
          <NotFound />
      }
    </div>


    {
      events.length > 9 &&
      <button onClick={() => setSize(size + 6)} className="flex justify-center items-center mt-10 bg-gray-300 mx-auto px-5 py-4 rounded-full text-[20px] font-semibold hover:bg-gray-400 transition duration-200">
        Watch more
      </button>}
    {
      events.length === 0 &&
      <Recommend />
    }

  </div>;
};

export default SearchResultPage;
