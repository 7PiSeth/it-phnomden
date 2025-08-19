// data.js
import Home from "./../../Home";
import BookStore from "./../Book-Store.jsx";
import GameStore from "./../Game-Store.jsx";
import PcProgramStore from "./../Pc-Program-Store.jsx";
import BetterUp from "./../Better-Up.jsx";
import LearnEnglish from "./../Learn-English.jsx";
import GameStoreDetail from "./../Game-Store-Detail.jsx";
import Item1 from "./../learn-english-data/Item1.jsx";
import Item2 from "./../learn-english-data/Item2.jsx";
import Item3 from "./../learn-english-data/Item3.jsx";

export const routes = [
  { path: "/", element: <Home />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/BookStore", element: <BookStore />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/GameStore", element: <GameStore />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/PcProgramStore", element: <PcProgramStore />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/BetterUp", element: <BetterUp />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/LearnEnglish", element: <LearnEnglish />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/GameStoreDetail", element: <GameStoreDetail />,title: null, imgcoverlink: null, itemtype: null },
  { path: "/Item1", element: <Item1 />, title: "Improve Yourself 1% Every Day-Jim Rohn Motivation", imgcoverlink: "https://i.ytimg.com/vi/MpuhVcFnnIo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDwWvi3-oqDUHNPUmUN7O6crekPkg", itemtype: 'Self-improvement' },
  { path: "/Item2", element: <Item2 />, title: "Think Smarter with 9 Mental Models", imgcoverlink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-gzOxyW37RULb5nMlDfgT1ne2zFbQE7636w&s", itemtype: 'Self-improvement' },
  { path: "/Item3", element: <Item3 />, title: "Artificial Intelligence: A Double-Edged Sword", imgcoverlink: "https://www.ieltspodcast.com/wp-content/uploads/2019/06/BAND-9-SAMPLE-IELTS-ESSAYS-copy-300x169.png", itemtype: 'IELTS ESSAY' },
];
