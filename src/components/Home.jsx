import React from "react";
import Logo from "./Logo";
import Menus from "./Menus";

const Home = () => {
  return (
    <div className="sm:mt-24 mt-16 flex flex-col items-center">
      <Logo />
      <Menus />
    </div>
  );
};

export default Home;
