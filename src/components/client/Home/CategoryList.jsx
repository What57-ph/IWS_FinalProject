import { useEffect, useState } from "react";
import getCategoryColor from "../../../utils/getCatColor";
import EventList from "./EventList";

export default function CategoryList({ data }) {
  const [limitLength, setLimitLength] = useState(12);
  const [list, setList] = useState(data.slice(0, limitLength));
  useEffect(() => {
    setList(data.slice(0, limitLength));
    setLimitLength(12)
  }, [data]);
  
  const expand = () => {
    setLimitLength((prev) => {
      const newLimit = prev + 12;
      setList(data.slice(0, newLimit));
      return newLimit;
    });
  };

  if (data && data.length != 0) {
    return (
      <>
        <EventList list={list}/>
        <div className="flex justify-center">
          {data.length > limitLength ? (
            <button
              className="btn max-md:w-full md:px-20 mt-12 py-3 px-5 hover:bg-gray-200 bg-gray-100 rounded-xl"
              onClick={expand}
            >
              <p class="text-[18px] ">See more</p>
            </button>
          ) : (
            ""
          )}
        </div>
      </>
    );
  } else {
    return (
      <p className="text-md italic">
        Sorry! No results found in this category.
      </p>
    );
  }
}
