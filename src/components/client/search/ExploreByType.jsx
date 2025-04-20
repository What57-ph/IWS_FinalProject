import { Image } from "antd";
import { useState } from "react";

const ExploreByType = () => {
  const [searchType, setSearchType] = useState("Category");
  const categories = [
    {
      "title": "Live Music",
      "src": "https://salt.tkbcdn.com/ts/ds/59/eb/f6/11ee276c12b68af613dc1e57df9eb613.png"
    },
    {
      "title": "Stage & Art",
      "src": "https://salt.tkbcdn.com/ts/ds/fe/03/6b/936edd943ce151b506eb635755ffa043.png"
    },
    {
      "title": "Sports",
      "src": "https://salt.tkbcdn.com/ts/ds/79/f8/17/cb00b342d8ddc5c6f26bd3f5a96c4cef.png"
    },
    {
      "title": "Others",
      "src": "	https://salt.tkbcdn.com/ts/ds/2f/69/fc/8feace9a35636ee2747b9bca70793567.png"
    }
  ];

  const cities = [
    {
      "title": "Ho Chi Minh City",
      "src": "https://salt.tkbcdn.com/ts/ds/50/94/d2/084294ec6044106db63ce88b17c68f2c.png"
    },
    {
      "title": "Hanoi",
      "src": "https://salt.tkbcdn.com/ts/ds/85/3d/8c/93f3b44431ba64bdacfb8ba88c7abe02.png"
    },
    {
      "title": "Da Lat",
      "src": "https://salt.tkbcdn.com/ts/ds/f2/81/ea/20632f7b42a1008f06a131ffc0e980c0.png"
    },
    {
      "title": "Others",
      "src": "https://salt.tkbcdn.com/ts/ds/21/a9/0d/66d54c33c3d6d7943c4d230e08270111.png"
    }
  ];

  const createCategory = (title, src) => {
    return (
      <div className="relative cursor-pointer">
        <Image title="Live Music"
          width={180}
          height={100}
          preview={false}
          src={src}
          placeholder={
            <Image
              preview={false}
              src={src}
              width={180}
              height={100}
            />
          }
        />
        <p className="absolute top-0 px-2 py-1 font-bold text-[16px]">{title}</p>
      </div>
    )
  }

  return (
    <div className="">
      <div className="border-b border-slate-200 flex flex-row gap-5 text-[18px]">
        <div className={`${searchType === "Category" ? "text-white font-semibold border-b-[3px] border-green-600" : "text-gray-300 hover:text-green-400"} cursor-pointer transition duration-200 h-full`}
          onClick={() => setSearchType("Category")}
        >
          Explore by Category
        </div>
        <div className={`${searchType === "City" ? "text-white font-semibold border-b-[3px] border-green-600" : "text-gray-300 hover:text-green-400"} cursor-pointer transition duration-200`}
          onClick={() => setSearchType("City")}
        >
          Explore by City
        </div>
      </div>

      <div className="flex flex-row gap-4 my-3 overflow-x-auto flex-nowrap pb-2">
        {searchType === 'Category' && categories.map((cate) => {
          return createCategory(cate.title, cate.src);
        })}
        {searchType === 'City' && cities.map((cate) => {
          return createCategory(cate.title, cate.src);
        })}
      </div>

    </div>
  )
}
export default ExploreByType