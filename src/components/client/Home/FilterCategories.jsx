import { useRef, useState } from "react";
import sampleData from "../../../data/sampleData";
import CategoryList from "./CategoryList";
import { useAuth } from "../../../context/AuthContext";

// const categories = sampleData.categories;
const categories = [
  "Stage & Art",
  "Live music",
  "Sport",
  "Conference",
  "Travel & Tour",
  "Nightlife",
  "Merchandise"
];

// const events = sampleData.events;
const FilterCategories = () => {
  const { events } = useAuth()
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [currentCtg, setCurrentCtg] = useState("all");

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300; // Điều chỉnh giá trị này nếu cần
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkCurrentCtg = (ctg) => currentCtg === ctg;

  if (categories)
    return (
      <div>
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="relative">
          {/* Mũi tên trái */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Slider content */}
          <div
            ref={sliderRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto scrollbar-hide space-x-4  "
          >
            <button
              className={`flex-shrink-0 pr-4 ms:mr-10 flex items-center justify-center text-md  border-b-2 transition-colors duration-300 ${
                checkCurrentCtg("all")
                  ? "border-blue-700 text-blue-600"
                  : "border-b-white text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setCurrentCtg("all")}
            >
              All categories
            </button>
            {categories.map((category, i) => (
              <button
                key={i}
                className={`flex-shrink-0 px-4 sm:px-10 py-4  flex items-center justify-center text-md  border-b-2 transition-colors duration-300  ${
                  checkCurrentCtg(category)
                    ? "border-blue-700 text-blue-600"
                    : "border-b-white text-gray-600 hover:border-gray-300"
                }`}
                onClick={() => setCurrentCtg(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mũi tên phải */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
          <hr className="mb-10" />
        </div>
        <div>
          <div>
            <CategoryList
              data={events.filter(
                (item) =>
                  checkCurrentCtg("all") || checkCurrentCtg(item.category)
              )}
            />
          </div>
        </div>
      </div>
    );
};

export default FilterCategories;
