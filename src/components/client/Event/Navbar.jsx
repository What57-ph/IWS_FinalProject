import { useRef, useState } from "react";

export default function Navbar() {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

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
  return (
    <div>
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
            className={`flex-shrink-0 py-4 px-4 ms:mr-10 flex items-center justify-center text-md  border-b-2 transition-colors duration-300 border-b-white text-gray-600 hover:border-gray-300`}
          >
            Lịch sự kiện
          </button>
          <button
            className={`flex-shrink-0 py-4 px-4 ms:mr-10 flex items-center justify-center text-md  border-b-2 transition-colors duration-300 border-b-white text-gray-600 hover:border-gray-300`}
          >
            Về sự kiện
          </button>
          <button
            className={`flex-shrink-0 py-4 px-4 ms:mr-10 flex items-center justify-center text-md  border-b-2 transition-colors duration-300 border-b-white text-gray-600 hover:border-gray-300`}
          >
            Nhà tổ chức
          </button>
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
    </div>
  );
}
