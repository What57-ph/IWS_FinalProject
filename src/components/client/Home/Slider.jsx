import { useEffect, useState } from "react";
import sampleData from "../../../data/sampleData";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";

// sampledata
const slides = sampleData.events.map((event) => event.information).slice(0, 6);

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [visibleSlides, setVisibleSlides] = useState(window.innerWidth < 768 ? 1 : 2);

  const totalSlides = slides.length;

  function nextSlide() {
    setSlideIndex((prev) => (prev + 1) % (totalSlides - 1));
  }

  function prevSlide() {
    setSlideIndex((prev) => (prev - 2 + totalSlides) % (totalSlides - 1));
  }

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  useEffect(() => {
    const updateVisibleSlides = () => {
      setVisibleSlides(window.innerWidth < 768 ? 1 : 2);
    };
  
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);
  
  return (
    <div
      className="relative w-full max-w-full mx-auto"
      onMouseEnter={() => setAutoPlay(false)} // ⏸ Dừng khi hover vào
      onMouseLeave={() => setAutoPlay(true)} // ▶ Tiếp tục khi rời chuột
    >
      {/* Mũi tên điều hướng */}
      <BsArrowLeftCircleFill
        className="absolute size-8 left-4 top-1/2 -translate-y-1/2 cursor-pointer text-white z-10"
        onClick={prevSlide}
      />

      {/* Slider Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(slideIndex / visibleSlides) * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 border-x-4 border-white aspect-[5/3] box-border rounded-[12px] flex-shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide})` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Mũi tên điều hướng phải */}
      <BsArrowRightCircleFill
        className="absolute size-8 right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white z-10"
        onClick={nextSlide}
      />

      {/* Nút chọn slide */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(totalSlides - 1) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setSlideIndex(index)}
            className={`size-3 rounded-full ${
              slideIndex === index ? "bg-blue-700" : "bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
