import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import "reactjs-popup/dist/index.css";
import { useCookies } from "react-cookie";

const Home = () => {
  const [questionnaireList, setQuestionnaireList] = useState<[]>([]);
  // selected questionnaire
  // NOTE: do not trust client-side provided data, make sure to sanatize or check the cookie before using
  // NOTE: the cookie is available application wide this way
  const [questionnaire, setQuestionnaire] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(["selectedSurvey"]);

  console.log(cookies.selectedSurvey);

  const ref = useRef<PopupActions | null>(null);
  const closeTooltip = () => ref.current?.close();

  const fetchTables = async () => {
    try {
      const table = await axios.get("http://localhost:8800/tables");
      setQuestionnaireList(table.data);
      if (table.data.length > 0) {
        setQuestionnaire("test_survey1");
        setCookie("selectedSurvey", "test_survey1", {
          path: "/",
          maxAge: 86400000, // a day
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const changeQuestionnaire = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setQuestionnaire(selected);
    setCookie("selectedSurvey", selected, {
      path: "/",
      maxAge: 86400000,
    });
    closeTooltip();
  };

  const renderChoice = () => {
    const output = [];
    if (questionnaireList.length > 0) {
      const choices: JSX.Element[] = [];
      output.push(
        <select
          onChange={changeQuestionnaire}
          value={questionnaire}
          key="select"
        >
          {choices}
        </select>
      );
      for (let i = 1; i < questionnaireList.length + 1; i++) {
        choices.push(
          <option value={`test_survey${i}`} key={`option-${i}`}>
            Survey {i}
          </option>
        );
      }
    } else {
      output.push(
        <p key="default">Must create at least 1 questionnaire first</p>
      );
    }
    return output;
  };

  return (
    <>
      <div className="home-box">
        <h2 id="home-header">Welcome</h2>
        <button className="general-button">
          <Link to={"/createsurvey"} className="general-link">
            Create Questionnaire
          </Link>
        </button>
        <Popup
          ref={ref}
          trigger={
            <button className="general-button"> Choose Questionnaire </button>
          }
          position="right center"
        >
          <div className="question">
            <p>Please choose from your created questionnaires:</p>
            {renderChoice()}
          </div>
        </Popup>
      </div>
    </>
  );
};

export default Home;
