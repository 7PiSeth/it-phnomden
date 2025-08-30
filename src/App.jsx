import { useEffect } from "react";
import DarkModeToggle from "./components/DarkModeToggle";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./components/pages/data/router"; // import from data.js

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll smoothly to top
  }, [pathname]);

  return null;
};

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 200, anchorPlacement: "top-bottom" });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <ScrollToTop /> {/* 👈 Add this */}
      <div className="max-w-screen-lg mx-auto min-h-screen flex flex-col justify-between items-center">
        <DarkModeToggle />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;