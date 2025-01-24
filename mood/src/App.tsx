import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Navbar from "./components/Navbar";
import Data from "./pages/Data";
import Update from "./pages/Update";
import Survey from "./pages/Survey";
import { useCookies } from "react-cookie";

// TODO: come back later and fix every "any" type assignment

function App() {
  // TODO: don't trust client-side provided data, implement sanitization/check cookie before using
  const [cookies] = useCookies(["selectedSurvey"]);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/form"
            element={<Form selectedSurvey={cookies.selectedSurvey} />}
          ></Route>
          <Route
            path="/data"
            element={<Data selectedSurvey={cookies.selectedSurvey} />}
          ></Route>
          <Route
            path="/update/:id"
            element={<Update selectedSurvey={cookies.selectedSurvey} />}
          ></Route>
          <Route path="/createsurvey" element={<Survey />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
