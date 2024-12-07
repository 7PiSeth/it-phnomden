import React, { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`w-screen dark:text-white h-[60px] px-5 lg:px-12 md:px-7 flex justify-between items-center fixed z-10`}
    >
      <div className="mx-auto">
        <div className="relative w-20 bg-slate-300 dark:bg-[#1e2328] group rounded-full flex items-center cursor-pointer">
          <div
            className="w-1/2 h-full p-2 z-10"
            onClick={() => {
              document.querySelector("meta[name='theme-color']").content =
                "rgb(194, 205, 219)";
              setDarkMode(false);
            }}
          >
            <FaSun size={20} />
          </div>

          <div
            className="w-1/2 h-full p-2 z-10"
            onClick={() => {
              document.querySelector("meta[name='theme-color']").content =
                "rgb(16, 24, 43)";
              setDarkMode(true);
            }}
          >
            <BsFillMoonStarsFill size={20} className="float-right" />
          </div>
          <div
            className={`bg-slate-200 dark:bg-[#171d25] p-4 rounded-full shadow-inner
           transform-gpu transition-transform duration-300 ease-in-out absolute left-[2px] ${
             darkMode ? "translate-x-[44px] shadow-[#fcfcfc33]" : ""
           }`}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
