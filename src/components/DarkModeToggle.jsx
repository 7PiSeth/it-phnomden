import React, { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    document.querySelector("meta[name='theme-color']").content = darkMode ? "rgb(194, 205, 219)" : "rgb(16, 24, 43)";
  };

  return (
    <div className="w-screen dark:text-white h-[60px] px-5 lg:px-12 md:px-7 flex justify-between items-center fixed z-10">
      <div className="mx-auto">
        <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
          {/* Hidden Checkbox */}
          <input
            type="checkbox"
            id="theme-toggle"
            checked={darkMode}
            onChange={handleToggle}
            className="peer sr-only"
          />

          {/* Toggle Track */}
          <span className="w-16 h-8 bg-gray-300 rounded-full transition-colors duration-300 peer-checked:bg-[#1e2328] dark:bg-gray-700 dark:peer-checked:bg-gray-900"></span>

          {/* Sliding Thumb */}
          <span
            className="absolute left-1 top-1 h-6 w-6 flex items-center justify-center rounded-full bg-white transition-transform duration-500 transform-gpu peer-checked:translate-x-8 peer-checked:bg-white dark:bg-gray-400 dark:peer-checked:bg-gray-600"
          >
            {darkMode ? (
              <BsFillMoonStarsFill size={16} className="text-[#171d25]" />
            ) : (
              <FaSun size={16} className="text-yellow-500" />
            )}
          </span>
        </label>
      </div>
    </div>
  );
};

export default DarkModeToggle;