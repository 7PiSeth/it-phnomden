import { useEffect } from "react";
import NavBar from "./components/NavBar";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./components/pages/data/router"; // import from data.js

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
