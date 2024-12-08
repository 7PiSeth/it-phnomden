import React from "react";
import { BsPersonBadgeFill, BsTelegram, BsYoutube, BsGithub} from "react-icons/bs";
import { FaFacebook} from "react-icons/fa";

const Footer = () => {
  return (
    <div
      className="h-[100px] md:h-[50px] dark:text-[#A3B3BC] 
    text-slate-00 flex flex-col md:flex-row justify-evenly items-center"
    >
      <div className="flex social-link">
      <a
          href="https://7piseth.github.io/maportfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsPersonBadgeFill size={25} />
        </a>
        <a
          href="https://github.com/7piseth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub size={25} />
        </a>
        <a
          href="https://www.facebook.com/IT.phnomden"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={25} />
        </a>
        <a
          href="https://t.me/it_phnomden"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTelegram size={25} />
        </a>
        <a
          href="https://youtube.com/@pisethseam7746"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsYoutube size={25} />
        </a>
      </div>
      <p class="md:mr-5 text-center">
        Designed and Developed by <span className="font-koulen">អាយធី ភ្នំដិន</span>
      </p>
    </div>
  );
};

export default Footer;
