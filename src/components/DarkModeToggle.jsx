import React, { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const themeColorMeta = document.querySelector("meta[name='theme-color']");

    if (darkMode) {
      root.classList.add("dark");
      themeColorMeta.content = "rgb(16, 24, 43)";
    } else {
      root.classList.remove("dark");
      themeColorMeta.content = "rgb(194, 205, 219)";
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
      <motion.label
        htmlFor="theme-toggle"
        className="fixed m-2 z-10 rounded-full inline-flex items-center cursor-pointer"
        whileTap={{ scale: 0.95 }}
      >
        <input
          type="checkbox"
          id="theme-toggle"
          checked={darkMode}
          onChange={toggleDarkMode}
          className="peer sr-only"
        />

        <motion.span
          layout
          className={`w-16 h-8 rounded-full ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}
          transition={{ duration: 0.4 }}
        />

        <motion.span
          layout
          className={`absolute left-1 top-1 h-6 w-6 flex items-center justify-center rounded-full shadow-md ${darkMode ? "bg-gray-600" : "bg-white"}`}
          initial={{ x: darkMode ? 32 : 0 }}
          animate={{ x: darkMode ? 32 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {darkMode ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.3 }}
              >
                <BsFillMoonStarsFill size={16} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                transition={{ duration: 0.3 }}
              >
                <FaSun size={16} className="text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.span>
      </motion.label>
  );
};

export default DarkModeToggle;