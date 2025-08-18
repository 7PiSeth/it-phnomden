import React from "react";
import game from "../assets/game.png";
import book from "../assets/book.png";
import betterup from "../assets/betterup-your-life.png";
import learnenglish from "../assets/learn-english.png";
import program from "../assets/program.png";
import { Link } from "react-router-dom";

const menus = [
  {
    id: 1,
    src: book,
    title: "BOOK STORE",
    page: "BookStore",
  },
  {
    id: 2,
    src: betterup,
    title: "BETTER UP YOUR MIND",
    page: "BetterUp",
  }, {
    id: 3,
    src: learnenglish,
    title: "Learn English",
    page: "LearnEnglish",
  },
  {
    id: 4,
    src: game,
    title: "PC GAME",
    page: "GameStore",
  },
  {
    id: 5,
    src: program,
    title: "PC PROGRAM",
    page: "PcProgramStore",
  },
];

const Menus = () => {
  return (
    <div>
      <div>
        <div
          data-aos="fade-right"
          data-aos-offset="100"
          className="grid grid-cols-2 gap-2 md:grid-cols-4 p-2"
        >
          {menus.map(({ id, src, title, page }) => (
            <Link
              to={page}
              class="bg-white bg-opacity-5 rounded-2xl px-4 py-2 flex flex-col items-center group relative overflow-hidden transition duration-700 ease-in-out border-transparent border-2 hover:border-white dark:hover:bg-opacity-20 hover:bg-opacity-25 active:scale-105 active:duration-100"
            >
              <span class="ease absolute right-0 -mt-12 h-72 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-500 group-hover:-translate-x-64"></span>
              <span class="flex flex-col">
                <img src={src} alt="html.png" className="h-32 object-contain" />
                <p className="text-center">{title}</p>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Menus;
