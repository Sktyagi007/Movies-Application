import "./App.css";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import MoviesList from "./Components/MoviesList";
import Fav from "./Components/Fav";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<><Banner/><MoviesList/></>}></Route>
        <Route path="/favourites" element={<Fav/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
