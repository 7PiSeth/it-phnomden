import React from "react";
import { items } from "./data/items";
import { quotes } from "./data/quote";
import { Carousel } from "@material-tailwind/react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { TiLightbulb } from "react-icons/ti";
import YoutubeEmbed from "../YoutubeEmbed";

const BetterUp = () => {
  return (
    <div data-aos="fade-right" data-aos-offset="100">
      <Carousel
        autoplay={true}
        autoplayDelay={10000}
        loop={true}
        className="relative sm:h-80 h-48"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i
                    ? "w-8 sm:bg-white bg-transparent"
                    : "w-4 sm:bg-white/50 bg-transparent"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {quotes.map((data, key) => (
          <span>
            <img
              key={key}
              src={data.cover}
              alt={data.cover}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute w-full h-full top-0 text-center flex flex-col items-center justify-center
            sm:text-2xl text-[11px]"
            >
              <p className="w-[70%] h-fit font-bold dark:drop-shadow-[0_0_1px_rgba(0,0,0,1)] drop-shadow-[0_0_1px_rgba(255,255,255,1)]">
                {data.content}
              </p>
              <p className="h-fit flex gap-2 font-bold dark:drop-shadow-[0_0_1px_rgba(0,0,0,1)] drop-shadow-[0_0_1px_rgba(255,255,255,1)]">
                <RiDoubleQuotesL />
                {data.author}
                <RiDoubleQuotesR />
              </p>
            </div>
          </span>
        ))}
      </Carousel>
      <div className="grid grid-cols-2 gap-2 px-1 md:grid-cols-4 mt-3 w-full">
        {items.map((data, key) =>
          data.itemcategory === "article" ? (
            <div
              data-aos="zoom-in" data-aos-offset="10"
              key={key}
              className="bg-gray-900 bg-opacity-10 dark:bg-black dark:bg-opacity-20
         rounded-2xl p-2 flex flex-col gap-2 col-span-2"
            >
              <img
                src={data.imgcoverlink}
                alt={data.imgcoverlink}
                className="h-56 object-cover rounded-lg bg-black"
              />
              <p className="font-bold sm:text-[16px] text-[14px] h-fit">
                {data.title}
              </p>
              <p className="sm:text-[16px] text-[14px] flex items-center gap-2">
                
                <TiLightbulb size={24} className="dark:text-yellow-400 text-yellow-100"/> {data.itemtype}
              </p>
              <p className="opacity-50 sm:text-[14px] text-[13px]  p-1">
                {data.duration === null?"spend weeks":data.duration + " minutes read"}
              </p>
              <a
                href={data.itemid}
                class="dark:bg-black dark:bg-opacity-20 bg-white bg-opacity-20 rounded-lg px-4 sm:py-2 py-[7px] flex flex-col items-center group relative overflow-hidden transition duration-700 ease-in-out dark:hover:bg-opacity-30 dark:hover:border-gray-600 hover:bg-opacity-30 border-[0.5px] border-transparent hover:border-white hover: active:scale-105 active:duration-100"
              >
                <span class="ease absolute right-0 -mt-12 h-72 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-200 group-hover:-translate-x-[500px]"></span>
                Read
              </a>
            </div>
          ) : (
            <div
              data-aos="zoom-in" data-aos-offset="10"
              key={key}
              className="bg-gray-900 bg-opacity-10 dark:bg-black dark:bg-opacity-20
       rounded-2xl p-2 flex flex-col gap-3 justify-between col-span-2"
            >
              <YoutubeEmbed embedId={data.itemid} />
              <p className="font-bold sm:text-[16px] text-[14px] h-fit">
                {data.title}
              </p>
              <p className="sm:text-[16px] text-[14px] flex items-center gap-2">
                <TiLightbulb size={24} className="dark:text-yellow-400 text-yellow-100" /> {data.itemtype}
              </p>
              <p className="opacity-50 sm:text-[14px] text-[13px] p-2">
                {data.duration} minutes watch
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BetterUp;
