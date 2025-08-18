// data.js
import Home from "./../../Home";
import BookStore from "./../Book-Store.jsx";
import GameStore from "./../Game-Store.jsx";
import PcProgramStore from "./../Pc-Program-Store.jsx";
import BetterUp from "./../Better-Up.jsx";
import LearnEnglish from "./../Learn-English.jsx";
import GameStoreDetail from "./../Game-Store-Detail.jsx";
import Item1 from "./../learn-english-data/Item1.jsx";

export const routes = [
  { path: "/", element: <Home />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/BookStore", element: <BookStore />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/GameStore", element: <GameStore />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/PcProgramStore", element: <PcProgramStore />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/BetterUp", element: <BetterUp />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/LearnEnglish", element: <LearnEnglish />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/GameStoreDetail", element: <GameStoreDetail />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/Item1", element: <Item1 />, title: "Best 10 tips to boost your brain", imgcoverlink: "https://www.betterup.com/hs-fs/hubfs/Students-during-language-lesson-writing-notes-how-to-become-smarter.webp?width=1200&name=Students-during-language-lesson-writing-notes-how-to-become-smarter.webp", itemtype: 'Self-improvement' },
];
