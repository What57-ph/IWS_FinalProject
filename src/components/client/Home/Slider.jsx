import { useEffect, useState } from "react";
import sampleData from "../../../data/sampleData";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";

//sampledata
const slides = sampleData.events.map((event) => event.information).slice(0, 3);

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  function nextSlide() {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  }
  
  function prevSlide() {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  useEffect(() => {
    if(!autoPlay) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval); // Cleanup để tránh lỗi khi component unmount
  }, [autoPlay]);
  
  return (
    <div className="flex justify-center items-center lg:w-[900px] aspect-[5/3] relative mx-0 lg:mx-auto ">
      <BsArrowLeftCircleFill className="absolute size-8 left-4 cursor-pointer text-white" onClick={prevSlide}/>
      {slides.map((slide, index) => (
        <div
        key={index}
        className={`w-full h-full lg:rounded-md ${slideIndex == index ? "" : "hidden"}`}
        style={{ backgroundImage: `url(${slide})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
      </div>
      ))}
      <BsArrowRightCircleFill className="absolute size-8 right-4 cursor-pointer text-white" onClick={nextSlide}/>
      <span className="flex absolute bottom-6 gap-3">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => {setSlideIndex(index)}}
            onMouseEnter={() => { setAutoPlay(false)}}
            onMouseLeave={() => { setAutoPlay(true)}}
            className={`size-3 rounded-full ${slideIndex == index ? 'bg-white' : 'bg-gray-600'}`}
          ></button>
        ))}
      </span>
    </div>
  );
}
