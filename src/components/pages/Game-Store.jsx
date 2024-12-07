import React from "react";
import { Link } from "react-router-dom";
import { gameInfo } from "./data/game";
import { Carousel } from "@material-tailwind/react";

const GameStore = () => {
  return (
    <div data-aos="fade-right" data-aos-offset="100">
      <Carousel
        autoplay={true}
        loop={true}
        className="sm:h-80 h-48 dark:bg-black dark:bg-opacity-20 bg-gray-900 bg-opacity-10
        sm:rounded-bl-lg sm:rounded-br-lg"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {gameInfo.map((data, key) => (
          <img
            key={key}
            src={data.cover}
            alt="Not found"
            className="h-full w-full object-cover object-top"
          />
        ))}
      </Carousel>
      <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-4 mt-3 w-full">
        {gameInfo.map((data, key) => (
          <div
            data-aos="zoom-in" data-aos-offset="10"
            key={key}
            className="bg-gray-900 bg-opacity-10 dark:bg-black dark:bg-opacity-20
         rounded-2xl p-2 flex flex-col justify-between"
          >
            <img
              src={data.cover}
              alt="not found.png"
              className="h-fit object-contain rounded-lg"
            />
            <p className="font-bold sm:text-[16px] text-[11px]">{data.title}</p>
            <p className="opacity-50 sm:text-[16px] text-[11px]">PC Game</p>
            <Link
              to="/it-phnomden/GameStoreDetail"
              state={data}
              class="dark:bg-black dark:bg-opacity-20 bg-white bg-opacity-20 rounded-lg px-4 sm:py-2 py-[7px] flex flex-col items-center group relative overflow-hidden transition duration-700 ease-in-out dark:hover:bg-opacity-30 dark:hover:border-gray-600 hover:bg-opacity-30 border-[0.5px] border-transparent hover:border-white hover: active:scale-105 active:duration-100"
            >
              <span class="ease absolute right-0 -mt-12 h-72 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-500 group-hover:-translate-x-64"></span>
              Get
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStore;
