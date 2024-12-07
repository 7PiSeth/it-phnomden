import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div data-aos="fade-down" data-aos-offset="100">
      <Link to="/it-phnomden">
        <img
          src={logo}
          alt="html.png"
          className="h-48 sm:h-72 object-contain"
        />
      </Link>
    </div>
  );
};
export default Logo;
