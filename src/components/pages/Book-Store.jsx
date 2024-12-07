import React, { useEffect, useState } from "react";
import { bookInfo } from "./data/book";
import { quotes } from "./data/quote";
import { Carousel } from "@material-tailwind/react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const BookStore = () => {
  const [bookType, setBookType] = useState("All");
  const [filterValue, setFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let lowercaseValue = searchValue.toLowerCase();
      setFilterValue(lowercaseValue);
      setBookType('All');
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

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
      <div className="btn-group grid grid-cols-6 mb-1">
        <div className="relative col-span-6">
        <input type="text" placeholder="Search.." 
        autoComplete="off"
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full outline-none py-3 pl-10 bg-transparent
        border-[1px] dark:border-gray-600 border-slate-500
        focus:bg-white focus:text-black focus:border-white text-white rounded-none"/>
          <FaSearch className="absolute left-3 top-4"/>
        </div>
        <button onClick={()=>{setFilterValue(''); setBookType("All") } }>All</button>
        <button onClick={()=>{setFilterValue(''); setBookType("General Knowledge")} } className="col-span-3">General Knowledge</button>
        <button onClick={()=>{setFilterValue(''); setBookType("Architecture") } } className="col-span-2">Architecture</button>
        <button onClick={()=>{setFilterValue(''); setBookType("ITs") } } >ITs</button>
        <button onClick={()=>{setFilterValue(''); setBookType("Grade 12") } } className="col-span-2">Grade 12</button>
        <button onClick={()=>{setFilterValue(''); setBookType("Grammars") } } className="col-span-2">Grammars</button>
        <button onClick={()=>{setFilterValue(''); setBookType("Tale") } }>Tale</button>
        <button onClick={()=>{setFilterValue(''); setBookType("History") } } className="col-span-2 rounded-bl-lg">History</button>
        <button onClick={()=>{setFilterValue(''); setBookType("Literature") } } className="col-span-2">Literature</button>
        <button onClick={()=>{setFilterValue(''); setBookType("Novel") } } >Novel</button>
        <button onClick={()=>{setFilterValue(''); setBookType("Poem") } } className="rounded-br-lg">Poem</button>
      </div>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6 w-full px-2 mt-2">
        {bookInfo.map((data, key) => (
         (data.type === bookType ||bookType ==="All") &&
         data.title.toLowerCase().includes(filterValue) ?
          <div
          data-aos="zoom-in" data-aos-offset="10"
            key={key}
            className="bg-gray-900 bg-opacity-10 dark:bg-black dark:bg-opacity-20
            rounded-lg flex flex-col"
          >
            <img
              src={data.cover}
              alt={data.cover}
              className="sm:h-52 h-48 object-cover object-top rounded-tl-md rounded-tr-md"
            />
            <a
              href={data.file}
              download
              class="border-[1px] dark:border-gray-700 border-slate-600 rounded-bl-md rounded-br-md px-4 sm:py-2 py-[5px] flex flex-col items-center group relative overflow-hidden transition duration-700 ease-in-out dark:hover:bg-opacity-30 dark:hover:border-gray-600 hover:bg-opacity-30 hover: active:scale-105 active:duration-100"
            >
              <span class="ease absolute right-0 -mt-12 h-72 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-500 group-hover:-translate-x-64"></span>
              Download
            </a>
          </div>:""
        ))}
      </div>
    </div>
  );
};

export default BookStore;
