import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import BookStore from "./components/pages/Book-Store";
import GameStore from "./components/pages/Game-Store";
import GameStoreDetail from "./components/pages/Game-Store-Detail";
import PcProgramStore from "./components/pages/Pc-Program-Store";
import BetterUp from "./components/pages/Better-Up";
import LearnEnglish from "./components/pages/Learn-English";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 200, anchorPlacement: "top-bottom" });
    AOS.refresh();
  }, []);
  return (
    <Router>
    <div className="max-w-screen-lg mx-auto min-h-screen flex flex-col justify-between items-center">
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BookStore" element={<BookStore />} />
          <Route path="/GameStore" element={<GameStore />} />
          <Route path="/PcProgramStore" element={<PcProgramStore />} />
          <Route path="/BetterUp" element={<BetterUp />} />
          <Route path="/LearnEnglish" element={<LearnEnglish />} />
          <Route path="/GameStoreDetail" element={<GameStoreDetail />} />
        </Routes>
      <Footer />
    </div>
  </Router>
  );
};
export default App;
