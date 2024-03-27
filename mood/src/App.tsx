import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Navbar from "./components/Navbar";
import "./App.css";
import Data from "./pages/Data";

// TODO: come back later and fix every "any" type assignment

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/data" element={<Data />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
