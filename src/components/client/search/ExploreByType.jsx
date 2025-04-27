import { Image } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const ExploreByType = ({ setOpen }) => {
  const [searchType, setSearchType] = useState("Category");
  const categories = [
    {
      "title": "Live music",
      "src": "https://salt.tkbcdn.com/ts/ds/59/eb/f6/11ee276c12b68af613dc1e57df9eb613.png",
      "value": "Live music"
    },
    {
      "title": "Stage",
      "src": "https://salt.tkbcdn.com/ts/ds/fe/03/6b/936edd943ce151b506eb635755ffa043.png",
      "value": "Stage"
    },
    {
      "title": "Sport",
      "src": "https://salt.tkbcdn.com/ts/ds/79/f8/17/cb00b342d8ddc5c6f26bd3f5a96c4cef.png",
      "value": "Sport"
    },
    {
      "title": "Others",
      "src": "	https://salt.tkbcdn.com/ts/ds/2f/69/fc/8feace9a35636ee2747b9bca70793567.png",
      "value": "Others"
    }
  ];

  const cities = [
    {
      "title": "Ho Chi Minh City",
      "src": "https://salt.tkbcdn.com/ts/ds/50/94/d2/084294ec6044106db63ce88b17c68f2c.png",
      "value": "Hồ Chí Minh"
    },
    {
      "title": "Hanoi",
      "src": "https://salt.tkbcdn.com/ts/ds/85/3d/8c/93f3b44431ba64bdacfb8ba88c7abe02.png",
      "value": "Hà Nội"
    },
    {
      "title": "Da Lat",
      "src": "https://salt.tkbcdn.com/ts/ds/f2/81/ea/20632f7b42a1008f06a131ffc0e980c0.png",
      "value": "Đà Lạt"
    },
    {
      "title": "Others",
      "src": "https://salt.tkbcdn.com/ts/ds/21/a9/0d/66d54c33c3d6d7943c4d230e08270111.png",
      "value": "Others"
    }
  ];

  const createCategory = (title, src, type, value) => {
    return (
      <Link className="relative cursor-pointer group" to={`${title === 'Others' ? '/search' : `/search?filter=${type === 'category' ? 'category.name' : 'province'}~'${value}'`}`} onClick={() => setOpen(false)}>
        <Image
          title="Live Music"
          width={180}
          height={100}
          preview={false}
          src={src}
          className="group-hover:brightness-50 transition duration-300"
          placeholder={
            <Image preview={false} src={src} width={180} height={100} />
          }
        />
        <p className="absolute top-0 px-2 py-1 font-bold text-[16px]">{title}</p>
      </Link>
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
          return createCategory(cate.title, cate.src, 'category', cate.value);
        })}
        {searchType === 'City' && cities.map((cate) => {
          return createCategory(cate.title, cate.src, 'location', cate.value);
        })}
      </div>

    </div>
  )
}
export default ExploreByType