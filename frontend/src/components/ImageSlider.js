import React, { useState, useEffect } from "react";
import image1 from "../assets/image_1.jpg";
import image2 from "../assets/image_2.jpg";
import image3 from "../assets/image_3.jpg";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";

const ImageSlider = () => {
  const images = [
    {
      src: image1,
      title: "Goals, highlights and more",
      subtitle: "Relive your favourite moments from the FIFA World Cup",
    },
    {
      src: image2,
      title: "Match Recap",
      subtitle: "Catch up on the best moments from recent matches",
    },
    {
      src: image3,
      title: "Player Spotlights",
      subtitle: "Learn more about standout players",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="flex flex-col md:flex-row relative w-full md:max-w-[80%] mt-[20%] sm:mt-[20%] md:mt-[17%] xl:mt-[10%] mx-auto rounded-lg overflow-y-auto">
      {/* Left side (Text container) */}
      <div className="md:w-1/3 w-full p-6 text-white flex flex-col justify-center ">
        <h2 className="text-2xl font-bold mb-2">
          {images[currentIndex].title}
        </h2>
        <p className="text-md">{images[currentIndex].subtitle}</p>
      </div>

      {/* Image container with navigation */}
      <div className="relative md:w-2/3 w-full h-64 md:h-auto group mb-4 ">
        <img
          src={images[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 text-2xl text-white bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <IoIosArrowDropleft />
        </button>
        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl text-white bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <IoIosArrowDropright />
        </button>
        {/* Dots Navigation */}
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`text-2xl ${
                index === currentIndex ? "text-white" : "text-gray-400"
              }`}
            >
              <RxDotFilled />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
